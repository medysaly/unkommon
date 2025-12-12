import { useEffect, useRef } from 'react';
import './CurvedScroller.css';

interface CurvedScrollerProps {
  title: string;
  subtitle?: string;
  content: React.ReactNode;
  config?: {
    radius?: number;
    scrollPadding?: number;
    stroke?: number;
    inset?: number;
    trail?: number;
    thumb?: number;
    finish?: number;
    alpha?: number;
    track?: number;
    color?: string;
    offsetCorner?: number;
    offsetEnd?: number;
  };
}

export function CurvedScroller({ title, subtitle, content, config: userConfig }: CurvedScrollerProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<SVGSVGElement>(null);
  const trackRef = useRef<SVGPathElement>(null);
  const thumbRef = useRef<SVGPathElement>(null);
  const stylesRef = useRef<HTMLStyleElement>(null);

  const config = {
    radius: 32,
    scrollPadding: 60,
    stroke: 5,
    inset: 6,
    trail: 20,
    thumb: 70,
    finish: 5,
    alpha: 0.9,
    track: 0,
    color: '#f85922',
    offsetCorner: -50,
    offsetEnd: 30,
    ...userConfig,
  };

  useEffect(() => {
    const scroller = scrollerRef.current;
    const list = listRef.current;
    const bar = barRef.current;
    const track = trackRef.current;
    const thumb = thumbRef.current;
    const styles = stylesRef.current;

    if (!scroller || !list || !bar || !track || !thumb || !styles) return;

    const syncBar = () => {
      const mid = config.radius;
      const innerRad = Math.max(0, config.radius - (config.inset + config.stroke * 0.5));
      const padTop = config.inset + config.stroke * 0.5;
      const padLeft = config.radius * 2 - padTop;

      bar.setAttribute('viewBox', `0 0 ${config.radius * 2} ${list.offsetHeight}`);
      scroller.style.setProperty('--stroke-width', config.stroke.toString());

      let d = `
        M${mid - config.trail},${padTop}
        ${innerRad === 0 ? '' : `L${mid},${padTop}`}
        ${innerRad === 0 ? `L${padLeft},${padTop}` : `a${innerRad},${innerRad} 0 0 1 ${innerRad} ${innerRad}`}
      `;
      thumb.setAttribute('d', d);
      const cornerLength = Math.ceil(thumb.getTotalLength());

      d = `
        M${mid - config.trail},${padTop}
        ${innerRad === 0 ? '' : `L${mid},${padTop}`}
        ${innerRad === 0 ? `L${padLeft},${padTop}` : `a${innerRad},${innerRad} 0 0 1 ${innerRad} ${innerRad}`}
        L${padLeft},${list.offsetHeight - (config.inset + config.stroke * 0.5 + innerRad)}
        ${innerRad === 0 ? `L${padLeft},${list.offsetHeight - (config.inset + config.stroke * 0.5)}` : `a${innerRad},${innerRad} 0 0 1 ${-innerRad} ${innerRad}`}
        L${mid - config.trail},${list.offsetHeight - (config.inset + config.stroke * 0.5)}
      `;
      thumb.setAttribute('d', d);
      track.setAttribute('d', d);

      scroller.style.setProperty('--track-length', Math.ceil(track.getTotalLength()).toString());
      scroller.style.setProperty('--track-start', cornerLength.toString());
      scroller.style.setProperty('--start', (config.thumb * 2 + cornerLength).toString());
      scroller.style.setProperty('--destination', (Math.ceil(track.getTotalLength()) - cornerLength + config.thumb).toString());

      const frames = [
        [0, config.thumb - config.finish - config.offsetEnd],
        [
          Math.floor((config.scrollPadding / (list.scrollHeight - scroller.offsetHeight)) * 100),
          (cornerLength + config.offsetCorner) * -1,
        ],
        [
          100 - Math.floor((config.scrollPadding / (list.scrollHeight - scroller.offsetHeight)) * 100),
          (Math.floor(track.getTotalLength()) - cornerLength - config.thumb - config.offsetCorner) * -1,
        ],
        [100, (Math.floor(track.getTotalLength()) - config.finish - config.offsetEnd) * -1],
      ];

      styles.innerHTML = `
        @keyframes scroll-${title.replace(/\s+/g, '-')} {
          ${frames[0][0]}% { stroke-dashoffset: ${frames[0][1]};}
          ${frames[1][0]}% { stroke-dashoffset: ${frames[1][1]};}
          ${frames[2][0]}% { stroke-dashoffset: ${frames[2][1]};}
          ${frames[3][0]}% { stroke-dashoffset: ${frames[3][1]};}
        }
      `;

      if (thumb) {
        thumb.style.animationName = `scroll-${title.replace(/\s+/g, '-')}`;
      }
    };

    // Set initial styles
    scroller.style.setProperty('--radius', config.radius.toString());
    scroller.style.setProperty('--padding', config.scrollPadding.toString());
    scroller.style.setProperty('--color', config.color);
    scroller.style.setProperty('--thumb-size', config.thumb.toString());
    scroller.style.setProperty('--bar-alpha', config.alpha.toString());
    scroller.style.setProperty('--track-alpha', config.track.toString());

    const resizeObserver = new ResizeObserver(() => {
      syncBar();
    });

    resizeObserver.observe(list);
    syncBar();

    return () => {
      resizeObserver.disconnect();
    };
  }, [config, title]);

  return (
    <div ref={scrollerRef} className="curved-scroller" data-rounded-scroll="true">
      <svg
        ref={barRef}
        className="scroller__bar bar"
        viewBox="0 0 56 56"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path ref={thumbRef} className="bar__thumb" fill="none" strokeLinecap="round" />
        <path ref={trackRef} className="bar__track" fill="none" strokeLinecap="round" />
      </svg>
      <div ref={listRef}>
        <header>
          <div>
            <h1>{title}</h1>
            {subtitle && <p>{subtitle}</p>}
          </div>
        </header>
        <main>{content}</main>
        <footer>
          <p>Unkommon&nbsp;&copy;</p>
        </footer>
      </div>
      <style ref={stylesRef} id="scroller-frames"></style>
    </div>
  );
}
