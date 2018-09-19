import {filter} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DynTabService {

  addNavLinkEvent: Subject<NavLink> = new Subject<NavLink>();
  removeNavLinkIndexEvent: Subject<number> = new Subject<number>();
  addNavLinkIndexEvent: Subject<number> = new Subject<number>();

  navLinks: NavLink[] = [
    {type: 'CUSTOMERS', multiple: false, path: '/customers', closeable: false, label: 'Customers'},
    {type: 'PRODUCTS', multiple: false, path: '/products', closeable: false, label: 'Products'},
    {type: 'STORES', multiple: false, path: '/stores', closeable: false, label: 'Stores'},
    {type: 'PROVIDERS', multiple: false, path: '/providers', closeable: false, label: 'Providers'}
  ];

  constructor() {
    this.addNavLinkEvent.pipe(
      filter((navLink: NavLink) => {
        return !!navLink;
      })
    ).subscribe((navLink: NavLink) => {
      let idx: number = this.getIndexOfPath(navLink.path);
      if (idx !== -1) {
        this.addNavLinkIndexEvent.next(idx);
      } else if (this.isSameTypeOfPresent(navLink) && !navLink.multiple) {
        const sameType: NavLink = this.getSameTypeOf(navLink);
        idx = this.getIndexOfPath(sameType.path);
        this.removeNavLinkIndex(idx);
        this.navLinks.push(navLink);
        this.addNavLinkIndexEvent.next(this.navLinks.length - 1);
      } else {
        this.navLinks.push(navLink);
        this.addNavLinkIndexEvent.next(this.navLinks.length - 1);
      }
    });
  }

  getIndexOfPath(path: string) {
    return this.navLinks.findIndex((navLink: NavLink) => {
      return navLink.path === path;
    });
  }

  removeNavLinkAndEmit(navLink: NavLink) {
    const idx: number = this.getIndexOfPath(navLink.path);
    this.removeNavLinkIndexEvent.next(idx);
    this.removeNavLinkIndex(idx);
  }

  private removeNavLinkIndex(idx: number) {
    this.navLinks.splice(idx, 1);
  }

  private getSameTypeOf(navLink: NavLink): NavLink {
    return this.navLinks.find((n: NavLink) => {
      return n.type === navLink.type;
    });
  }

  private isSameTypeOfPresent(navLink: NavLink): boolean {
    return this.navLinks.some((n: NavLink) => {
      return n.type === navLink.type;
    });
  }
}
