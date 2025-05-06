// import GraphSettingsProvider from './duck/context';
import Wrapper from './Wrapper';
import { ReactFlowProvider } from 'reactflow';

const GraphSettings = () => {
  return (
    <ReactFlowProvider>
      <Wrapper />
    </ReactFlowProvider>
  );
};

export default GraphSettings;
