import { Component } from '@angular/core';
import { Router } from '@angular/router';
import{DataService}from '../services/data.service'
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  name:string = "ESAF SMALL FINANCING BANK"
  phone:number=7025650124


  hint:string="account number"
  hint1:string="password"

  password:string='*****'


constructor(private r:Router,private ds:DataService,private fb:FormBuilder){} 
lgform=this.fb.group({
  acc:['',[Validators.required,Validators.pattern("[0-9]+")]],
 
 
  pswd:['',[Validators.required,Validators.pattern("[0-9]+")]]
})


clicked(){
  let acc=this.lgform.value.acc
  
  
  let pswd=this.lgform.value.pswd
let result=this.ds.login(acc,pswd)
result.subscribe((resp:any)=>{
  if(resp){
localStorage.setItem("currentUser",resp.currentUser)
localStorage.setItem("currentAcno",resp.currentAcno)
localStorage.setItem ("token",JSON.stringify(resp.token))
alert(resp.message)
this.r.navigateByUrl("dashb")
  }
},
(err:any)=>{
  alert(err.error.message)
})
//   if(this.lgform.get("acc")?.errors){
//     alert("invalid acno")
//    }
//    if(this.lgform.get("password")?.errors){
//     alert("invalid password")
//    }
// if(this.lgform.valid){
//   let res=this.ds.login(acc,pswd)
//   if(res==true){
//   alert("login successfull!!!")
//   // localStorage.setItem("acc","pswd")
//   this.r.navigateByUrl("dashb")

// }
// else{
//   alert("Login Failed!!")
// }
// }
// else{
//   alert("invalid data")
// }

// }
}

////dependancy injection
// getAcc(e:any){
//   this.acc =e.target.value
//   console.log(this.acc)
// }

//   getpassword(e:any){
//     this.password=e.target.value
//     console.log(this.password)
//   }


  // clicked(){
  //   if(this.acc in this.accounts){
  //     if(this.accounts[this.acc].password==this.password){
  //       alert("login successfull")
  //       this.r.navigateByUrl("dashb")
  //     }
  //     else{
  //       alert("password not valid")
  //     }}
  //     else{
  //       alert("account number invalid")
  //     }
  // }

  

  // clicked(us:any,ps:any){
  //   console.log(us.value,ps.value)
  // }



  // clicked(){
  //   console.log(this.username,this.password)
  // }

  // getData1(event:any){
  //   this.username=event.target.value
  // }
  
  // getData2(event:any){
  //   this.password=event.target.value
  // }

}
