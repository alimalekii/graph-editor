import './style.scss';
import { IGraphEdgeSchema, IGraphSettingsEdgeProps } from 'src/types';
import { BaseEdge, EdgeLabelRenderer } from 'reactflow';
import useNodePath from '@/lib/hooks/useNodePath';

const GraphNode = ({
  sourceX,
  sourceY,
  targetX,
  targetY,
  source,
  target,
  data,
}: IGraphSettingsEdgeProps) => {
  const { id, label, dataIsValidated } = data as IGraphEdgeSchema;

  const { path, labelX, labelY } = useNodePath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    isSelfConnected: source === target,
  });

  return (
    <>
      <BaseEdge
        id={id}
        path={path}
        data-valid={`${dataIsValidated ? '' : 'unvalid'}`}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: 'all',
          }}
          className="bdm-graph-edge-label nodrag"
        >
          {label}
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default GraphNode;
