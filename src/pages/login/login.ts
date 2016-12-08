import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { SecureStorage } from 'ionic-native';
import { AlertController } from 'ionic-angular';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  public username:string;
  public password:string;
  public readyToLogin:boolean;
  private secureStorage:SecureStorage;

  constructor(public navCtrl: NavController, platform:Platform, public alertCtrl: AlertController) {
    platform.ready().then(() => {
      this.readyToLogin = false;
	  this.secureStorage = new SecureStorage();
	  this.secureStorage.create('pairing_app').then(
	    () => {
		  console.log('Storage is ready');
		  
		  this.secureStorage.get('loginDetails')
		  .then(
		    data => {
			  console.log('data was'+data);
			  let {u,p} = JSON.parse(data);
			  this.username = u;
			  this.password = p;
			  this.login(true);
			},
			error => console.log(error)
          );
          this.readyToLogin = true;
       },
	   error => console.log(error)
     );
   });
  }
  
  showAlert(title: string, subTitle: string) {
    let alert = this.alertCtrl.create({
	  title: title,
	  subTitle: subTitle,
	  buttons: ['OK']
	});
	alert.present();
  }
  
  login(firstLogin: boolean = false) {
    this.secureStorage.set('loginDetails', JSON.stringify({u:this.username, p:this.password}))
	.then(
	data => {
	  console.log(this.readyToLogin);
	  if(!firstLogin) {
	    this.showAlert('Login successful!', 'Login details have been successfully saved');
	  }
	  console.log('login details stored');
	},
	error => console.log(error)
	);
  }

  ionViewDidLoad() {
    console.log('Hello LoginPage Page');
  }

}
