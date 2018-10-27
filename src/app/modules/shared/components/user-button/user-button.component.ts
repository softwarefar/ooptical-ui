import {Component, OnInit} from '@angular/core';
import {User} from 'firebase';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-button',
  templateUrl: './user-button.component.html',
  styleUrls: ['./user-button.component.css']
})
export class UserButtonComponent implements OnInit {

  faSignOutAlt = faSignOutAlt;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth
  ) {
  }

  user?: User | null;

  ngOnInit() {
    this.afAuth.user.subscribe((user: User | null) => {
      this.user = user;
    });
  }

  logout() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
