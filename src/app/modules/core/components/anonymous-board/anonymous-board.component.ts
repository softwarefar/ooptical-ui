import {Component} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase';
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
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then((value: auth.UserCredential) => {
      if (value.user) {
        this.router.navigate(['']);
      }
    });
  }
}
