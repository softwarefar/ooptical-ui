interface Frame extends Made, Salable {
  brand: string;
  gender: Gender;
  type: FrameType;
  style: FrameStyle;
  material: Material;
  color: string;
  size: number;
  picture: string;
  leftGlass: Glass;
  rightGlass: Glass;
}
