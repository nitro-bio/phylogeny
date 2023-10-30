"use client";
import { classNames } from "@/utils/stringUtils";
import { useState } from "react";
import Xarrow from "react-xarrows";
import { parsed } from "../data/parsed";
import {
  Category,
  CategorySchema,
  Group,
  GroupSchema,
  Product,
  Subgroup,
  Tree,
} from "../data/schema";
import { z } from "zod";

export const Landscape = () => {
  const [search, setSearch] = useState<string | null>(null);
  const filteredTree = getFilteredTree(parsed, search);
  return (
    <>
      <article className="grid grid-cols-2 gap-8" id="root">
        <header className="col-span-2">
          <h1 className="text-6xl font-semibold text-zinc-200">
            {parsed.title}
          </h1>
          <h2 className="text-5xl text-zinc-200">{parsed.description}</h2>
        </header>
        <div className="col-span-2">
          <SearchBar search={search} setSearch={setSearch} />
        </div>
        {filteredTree.categories.map((category: Category) => {
          return (
            <CategoryNode
              category={category}
              key={category.title}
              parentIds={["root"]}
              search={search}
            />
          );
        })}
      </article>
      <Edges search={search} />
    </>
  );
};
const getFilteredTree = (tree: Tree, search: string | null): Tree => {
  if (search === null) {
    return tree;
  }

  const categories = tree.categories
    .map((category: Category) => {
      return getFilteredCategory(category, search);
    })
    .filter(Boolean);

  return {
    ...tree,
    categories: z.array(CategorySchema).parse(categories),
  };
};

const getFilteredCategory = (
  category: Category,
  search: string | null,
): Category | null => {
  if (search === null) {
    return category;
  }
  const groups = category.groups
    .map((group: Group) => {
      return getFilteredGroup(group, search);
    })
    .filter(Boolean);
  if (groups.length === 0) {
    return null;
  }
  return {
    ...category,
    groups: z.array(GroupSchema).parse(groups),
  };
};
const getFilteredGroup = (group: Group, search: string | null) => {
  if (search === null) {
    return group;
  }
  const subgroups = group.subgroups
    .map((subgroup: Subgroup) => {
      return getFilteredSubgroup(subgroup, search);
    })
    .filter(Boolean);
  if (subgroups.length === 0) {
    return null;
  }
  return {
    ...group,
    subgroups: subgroups,
  };
};

const getFilteredSubgroup = (subgroup: Subgroup, search: string | null) => {
  if (search === null) {
    return subgroup;
  }
  const products = subgroup.products
    .map((product: Product) => {
      return getFilteredProduct(product, search);
    })
    .filter(Boolean);
  if (products.length === 0) {
    return null;
  }
  return {
    ...subgroup,
    products: products,
  };
};

const getFilteredProduct = (product: Product, search: string | null) => {
  if (search === null) {
    return product;
  }
  const shouldRender =
    product.company.toLowerCase().includes(search.toLowerCase()) ||
    product.product.toLowerCase().includes(search.toLowerCase());
  if (!shouldRender) {
    return null;
  }
  return product;
};

const SearchBar = ({
  search,
  setSearch,
}: {
  search: string | null;
  setSearch: (search: string) => void;
}) => {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
      <input
        type="text"
        placeholder="Search for products, companies, subgroups, groups, or categories..."
        className="input input-bordered"
        onChange={(e) => setSearch(e.target.value)}
        value={search ?? ""}
      />
    </div>
  );
};

const CategoryNode = ({
  category,
  parentIds,
  search,
}: {
  search: string | null;
  category: Category;
  parentIds: string[];
}) => {
  const idChain = [...parentIds, category.title];

  return (
    <section
      className={classNames(
        "h-fit rounded-md px-6 py-4 last:col-span-2",
        category.className,
      )}
      id={idChain.join("-")}
    >
      <h2 className="pb-12 text-4xl font-semibold text-white/90">
        {category.title}
      </h2>
      <div className="columns-lg space-y-8">
        {category.groups.map((group: Group) => {
          return (
            <GroupNode
              group={group}
              key={group.title}
              parentIds={idChain}
              search={search}
            />
          );
        })}
      </div>
    </section>
  );
};

