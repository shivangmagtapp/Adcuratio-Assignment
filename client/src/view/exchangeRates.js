import React, { Component } from "react";
import axios from "axios"
import '../assets/css/index.css';
import Cookies from 'universal-cookie';
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
            result:''
        }

        this.handleChange = this.handleChange.bind(this);
        this.convert = this.convert.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
      }
    
      convert() {
          axios.post("/api/convert",{from:this.state.fromCurrency, to:this.state.toCurrency},{
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
                if(response.data.data.length!=0){
                    this.setState({error:""})
                    this.setState({result:response.data.data[0].rate})
                }
                else{
                    this.setState({result:''})
                    this.setState({error:"Data Not Available"})
                }
            }
            })
      }

    render() {
        
        return (
           <div>
               <div className="container-fluid justify-content-center">
                    <div className="container">

                        <div className="row justify-content-center" >
                            <div className="col-md-6 col-sm-12 col-lg-6">
                                <div className="auth-wrapper" id="login-div">
                                    <div className="auth-inner">
                                        <p style={{textAlign:"center", color:"red"}}>{this.state.error}</p>
                                            <h3>Convert</h3>
                                            <p  style={{textAlign:"center", color:"blue"}}>{`${new Date().getDate()}/${parseInt(new Date().getMonth())+1}/${new Date().getFullYear()}`}</p>
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
                                            {this.state.result!=""?
                                            <div id="result" style={{textAlign:"center",marginTop:"20px",color:"green"}}><strong>{this.state.result} {this.state.toCurrency}</strong></div>
                                            :
                                            <></>
                                            }      
                                            <br/>
                                            <button onClick={this.convert} className="btn btn-primary btn-block">Convert</button>
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