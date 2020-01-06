import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
//import { JsonpCallbackContext } from '@angular/common/http/src/jsonp';
import { BehaviorSubject } from 'rxjs';
import { UserKey } from '../models/userKey';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    constructor(private route: Router, private data: DataService) { this.uncheck();   console.log(this.data.loginRequired)}

    public hide = true;

    private storeCred: any = [];

    private keyArr: any = [];

    private userKey: UserKey;

   public errMessage = '';

   public creds = {
      username: '',
      password: ''
    }

    public checked: boolean = false;

    onLogin() {
        this.data.login(this.creds)
            .subscribe(success => {
                if (success) {
                    this.route.navigate(["select-card"]);
                    if (this.checked == true) {
                        var myLocal = JSON.stringify(this.creds);
                        var encCreds = btoa(myLocal);
                        localStorage.setItem('exp', encCreds);
                    }

                    //this.enc(this.creds);
                } 
            }, err => this.errMessage = "Failed to login")
    }

    ngOnInit() {
        var credentials = localStorage.getItem('exp');
        if (credentials != undefined) {
            var dec = JSON.parse(atob(credentials));
            this.creds.username = dec.username;
            this.creds.password = dec.password;
            this.checked = true;
        }

        this.dec();
    }

    uncheck() {
        if (this.checked == true) {
            localStorage.removeItem('exp');
            this.checked != this.checked;
            this.creds.username = '';
            this.creds.password = '';
        }
    }

    enc(str): string {
        let uName = str.username;
        let uPass = str.password;
        let dumStr = 'jhbkfjbkjbfavf';
        let concat = uName + dumStr + uPass;

        for (var i = 0; i < concat.length; i++) {

            let keyNum = Math.random() * 10;
            let ascVal: number = concat.charCodeAt(i);
          
            keyNum = Math.floor(keyNum);
            let newVal: number = ascVal + keyNum;
            let curr = String.fromCharCode(newVal);

            this.keyArr.push(keyNum); // needs to be saved to db
            this.storeCred.push(curr);
        }
        var encCred = this.storeCred.join("");
        var encKey = this.keyArr.join("");
        console.log(encKey);

        //var userKey = JSON.stringify(encKey); 

        this.data.saveUserKey(encKey)
            .subscribe(success => {
                this.userKey.userKey = encKey;
                this.userKey = new UserKey();
            });
        localStorage.setItem('xyzz', encCred);
        return encCred;
    }


    dec(): string {
        let encCred: string  = localStorage.getItem('xyzz');
        console.log(encCred);
        for (var i = 0; i < encCred.length; i++) {
            let ascVal: number = encCred.charCodeAt(i);
            console.log(this.keyArr[i]);
            ascVal -= this.keyArr[i];

            

            let decSt: string  = String.fromCharCode(ascVal[i]);
            console.log(decSt);
        }

        return 
    }

    cancel() {
        this.route.navigate(["/"]);
    }
  

}
