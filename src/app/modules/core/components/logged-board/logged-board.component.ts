import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {DynTabService} from '../../services/dyn-tab-service';
import {ActivatedRoute, Event, NavigationEnd, NavigationExtras, Router, RouterEvent} from '@angular/router';
import {filter, first, map} from 'rxjs/operators';
import {NavLink} from '../../models/nav-link/nav-link';
import {NavLinkCloseable} from '../../models/nav-link/nav-link-closeable';

@Component({
  templateUrl: './logged-board.component.html',
  styleUrls: ['./logged-board.component.css']
})
export class LoggedBoardComponent implements OnInit {

  constructor(
    public dynTabService: DynTabService,
    private router: Router,
    private route: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef
  ) {
  }

  NavLinkCloseable = NavLinkCloseable;

  selectedIndex: number = 0;

  ngOnInit() {
    // fix index after nav from new url
    this.router.events.pipe(
      filter((event: Event) => event instanceof NavigationEnd),
      first(),
      map((event: Event) => event as NavigationEnd),
    ).subscribe((event: RouterEvent) => {
      const idx: number = this.dynTabService.getIndexOfPath(event.url);
      if (idx !== -1) {
        this.selectedIndex = this.dynTabService.getIndexOfPath(event.url);
      }
    });
    // receive notification from component
    this.dynTabService.addNavLinkIndexEvent.subscribe((idx: number) => {
        setTimeout((obj: LoggedBoardComponent) => {
          obj.selectedIndex = idx;
        }, 10, this);
        this.changeDetectorRef.detectChanges();
      }
    );
    this.dynTabService.removeNavLinkIndexEvent.subscribe((idx: number) => {
        if (idx === this.selectedIndex) {
          this.selectedIndex = 0;
        } else if (idx < this.selectedIndex) {
          this.selectedIndex--;
        }
      }
    );
  }

  selectedIndexChange(idx: number) {
    this.selectedIndex = idx;
    const navLink: NavLink = this.dynTabService.navLinks[idx];
    const navigationExtras: NavigationExtras = {
      queryParamsHandling: 'preserve',
      preserveFragment: true,
      relativeTo: this.route
    };
    this.router.navigate([navLink.path], navigationExtras);
  }

  closeTab($event: MouseEvent, navLink: NavLink) {
    $event.stopImmediatePropagation();
    $event.stopPropagation();
    $event.preventDefault();
    this.dynTabService.closeTab(navLink);
  }
}
