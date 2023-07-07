import { Knobs, useKnob } from "../components/Knobs";
import { PageColors } from "../components/Page";
import { Sketch } from "../components/Sketch";

const BACKGROUND_COLORS: {
  [key in PageColors]: string;
} = {
  [PageColors.white]: "black",
  [PageColors.black]: "white",
};

export default function Home() {
  const [pageColor] = useKnob("Page Color");

  return (
    <>
      <div
        style={{
          backgroundColor: BACKGROUND_COLORS[pageColor as PageColors],
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <Sketch />
      </div>
      <Knobs />
    </>
  );
}
