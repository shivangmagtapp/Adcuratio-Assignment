import React, { Component } from "react";
import axios from "axios"
import '../assets/css/index.css';
import Cookies from 'universal-cookie';
import {Modal,ModalBody,Button} from "react-bootstrap"
const cookies = new Cookies();
function getcookie(string){
  return(cookies.get(string));
}
function setCookie(key,value){
  cookies.set(key,value,{maxAge:259200})
}
export default class Exchange extends Component {
    constructor(props) {
        super(props);
        this.state={
            fromCurrency:'INR',
            toCurrency:'USD',
            rate:'',
            error:'',
            date:'',
            from:'INR',
            to:'USD',
            data:[],
            show:false,
            editId:'',
            editRate:''

        }

        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
        this.handleFromChange = this.handleFromChange.bind(this);
        this.handleToChange = this.handleToChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.editRate = this.editRate.bind(this);
        this.updateRate = this.updateRate.bind(this);
    
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
      }
      handleClose() {
        this.setState({show:false});
      }
      editRate(id,rate){
        this.setState({editId:id})
        this.setState({editRate:rate});
        this.setState({show:true});
      }
      updateRate(){
        axios.post("/api/edit",{id:this.state.editId,rate:this.state.editRate},{
            headers: {
              token: getcookie("token")
            }}).then((response) => {
            console.log(response)
            if(response.data.error!=""){
                this.setState({error:response.data.error})
                if(response.data.error==="Authentication Failed"){
                    cookies.remove("token")
                    window.location.href="/"
                }
            }
            else{
                console.log(response)
                this.setState({editRate:''})
                this.setState({editId:''})
                axios.post("/api/get/data",{from:this.state.from, to:this.state.to},{
                    headers: {
                      token: getcookie("token")
                    }}).then((response) => {
                    console.log(response)
                    if(response.data.error!=""){
                        this.setState({error:response.data.error})
                        if(response.data.error==="Authentication Failed"){
                            cookies.remove("token")
                            window.location.href="/"
                        }
                    }
                    else{
                        console.log(response.data.data)
                        this.setState({data:response.data.data})
                        this.setState({show:false})
                    }
                    })
                

            }
            })
      }

      deleteRate(id){
        axios.post("/api/delete",{id:id},{
            headers: {
              token: getcookie("token")
            }}).then((response) => {
            console.log(response)
            if(response.data.error!=""){
                this.setState({error:response.data.error})
                if(response.data.error==="Authentication Failed"){
                    cookies.remove("token")
                    window.location.href="/"
                }
            }
            else{
                console.log(response)
                this.setState({editRate:''})
                this.setState({editId:''})
                axios.post("/api/get/data",{from:this.state.from, to:this.state.to},{
                    headers: {
                      token: getcookie("token")
                    }}).then((response) => {
                    console.log(response)
                    if(response.data.error!=""){
                        this.setState({error:response.data.error})
                        if(response.data.error==="Authentication Failed"){
                            cookies.remove("token")
                            window.location.href="/"
                        }
                    }
                    else{
                        console.log(response.data.data)
                        this.setState({data:response.data.data})
                        this.setState({show:false})
                    }
                    })
                

            }
            })
      }

      handleFromChange(event) {
        this.setState({from: event.target.value});
        axios.post("/api/get/data",{from:event.target.value, to:this.state.to},{
            headers: {
              token: getcookie("token")
            }}).then((response) => {
            console.log(response)
            if(response.data.error!=""){
                this.setState({error:response.data.error})
                if(response.data.error==="Authentication Failed"){
                    cookies.remove("token")
                    window.location.href="/"
                }
            }
            else{
                console.log(response.data.data)
                this.setState({data:response.data.data})
            }
            })
      }
      handleToChange(event) {
        this.setState({to: event.target.value});
        axios.post("/api/get/data",{from:this.state.from, to:event.target.value},{
            headers: {
              token: getcookie("token")
            }}).then((response) => {
            console.log(response)
            if(response.data.error!=""){
                this.setState({error:response.data.error})
                if(response.data.error==="Authentication Failed"){
                    cookies.remove("token")
                    window.location.href="/"
                }
            }
            else{
                console.log(response.data.data)
                this.setState({data:response.data.data})
            }
            })
      }

