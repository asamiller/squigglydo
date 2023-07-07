export enum PenColors {
  white = "White",
  black = "Black",
}

export const penColorValues: { [key in PenColors]: string } = {
  [PenColors.white]: "rgb(255, 255, 255)",
  [PenColors.black]: "rgb(0, 0, 0)",
};
