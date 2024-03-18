import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor() { }
  orders=[
    {id:"1",user:"abrar",date:"1-2-2022",products:["product1","product256","product463","product884","product5666"],total:200,status:"pending"},
    {id:"2",user:"abrar2",date:"13-2-2023",products:["product11","product2664","product3553","product4545","product5333"],total:1000,status:"accepted"},
    {id:"3",user:"abrar3",date:"1-3-2021",products:["product1111","product22546","product3577","product422","product577"],total:800,status:"pending"},
    {id:"4",user:"abrar4",date:"7-2-2020",products:["product11111","product2876","product3222","product444","product445"],total:700,status:"rejected"},
    {id:"5",user:"abrar5",date:"5-2-2002",products:["product122","product2666","product344","product422","product599"],total:400,status:"pending"},
    {id:"6",user:"abrar6",date:"7-2-2021",products:["product331","product452","product3555","product477","product588"],total:590,status:"accepted"},
    {id:"7",user:"abrar7",date:"1-5-2019",products:["product144","product27883","product6563","product334","product533"],total:830,status:"pending"},
    {id:"8",user:"abrar8",date:"4-2-2034",products:["product166","product2355","product38u6","product49887","product566"],total:2900,status:"pending"},
    {id:"9",user:"abrar9",date:"20-5-2012",products:["product155","product2075","product368","product4555","product57"],total:1200,status:"pending"},
    {id:"10",user:"abrar10",date:"1-5-2022",products:["product1444","product2044","product377","product3444","product25"],total:2200,status:"rejected"},
    {id:"11",user:"abrar11",date:"1-7-2002",products:["product199","product234","product322","product48767","product59"],total:846,status:"pending"},
    {id:"12",user:"abrar12",date:"1-9-2024",products:["product188","product2755","product663","product4333","product35"],total:8746,status:"accepted"},
    {id:"13",user:"abrar13",date:"1-3-2013",products:["product771","product2223","product443","product3344","product57"],total:860,status:"pending"},
    {id:"14",user:"abrar14",date:"1-4-2018",products:["product166","product25323","product322","product5684","product52"],total:870,status:"rejected"},
    {id:"15",user:"abrar15",date:"1-11-2023",products:["product441","product25543","product3444","product6444","product55"],total:960,status:"rejected"},
    {id:"16",user:"abrar16",date:"1-9-2012",products:["product197","product62444","product43","product3466","product85"],total:904,status:"pending"},
  ];

  getPendingOrders(){
    const pendingOreders=this.orders.filter((i)=>{
      return i.status=="pending";
    });
    return pendingOreders
  }
  getRejectedOrders(){
    const rejectedOreders=this.orders.filter((i)=>{
      return i.status=="rejected";
    });
    return rejectedOreders
  }
  getAcceptedOrders(){
    const acceptedOreders=this.orders.filter((i)=>{
      return i.status=="accepted";
    });
    return acceptedOreders
  }
  getOrders(){
    return [...this.orders];
  }
  setOrderStatus(id:string,newStatus:string){
    const i:number=this.orders.findIndex((i)=>{
      return i.id===id;
    })
    this.orders[i].status=newStatus;
  }

}
