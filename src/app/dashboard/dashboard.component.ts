import { Component } from '@angular/core';
import { FormBuilder,Validators  } from '@angular/forms';
import{Router}from '@angular/router'
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  // acc:string=""
  // password:string=""
  // amount:number=0
  cuser:any=''
  dd:any=new Date()
  acno:any=''

  constructor(private r:Router,private ds:DataService,private fb:FormBuilder){
    this.cuser=(localStorage.getItem("currentUser")||'')

  }

  dform=this.fb.group({
    dacc:['',[Validators.required,Validators.pattern("[0-9]+")]],
    dpass:['',[Validators.required,Validators.pattern("[a-zA-Z0-9]{8,}")]],
    damnt:['',[Validators.required,Validators.pattern("[0-9]+")]],
  })

  wform=this.fb.group({
    wacc:['',[Validators.required,Validators.pattern("[0-9]+")]],
    wpass:['',[Validators.required,Validators.pattern("[a-zA-Z0-9]{8,}")]],
    wamnt:['',[Validators.required,Validators.pattern("[0-9]+")]],
  })
  


  clicked(){
    // console.log(this.dform.value.damnt)
    let acc=this.dform.value.dacc
    let pass=this.dform.value.dpass
    let amnt=this.dform.value.damnt
    if(this.dform.valid){
  
   let res=this.ds.deposit(acc,pass,amnt)
   res.subscribe((res:any)=>{
    alert(res.message)
   },
   (err:any)=>{
    alert(err.error.message)
   }
   )
  //   if(res==true){
  //   alert("Deposit successful!!!")
  // }
  // else{
  //   alert("deposit failed")
  // }
  
}}

clicked1(){
  console.log(this.wform.value)
  let acc=this.wform.value.wacc
  let pass=this.wform.value.wpass
  let amnt=this.wform.value.wamnt
  if(this.wform.valid){
  
 let res=this.ds.withdraw(acc,pass,amnt)
 res.subscribe((res:any)=>{
  alert(res.message)
 },
 (err:any)=>{

 alert(err.error.message)
})
//   if(res==true){
//   alert("withdrawal successful!!!")
// }
// else{
//   alert("withdrawal failed")
// }
  }

else{
  alert("invalid data")
}

}
logout(){
  this.r.navigateByUrl("")
  localStorage.removeItem("acno")
  localStorage.removeItem("currentUser")
}
deleteaccount(event:any){
  console.log(event)
  this.ds.deletAcc(event).subscribe(res=>{
    if(res){
    }
    localStorage.removeItem("currentAcno")
    localStorage.removeItem("currentUser")
    localStorage.removeItem("token")
    this.r.navigateByUrl("")
  })
}

deleteacc(){
  this.acno=JSON.parse(localStorage.getItem("currentAcno")||'')
  console.log(this.acno)
}
canceldelete(){
  this.acno=''
}
}
