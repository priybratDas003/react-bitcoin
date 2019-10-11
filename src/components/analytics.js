import React from 'react';
import axios from 'axios';
import {withRouter,Link,Redirect} from 'react-router-dom';
import getfeed from '../services/feeds';
import store from '../store/store';
import Head from './header';
const COUNTRY_API='https://api.coindesk.com/v1/bpi/supported-currencies.json';
const RATE_API='https://api.coindesk.com/v1/bpi/currentprice/';
const CORS='https://cors-anywhere.herokuapp.com/';
const custombtnMargin = {
  marginTop: '-40px'
}; 
const customTableStyle = {
    borderRadius: '25px'
}
const customBorderStyle = {
    border: '0px'
}
const  customSelect= {
    width: '7vw'
}
export default class Analytics extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={
            isLoading:true,
            loadingError:'',
            time:{},
            disclaimer:{},
            bpi:{},
            error:'',
            countryData:[],
            currency:'',
            country:null,
            rate:null,
            data:[],
            time:{},
            Disclaimer:'',
            loadData:false,
            loadDataError:'',
        }
    }
    changeCurrency=(e)=>
    {
        store.dispatch({type:'CHANGE_CURRENCY',payload:{currency:e.target.value}});

    }
    callRateApi = ()=>
    {
            axios.get(CORS+RATE_API+this.customState.currency+'.json').then(res=>
            {
            let data=res.data.bpi[this.customState.currency];
            let obj=this.customState;
            obj.country=data.description;
            obj.rate=data.rate;
            obj.loadData=false;
            obj.loadDataError='';
            this.setcustomState({obj});
            },err=>{
                let obj=this.customState;
                obj.loadDataError='Can\'t Load The Data Right Now!!';});
    }

    componentDidMount()
    {
        this.callAPI();
        getfeed().then(
            (res)=>{
                let x=this.state;
                x.bpi=res.data.bpi;
                x.time=res.data.time;
                x.disclaimer=res.data.disclaimer
                x.isLoading=false;
                x.loadingError='';
                this.setState({x});
            },(err)=>{
                let x=this.state;
                x.loadingError="Error !! Can't Load."
                x.isLoading=false;
                this.setState({x});
            }
        )
    }
    callAPI= async ()=>
    {
        let x = await store.getState();
        axios.get(CORS+RATE_API+x.currency+'.json').then(res=>
            {
            try
            {
            if(res!=null)
            {
            let data=res.data.bpi[this.state.currency];
            let obj=this.state;
            obj.country=data.description;
            obj.rate=data.rate;
            obj.time=res.data.time;
            obj.Disclaimer=res.data.disclaimer;
            obj.loadData=false;
            obj.loadDataError='';
            console.log(obj);
            this.setState({obj});
            }
        }catch
        {
            console.error("FAiled to load");

        }
            },err=>{
                let obj=this.state;
                obj.loadDataError='Can\'t Load The Data Right Now!!';});
        axios.get(CORS+COUNTRY_API).then((res)=>{
            this.setState({countryData:res.data,isLoading:false});
        },(error)=>{console.log(error);
        this.setState({error:"Failed to Load",isLoading:false});

    })

    }
    render()
    {
        store.subscribe(
            ()=>{
                let x = this.state;
                x.currency=store.getState().currency;
                x.redirect='rd';
                this.setState({x});
                this.callAPI();
            }
        )
        if(this.state.isLoading)
        {
            return <React.Fragment><div className='spinner-border text-muted spi '></div></React.Fragment>
        }
        return(
            <div>
                <Head></Head>
                
                
                <table className=' tb table table-dark table-striped table-hover tableStyle' style={customTableStyle}>
                    <thead>
                        <tr className='text-center'>
                            <td colSpan='3' style={customBorderStyle}>
                                <div className='pull-left logo' ><i class="fa fa-btc" aria-hidden="true"></i></div>
                                <div className='typv'> BITCOIN MONITOR </div>
                            </td>
                        </tr>
                        <tr>
                        <th className='text-center'>
                            Currency 
                        </th>
                        <th className='text-center'>
                            Rate (1 Bitcoin Equals)
                        </th>
                        <th className='text-center'>
                            Trade 
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td className='text-center'>
                            {this.state.bpi["USD"]["code"]}
                        </td>
                        <td className='text-center'>
                        &#36; {this.state.bpi["USD"]["rate"]}
                        </td>
                        <td className='text-center'>
                            <button className='btn btn-success'>Buy</button>
                        </td>
                        </tr>
                        <tr>
                        <td className='text-center'>
                            {this.state.bpi["GBP"]["code"]}
                        </td>
                        <td className='text-center'>
                        &pound; {this.state.bpi["GBP"]["rate"]}
                        </td>
                        <td className='text-center'>
                            <button className='btn btn-success'>Buy</button>
                        </td>
                        </tr>
                        <tr>
                        <td className='text-center'>
                        {this.state.bpi["EUR"]["code"]}
                        </td>
                        <td className='text-center'>
                        &#8364; {this.state.bpi["EUR"]["rate"]}
                        </td>
                        <td className='text-center'>
                            <button className='btn btn-success'>Buy</button>
                        </td>
                        </tr>
                        <tr>
                            <td className='text-center'>
                                <select className='selector' style={customSelect} onChange={(e)=>{this.changeCurrency(e);}}>
                                    <option defaultValue >select currency</option>
                                    {this.state.isLoading?<option>Loading...</option>:
                                    this.state.error.length>0?<option>Failed to Load</option>:
                                    this.state.countryData.map(
                                        ai=><option value={ai.currency} key={ai.currency} >{ai.symbol}{ai.currency}</option>)
                                    }
                                </select>
                            </td>
                            <td className='text-center'>
                                {this.state.currency} {this.state.rate} 
                            </td>
                            <td className='text-center'>
                                <button className='btn btn-success'>Buy</button>
                            </td>
                        </tr>

                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan='3' className='disc text-muted text-center bg-secondry'>
                                <marquee>
                                    *Disclaimer: {this.state.disclaimer}
                                    
                                </marquee>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        )

    }
}