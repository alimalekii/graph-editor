import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/lib/store';
import { nanoid as uuid } from '@reduxjs/toolkit';

import {
  IGraphNodeSchema,
  IGraphEdgeSchema,
  IGraphSettingsNode,
  IGraphSettingsEdge,
  IGraphSetting,
  // IGetMetaGraphFromRepositoriesDTO,
} from 'src/types';

export interface IGetMetaGraphFromRepositoriesDTO {
  graphs: Array<{
    graphName: string;
    graphId: string;
    edges: Array<IGraphEdgeSchema>;
    nodes: Array<IGraphNodeSchema>;
  }>;
}

import {
  NodeChange,
  applyNodeChanges,
  EdgeChange,
  applyEdgeChanges,
} from 'reactflow';

interface IGraphSettingState {
  rawGraphData: Array<IGraphSetting>; // DTO to be used
  graphData: Array<IGraphSetting>;
  activeGraph: IGraphSetting | null;
  previewGraph: IGraphSetting | null;
  selected: {
    type: 'node' | 'edge';
    id: string;
    selfData: IGraphSettingsNode | IGraphSettingsEdge;
    // connections: Array<string>
  } | null;
  rawNodes: Array<IGraphNodeSchema>;
  rawEdges: Array<IGraphEdgeSchema>;
  graphbarState: {
    isOpen: boolean;
  };
  sidebarState: {
    isOpen: boolean;
  };
  error: string;
  isLoading: boolean;
}

export const initialState: IGraphSettingState = {
  graphData: [],
  rawGraphData: [],
  activeGraph: null,
  previewGraph: null,
  selected: null,
  rawNodes: [],
  rawEdges: [],
  isLoading: false,
  error: '',
  graphbarState: {
    isOpen: false,
  },
  sidebarState: {
    isOpen: false,
  },
};

