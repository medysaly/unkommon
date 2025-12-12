import './LuminousCard.css';

interface LuminousCardProps {
  icon?: React.ReactNode;
  title: string;
  description: string | React.ReactNode;
  className?: string;
}

export function LuminousCard({ icon, title, description, className }: LuminousCardProps) {
  return (
    <div className={`luminous-card ${className || ''}`}>
      {/* Light layer - appears on hover */}
      <div className="light-layer">
        <div className="slit"></div>
        <div className="lumen">
          <div className="glow-min"></div>
          <div className="glow-mid"></div>
          <div className="glow-hi"></div>
        </div>
      </div>

      <div className="card-content">
        {icon && (
          <div className="card-icon">
            {icon}
          </div>
        )}
        <div className="card-bottom">
          <h4>{title}</h4>
          <div>{description}</div>
        </div>
      </div>
    </div>
  );
}
