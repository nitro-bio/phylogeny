import { classNames } from "@/utils/stringUtils";
import { NodeProps } from "reactflow";

type CustomNodeData = {
  expanded: boolean;
  expandable: boolean;
  label?: string;
  description?: string;
};

export function ProductNode({ data, id, xPos, yPos }: NodeProps) {
  const { label } = data as CustomNodeData;
  return (
    <div
      className={classNames(
        "flex flex-grow rounded-md border bg-white px-8 py-6 text-zinc-800",
      )}
    >
      {label}
    </div>
  );
}

export function TreeNode({ data }: NodeProps) {
  return (
    <div
      className={classNames(
        "h-full w-full rounded-md border bg-green-200 px-8 py-6 text-green-600",
      )}
    >
      {data.label}
    </div>
  );
}
export function CategoryNode({ data }: NodeProps) {
  return (
    <div
      className={classNames(
        "flex flex-grow rounded-md border bg-cyan-200 px-8 py-6 text-red-600",
      )}
    >
      {data.label}
    </div>
  );
}
export function GroupNode({ data }: NodeProps) {
  return (
    <div
      className={classNames(
        "flex flex-grow rounded-md border bg-red-200 px-8 py-6 text-red-600",
      )}
    >
      {data.label}
    </div>
  );
}

export function SubgroupNode({ data }: NodeProps) {
  return (
    <div
      className={classNames(
        "flex flex-grow rounded-md border bg-blue-200 px-8 py-6 text-zinc-600",
      )}
    >
      {data.label}
    </div>
  );
}