      componentDidMount() {
        axios.post("/api/get/data",{from:this.state.from, to:this.state.to},{
            headers: {
              token: getcookie("token")
            }}).then((response) => {
          
            if(response.data.error!=""){
                this.setState({error:response.data.error})
                if(response.data.error==="Authentication Failed"){
                    cookies.remove("token")
                    window.location.href="/"
                }
            }
            else{
                this.setState({data:response.data.data})
            }
        })
      }
      
    
      submit() {
          if(this.state.fromCurrency === this.state.toCurrency){
            this.setState({error:"Both selected Currencies are same"})
          }
          else{
          axios.post("/api/save",{from:this.state.fromCurrency, to:this.state.toCurrency, rate:this.state.rate},{
            headers: {
              token: getcookie("token")
            }}).then((response) => {
            console.log(response)
            if(response.data.error!=""){
                this.setState({error:response.data.error})
                if(response.data.error==="Authentication Failed"){
                    cookies.remove("token")
                    window.location.href="/"
                }
            }
            else{
                console.log(response)
                this.setState({rate:''})
                this.setState({from:this.state.fromCurrency})
                this.setState({to:this.state.toCurrency})
            }
            })

            axios.post("/api/get/data",{from:this.state.fromCurrency, to:this.state.toCurrency},{
                headers: {
                  token: getcookie("token")
                }}).then((response) => {
                console.log(response)
                if(response.data.error!=""){
                    this.setState({error:response.data.error})
                    if(response.data.error==="Authentication Failed"){
                        cookies.remove("token")
                        window.location.href="/"
                    }
                }
                else{
                    console.log(response.data.data)
                    this.setState({data:response.data.data})
                }
                })
        }
      }

    render() {
        
        return (
            <div className="container auth-wrapper">
            <Modal
            show={this.state.show}
            onHide={this.handleClose}
            centered
            >
            <Modal.Header closeButton>
            <Modal.Title>Edit Rate of {this.state.from} to {this.state.to}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className="form-group">
                <label>Exchange Rate</label>
                <input type="number" autocomplete="off" value={this.state.editRate} className="form-control" placeholder="Enter Rate" name="editRate" value={this.state.editRate} onChange={this.handleChange} required/>
            </div>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={this.updateRate}>
            Update
            </Button>
            </Modal.Footer>
            </Modal>
                <br/>
           <div className="row">
               
               <div className="col">
               <br/>
               <div class="card auth-inner"  style={{height:"560px"}} >
                   <p style={{color:"red", textAlign:"center"}}>{this.state.error}</p>
                <div class="card-body">
                    <h5 class="card-title">Add Currency Rate</h5>
                    <div class="form-group">
                    <label for="select">Select Currency (From)</label>
                    <select class="form-control" id="select" name="fromCurrency" value={this.state.fromCurrency} onChange={this.handleChange}>
                    <option>INR</option>
                    <option>USD</option>
                    <option>CAD</option>
                    <option>EUR</option>
                    <option>YPN</option>
                    </select>
                </div>
            
                <div class="form-group">
                    <label for="select">Select Currency (To)</label>
                    <select class="form-control" id="select" name="toCurrency" value={this.state.toCurrency} onChange={this.handleChange}>
                    <option>INR</option>
                    <option>USD</option>
                    <option>CAD</option>
                    <option>EUR</option>
                    <option>YPN</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Exchange Rate</label>
                    <input type="number" autocomplete="off" value={this.state.rate} className="form-control" placeholder="Enter Rate" name="rate" value={this.state.rate} onChange={this.handleChange} required/>
                </div>
                {/* <div class="form-group">
                    <label for="date"  >Date</label>
                    <div>
                        <input class="form-control" type="date" name="date" onChange={this.handleChange} id="example-date-input"/>
                    </div>
                </div> */}
                <br/>
                <button onClick={this.submit} className="btn btn-primary btn-block">Submit</button>
                </div>
                </div>
                </div>
                
                <div className="col">
                    <br/>
               <div class="card auth-inner" style={{height:"560px", overflowY:"scroll"}} >
                <div class="card-body">

                <div className="row">
                    <div className="col">
                    <div class="form-group">
                    <label for="select">From</label>
                    <select class="form-control" id="select" name="fromCurrency" value={this.state.from} onChange={this.handleFromChange}>
                    <option>INR</option>
                    <option>USD</option>
                    <option>CAD</option>
                    <option>EUR</option>
                    <option>YPN</option>
                    </select>
                </div>
            </div>
            <div className="col">
                <div class="form-group">
                    <label for="select">To</label>
                    <select class="form-control" id="select" name="toCurrency" value={this.state.to} onChange={this.handleToChange}>
                    <option>INR</option>
                    <option>USD</option>
                    <option>CAD</option>
                    <option>EUR</option>
                    <option>YPN</option>
                    </select>
                </div>
                </div>
               
                
                </div>
                <div className="row">
                    <div className="col">
                    <table class="table">
                        <thead>
                            <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Rate</th>
                            <th>Edit</th>
                            <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.data.map(item=>(
                            <tr>
                            <th scope="row">{`${new Date(item.date).getDate()}/${parseInt(new Date(item.date).getMonth())+1}/${new Date(item.date).getFullYear()}`}</th>
                            <td>{item.rate}</td>
                            <td><div style={{cursor:"pointer", textDecoration:"underline",color:"blue"}} onClick={()=>this.editRate(item._id,item.rate)}>Edit</div></td>
                            <td><div style={{cursor:"pointer", textDecoration:"underline",color:"red"}} onClick={()=>this.deleteRate(item._id)}>Delete</div></td>
                            </tr>
                            ))}
                        </tbody>
                        </table>
                    </div>
                </div>
                </div>
                </div>
                </div>
            </div>
            
        </div>
        );
    }
}