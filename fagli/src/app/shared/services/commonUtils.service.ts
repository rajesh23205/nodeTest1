import { Injectable } from '@angular/core';

@Injectable()
export class CommonUtils {
  constructor() { }

  removeDublicate(arrayList) {
    const uniqueArray = [];
    arrayList.filter(function(city) {
      if (uniqueArray.indexOf(city) === -1) {
        uniqueArray.push(city);
      }
    });
    return uniqueArray;
  }
}
