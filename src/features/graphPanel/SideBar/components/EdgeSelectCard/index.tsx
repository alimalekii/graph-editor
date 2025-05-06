import './style.scss';
import edgeIcon from '@/assets/edgeIcon.svg';

const EdgeSelectCard = ({
  label,
  id,
  onSelect,
  onDelete,
}: {
  label: string;
  id: string;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}) => {
  return (
    <div
      className="bdm-graph-setting-edge-select-card"
      key={label}
      onClick={() => onSelect(id)}
    >
      <div className="bdm-graph-setting-edge-select-card__icon">
        <img src={edgeIcon} alt="edge icon" width={20} height={20} />
      </div>
      <div className="bdm-graph-setting-edge-select-card__label">{label}</div>
      <div
        className="bdm-graph-setting-edge-select-card__delete"
        onClick={() => onDelete(id)}
      >
        {/* <img src={icon} alt='edge icon' width={35} height={35} /> */}
      </div>
    </div>
  );
};

export default EdgeSelectCard;
