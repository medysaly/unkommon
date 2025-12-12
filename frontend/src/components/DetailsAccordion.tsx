import { useState, useEffect, useRef } from 'react';
import { ChevronUp, Plus } from 'lucide-react';
import './DetailsAccordion.css';

interface AccordionItem {
  title: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
  image?: string;
}

interface DetailsAccordionProps {
  items: AccordionItem[];
  title?: string;
  subtitle?: string;
}

export function DetailsAccordion({ items, title, subtitle }: DetailsAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const handleNext = () => {
    if (openIndex !== null) {
      const nextIndex = (openIndex + 1) % items.length;
      setOpenIndex(nextIndex);
    }
  };

  const handlePrevious = () => {
    if (openIndex !== null) {
      const prevIndex = (openIndex - 1 + items.length) % items.length;
      setOpenIndex(prevIndex);
    }
  };


  const handleToggle = (index: number, event: React.MouseEvent) => {
    const summary = event.currentTarget as HTMLElement;
    const details = summary.parentElement;

    if (details?.hasAttribute('open')) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  useEffect(() => {
    const syncState = async () => {
      if (openIndex === null) {
        setIsChecking(false);
      } else {
        if (sectionRef.current) {
          await Promise.allSettled(
            sectionRef.current.getAnimations({ subtree: true }).map(a => a.finished)
          );
        }
        setIsChecking(true);
      }
    };

    syncState();
  }, [openIndex]);

  return (
    <section
      ref={sectionRef}
      className="details-accordion"
      data-checking-details={isChecking}
    >
      {/* Background Image */}
      {openIndex !== null && items[openIndex]?.image && (
        <div className="accordion-background-image">
          <img src={items[openIndex].image} alt={items[openIndex].title} />
        </div>
      )}

      {title && (
        <div className="accordion-header">
          <h2 className="accordion-title">{title}</h2>
          {subtitle && <p className="accordion-subtitle">{subtitle}</p>}
        </div>
      )}

      <div className="accordion-content">
        <div className="accordion-column">
          {items.slice(0, 3).map((item, index) => (
            <details
              key={index}
              name="feature"
              open={openIndex === index}
              className="accordion-item"
            >
              <summary
                onClick={(e) => {
                  e.preventDefault();
                  handleToggle(index, e);
                }}
                className="accordion-summary"
              >
                {item.icon || (
                  <Plus className="accordion-icon" />
                )}
                <span>{item.title}</span>
              </summary>
              <div className="accordion-item-content">
                {item.content}
              </div>
            </details>
          ))}
        </div>
        <div className="accordion-column">
          {items.slice(3, 6).map((item, index) => (
            <details
              key={index + 3}
              name="feature"
              open={openIndex === index + 3}
              className="accordion-item"
            >
              <summary
                onClick={(e) => {
                  e.preventDefault();
                  handleToggle(index + 3, e);
                }}
                className="accordion-summary"
              >
                {item.icon || (
                  <Plus className="accordion-icon" />
                )}
                <span>{item.title}</span>
              </summary>
              <div className="accordion-item-content">
                {item.content}
              </div>
            </details>
          ))}
        </div>
      </div>

      {/* Navigation Controls */}
      <button
        aria-hidden="true"
        tabIndex={-1}
        data-action="previous"
        onClick={handlePrevious}
        className="accordion-nav-btn"
        style={{ opacity: openIndex !== null ? 1 : 0, pointerEvents: openIndex !== null ? 'auto' : 'none' }}
      >
        <ChevronUp className="w-5 h-5" />
      </button>

      <button
        aria-hidden="true"
        tabIndex={-1}
        data-action="next"
        onClick={handleNext}
        className="accordion-nav-btn"
        style={{ opacity: openIndex !== null ? 1 : 0, pointerEvents: openIndex !== null ? 'auto' : 'none' }}
      >
        <ChevronUp className="w-5 h-5" style={{ rotate: '180deg' }} />
      </button>
    </section>
  );
}
