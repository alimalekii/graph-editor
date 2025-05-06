import {
  META_TYPES,
  IGraphNodeSchema,
  IGraphEdgeSchema,
  IGraphSettingsEdge,
  IGraphSettingsNode,
} from '@/types';

export const nodesv1 = [
  {
    id: '6241941f762b6eef23c55bc5',
    nodeType: 'account',
    label: 'account',
    foreignKey: 'account_ID',
    count: 5000,
    metaData: {
      name: 'String',
      account_ID: 'Integer',
      Datetime: 'Timestamp',
    },
    position: {
      x: 0,
      y: 0,
    },
    dataIsValidated: false,
    dataLocation: {
      ip: '192.168.1.1',
      port: '100',
    },
  },
  {
    id: '6241946b762b6eef23c55bc9',
    nodeType: 'instagram',
    label: 'instagram',
    metaData: {
      insta_ID: 'Integer',
      timestamp: 'Timestamp',
      text: 'String',
    },
    foreignKey: 'insta_ID',
    count: 5000,
    position: {
      x: 50,
      y: 50,
    },
    dataIsValidated: false,
    dataLocation: {
      ip: '192.168.1.1',
      port: '100',
    },
  },
  {
    id: '62419479762b6eef23c55bca',
    nodeType: 'instausername',
    label: 'instausername',
    metaData: { username: 'String' },
    foreignKey: 'username',
    count: 5000,
    position: {
      x: 50,
      y: 50,
    },
    dataIsValidated: true,
    dataLocation: {
      ip: '192.168.1.1',
      port: '100',
    },
  },
  {
    id: '6241948c762b6eef23c55bcb',
    nodeType: 'post',
    label: 'post',
    metaData: {
      post_ID: 'Integer',
      timestamp: 'Timestamp',
      text: 'String',
    },
    foreignKey: 'post_ID',
    count: 5000,
    position: {
      x: 50,
      y: 50,
    },
    dataIsValidated: true,
    dataLocation: {
      ip: '192.168.1.1',
      port: '100',
    },
  },
  {
    id: '6241943d762b6eef23c55bc6',
    nodeType: 'simcart',
    label: 'simcart',
    metaData: {
      phone_number: 'String',
      provider: 'String',
      IMSEI: 'String',
    },
    foreignKey: 'phone_number',
    count: 5000,
    position: {
      x: 50,
      y: 50,
    },
    dataIsValidated: true,
    dataLocation: {
      ip: '192.168.1.1',
      port: '100',
    },
  },
  {
    id: '6241944c762b6eef23c55bc7',
    nodeType: 'phone',
    label: 'phone',
    metaData: {
      models: 'String',
      ostype: 'String',
      osversion: 'Double',
      IMEI: 'String',
    },
    foreignKey: 'IMEI',
    count: 5000,
    position: {
      x: 50,
      y: 50,
    },
    dataIsValidated: true,
    dataLocation: {
      ip: '192.168.1.1',
      port: '100',
    },
  },
  {
    id: '624193fe762b6eef23c55bc4',
    nodeType: 'bank',
    label: 'bank',
    metaData: {
      name: 'String',
      private: 'Boolean',
      bank_id: 'String',
    },
    foreignKey: 'bank_id',
    count: 5000,
    position: {
      x: 50,
      y: 50,
    },
    dataIsValidated: true,
    dataLocation: {
      ip: '192.168.1.1',
      port: '100',
    },
  },
  {
    id: '62419464762b6eef23c55bc8',
    nodeType: 'email',
    label: 'email',
    metaData: {
      address: 'String',
      emailproviders: 'String',
    },
    foreignKey: 'address',
    count: 5000,
    position: {
      x: 50,
      y: 50,
    },
    dataIsValidated: true,
    dataLocation: {
      ip: '192.168.1.1',
      port: '100',
    },
  },
  {
    id: '6241949a762b6eef23c55bcc',
    nodeType: 'location',
    label: 'location',
    metaData: {
      name: 'String',
      coordinates: 'Point',
    },
    foreignKey: 'name',
    count: 5000,
    position: {
      x: 50,
      y: 50,
    },
    dataIsValidated: true,
    dataLocation: {
      ip: '192.168.1.1',
      port: '100',
    },
  },
  {
    id: '64b515f1391b0e53e971b143',
    nodeType: 'allTypesData',
    label: 'allTypesData',
    metaData: {
      name: 'Boolean',
      double_col: 'Double',
      float_col: 'Float',
      id: 'String',
      integer_col: 'Integer',
      string_col: 'String',
    },
    foreignKey: 'id',
    count: 100000,
    position: {
      x: 50,
      y: 50,
    },
    dataIsValidated: true,
    dataLocation: {
      ip: '192.168.1.1',
      port: '100',
    },
  },
  {
    id: '650ad21cf4d26643975519a5',
    nodeType: 'image',
    label: 'image',
    metaData: {
      date: 'Timestamp',
      image_dir: 'String',
      image: 'Image',
    },
    foreignKey: 'id',
    count: 100000,
    position: {
      x: 50,
      y: 50,
    },
    dataIsValidated: true,
    dataLocation: {
      ip: '192.168.1.1',
      port: '100',
    },
  },
  {
    id: '6579c504ad9466b212d262f4',
    nodeType: 'VMSimage',
    label: 'VMSimage',
    metaData: {
      Date_Time: 'Timestamp',
      Camera_ID: 'String',
      image: 'Image',
      ID: 'String',
    },
    foreignKey: 'ID',
    count: 100000,
    position: {
      x: 50,
      y: 50,
    },
    dataIsValidated: true,
    dataLocation: {
      ip: '192.168.1.1',
      port: '100',
    },
  },
  {
    id: '6587f76b5024f31e47f3d1a1',
    nodeType: 'person',
    label: 'person',
    dataIsValidated: true,
    metaData: {
      birthdate: 'Timestamp',
      father_name: 'String',
      firstname: 'String',
      lastname: 'String',
      national_ID: 'Integer',
    },
    foreignKey: 'id',
    count: 90000,
    position: {
      x: 100,
      y: 100,
    },
    dataLocation: {
      ip: '192.168.1.1',
      port: '100',
    },
  },
  // ] as Array<IGraphNodeSchema>
];

