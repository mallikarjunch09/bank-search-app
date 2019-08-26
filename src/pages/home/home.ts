import { Component } from '@angular/core';
import { BankServiceProvider } from '../../providers/bank-service/bank-service';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.html'
})
export class HomePage {

  banksList: Array<any> = [];
  tempBanksList: Array<any> = [];
  error: string;
  mySearch: string;
  selectedBank: string = 'bangalore';
  constructor(public bankService: BankServiceProvider, public loadingController: LoadingController) { }


  searchChanges(event) {
    console.log("mySearch - ", this.mySearch);
    if (this.mySearch == undefined || this.mySearch == '') {
      this.banksList = this.tempBanksList;
    } else {
      this.banksList = this.filterSearch(this.banksList, this.mySearch.toUpperCase());
    }
    console.log("Search - ", this.filterSearch(this.banksList, this.mySearch.toUpperCase()));
  } 

  onCancel(ev) {
    console.log("onCancel - ");
  }

  filterSearch(data, s) {
    return data.filter(e => e.bank_name.includes(s) || e.branch.includes(s) || e.ifsc.includes(s))

  }

  onChange($event) {
    this.getBankDetails();
  }

  getBankDetails() {
    // Create the popup
    let loadingPopup = this.loadingController.create({
      content: 'Loading data...'
    });

    // Show the popup
    loadingPopup.present();
    this.bankService.getBankDetails(this.selectedBank.toUpperCase()).subscribe((data) => {
      loadingPopup.dismiss();
      console.log(
        "getBankDetails() data - ", data);
      this.banksList = data as Array<any>;
      this.tempBanksList = data as Array<any>;
    },
      err => {
        this.error = err;
        console.log("getBankDetails() err - ", this.error);
      }
    );
  }

  ionViewWillEnter() {
    this.getBankDetails();
    console.log("ionViewWillEnter ", this.selectedBank.toUpperCase());

  }

}
