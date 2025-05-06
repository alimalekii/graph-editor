import {
  useOnSelectionChange,
  NodeChange,
  EdgeChange,
  Connection,
} from 'reactflow';

import { useBDMDispatch, useBDMSelector } from '@/lib/store/hooks';
import {
  selectPreviewGraph,
  makeConnection,
  applyEdgeChange,
  applyNodesChange,
  setSelected,
} from '../slice';

const useGraphEditor = () => {
  const graph = useBDMSelector(selectPreviewGraph);
  console.log('Preview Graph', graph);

  const dispatch = useBDMDispatch();

  const onNodesChange = (changes: Array<NodeChange>) =>
    dispatch(applyNodesChange(changes));

  const onEdgesChange = (changes: Array<EdgeChange>) =>
    dispatch(applyEdgeChange(changes));
  const onConnect = (changes: Connection) => dispatch(makeConnection(changes));

  useOnSelectionChange({
    onChange: ({ nodes, edges }) => {
      const selectedNode = nodes.find((nod) => nod.selected);
      const selectedEdge = edges.find((edg) => edg.selected);
      const selected = selectedNode ?? selectedEdge ?? null;
      dispatch(
        setSelected(
          selected
            ? {
                type: selectedNode ? 'node' : 'edge',
                id: selected.id,
                selfData: selected,
              }
            : null
        )
      );
    },
  });

  return {
    nodes: graph?.graphData.nodes ?? [],
    edges: graph?.graphData.edges ?? [],
    onNodesChange,
    onEdgesChange,
    onConnect,
  };
};

export default useGraphEditor;
