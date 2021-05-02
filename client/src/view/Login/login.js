import React, { Component } from "react";
import axios from "axios"
import Cookies from 'universal-cookie';

const cookies = new Cookies();
function getcookie(string){
  return(cookies.get(string));
}
function setCookie(key,value){
  cookies.set(key,value,{maxAge:259200})
}
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {email: ''};
        this.state = {error: ''};
        this.state = {password: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        
        this.setState({[event.target.name]: event.target.value});
      }
    
      handleSubmit(event) {
          event.preventDefault()

          axios.post("/api/login",{email:this.state.email, password:this.state.password}).then((response) => {
            console.log(response)
            if(response.data.error!=""){
                this.setState({error:response.data.error})
            }
            else{
                console.log(response)
                setCookie("token",response.data.token)
                window.location.href="/"
            }
            })
      }

    render() {
        
        return (
            <form onSubmit={this.handleSubmit}> 
            <p style={{textAlign:"center", color:"red"}}>{this.state.error}</p>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" autocomplete="off" className="form-control" placeholder="Enter email" name="email" value={this.state.email} onChange={this.handleChange} required/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" autocomplete="off" className="form-control" placeholder="Enter password" name="password" value={this.state.password} onChange={this.handleChange}   required/>
                </div>
                <br/>
                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                
            </form>
        );
    }
}