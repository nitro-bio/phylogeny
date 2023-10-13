import { Group, Subgroup, Tree } from "@/data/schema";
import { Edge, Node } from "reactflow";
import { parsed } from "../../data/parsed";

const createFlowNodesAndEdges = (treeData: Tree) => {
  // Initialize nodes and edges arrays
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  // Create root node
  const rootNode: Node = {
    id: "root",
    position: { x: 0, y: 0 },
    data: { expanded: true, label: treeData.title },
  };
  nodes.push(rootNode);

  // Iterate through groups
  treeData.groups.forEach((group: Group, groupIdx: number) => {
    const groupId = `group-${groupIdx}`;

    // Create group node
    const groupNode: Node = {
      id: groupId,
      position: { x: 0, y: 0 },
      data: { expanded: true, label: group.title },
    };
    nodes.push(groupNode);

    // Create edge from root to group
    const rootToGroupEdge: Edge = {
      id: `root->${groupId}`,
      source: "root",
      target: groupId,
    };
    edges.push(rootToGroupEdge);

    // Iterate through subgroups
    group.subgroups.forEach((subgroup: Subgroup, subIdx: number) => {
      const subgroupId = `subgroup-${groupIdx}-${subIdx}`;

      // Create subgroup node
      const subgroupNode: Node = {
        id: subgroupId,
        position: { x: 0, y: 0 },
        data: { expanded: false, label: subgroup.name },
      };
      nodes.push(subgroupNode);

      // Create edge from group to subgroup
      const groupToSubgroupEdge: Edge = {
        id: `${groupId}->${subgroupId}`,
        source: groupId,
        target: subgroupId,
      };
      edges.push(groupToSubgroupEdge);
    });
  });

  return { nodes, edges };
};

export const { nodes, edges } = createFlowNodesAndEdges(parsed);
