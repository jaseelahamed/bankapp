import { Injectable, getPlatform } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
const option={
  headers:new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  currentUser:any=''
  dd=new Date()
 currentAcno=''
  accounts:any={
  1000:{account_no:1000,name:"jaseel",phone:656482443,balance:1200000000,password:"jaseel456",transaction:[]},
  1002:{account_no:1002,name:"jaisel",phone:656482443,balance:1200000000,password:"jaseel956",transaction:[]},
  1003:{account_no:1003,name:"jasval",phone:656482443,balance:1200000000,password:"jaseel856",transaction:[]},
  1004:{account_no:1004,name:"jasaal",phone:656482443,balance:1200000000,password:"jaseel459",transaction:[]},
}


  constructor(private hc:HttpClient) { 
    // this.getDetails()
    
  }
  // getDetails(){
  //   if(localStorage.getItem("currentUser")){
  //     this.currentUser=JSON.parse(localStorage.getItem("currentUser")||'')
  //   }
  //   if(localStorage.getItem("accounts")){
  //     this.accounts=JSON.parse(localStorage.getItem("accounts")||'')
  //   }
  //   if(localStorage.getItem("acno")){
  //     this.currentAcno=JSON.parse(localStorage.getItem("acno")||'')
  //   }
  // }
  saveDetails(){
    if(this.currentUser){
      localStorage.setItem("currentUser",JSON.stringify(this.currentUser))
    }
    if(this.accounts){
      localStorage.setItem("accounts",JSON.stringify(this.accounts))
    }
    if(this.currentAcno){
      localStorage.setItem('acno',JSON.stringify(this.currentAcno))
    }
  }
    
  login(acno:any,pswd:any){


    let data={
      acno,
      pswd
    }
    return this.hc.post("http://localhost:3000/login",data)
    // if(acno in this.accounts){
    //   if(this.accounts[acno].password==pswd){
    //     this.currentUser=this.accounts[acno].name
    //     this.currentAcno=acno
        
    //     this.saveDetails()
    //     return true
    //   }
    //   else{
    //     return false
    //   }

    // }
    // else return false
  }
  register(acno:any, uname: any,phone:any, pswd: any ) {

    let data={
      acno:acno,
      uname,
      phone,
      pswd
    }
     return this.hc.post("http://localhost:3000/register",data)




    // if(acno in  this.accounts) {
    //   alert("Accont Number already exists")
    //   return false
    // }
    // else{
    //   this.accounts[acno]={account_no:acno,name:uname,phone:phone,balance:0,password:pswd,transaction:[]}
    //   console.log(this.accounts)
    //   this.saveDetails()
    //   return true
    // }
  }
  deposit(acno:any,pswd:any,amount:any){
    const data={
      acno,
      pswd,
      amount


    }
    return this.hc.post("http://localhost:3000/deposite",data,this.getoptions())

    // if(this.currentAcno=acc){
    //   if(this.accounts[acc].password==pass){
    //     this.accounts[acc].balance+=parseInt(amnt)
    //     let history= {"Type":"CREDIT","Amount":parseInt(amnt),"Balance": this.accounts[this.currentAcno].balance,"time":this.dd}
    //     this.accounts[acc].transaction.push(history)
    //     this.saveDetails()
    //     alert("balance is : "+this.accounts[acc].balance)
    //     return true
    //   }
    //   else{
    //     alert("Incorrect password")
    //     return false
    //   }
    // }
    // else{
    //   alert("Incorrect account number")
    //   return false
    // }
  }
 getoptions(){
  const token=JSON.parse(localStorage.getItem("token")||'')
  let header=new HttpHeaders()
  if(token){
    console.log(token)
    header=header.append("x-access-token",token)
    option.headers=header
  }
  console.log(option)
  return option
 }
  withdraw(acno:any,pswd:any,amount:any){
    const data={
      acno,
      pswd,
      amount
    }
    return this.hc.post("http://localhost:3000/withdraw",data,this.getoptions())
  //   console.log("ww")
  //   if(this.currentAcno==acc){
  //     if(this.accounts[acc].password==pswd){
  //       this.accounts[acc].balance-=parseInt(amount)
        // let detail={"Type":"DEBIT","Amount":parseInt(amount),"Balance": this.accounts[this.currentAcno].balance,"time":this.dd}
  //       this.accounts[acc].transaction.push(detail)
  //       this.saveDetails()
  //       alert("Balance is :"+this.accounts[acc].balance)
  //       return true
  //     }
  //     else{
  //       alert("password invalid!")
  //       return false
  //     }

  //   }
  //   else{
  //     alert("Invalid account number")
  //     return false
  //   }
  // }
  }
  getTransaction(){
    let data={
      acno:JSON.parse(localStorage.getItem("currentAcno")||'')

    }
    return this.hc.post("http://localhost:3000/transact",data,this.getoptions())
//     if(this.currentAcno){
//       return this.accounts[this.currentAcno].transaction
//     }
  
//   else{
//     alert("required")
//   }
}
deletAcc(acc:any){
  return this.hc.delete("http://localhost:3000/delacc"+acc,this.getoptions())
  // delete this.accounts[acc]
  // this.saveDetails()
  // return true
}
}