export const nodes = nodesv1.map((node, index) => {
  const spacingX = 250; // horizontal spacing between nodes
  const spacingY = 150; // vertical spacing between nodes
  const columns = 4; // how many nodes per row before wrapping

  return {
    ...node,
    position: {
      x: (index % columns) * spacingX,
      y: Math.floor(index / columns) * spacingY,
    },
  };
});

export const edges = [
  {
    id: '636a17e1c65bc22989fcea2c',
    edgeType: 'account_to_account_deposit',
    label: 'account_to_account_deposit',
    src: '6241941f762b6eef23c55bc5',
    dst: '6241941f762b6eef23c55bc5',
    direction: 'ud',
    metaData: {
      date: 'Date',
      property: 'String',
    },
    dstCommonField: 'date',
    srcCommonField: 'property',
    count: 5000,
    dataIsValidated: false,
    dataLocation: {
      ip: '192.168.1.1',
      port: '100',
    },
  },
  {
    id: '636a17e1c65bc22989fcea2d',
    edgeType: 'account_to_account_transaction',
    label: 'account_to_account_transaction',
    src: '6241941f762b6eef23c55bc5',
    dst: '6241941f762b6eef23c55bc5',
    direction: 'ud',
    metaData: {
      date: 'Date',
      property: 'String',
    },
    dstCommonField: 'date',
    srcCommonField: 'property',
    count: 5000,
    dataIsValidated: false,
    dataLocation: {
      ip: '192.168.1.1',
      port: '100',
    },
  },
  {
    id: '63a19fceb622c61c7e1a6a36',
    edgeType: 'transaction_to_email',
    label: 'transaction_to_email',
    src: '6241946b762b6eef23c55bc9',
    dst: '62419464762b6eef23c55bc8',
    direction: 'du',
    metaData: {
      date: 'Date',
      property: 'String',
    },
    dstCommonField: 'email_address',
    srcCommonField: 'insta_ID',
    count: 7000,
    dataIsValidated: false,
    dataLocation: {
      ip: '192.168.1.1',
      port: '100',
    },
  },
  {
    id: '63a19fceb622c61c7e1a6a39',
    edgeType: 'fake_to_email',
    label: 'fake_to_email',
    src: '6241946b762b6eef23c55bc9',
    dst: '62419464762b6eef23c55bc8',
    direction: 'du',
    metaData: {
      date: 'Date',
      property: 'String',
    },
    dstCommonField: 'email_address',
    srcCommonField: 'insta_ID',
    count: 7000,
    dataIsValidated: true,
    dataLocation: {
      id: '192.168.1.1',
      port: '100',
      address: '/test',
    },
  },
  // ] as Array<IGraphEdgeSchema>
];

export const initialNodes = [
  {
    id: '1',
    data: { label: 'Hello' },
    position: { x: 0, y: 0 },
    type: 'input',
  },
  {
    id: '2',
    data: { label: 'World' },
    position: { x: 100, y: 100 },
  },
  {
    id: '3',
    data: { label: '!!!!!' },
    position: { x: 150, y: 150 },
  },
];

