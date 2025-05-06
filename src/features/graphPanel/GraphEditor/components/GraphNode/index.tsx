import './style.scss';

import { Position, Handle } from 'reactflow';
import { IGraphSettingsNodeProps } from 'src/types';
// import userPric from 'src/assets/userPic.svg'
// import { BsFillImageFill } from 'react-icons/bs'
import imageIcon from '@/assets/imageIcon.svg';

const GraphNode = ({ selected, data }: IGraphSettingsNodeProps) => {
  const {
    label,
    dataIsValidated,
    //  id, foreignKey, count, updateState, icon, metaData
  } = data;

  return (
    <>
      <div
        className={`bdm-graph-node ${dataIsValidated ? '' : 'unvalid'} ${
          selected ? 'selected' : ''
        }`.trim()}
      >
        <div className="bdm-graph-node__header"></div>

        <div className="bdm-graph-node__body">
          <div className="bdm-graph-node__body__content">
            <div className="bdm-graph-node__body__content__icon">
              <img src={imageIcon} />
              {/* <img src={userPric} alt={label} /> */}
            </div>
            <div className="bdm-graph-node__body__content__title">{label}</div>
          </div>
        </div>

        <div className="bdm-graph-node__details">
          <span className="bdm-graph-node__details__handler"></span>
        </div>
      </div>
      <Handle type="target" position={Position.Left} isConnectable={true} />
      <Handle type="source" position={Position.Right} isConnectable={true} />
    </>
  );
};

export default GraphNode;
