import { useEffect } from "react";
import { File } from "react-feather";
import { KnobFrame, useInspector } from "retoggle";

const KnobRenderer = (props: any) => {
  console.log("KnobRenderer", props, "KnobRenderer");

  return (
    <KnobFrame
      label="Export"
      direction="row"
      icon={<File width={11} height={11} />}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
        }}
      >
        <button
          onClick={() => {
            window?.p5?.save("file.svg");
          }}
          style={{}}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded font-mono text-xs"
        >
          Export
        </button>
      </div>
    </KnobFrame>
  );
};

export default function useExportKnob() {
  const inspector = useInspector();
  inspector.addKnobRenderer("export", KnobRenderer);

  useEffect(() => {
    inspector.setKnob({
      name: "export",
      type: "export",
    });

    return () => inspector.removeKnob("export");
  }, [inspector]);
}
