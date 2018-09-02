export interface NavLink {
  label: string;
  path: string;
  type: string;
  subType?: string;
  multiple: boolean;
  closeable: boolean;
}
