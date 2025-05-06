import './style.scss';
import 'reactflow/dist/style.css';
import ReactFlow, { Controls } from 'reactflow';
import useGraphEditor from './logic';
import GraphNode from './components/GraphNode';
import GraphEdge from './components/GraphEdge';
const nodeTypes = { graphNode: GraphNode };
const edgeTypes = { graphEdge: GraphEdge };
const defaultEdgeOptions = { animated: true };

const GraphEditor = () => {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } =
    useGraphEditor();

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        defaultEdgeOptions={defaultEdgeOptions}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        multiSelectionKeyCode={null}
        fitView
        style={{ height: '100%', width: '100%', backgroundColor: '#eee' }}
      >
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default GraphEditor;