export const graphSettingSlice = createSlice({
  name: 'graphSetting',
  initialState,
  reducers: {
    applyNodesChange: (state, action: PayloadAction<Array<NodeChange>>) => {
      if (!state.previewGraph) {
        return;
      }
      const nodes = state.previewGraph?.graphData.nodes;
      const updatedNodes = applyNodeChanges(action.payload, nodes);
      state.previewGraph.graphData.nodes = updatedNodes;
    },
    applyEdgeChange: (state, action: PayloadAction<Array<EdgeChange>>) => {
      if (!state.previewGraph) {
        return;
      }

      const edges = state.previewGraph?.graphData.edges;
      const updatedEdges = applyEdgeChanges(action.payload, edges);
      state.previewGraph.graphData.edges = updatedEdges;
    },
    makeConnection: (state, action: PayloadAction<any>) => {
      if (!state.previewGraph?.graphId) {
        return;
      }
      const { source, target } = action.payload;

      const duplicateEdges = state.previewGraph.graphData.edges
        .filter(
          (edg) =>
            (edg.source === source && edg.target === target) ||
            (edg.source === target && edg.target === source)
        )
        .map((edg) => edg.id);

      const id = uuid();

      const rawEdge = {
        id,
        label: 'New Edge',
        primaryKey: '',
        edgeType: '',
        metaData: {},
        count: 0,
        dataIsValidated: false,
        direction: 'ud',
        src: source,
        dst: target,
        srcCommonField: '',
        dstCommonField: '',
        dataLocation: {
          ip: '',
          port: '',
          address: '',
        },
        duplicates: [...duplicateEdges, id],
      } as IGraphEdgeSchema;

      const edge = {
        id,
        source,
        target,
        type: 'graphEdge',
        data: {
          ...rawEdge,
        },
      } as IGraphSettingsEdge;

      state.previewGraph.graphData.edges.push(edge);
      state.previewGraph.rawData.edges.push(rawEdge);

      state.graphData.forEach((graph) => {
        if (graph.graphId === state.previewGraph?.graphId) {
          graph.graphData.edges.push(edge);
          graph.rawData.edges.push(rawEdge);
        }
      });
    },
    setData: (
      state,
      action: PayloadAction<IGetMetaGraphFromRepositoriesDTO['graphs']>
    ) => {
      const data = action.payload.map((graph) => {
        const { nodes, edges, ...rest } = graph;
        const updatedNodes = nodes.map(
          ({ _id, nodeType, position, ...rest }: any) => ({
            id: _id,
            label: nodeType,
            nodeType,
            icon: '',
            position: position ?? { x: 100, y: 100 },
            ...rest,
          })
        );
        const updatedEdges = edges.map(({ _id, edgeType, ...rest }: any) => ({
          id: _id,
          label: edgeType,
          edgeType,
          ...rest,
        }));
        return { ...rest, nodes: updatedNodes, edges: updatedEdges };
      });

      const graphData = data.map((graph) => {
        const { nodes, edges, graphName, graphId } = graph;
        const graphNodes = nodes.map((nod) => {
          const { id, position } = nod;
          const connections: Array<string> = [];
          edges.forEach((edg) => {
            if (edg.src === nod.id || edg.dst === nod.id) {
              connections.push(edg.id);
            }
          });
          return {
            id: id,
            data: { ...nod, connections },
            position,
            type: 'graphNode',
          };
        }) as Array<IGraphSettingsNode>;

        const usedEdgeIds: Array<string> = [];

        const graphEdges = edges
          .map((edg) => {
            const { id, src, dst, label: mainLabel } = edg;

            if (usedEdgeIds.includes(id)) {
              return undefined;
            }
            const foundDuplicates = edges.filter(
              (item) =>
                (item.src === src && item.dst === dst) ||
                (item.src === dst && item.dst === src)
            );

            const foundSourceNode = nodes.find((nod) => nod.id === src);
            const foundDestinationNode = nodes.find((nod) => nod.id === dst);
            const label =
              foundDestinationNode && foundSourceNode
                ? foundSourceNode.label + '_to_' + foundDestinationNode.label
                : mainLabel;

            usedEdgeIds.push(...foundDuplicates.map((item) => item.id));

            return {
              id: id,
              data: {
                ...edg,
                label,
                count: foundDuplicates.reduce(
                  (sum, item) => item.count + sum,
                  0
                ),
                duplicates: [...foundDuplicates.map((item) => item.id)],
              },
              label,
              source: src,
              target: dst,
              type: 'graphEdge',
            };
          })
          .filter((item) => item !== undefined) as Array<IGraphSettingsEdge>;

        return {
          graphId,
          graphName,
          isActive: false,
          rawData: { nodes, edges }, // raw data before proccess
          graphData: {
            nodes: graphNodes,
            edges: graphEdges,
          },
        };
      });
      const activeGraph = graphData.find((graph) => graph.isActive) ?? null;

      console.log({ activeGraph, graphData, data });

      state.graphData = graphData;
      state.activeGraph = activeGraph;
      state.previewGraph = activeGraph;
      //   state.rawGraphData = action.payload
    },
    setPreviewGraph: (state, action: PayloadAction<string>) => {
      const foundGraph = state.graphData.find(
        (graph) => graph.graphId === action.payload
      );
      if (!foundGraph) {
        return;
      }
      state.previewGraph = foundGraph;
    },
    setActiveGraph: (state, action: PayloadAction<string>) => {
      const foundActiveGraph = state.graphData.find(
        (graph) => graph.graphId === action.payload
      );
      if (!foundActiveGraph) {
        return;
      }
      state.activeGraph = foundActiveGraph;
      if (foundActiveGraph) {
        state.graphData.forEach(
          (graph) => (graph.isActive = graph.graphId === action.payload)
        );
      }
    },
    updateNodesPosition: (
      state,
      action: PayloadAction<Array<{ id: string; x: number; y: number }>>
    ) => {
      if (!state.previewGraph) {
        return;
      }
      const updateNodes: Array<IGraphSettingsNode> = [];
      const updatedNodesRawData: Array<IGraphNodeSchema> = [];

      state.previewGraph.graphData.nodes.forEach((nod) => {
        const foundNod = action.payload.find(
          (updateNod) => updateNod.id === nod.id
        );
        const newPostion = {
          x: foundNod?.x ?? nod.position.x,
          y: foundNod?.y ?? nod.position.y,
        };
        const updateNodeData = { ...nod.data, position: newPostion };
        const updateNode = {
          ...nod,
          data: updateNodeData,
          position: newPostion,
        };
        updatedNodesRawData.push(updateNodeData);
        updateNodes.push(updateNode);
      });
      state.previewGraph.graphData.nodes = updateNodes;
      state.previewGraph.rawData.nodes = updatedNodesRawData;
    },
    setSelected: (
      state,
      action: PayloadAction<IGraphSettingState['selected']>
    ) => {
      if (!action.payload) {
        state.selected = null;
        return;
      }
      const { id, type, selfData } = action.payload;
      state.selected = { id, type, selfData };
    },
    addData: (
      state,
      action: PayloadAction<{ type: 'node' | 'edge'; data: any }>
    ) => {
      const { type, data } = action.payload;

      if (!state.previewGraph) {
        return;
      }

      const entityType = type === 'node' ? 'nodes' : 'edges';

      const foundItem = (
        state.previewGraph.graphData[entityType] as Array<
          IGraphSettingsNode & IGraphSettingsEdge
        >
      ).find((item) => item.id === data.id);

      if (!foundItem) {
        return;
      }

      state.previewGraph.graphData[entityType].forEach((item) => {
        if (item.id === data.id) {
          item.data = data;
        }
      });

      state.previewGraph.rawData[entityType].forEach((item) => {
        if (item.id === data.id) {
          item = data;
        }
      });

      state.graphData.map((graph) => {
        if (graph.graphId === state.previewGraph?.graphId) {
          graph = state.previewGraph;
        }
      });

      // state.selected = null
    },
    makeNewGraph: (state) => {
      const graph = {
        graphId: uuid(),
        graphName: 'New Graph',
        isActive: false,
        graphData: {
          nodes: [],
          edges: [],
        },
        rawData: {
          nodes: [],
          edges: [],
        },
      } as IGraphSetting;

      state.selected = null;
      state.previewGraph = graph;
      state.graphData = [...state.graphData, graph];
    },
    makeNewNode: (state) => {
      if (!state.previewGraph) {
        return;
      }

      const id = uuid();

      const rawNode = {
        id,
        label: 'New Node',
        nodeType: '',
        metaData: {},
        foreignKey: '',
        primaryKey: '',
        count: 0,
        position: {
          x: 100,
          y: 100,
        },
        icon: '',
        path: '',
        dataIsValidated: false,
        dataLocation: {
          ip: '',
          port: '',
          address: '',
        },
        connections: [],
      } as IGraphNodeSchema;

      const node = {
        id,
        position: rawNode.position,
        type: 'graphNode',
        data: {
          ...rawNode,
        },
      } as IGraphSettingsNode;

      state.previewGraph.graphData.nodes = [
        ...state.previewGraph.graphData.nodes,
        node,
      ];
      state.previewGraph.rawData.nodes = [
        ...state.previewGraph.rawData.nodes,
        rawNode,
      ];

      state.graphData.forEach((graph) => {
        if (graph.graphId === state.previewGraph?.graphId) {
          graph.graphData.nodes = [...state.previewGraph.graphData.nodes, node];
          graph.rawData.nodes = [...state.previewGraph.rawData.nodes, rawNode];
        }
      });
    },
    // not used
    makeNewEdge: (
      state,
      action: PayloadAction<{ source: string; target: string }>
    ) => {
      if (!state.previewGraph?.graphId) {
        return;
      }

      const id = uuid();

      const rawEdge = {
        id,
        label: 'New Edge',
        primaryKey: '',
        edgeType: '',
        metaData: {},
        count: 0,
        dataIsValidated: false,
        direction: 'ud',
        src: action.payload.source,
        dst: action.payload.target,
        srcCommonField: '',
        dstCommonField: '',
        dataLocation: {
          ip: '',
          port: '',
          address: '',
        },
        duplicates: [],
      } as IGraphEdgeSchema;

      const edge = {
        id,
        source: rawEdge.src,
        target: rawEdge.dst,
        type: 'graphEdge',
        data: {
          ...rawEdge,
        },
      } as IGraphSettingsEdge;

      state.previewGraph.graphData.edges.push(edge);
      state.previewGraph.rawData.edges.push(rawEdge);

      state.graphData.forEach((graph) => {
        if (graph.graphId === state.previewGraph?.graphId) {
          graph.graphData.edges.push(edge);
          graph.rawData.edges.push(rawEdge);
        }
      });
    },
    setRawNodes: (state, action: PayloadAction<Array<IGraphNodeSchema>>) => {
      action.payload.forEach((nod) => {
        state.rawNodes.push(nod);
      });
    },
    setRawEdges: (state, action: PayloadAction<Array<IGraphEdgeSchema>>) => {
      action.payload.forEach((nod) => {
        state.rawEdges.push(nod);
      });
    },
    myCustomGraphAction: (state, action: PayloadAction<any>) => {
      state.previewGraph = action.payload;
      state.activeGraph = action.payload;
    },
  },
});