export const initialEdges = [
  { id: '1-2', source: '1', target: '2', label: 'to the', type: 'step' },
];

export const modifyData = (data: {
  nodes: Array<IGraphNodeSchema>;
  edges: Array<IGraphEdgeSchema>;
}) => {
  const { nodes, edges } = data;

  const graphNodes = nodes.map((nod) => {
    const { id, position } = nod;
    return { id, data: { ...nod }, position, type: 'graphNode' };
  }) as Array<IGraphSettingsNode>;

  const graphEdges = edges.map((edg) => {
    const { id, src, dst } = edg;
    return {
      id,
      data: { ...edg },
      source: src,
      target: dst,
      type: 'graphEdge',
    };
  }) as Array<IGraphSettingsEdge>;

  return {
    nodes: graphNodes,
    edges: graphEdges,
  };
};

export const activeGraph = () => ({
  graphId: 1,
  graphName: 'test',
  graphData: modifyData({ nodes, edges } as any),
  rawData: { nodes, edges },
  isActive: true,
});

export const mockGraph: {
  graphs: Array<{
    graphName: string;
    graphId: string;
    nodes: IGraphNodeSchema[];
    edges: IGraphEdgeSchema[];
  }>;
} = {
  graphs: [
    {
      graphName: 'Sample Graph',
      graphId: 'graph-001',
      nodes: [
        {
          id: 'node-1',
          label: 'User',
          metaData: {
            userId: META_TYPES.STRING,
            email: META_TYPES.STRING,
            createdAt: META_TYPES.DATE_TIME,
          },
          foreignKey: 'userId',
          primaryKey: 'userId',
          dataIsValidated: true,
          dataLocation: {
            ip: '192.168.0.1',
            port: '8080',
            address: 'Server A',
          },
          image: '',
          imagePath: '',
          nodeType: 'User',
          connections: ['edge-1'],
          count: 42,
          position: { x: 100, y: 150 },
        },
        {
          id: 'node-2',
          label: 'Customer',
          metaData: {
            customerId: META_TYPES.STRING,
            name: META_TYPES.STRING,
            registeredAt: META_TYPES.DATE_TIME,
          },
          foreignKey: 'customerId',
          primaryKey: 'customerId',
          dataIsValidated: true,
          dataLocation: {
            ip: '192.168.0.2',
            port: '8081',
            address: 'Server B',
          },
          image: '',
          imagePath: '',
          nodeType: 'Customer',
          connections: ['edge-1', 'edge-2'],
          count: 35,
          position: { x: 300, y: 150 },
        },
        {
          id: 'node-3',
          label: 'Transaction',
          metaData: {
            transactionId: META_TYPES.STRING,
            amount: META_TYPES.DECIMAL18,
            customerId: META_TYPES.STRING,
          },
          foreignKey: 'customerId',
          primaryKey: 'transactionId',
          dataIsValidated: false,
          dataLocation: {
            ip: '192.168.0.3',
            port: '8082',
            address: 'Server C',
          },
          image: '',
          imagePath: '',
          nodeType: 'Transaction',
          connections: ['edge-2'],
          count: 20,
          position: { x: 500, y: 200 },
        },
      ],
      edges: [
        {
          id: 'edge-1',
          label: 'User-Customer Link',
          src: 'node-1',
          dst: 'node-2',
          metaData: {
            relation: META_TYPES.STRING,
            isActive: META_TYPES.BOOLEAN,
          },
          srcCommonField: 'userId',
          dstCommonField: 'customerId',
          direction: 'outgoing',
          dataIsValidated: true,
          primaryKey: 'edge-pk-1',
          dataLocation: {
            ip: '192.168.0.1',
            port: '8080',
            address: 'Server A',
          },
          edgeType: 'BelongsTo',
          count: 1,
          duplicates: [],
        },
        {
          id: 'edge-2',
          label: 'Customer-Transaction Link',
          src: 'node-2',
          dst: 'node-3',
          metaData: {
            type: META_TYPES.STRING,
            confirmed: META_TYPES.BOOLEAN,
          },
          srcCommonField: 'customerId',
          dstCommonField: 'customerId',
          direction: 'outgoing',
          dataIsValidated: false,
          primaryKey: 'edge-pk-2',
          dataLocation: {
            ip: '192.168.0.2',
            port: '8081',
            address: 'Server B',
          },
          edgeType: 'HasTransaction',
          count: 5,
          duplicates: [],
        },
      ],
    },
  ],
};
