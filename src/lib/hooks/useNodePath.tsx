import { useEffect, useState } from 'react';
import { getBezierPath } from 'reactflow';

// this hook is used to calculate path and label position for graph setting nodes

const useNodePath = ({
  sourceX,
  sourceY,
  targetX,
  targetY,
  isSelfConnected,
  curvature = 0.25,
}: {
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  isSelfConnected: boolean;
  curvature?: number;
}) => {
  const [path, setPath] = useState('');
  const [labelXPosition, setLabelXPosition] = useState(0);
  const [labelYPosition, setLabelYPosition] = useState(0);

  const [edgePath, labelX, labelY, offsetX, offsetY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    curvature,
  });

  useEffect(() => {
    if (isSelfConnected) {
      const radiusX = (sourceX - targetX) * 0.6;
      const radiusY = 50;
      setPath(
        `M ${sourceX - 5} ${sourceY} A ${radiusX} ${radiusY} 0 1 0 ${
          targetX + 2
        } ${targetY}`
      );
      const nodeXPosMidle = (sourceX + targetX) / 2;
      const nodeYPosMidle = (sourceY + targetY) / 2 - 70;
      setLabelXPosition(nodeXPosMidle);
      setLabelYPosition(nodeYPosMidle); // 35 is fixed since label location is fixed relactive to node
    } else {
      setPath(edgePath);
      setLabelXPosition(labelX);
      setLabelYPosition(labelY);
    }
  }, [isSelfConnected, edgePath, labelX, labelY, offsetX, offsetY]);

  return {
    path,
    labelX: labelXPosition,
    labelY: labelYPosition,
  };
};

export default useNodePath;
