import React, { MouseEventHandler } from "react";
import { Handle, NodeProps, Position, useReactFlow } from "reactflow";
import styles from "./styles.module.css";
import { classNames } from "@/utils/stringUtils";
type CustomNodeData = {
  expanded: boolean;
  expandable: boolean;
  title?: string; // Add title
  description?: string; // Add description
};

export default function CustomNode({ data, id, xPos, yPos }: NodeProps) {
  const { addNodes, addEdges } = useReactFlow();

  const addChildNode: MouseEventHandler = (evt) => {
    // prevent the expand/collapse behaviour when a new node is added while the
    // node is expanded
    if (data.expanded) {
      evt.preventDefault();
      evt.stopPropagation();
    }

    const newNodeId = `${id}__${new Date().getTime()}`;

    // the edge between the clicked node and the child node is created
    addNodes({
      id: newNodeId,
      position: { x: xPos, y: yPos + 100 },
      data: { label: "X" },
    });
    addEdges({ id: `${id}->${newNodeId}`, source: id, target: newNodeId });
  };

  // based on the state of the node, we show the label accordingly
  const { title, description } = data as CustomNodeData;

  return (
    <div className={classNames(styles.node, "text-zinc-800")}>
      <div className={classNames(styles.title, "text-zinc-800")}>{title}</div>
      <div className={classNames(styles.description, "")}>{description}</div>
      <Handle position={Position.Top} type="target" />
      <Handle position={Position.Bottom} type="source" />
      <div className={classNames(styles.button, "")} onClick={addChildNode}>
        + add child node
      </div>
    </div>
  );
}
