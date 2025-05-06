import { Node, Edge, NodeProps, EdgeProps } from 'reactflow';

export enum META_TYPES {
  INTEGER = 'Integer',
  DOUBLE = 'Double',
  DECIMAL18 = 'Decimal18',
  LONG = 'Long',
  FLOAT = 'Float',
  STRING = 'String',
  BOOLEAN = 'Boolean',
  POINT = 'Point',
  IMAGE = 'Image',
  DATE_TIME = 'Date',
  TIMESTAMP = 'Timestamp',
  EMBEDDING = 'embedding',
}

export interface IGraphNodeSchema {
  id: string;
  label: string;
  metaData: Record<string, META_TYPES>;
  foreignKey: string;
  primaryKey: string;
  dataIsValidated: boolean;
  dataLocation: {
    ip: string;
    port: string;
    address: string;
  };
  image?: string;
  imagePath?: string;
  nodeType?: string;
  connections?: Array<string>; // connected edges ids
  count?: number;
  position?: {
    x: number;
    y: number;
  };
}

export interface IGraphEdgeSchema {
  id: string;
  label: string;
  src: string;
  dst: string;
  metaData: Record<string, META_TYPES>;
  srcCommonField: string;
  dstCommonField: string;
  direction: string;
  dataIsValidated: boolean;
  primaryKey: string;
  dataLocation: {
    ip: string;
    port: string;
    address: string;
  };
  edgeType?: string;
  count?: number;
  duplicates?: Array<string>; // edges with the same source and target ids
}

export type IGraphSettingsNode = Node<IGraphNodeSchema>;

export type IGraphSettingsEdge = Edge<IGraphEdgeSchema>;

export interface IGraphSetting {
  graphId: string;
  graphName: string;
  isActive: boolean;
  graphData: {
    nodes: Array<IGraphSettingsNode>;
    edges: Array<IGraphSettingsEdge>;
  };
  rawData: {
    nodes: Array<IGraphNodeSchema>;
    edges: Array<IGraphEdgeSchema>;
  };
}

export type IGraphSettingsNodeProps = NodeProps<IGraphNodeSchema>;

export type IGraphSettingsEdgeProps = EdgeProps<IGraphEdgeSchema>;
