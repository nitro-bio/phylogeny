import { Tree } from "@/components/Tree/Tree";

export default function Home() {
  return (
    <main className="grid grid-cols-12">
      <div className="col-span-12">
        <h1 className="text-4xl font-bold">Life Science Landscape</h1>
        <section className="h-[800px] w-full">
          <Tree />
        </section>
      </div>
    </main>
  );
}
