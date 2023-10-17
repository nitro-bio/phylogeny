import { Category, Group, Product, Subgroup, Tree } from "@/data/schema";
import { Edge, Node } from "reactflow";
import { parsed } from "../../data/parsed";

const TREE_NODE_WIDTH = 3000;
const TREE_NODE_HEIGHT = 5000;

const CATEGORY_NODE_WIDTH = 1000;
const CATEGORY_NODE_HEIGHT = 2000;

const GROUP_NODE_WIDTH = CATEGORY_NODE_WIDTH / 2;
const GROUP_NODE_HEIGHT = CATEGORY_NODE_HEIGHT * 0.5;

const SUBGROUP_NODE_WIDTH = CATEGORY_NODE_WIDTH / 3;
const SUBGROUP_NODE_HEIGHT = CATEGORY_NODE_HEIGHT * 0.3;

const PRODUCT_NODE_WIDTH = CATEGORY_NODE_WIDTH / 3;
const PRODUCT_NODE_HEIGHT = CATEGORY_NODE_HEIGHT * 0.1;

const transformDataToNodes = (data: Tree) => {
  let xPos = 0;
  let yPos = 0;
  const root = {
    id: "root",
    data: { label: data.title },
    position: { x: xPos, y: yPos },
    style: {
      width: TREE_NODE_HEIGHT,
      height: TREE_NODE_WIDTH,
    },
    type: "treeNode",
  };
  // for category in data
  const categoryNodes = data.categories

    .map((category: Category, idx: number) =>
      categoryToCategoryNode({ category, idx }),
    )
    .flat();

  return [root, ...categoryNodes];
};
const categoryToCategoryNode = ({
  category,
  idx,
}: {
  category: Category;
  idx: number;
}): Node[] => {
  const yPos = TREE_NODE_HEIGHT / 18;
  const xPos = (TREE_NODE_WIDTH / 4) * ((idx + 0.3) * 1.1);
  const node = {
    id: category.title,
    data: { label: category.title },
    position: { x: xPos, y: yPos },
    style: {
      width: CATEGORY_NODE_WIDTH,
      height: CATEGORY_NODE_HEIGHT,
    },
    parentNode: "root",
    extent: "parent" as const,
    type: "categoryNode",
  };
  const children = category.groups.map((group: Group, idx: number) =>
    groupToGroupNode({ group, parentCategory: category, idx }),
  );
  return [node, ...children].flat();
};

const groupToGroupNode = ({
  group,
  parentCategory,
  idx,
}: {
  group: Group;
  parentCategory: Category;
  idx: number;
}): Node[] => {
  const xPos = CATEGORY_NODE_WIDTH / 18;
  const yPos = (CATEGORY_NODE_HEIGHT / 4) * ((idx + 0.3) * 1.1);
  const node = {
    id: group.title,
    data: { label: group.title },
    position: { x: xPos, y: yPos },
    style: {
      width: GROUP_NODE_WIDTH,
      height: GROUP_NODE_HEIGHT,
    },
    parentNode: parentCategory.title,
    extent: "parent" as const,
    type: "groupNode",
  };
  const children = group.subgroups
    .slice(0, 1)
    .map((subgroup: Subgroup, idx: number) =>
      subgroupToSubgroupNode({ subgroup, parentGroup: group, idx }),
    );
  return [node, ...children].flat();
};

const subgroupToSubgroupNode = ({
  subgroup,
  parentGroup,
  idx,
}: {
  subgroup: Subgroup;
  parentGroup: Group;
  idx: number;
}): Node[] => {
  const yPos = CATEGORY_NODE_HEIGHT / 18;
  const xPos = (CATEGORY_NODE_WIDTH / 4) * ((idx + 0.3) * 1.1);
  const node = {
    id: subgroup.name,
    data: { label: subgroup.name },
    position: { x: xPos, y: yPos },
    style: {
      width: SUBGROUP_NODE_WIDTH,
      height: SUBGROUP_NODE_HEIGHT,
    },
    parentNode: parentGroup.title,
    extent: "parent" as const,
    type: "subgroupNode",
  };
  const children = subgroup.products
    .slice(0, 1)
    .map((product: Product, idx: number) =>
      productToProductNode({ product, parentSubgroup: subgroup, idx }),
    );
  return [node, ...children].flat();
};
const productToProductNode = ({
  product,
  parentSubgroup,
  idx,
}: {
  product: Product;
  parentSubgroup: Subgroup;
  idx: number;
}): Node => {
  const yPos = PRODUCT_NODE_HEIGHT / 18;
  const xPos = (PRODUCT_NODE_WIDTH / 4) * ((idx + 0.3) * 1.1);
  return {
    id: `${product.company}: ${product.product}`,
    data: { label: product.product },
    position: { x: xPos, y: yPos },
    style: {
      width: PRODUCT_NODE_WIDTH,
      height: PRODUCT_NODE_HEIGHT,
    },
    parentNode: parentSubgroup.name,
    extent: "parent" as const,
    type: "productNode",
  };
};

const initialNodes = transformDataToNodes(parsed);
const initialEdges: Edge[] = [];
export { initialNodes, initialEdges };
