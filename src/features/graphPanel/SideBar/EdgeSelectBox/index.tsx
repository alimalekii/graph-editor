import EdgeSelectCard from '../components/EdgeSelectCard';

const EdgeSelectBox = ({
  edges,
  onSelect,
  onDelete,
}: {
  edges: Array<{ id: string; label: string }>;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}) => {
  return (
    <>
      <div className="bdm-graph-sidebar__body__section">
        {edges.map((edg) => (
          <EdgeSelectCard {...edg} onSelect={onSelect} onDelete={onDelete} />
        ))}
      </div>
    </>
  );
};

export default EdgeSelectBox;
