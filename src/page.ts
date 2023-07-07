import type p5Types from "p5";

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

interface Page {
  p5: p5Types;
  pageType: Pages;
  pageColor: PageColors;
  screenWidth: number;
  screenHeight: number;
}
export const drawPage = ({
  p5,
  pageType,
  pageColor,
  screenWidth,
  screenHeight,
}: Page) => {
  let canvasX = PADDING;
  let canvasY = PADDING;
  let canvasWidth = screenWidth - PADDING * 2;
  let canvasHeight = screenHeight - PADDING * 2;

  const heightToWidthRatio = heightToWidthRatios[pageType];

  let pageWidth = canvasWidth;
  let pageHeight = canvasWidth * heightToWidthRatio;

  // If the page height is greater than the canvas height, then we need to
  // adjust the page width to fit the canvas height.
  if (pageHeight > canvasHeight) {
    pageWidth = canvasHeight / heightToWidthRatio;
    pageHeight = canvasHeight;
  }

  // Center the page on the canvas.
  canvasX += (canvasWidth - pageWidth) / 2;
  canvasY += (canvasHeight - pageHeight) / 2;

  const color = pageColorValues[pageColor];

  p5.stroke(color)
    .strokeWeight(0)
    .fill(color)
    .rect(canvasX, canvasY, pageWidth, pageHeight);

  return {
    x: canvasX,
    y: canvasY,
    width: pageWidth,
    height: pageHeight,
  };
};
