"use client";
import ReactFlow, {
  NodeTypes,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
} from "reactflow";

import { GroupNode, ProductNode, SubgroupNode, TreeNode } from "./CustomNodes";
import { initialEdges, initialNodes } from "./initialElements";

import "reactflow/dist/style.css";

const nodeTypes: NodeTypes = {
  productNode: ProductNode,
  treeNode: TreeNode,
  groupNode: GroupNode,
  subgroupNode: SubgroupNode,
};
/**
 * This example shows how you can automatically arrange your nodes after adding child nodes to your graph.
 */
const NestedFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <ReactFlow
      nodes={nodes}
      nodeTypes={nodeTypes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodesDraggable={false}
      className="border"
      fitView
      zoomOnScroll={false}
    ></ReactFlow>
  );
};

export const Tree = () => {
  return (
    <ReactFlowProvider>
      <NestedFlow />
    </ReactFlowProvider>
  );
};
