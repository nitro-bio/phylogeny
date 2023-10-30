"use client";
import Xarrow from "react-xarrows";
import { parsed } from "../../data/parsed";
import { Category, Group, Subgroup, Product } from "../../data/schema";
import { classNames } from "@/utils/stringUtils";
export const Tree = () => {
  return (
    <>
      <article
        className="grid w-full grid-cols-1 gap-8 lg:grid-cols-2"
        id="root"
      >
        <header className="lg:col-span-2">
          <h1 className="text-6xl font-semibold text-zinc-200">
            {parsed.title}
          </h1>
          <h2 className="text-5xl text-zinc-200">{parsed.description}</h2>
        </header>
        {parsed.categories.map((category: Category) => {
          return (
            <Category
              category={category}
              key={category.title}
              parentIds={["root"]}
            />
          );
        })}
      </article>
      <Edges />
    </>
  );
};

const Category = ({
  category,
  parentIds,
}: {
  category: Category;
  parentIds: string[];
}) => {
  const idChain = [...parentIds, category.title];
  return (
    <section
      className={classNames("h-fit rounded-md px-6 py-4", category.className)}
      id={idChain.join("-")}
    >
      <h2 className="pb-12 text-4xl font-semibold text-white/90">
        {category.title}
      </h2>
      <div className="columns-lg space-y-8">
        {category.groups.map((group: Group) => {
          return <Group group={group} key={group.title} parentIds={idChain} />;
        })}
      </div>
    </section>
  );
};

const Group = ({
  group,
  parentIds,
}: {
  group: Group;
  parentIds: string[];
  className?: string;
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
            <Subgroup
              subgroup={subgroup}
              key={subgroup.name}
              parentIds={idChain}
            />
          );
        })}
      </div>
    </div>
  );
};

const Subgroup = ({
  subgroup,
  parentIds,
}: {
  subgroup: Subgroup;
  parentIds: string[];
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
            <Product
              parentIds={idChain}
              product={product}
              key={`${subgroup.name}-${product.company}-${product.product}-${i}`}
            />
          );
        })}
      </div>
    </div>
  );
};

const Product = ({
  product,
  parentIds,
}: {
  product: Product;
  parentIds: string[];
}) => {
  const idChain = [...parentIds, product.company, product.product];
  return (
    <div
      className="grid content-around rounded-md bg-zinc-100 px-2 py-1 text-zinc-800"
      id={idChain.join("-")}
    >
      <h5 className="text-center text-xs">{product.company}</h5>
      <p className="text-center text-sm">{product.product}</p>
    </div>
  );
};

const Edges = () => {
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
        <Xarrow
          start={startId}
          end={endId}
          key={`${startId}-${endId}`}
          path="grid"
          color="#718096"
          strokeWidth={2}
          labels={
            <div className="rounded-md bg-zinc-600 px-1.5 py-1  text-xs font-semibold text-zinc-100">
              {label}
            </div>
          }
        />
      ))}
    </>
  );
};