const GroupNode = ({
  group,
  parentIds,
  search,
}: {
  group: Group;
  parentIds: string[];
  className?: string;
  search: string | null;
}) => {
  const idChain = [...parentIds, group.title];
  return (
    <div
      className={classNames(
        "break-inside-avoid rounded-md bg-white/20 px-4 py-2",
      )}
      id={idChain.join("-")}
    >
      <h3 className="w-full pb-8 text-center text-2xl font-semibold text-white/90">
        {group.title}
      </h3>
      <div className="flex flex-col gap-4">
        {group.subgroups.map((subgroup: Subgroup) => {
          return (
            <SubgroupNode
              subgroup={subgroup}
              key={subgroup.name}
              parentIds={idChain}
              search={search}
            />
          );
        })}
      </div>
    </div>
  );
};

const SubgroupNode = ({
  search,
  subgroup,
  parentIds,
}: {
  subgroup: Subgroup;
  parentIds: string[];
  search: string | null;
}) => {
  const idChain = [...parentIds, subgroup.name];
  return (
    <div className="grid rounded-md border px-2 py-1" id={idChain.join("-")}>
      <h4 className="w-full pb-4 text-left text-xl font-semibold text-white/90">
        {subgroup.name}
      </h4>
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 ">
        {subgroup.products.map((product: Product, i: number) => {
          return (
            <ProductNode
              parentIds={idChain}
              product={product}
              key={`${subgroup.name}-${product.company}-${product.product}-${i}`}
              search={search}
            />
          );
        })}
      </div>
    </div>
  );
};

const ProductNode = ({
  product,
  parentIds,
  search,
}: {
  product: Product;
  parentIds: string[];
  search: string | null;
}) => {
  const idChain = [...parentIds, product.company, product.product];
  const searchedAndFound =
    search && getFilteredProduct(product, search) !== null;
  return (
    <div
      className={classNames(
        "relative grid content-around rounded-md bg-zinc-100 px-2 py-1 text-zinc-800",
        searchedAndFound ? "border-2 border-zinc-600" : "",
      )}
      id={idChain.join("-")}
    >
      <h5 className="text-center text-xs">{product.company}</h5>
      <p className="text-center text-sm">{product.product}</p>
      {searchedAndFound && (
        <>
          <div className="absolute -right-2 -top-2 h-4 w-4 animate-ping rounded-full bg-zinc-300" />
          <div className="absolute -right-1.5 -top-1.5 h-3 w-3  rounded-full bg-zinc-300" />
        </>
      )}
    </div>
  );
};

const Edges = ({ search }: { search: string | null }) => {
  interface Edge {
    startId: string;
    endId: string;
    label: string;
  }
  const edges: Edge[] = [
    {
      startId: "root-Experiment-ELN",
      endId:
        "root-Analyze-Knowledge or Data/ Metadata Management-General Research",
      label: "foo bar baz-qux",
    },
  ];

  return (
    <>
      {edges.map(({ startId, endId, label }) => (
        <Edge
          startId={startId}
          endId={endId}
          label={label}
          search={search}
          key={`${startId}-${endId}`}
        />
      ))}
    </>
  );
};

const Edge = ({
  startId,
  endId,
  label,
  search,
}: {
  startId: string;
  endId: string;
  label: string;
  search: string | null;
}) => {
  if (search && !label.includes(search)) {
    return null;
  }

  return (
    <Xarrow
      start={startId}
      end={endId}
      key={`${startId}-${endId}`}
      path="grid"
      color="#718096"
      strokeWidth={2}
      labels={
        <div className="rounded-md bg-zinc-600 px-1.5 py-1 text-xs font-semibold text-zinc-100">
          {label}
        </div>
      }
    />
  );
};
