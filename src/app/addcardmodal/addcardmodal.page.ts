import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, NavParams } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-addcardmodal',
  templateUrl: './addcardmodal.page.html',
  styleUrls: ['./addcardmodal.page.scss'],
})
export class AddcardmodalPage implements OnInit {

  cardNumber: any;
  cardNumMaxLength: number;
  cvvMaxLength: number;
  btnDisabled: boolean = true;
  validated: boolean = true;
  expireDate: any;
  cvv: any;
  default = 0;
  method: any;
  acceptedCreditCards = {
    visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
    mastercard: /^5[1-5][0-9]{14}$|^2(?:2(?:2[1-9]|[3-9][0-9])|[3-6][0-9][0-9]|7(?:[01][0-9]|20))[0-9]{12}$/,
    amex: /^3[47][0-9]{13}$/,
    discover: /^65[4-9][0-9]{13}|64[4-9][0-9]{13}|6011[0-9]{12}|(622(?:12[6-9]|1[3-9][0-9]|[2-8][0-9][0-9]|9[01][0-9]|92[0-5])[0-9]{10})$/,
    diners_club: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
    jcb: /^(?:2131|1800|35[0-9]{3})[0-9]{11}$/
  };
  apiUrl = 'https://hairday.app/api/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private navCtrl: NavController, private modalCtrl: ModalController, private navParams: NavParams, private http: HttpClient) { }
 
  ngOnInit() {
  }

  validateCardNumber(ev){
    var value = ev.target.value;
    // remove all non digit characters
    value = value.replace(/\D/g, '');
    var formattedValue;
    // american express, 15 digits
    if ((/^3[47]\d{0,13}$/).test(value)) {
      formattedValue = value.replace(/(\d{4})/, '$1 ').replace(/(\d{4}) (\d{6})/, '$1 $2 ');
      this.cardNumMaxLength = 17;
    } else if((/^3(?:0[0-5]|[68]\d)\d{0,11}$/).test(value)) { // diner's club, 14 digits
      formattedValue = value.replace(/(\d{4})/, '$1 ').replace(/(\d{4}) (\d{6})/, '$1 $2 ');
      this.cardNumMaxLength = 16;
    } else if ((/^\d{0,16}$/).test(value)) { // regular cc number, 16 digits
      formattedValue = value.replace(/(\d{4})/, '$1 ').replace(/(\d{4}) (\d{4})/, '$1 $2 ').replace(/(\d{4}) (\d{4}) (\d{4})/, '$1 $2 $3 ');
      this.cardNumMaxLength = 19;
    }

    this.cardNumber = formattedValue;

    // remove all non digit characters
    value = value.replace(/\D/g, '');
    var sum = 0;
    var shouldDouble = false;
    // loop through values starting at the rightmost side
    for (var i = value.length - 1; i >= 0; i--) {
      var digit = parseInt(value.charAt(i));

      if (shouldDouble) {
        if ((digit *= 2) > 9) digit -= 9;
      }

      sum += digit;
      shouldDouble = !shouldDouble;
    }
    
    var valid = (sum % 10) == 0;
    var accepted = false;

    var acceptedCreditCards = this.acceptedCreditCards;
    var a = this;
    
    // loop through the keys (visa, mastercard, amex, etc.)
    Object.keys(acceptedCreditCards).forEach(function(key) {
      var regex = acceptedCreditCards[key];
      if (regex.test(value)) {
        a.method = key;
        accepted = true;
      }
    });

    if(valid && accepted){
      this.validated = true;
    }else{
      this.validated = false;
    }
  }

  validateExpiryDate(ev){
    this.expireDate = ev.target.value;
    if((/^(0[1-9]|1[0-2])\/([0-9]{2})$/).test(this.expireDate)){
      this.validated = true;
    }else{
      this.validated = false;
    }
  }

  validateCVV(ev){
    this.cvv = ev.target.value;
    // remove all non digit characters
    var creditCard = this.cardNumber.replace(/\D/g, '');
    this.cvv = this.cvv.replace(/\D/g, '');
    // american express and cvv is 4 digits
    if ((this.acceptedCreditCards.amex).test(creditCard)) {
      if((/^\d{4}$/).test(this.cvv)){
        this.cvvMaxLength = 4;
        if(this.validated == true){
          this.btnDisabled = false;
        }
      }
    } else if ((/^\d{3}$/).test(this.cvv)) { // other card & cvv is 3 digits
      this.cvvMaxLength = 3;
      if(this.validated == true){
        this.btnDisabled = false;
      }
    }
  }

  setDefault(){
    this.default = 1;
  }

  addCard(){
    var params = {
      api_token: localStorage.getItem('token'),
      number: this.cardNumber,
      expired_at: this.expireDate,
      last_digit: this.cvv,
      default: this.default,
      type: this.method
    };
    this.http.post(this.apiUrl+"card/create", JSON.stringify(params), this.httpOptions)
    .subscribe(res => {
      if(res["status"] == 200){
        var cardData = res["data"];
        this.modalCtrl.dismiss({card: cardData});
      }
    }, (err) => {
      console.log(err);
    });
  }

  close()
  {
    this.modalCtrl.dismiss({card: null});
  }

  

}
