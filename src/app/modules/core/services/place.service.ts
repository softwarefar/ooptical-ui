import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  private google: any = (window as any).google;
  private autocompleteService: any;
  private readonly sessionToken: any;

  constructor(
  ) {
    this.autocompleteService = new this.google.maps.places.AutocompleteService();
    this.sessionToken = new this.google.maps.places.AutocompleteSessionToken();
  }

  findAddress(text: string): Observable<any[]> {
    const addresses: Subject<any[]> = new Subject<any[]>();
    this.autocompleteService.getPlacePredictions({
      componentRestrictions: {country: 'ch'},
      input: text || '',
      sessionToken: this.sessionToken
    }, (predictions: any[], status: any) => {
      if (status === this.google.maps.places.PlacesServiceStatus.OK) {
        addresses.next(predictions);
      } else {
        addresses.error(status);
      }
    });
    return addresses;
  }
}
