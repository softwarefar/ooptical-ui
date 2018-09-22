import {NavLinkType} from './nav-link-type';

interface NavLink {
  label: string;
  path: string;
  type: NavLinkType;
  subType?: string;
}
