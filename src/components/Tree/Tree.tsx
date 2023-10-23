import { parsed } from "../../data/parsed";
import { Category, Group, Subgroup, Product } from "../../data/schema";
export const Tree = () => {
  return (
    <article className="grid grid-cols-1 gap-8">
      {parsed.categories.map((category: Category) => {
        return <Category category={category} />;
      })}
    </article>
  );
};

const Category = ({ category }: { category: Category }) => {
  return (
    <section className="rounded-md bg-rose-500 px-6 py-4">
      <h2>Category</h2>
      <div className="grid grid-cols-2 gap-4">
        {category.groups.map((group: Group) => {
          return <Group group={group} />;
        })}
      </div>
    </section>
  );
};

const Group = ({ group }: { group: Group }) => {
  return (
    <div className="rounded-md bg-emerald-500 px-4 py-2">
      <h3>Group</h3>
      <div>
        {group.subgroups.map((subgroup: Subgroup) => {
          return <Subgroup subgroup={subgroup} />;
        })}
      </div>
    </div>
  );
};

const Subgroup = ({ subgroup }: { subgroup: Subgroup }) => {
  return (
    <div className="rounded-md bg-sky-500 px-2 py-1">
      <h4>Subgroup</h4>
      <div className="flex flex-wrap">
        {subgroup.products.map((product: Product) => {
          return <Product product={product} />;
        })}
      </div>
    </div>
  );
};

const Product = ({ product }: { product: Product }) => {
  return (
    <div className="rounded-md bg-zinc-100 px-2 py-1">
      <h5>{product.title}</h5>
      <div>
        <p>{product.description}</p>
      </div>
    </div>
  );
};
