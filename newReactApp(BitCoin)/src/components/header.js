import React from 'react';
import store from '../store/store';
import getfeed from '../services/feeds';
import {Link,Redirect} from 'react-router-dom';
const customLogOutBtn ={
    backgroundColor: '#cfb53c',
    borderColor: '#cfb53c'
}
export default class Head extends React.Component
{
    constructor(props)
    {
        super(props);
        let x=store.getState();
        this.customState={
            emailId:x.emailId,
            loggedIn:x.loggedIn,
            time:{},
            disclaimer:{},
            bpi:{}
        }
    }
       componentDidMount()
    {
        getfeed().then(
            (res)=>{
                let x=this.customState;
                x.bpi=res.data.bpi;
                x.time=res.data.time;
                x.disclaimer=res.data.disclaimer
                x.isLoading=false;
                x.loadingError='';
                this.setState({x});
            },(err)=>{
                let x=this.customState;
                x.loadingError="Error !! Can't Load."
                x.isLoading=false;
                this.setState({x});
            }
        )
    }
    logout=()=>
    {
        store.dispatch({type:'LOG_OUT'});
    }
    render()
    {
        return this.customState.loggedIn?(
        <div className='customTopHeader'>
            <div className='pull-left logo' >{this.customState.time.updated}</div>
            <div className='pull-right'>
                <Link to='/login'><button onClick={()=>{this.logout()}} className='btn btm' style={customLogOutBtn}><i class="fa fa-power-off" aria-hidden="true"></i></button></Link>
            </div>
        </div>):<Redirect to='/login'></Redirect>;
    }
} 