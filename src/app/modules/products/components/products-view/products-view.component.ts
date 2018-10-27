import {Component, OnInit} from '@angular/core';
import {NavLinkType} from '../../../core/models/nav-link/nav-link-type';
import {DynTabService} from '../../../core/services/dyn-tab-service';

@Component({
  selector: 'app-products-view',
  templateUrl: './products-view.component.html',
  styleUrls: ['./products-view.component.css']
})
export class ProductsViewComponent implements OnInit {

  constructor(
    private dynTabService: DynTabService
  ) { }

  ngOnInit() {
    this.dynTabService.selectFirstTab(NavLinkType.PRODUCTS);
  }

}
