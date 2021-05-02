import React, { Component } from "react";
import axios from "axios"
import '../assets/css/index.css';
import Cookies from 'universal-cookie';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official"; 
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
            filecategories:[],
            filedata:[],
            fromCurrency:'INR',
            toCurrency:'USD',
        }
        this.handleFromChange = this.handleFromChange.bind(this);
        this.handleToChange = this.handleToChange.bind(this);
    }

    componentDidMount() {
        axios.post("/api/showTrends",{from:this.state.fromCurrency, to:this.state.toCurrency},{
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
                console.log(response)
                this.setState({filecategories:response.data.datax})
                this.setState({filedata:response.data.datay})
            }
        })
      }

      handleFromChange(event){
        this.setState({fromCurrency:event.target.value})
        axios.post("/api/showTrends",{from:event.target.value, to:this.state.toCurrency},{
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
                console.log(response)
                this.setState({filecategories:response.data.datax})
                this.setState({filedata:response.data.datay})
            }
        })
      }
      handleToChange(event){
        this.setState({toCurrency:event.target.value})
        axios.post("/api/showTrends",{from:this.state.fromCurrency, to:event.target.value},{
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
                console.log(response)
                this.setState({filecategories:response.data.datax})
                this.setState({filedata:response.data.datay})
            }
        })
      }
    


    render() {
        const dataOptions = {
            chart: {
              type: "line"
            },
            title: {
              text: "Last 10 days data (If Available)"
            },
            xAxis: {
              categories: this.state.filecategories,
              title: {text : "Dates"}
            },
            yAxis: {
              title: {text : "Rates"}
        
            },
            series: [
              {
                color: '#6f03fc',
                name:"Last 10 days exchange rates" ,
                data: this.state.filedata
              }
            ]
          };
        return (
            <div className="container">
            <div className="row auth-wrapper" style={{marginTop:"50px"}}>
            <div className="col auth-inner">
                <div className="row ">
                    <div className="col-sm-2 col-md-2 col-lg-2 col-xl-2 col-2">
                    <div class="form-group">
                        <label for="select">From</label>
                        <select class="form-control" id="select" name="fromCurrency" value={this.state.fromCurrency} onChange={this.handleFromChange}>
                        <option>INR</option>
                        <option>USD</option>
                        <option>CAD</option>
                        <option>EUR</option>
                        <option>YPN</option>
                        </select>
                    </div>
                    </div>
                    <div className="col-sm-2 col-md-2 col-lg-2 col-xl-2 col-2">
                    <div class="form-group">
                        <label for="select">To</label>
                        <select class="form-control" id="select" name="toCurrency" value={this.state.toCurrency} onChange={this.handleToChange}>
                        <option>INR</option>
                        <option>USD</option>
                        <option>CAD</option>
                        <option>EUR</option>
                        <option>YPN</option>
                        </select>
                    </div>
                    </div>
                </div>
                    <div className="card">
                    <HighchartsReact style = {{marginBottom : "20px"}}  highcharts={Highcharts} options={dataOptions} />
                    </div>
            </div>
        </div>
      </div>
        );
    }
}