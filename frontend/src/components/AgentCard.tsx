import { useRef, useEffect } from "react";
import { Link } from "wouter";
import { createPageUrl } from "@/lib/utils";
import "./AgentCard.css";

interface AgentCardProps {
  name: string;
  description: string;
  image: string;
  page: string;
  stats?: {
    users?: number;
    features?: number;
  };
}

export function AgentCard({ name, description, image, page, stats = { users: 675, features: 18 } }: AgentCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      card.style.setProperty('--glow-x', `${x}%`);
      card.style.setProperty('--glow-y', `${y}%`);
      card.style.setProperty('--glow-intensity', '1');
    };

    card.addEventListener('mousemove', handleMouseMove);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <Link href={createPageUrl(page)}>
      <div ref={cardRef} className="agent-card">
        <div className="agent-card__body">
          <div className="agent-card__header">
            <h2 className="agent-card__name">{name}</h2>
          </div>
          <p className="agent-card__description">
            {description}
          </p>
          <div className="agent-card__footer">
            <div className="agent-card__actions">
              <button className="agent-card__follow-btn">
                <span className="agent-card__follow-label">Learn More</span>
                <svg
                  fill="currentColor"
                  width="16"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <title>arrow-right</title>
                  <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
