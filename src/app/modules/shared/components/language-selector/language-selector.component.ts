import {Component} from '@angular/core';
import {faGlobe} from '@fortawesome/free-solid-svg-icons';
import {NavigationExtras, Router} from '@angular/router';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.css']
})
export class LanguageSelectorComponent {
  faGlobe = faGlobe;

  constructor(
    private router: Router
  ) {}

  switchLanguageTo(locale: string) {
    this.router.navigate([`/${locale}`]).then();
  }
}
