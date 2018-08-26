import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'yearsRange'})
export class YearsRangePipe implements PipeTransform {
  transform(values: number[]): string {
    let result = '';
    if (values) {
      const sorted: number[] = values.sort();
      let pyear = 0;
      let ranged = false;
      sorted.forEach(function (year: number) {
        if (!result.length) {
          result += ('0000' + year).slice(-4);
        } else if (year === pyear) {
        } else if (year === pyear + 1) {
          if (!ranged) {
            result += '-';
            ranged = true;
          }
        } else {
          if (ranged) {
            result += ('0000' + pyear).slice(-4);
          }
          result += '; ' + ('0000' + year).slice(-4);
          ranged = false;
        }
        pyear = year;
      });
      if (ranged) {
        result += ('0000' + pyear).slice(-4);
      }
    }
    return result;
  }
}