export const {
  applyNodesChange,
  applyEdgeChange,
  makeConnection,
  setData,
  setPreviewGraph,
  setActiveGraph,
  updateNodesPosition,
  setSelected,
  addData,
  makeNewGraph,
  makeNewNode,
  makeNewEdge,
  setRawNodes,
  setRawEdges,
  myCustomGraphAction,
} = graphSettingSlice.actions;

export const selectGraphData = (state: RootState) =>
  state.graphEditor.graphData;
export const selectRawGraphData = (state: RootState) =>
  state.graphEditor.rawGraphData;
export const selectActiveGraph = (state: RootState) =>
  state.graphEditor.activeGraph;
export const selectPreviewGraph = (state: RootState) =>
  state.graphEditor.previewGraph;
export const selectSelected = (state: RootState) => state.graphEditor.selected;
export const selectRawNodes = (state: RootState) => state.graphEditor.rawNodes;
export const selectRawEdges = (state: RootState) => state.graphEditor.rawEdges;
export const selectIsLoading = (state: RootState) =>
  state.graphEditor.isLoading;
export const selectError = (state: RootState) => state.graphEditor.error;
export const selectGraphbarState = (state: RootState) =>
  state.graphEditor.graphbarState;
export const selectSidebarState = (state: RootState) =>
  state.graphEditor.graphbarState;

export default graphSettingSlice.reducer;
