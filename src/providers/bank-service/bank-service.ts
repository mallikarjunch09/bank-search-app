import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the BankServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BankServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello BankServiceProvider Provider');
  }

  getBankDetails(bankName) {
    let url = "https://vast-shore-74260.herokuapp.com/banks?city="+bankName;
    return this.http.get(url);
  }

}
