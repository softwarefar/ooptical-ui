import {ToasterService} from './toaster.service';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

export class AbstractService {
  protected HTTPOPTIONS = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(protected http: HttpClient, protected toaster: ToasterService) {
  }


  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.toaster.error(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };

  }

  addQueryParams(uri: string, ...params: any[]) {
    if (params.length) {
      const result: string = params.reduce<string>((accu: string, param: any) => {
        if (param[1]) {
          accu += param[0] + '=' + param[1] + '&';
        }
        return accu;
      }, '');
      return uri + '?' + result;
    }
    return uri;
  }
}
