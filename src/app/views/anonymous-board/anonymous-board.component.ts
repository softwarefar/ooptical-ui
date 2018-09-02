import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {auth, User} from 'firebase';
import UserCredential = firebase.auth.UserCredential;
import {Router} from '@angular/router';

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
