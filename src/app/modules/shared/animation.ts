import {animate, style, transition, trigger} from '@angular/animations';

export const toolbarAppear = trigger('toolbarAppear', [
  transition(':enter', [
    style({transform: 'translateX(100%)'}),
    animate(300)
  ]),
  transition(':leave', [
    animate(300, style({transform: 'translateX(100%)'}))
  ])
])
