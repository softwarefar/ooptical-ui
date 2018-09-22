import {NavLink} from '../../core/models/nav-link/nav-link';

export abstract class AbstractNavigableComponent<T> {
  protected abstract getNavLink(model: Partial<T>): NavLink;
}
