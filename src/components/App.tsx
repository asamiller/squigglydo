import { Knobs, useKnobValue } from "../components/Knobs";
import { PageColors } from "../components/Paper";
import { Sketch } from "../components/Sketch";

const BACKGROUND_COLORS: {
  [key in PageColors]: string;
} = {
  [PageColors.white]: "black",
  [PageColors.black]: "white",
};

export default function Home() {
  const pageColor = useKnobValue<PageColors>("Page Color");

  return (
    <>
      <div
        style={{
          backgroundColor: BACKGROUND_COLORS[pageColor],
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
