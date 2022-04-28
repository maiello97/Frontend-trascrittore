import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form:FormGroup;

  constructor(private readonly router: Router, public fb:FormBuilder, public http: HttpClient) { 
    this.form=fb.group({
      'username':['', Validators.required],
      'password':['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  gotoTranscriptor(){
    let formData = new FormData()
    formData.append('username', this.form.controls['username'].value)
    formData.append('password', this.form.controls['password'].value)

    this.http.post("http://localhost:8000/login", formData).subscribe(res=>{
      if(res == true){
        this.router.navigate(["/trascrittore"])
      }else{
        alert("Errore nell'autenticazione");
      }
    })
    
  }

}
