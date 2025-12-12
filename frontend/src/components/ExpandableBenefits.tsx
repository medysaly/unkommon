import { useEffect, useRef, useState } from "react";
import { LucideIcon } from "lucide-react";
import "./ExpandableBenefits.css";

interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
  image?: string;
}

interface ExpandableBenefitsProps {
  benefits: Benefit[];
}

export function ExpandableBenefits({ benefits }: ExpandableBenefitsProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const setIndex = (event: React.MouseEvent | React.FocusEvent) => {
    const closest = (event.target as HTMLElement).closest('li');
    if (closest && listRef.current) {
      const items = listRef.current.querySelectorAll('li');
      const index = Array.from(items).indexOf(closest);

      if (index !== -1) {
        setActiveIndex(index);
        const cols = new Array(items.length)
          .fill('')
          .map((_, i) => index === i ? '10fr' : '1fr')
          .join(' ');

        listRef.current.style.setProperty('grid-template-columns', cols);
      }
    }
  };

  const resync = () => {
    if (listRef.current) {
      const items = listRef.current.querySelectorAll('li');
      const w = Math.max(
        ...Array.from(items).map((i) => (i as HTMLElement).offsetWidth)
      );
      listRef.current.style.setProperty('--article-width', `${w}`);
    }
  };

  useEffect(() => {
    resync();
    window.addEventListener('resize', resync);
    return () => window.removeEventListener('resize', resync);
  }, []);

  useEffect(() => {
    // Set initial active state
    if (listRef.current) {
      const items = listRef.current.querySelectorAll('li');
      const cols = new Array(items.length)
        .fill('')
        .map((_, i) => i === 0 ? '10fr' : '1fr')
        .join(' ');
      listRef.current.style.setProperty('grid-template-columns', cols);
    }
  }, []);

  return (
    <ul
      ref={listRef}
      className="expandable-benefits"
      onClick={setIndex}
      onMouseMove={setIndex}
      onFocus={setIndex}
    >
      {benefits.map((benefit, index) => {
        return (
          <li key={index} data-active={activeIndex === index}>
            <article>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </article>
          </li>
        );
      })}
    </ul>
  );
}
