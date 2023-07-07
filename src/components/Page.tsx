import { FC } from "react";
import { Rect } from "react-native-svg";
import { useWindowSize } from "usehooks-ts";
import { useKnob } from "./Knobs";

export const PADDING = 20;

export enum PageColors {
  white = "White",
  black = "Black",
}

export enum Pages {
  landscape11x17 = "11x17 Landscape",
  portrait11x17 = "11x17 Portrait",
  landscape85x11 = "8.5x11 Landscape",
  portrait85x11 = "8.5x11 Portrait",
}

const heightToWidthRatios = {
  [Pages.landscape11x17]: 11 / 17, // 0.6470588235294118
  [Pages.portrait11x17]: 17 / 11, // 1.5454545454545454
  [Pages.landscape85x11]: 8.5 / 11, // 0.7727272727272727
  [Pages.portrait85x11]: 11 / 8.5, // 1.2941176470588236
};

const pageColorValues: { [key in PageColors]: string } = {
  [PageColors.white]: "rgb(255, 255, 255)",
  [PageColors.black]: "rgb(0, 0, 0)",
};

export function usePageSize() {
  const { width, height } = useWindowSize();
  const screenWidth = width - PADDING * 2;
  const screenHeight = height - PADDING * 2;

  const [pageType] = useKnob("Page Type");

  const heightToWidthRatio = heightToWidthRatios[pageType];

  let pageWidth = screenWidth;
  let pageHeight = screenWidth * heightToWidthRatio;

  // If the page height is greater than the start height, then we need to
  // adjust the page width to fit the start height.
  if (pageHeight > screenHeight) {
    pageWidth = screenHeight / heightToWidthRatio;
    pageHeight = screenHeight;
  }

  return {
    pageWidth: Math.round(pageWidth),
    pageHeight: Math.round(pageHeight),
  };
}

export const Page: FC = () => {
  const [pageType] = useKnob("Page Type");
  const [pageColor] = useKnob("Page Color");
  const { pageHeight, pageWidth } = usePageSize();

  const color = pageColorValues[pageColor];

  return (
    <Rect
      x={0}
      y={0}
      width={pageWidth}
      height={pageHeight}
      stroke="none"
      strokeWidth="0"
      fill={color}
    />
  );
};
