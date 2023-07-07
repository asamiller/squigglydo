import dynamic from "next/dynamic";
const Sketch = dynamic(() => import("../components/Sketch"), { ssr: false });

export default function Home() {
  return (
    <main>
      <Sketch />
    </main>
  );
}
