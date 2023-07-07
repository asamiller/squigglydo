import type P5 from "p5";
import Sketch from "react-p5";
import { Inspector, useRangeKnob, useSelectKnob } from "retoggle";
import { useWindowSize } from "usehooks-ts";
import { PenColors, penColorValues } from "../constants";
import { PageColors, Pages, drawPage } from "../page";
import useExportKnob from "./exportKnob";

const BACKGROUND_COLORS: {
  [key in PageColors]: string;
} = {
  [PageColors.white]: "black",
  [PageColors.black]: "white",
};

export default function SketchComponent() {
  const { width: screenWidth, height: screenHeight } = useWindowSize();

  const [pageType] = useSelectKnob(
    "Page Size",
    Object.values(Pages),
    Pages.landscape11x17
  );
  const [pageColor] = useSelectKnob(
    "Page Color",
    Object.values(PageColors),
    PageColors.black
  );

  const [penColor] = useSelectKnob(
    "Pen Color",
    Object.values(PenColors),
    PenColors.white
  );
  const penColorValue = penColorValues[penColor as PenColors];

  const [width] = useRangeKnob("Line Width", {
    min: 0,
    max: 10,
    initialValue: 1,
  });

  const [centerX] = useRangeKnob("Center X", {
    min: 0,
    max: 1000,
    initialValue: 1,
  });

  const [centerY] = useRangeKnob("Center Y", {
    min: 0,
    max: 1000,
    initialValue: 1,
  });

  useExportKnob();

  const setup = (p5: P5, canvasParentRef: Element) => {
    p5.createCanvas(screenWidth, screenHeight).parent(canvasParentRef);
  };

  const draw = (p5: P5) => {
    p5.resizeCanvas(screenWidth, screenHeight);

    const page = drawPage({
      p5,
      pageType: pageType as Pages,
      pageColor: pageColor as PageColors,
      screenWidth,
      screenHeight,
    });

    const startX = page.x;
    const startY = page.y;

    p5.stroke(penColorValue)
      .strokeWeight(width)
      .line(startX, startY, startX + centerX, startY + centerY);
  };

  return (
    <div
      style={{
        backgroundColor: BACKGROUND_COLORS[pageColor as PageColors],
      }}
    >
      <Inspector />
      <Sketch setup={setup as any} draw={draw as any} />
    </div>
  );
}
