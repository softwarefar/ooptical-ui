import {filter} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {NavLinkType} from '../models/nav-link/nav-link-type';
import {NavLink} from '../models/nav-link/nav-link';
import {NavLinkMultiple} from '../models/nav-link/nav-link-multiple';

@Injectable({
  providedIn: 'root'
})
export class DynTabService {

  removeNavLinkIndexEvent: Subject<number> = new Subject<number>();
  addNavLinkIndexEvent: Subject<number> = new Subject<number>();

  navLinks: NavLink[] = [
    {type: NavLinkType.CUSTOMERS, path: '/customers', label: 'Customers'},
    {type: NavLinkType.PRODUCTS, path: '/products', label: 'Products'},
    {type: NavLinkType.STORES, path: '/stores', label: 'Stores'},
    {type: NavLinkType.PROVIDERS, path: '/providers', label: 'Providers'}
  ];

  constructor() {
  }
  openTab(navLink: NavLink) {
    let idx: number = this.getIndexOfPath(navLink.path);
    if (idx !== -1) {
      this.addNavLinkIndexEvent.next(idx);
    } else if (this.isSameTypeOfPresent(navLink) && !NavLinkMultiple[navLink.type]) {
      const sameType: NavLink = this.getSameTypeOf(navLink);
      if (sameType) { // always true
        idx = this.getIndexOfPath(sameType.path);
        this.removeNavLinkIndex(idx);
        this.navLinks.push(navLink);
        this.addNavLinkIndexEvent.next(this.navLinks.length - 1);
      }
    } else {
      this.navLinks.push(navLink);
      this.addNavLinkIndexEvent.next(this.navLinks.length - 1);
    }
  }

  getIndexOfPath(path: string) {
    return this.navLinks.findIndex((navLink: NavLink) => {
      return navLink.path === path;
    });
  }

  closeTab(navLink: NavLink) {
    const idx: number = this.getIndexOfPath(navLink.path);
    this.removeNavLinkIndexEvent.next(idx);
    this.removeNavLinkIndex(idx);
  }

  private removeNavLinkIndex(idx: number) {
    this.navLinks.splice(idx, 1);
  }

  private getSameTypeOf(navLink: NavLink): NavLink {
    const result: NavLink | undefined = this.navLinks.find((n: NavLink) => {
      return n.type === navLink.type;
    });
    if (!!result) {
      return result;
    }
    throw {
      message: '',
      name: '',
      stack: null
    };
  }

  private isSameTypeOfPresent(navLink: NavLink): boolean {
    return this.navLinks.some((n: NavLink) => {
      return n.type === navLink.type;
    });
  }
}
