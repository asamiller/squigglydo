import { FC } from "react";
import Svg, { Circle, Rect } from "react-native-svg";
import { useKnob } from "./Knobs";
import { Page, usePageSize } from "./Page";

export const Sketch: FC = () => {
  const [pageType] = useKnob("Page Type");
  const [pageColor] = useKnob("Page Color");
  const { pageHeight, pageWidth } = usePageSize();

  // const setup = (p5: P5, canvasParentRef: Element) => {
  //   p5.createCanvas(screenWidth, screenHeight, p5.svg).parent(canvasParentRef);
  // };

  // const draw = (p5: P5) => {
  //   p5.resizeCanvas(screenWidth, screenHeight);

  //   const startX = page.x;
  //   const startY = page.y;

  //   p5.stroke(penColorValue)
  //     .strokeWeight(width)
  //     .line(startX, startY, startX + centerX, startY + centerY);
  // };

  return (
    <Svg
      height={pageHeight}
      width={pageWidth}
      viewBox={`0 0 ${pageWidth} ${pageHeight}`}
    >
      <Page />

      <Circle
        cx="50"
        cy="50"
        r="45"
        stroke="blue"
        strokeWidth="2.5"
        fill="green"
      />
      <Rect
        x="15"
        y="15"
        width="70"
        height="70"
        stroke="red"
        strokeWidth="2"
        fill="yellow"
      />
    </Svg>
  );
};
