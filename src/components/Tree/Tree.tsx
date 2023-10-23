import { parsed } from "../../data/parsed";
import { Category, Group, Subgroup, Product } from "../../data/schema";
export const Tree = () => {
  return (
    <article className="grid grid-cols-1 content-center gap-8">
      {parsed.categories.map((category: Category) => {
        return <Category category={category} key={category.title} />;
      })}
    </article>
  );
};

const Category = ({ category }: { category: Category }) => {
  return (
    <section className="rounded-md bg-rose-500 px-6 py-4">
      <h2>{category.title}</h2>
      <div className="grid grid-cols-2 content-center gap-4">
        {category.groups.map((group: Group) => {
          return <Group group={group} key={group.title} />;
        })}
      </div>
    </section>
  );
};

const Group = ({ group }: { group: Group }) => {
  return (
    <div className="h-fit rounded-md bg-emerald-500 px-4 py-2">
      <h3>{group.title}</h3>
      <div className="flex flex-col gap-4">
        {group.subgroups.map((subgroup: Subgroup) => {
          return <Subgroup subgroup={subgroup} key={subgroup.name} />;
        })}
      </div>
    </div>
  );
};

const Subgroup = ({ subgroup }: { subgroup: Subgroup }) => {
  return (
    <div className="grid h-fit rounded-md bg-sky-500 px-2 py-1">
      <h4>{subgroup.name}</h4>
      <div className="grid grid-cols-3  justify-center gap-4">
        {subgroup.products.map((product: Product) => {
          return <Product product={product} key={product.product} />;
        })}
      </div>
    </div>
  );
};

const Product = ({ product }: { product: Product }) => {
  return (
    <div className="rounded-md bg-zinc-100 px-2 py-1 text-zinc-800">
      <h5>{product.company}</h5>
      <div>
        <p>{product.product}</p>
      </div>
    </div>
  );
};
