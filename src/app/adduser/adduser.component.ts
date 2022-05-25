import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  form:FormGroup;

  utenti:User[] = new Array();

  constructor(private readonly router: Router, public fb:FormBuilder, public http: HttpClient) {
    this.form=fb.group({
      'username':['', Validators.required],
      'password':['', Validators.required]
    });
   }

  ngOnInit(): void {
  }

  registerUser(){
    this.http.post("http://localhost:8000/login/createuser", 
      {
        "username":this.form.controls['username'].value,
        "password":this.form.controls['password'].value
      }
    ).subscribe(res=>{
      if(res){
        alert("Utente inserito con successo")
        this.router.navigate(["/trascrittore"])
      }
    })
  }

  getAllUsers(){
    this.http.get<[User]>("http://localhost:8000/users/all").subscribe(res=>{
      this.utenti = res;
      console.log(this.utenti)
    })
  }

}
