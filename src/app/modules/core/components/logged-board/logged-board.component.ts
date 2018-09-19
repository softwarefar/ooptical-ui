import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {DynTabService} from '../../services/dyn-tab-service';
import {ActivatedRoute, NavigationEnd, NavigationExtras, Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import {User} from 'firebase';
import {filter, first} from 'rxjs/operators';

@Component({
  templateUrl: './logged-board.component.html',
  styleUrls: ['./logged-board.component.css']
})
export class LoggedBoardComponent implements OnInit {

  constructor(
    public dynTabService: DynTabService,
    private router: Router,
    private route: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,
    private afAuth: AngularFireAuth
  ) {
  }

  selectedIndex: number = 0;
  user: User;

  ngOnInit() {
    this.afAuth.user.subscribe((user: User) => {
      this.user = user;
    });
    // fix index after nav from new url
    this.router.events.pipe(
      filter((event: Event) => event instanceof NavigationEnd),
      first()
    ).subscribe((event: NavigationEnd) => {
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
    this.dynTabService.removeNavLinkAndEmit(navLink);
  }

  logout() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
