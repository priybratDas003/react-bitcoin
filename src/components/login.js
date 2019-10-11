import React from 'react';
import {Redirect,Link} from 'react-router-dom';
import store from '../store/store';

const divStyle = {
  fontSize: '60px'
};  
const customLoginBtn={
    backgroundColor: '#041f3f'
}

export default class Login extends React.Component
{
    

    constructor(props)
    {
        super(props);
        this.state={
            emailId:'',
            password:'',
            disabled:true,
            loggedIn:false
        }
    }
    validate=()=>
    {
        let x=this.state;
        if(x.emailId!='' && x.password!='')
        {
            x.disabled=false;   
        }
        else
        {
            x.disabled=true;
        }
        this.setState({x});
    }
    handleChange=(e)=>
    {
        let x=this.state;
        x[e.target.name]=e.target.value;
        this.setState({x});
        this.validate();
    }
    login=(e)=>{
        e.preventDefault();
        store.dispatch({type:'LOG_IN',payload:{emailId:this.state.emailId}});
    }
    componentDidMount()
    {
        let x=store.getState();
        if(x.loggedIn)
        {
            this.setState({loggedIn:true});
        }
    }
    render()
    {
        store.subscribe(()=>{
            let x = store.getState();
            if(x.loggedIn)
            {
                this.setState({loggedIn:true})
            } 
        })
        return this.state.loggedIn?<Redirect to='/instructions'/>:(<div className='container-fluid '>
            <div className='row bounce'>
                <div className='offset-md-4 col-md-4 log'>
                <h1 className='text-center hed'><i className="fa fa-user-circle-o" style={divStyle}  aria-hidden="true"></i></h1>
                    <br/><br/>
                        <form method='POST'>
                            <input type='email' name='emailId' placeholder='Email ID' className='form-control text-center intyp' onChange={(e)=>this.handleChange(e)}/>
                            <br/>
                            <input type='password' name='password' placeholder='Password' className='form-control text-center intyp' onChange={(e)=>this.handleChange(e)}/> 
                            <br/>
                            <Link to='/instruction'><button type='submit' className='btn btn-dark form-control' style={customLoginBtn} disabled={this.state.disabled} onClick={(e)=>this.login(e)}>Login <i className="fa fa-sign-in" aria-hidden="true" ></i></button></Link>
                        </form>
                </div>
            </div>
        </div>);

    }
}