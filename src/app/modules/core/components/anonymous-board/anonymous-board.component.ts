import {Component} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {auth} from 'firebase';
import {Router} from '@angular/router';
import UserCredential = firebase.auth.UserCredential;

@Component({
  selector: 'app-anonymous-board',
  templateUrl: './anonymous-board.component.html',
  styleUrls: ['./anonymous-board.component.css']
})
export class AnonymousBoardComponent {

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth
  ) {
  }

  login() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then((value: UserCredential) => {
      if (value.user) {
        this.router.navigate(['']);
      }
    });
  }
}
