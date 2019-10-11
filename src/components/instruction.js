import React from 'react';
import {Link} from 'react-router-dom'
import store from '../store/store';
import {Redirect} from 'react-router-dom';
const customHeaderBg = {
  backgroundColor: '#062d54'
}; 
const customBtnStyle ={
    backgroundColor: '#cfb53c',
    borderColor: '#cfb53c'
}
export default class Instructions extends React.Component
{
    constructor()
    {
        super();
        let x= store.getState();
        this.state={
            red:x.loggedIn
        }
    }

    render()
    {

        
        let li=[];
        for(let i=1;i<6;i++)
        {
            li.push(<li key={i}>
            <marquee direction = "up">
            Risk Notice - Bitcoin is a not backed or value guaranteed by any financial institution; when purchasing bitcoins the customer assumes all risk the bitcoins may become worthless in value.  Customers should research and consider the risks before purchasing any bitcoins.  The company makes absolutely no guarantee about the future value of the bitcoins purchased.

            No foreign currency exchange - The customer must agree never to exchange bitcoins purchased from Bitcoin Co. Ltd. for any currency other than Thai Baht.  The customer must also guarantee that any bitcoins the customer sells to Bitcoin Co. Ltd. have never been involved in exchange with any currency other than Thai Baht.
             
            Customer input errors - It is the sole responsibility of the customer to check the accuracy of information entered and saved on the website.   Account details displayed on the order summary webpage will be the final transfer destination.  In the case that this information is incorrect, and funds are transferred to an unintended destination, the company shall not reimburse the customer and shall not transfer additional funds.  As such customers must ensure the Bitcoin address and bank information they enter is completely correct. 
            
            Must own the Bitcoin address used - The customer must send any Bitcoin payments to the company from an address owned by the customer.  The company may need to refund the Bitcoin payment, such as if the bank information is incorrect and customer cannot be contacted.  The company will accept no responsibility or issue any compensation if the customer is unable to access a Bitcoin refund due to sending their initial payment from a shared/online wallet.

            Expired orders - If the company receives payment for an order that has already expired, the company reserves the right to recalculate the Bitcoin to Thai Baht exchange rate at the time of processing the transfer to the customer.  This may result in the customer receiving less bitcoins or Thai Baht than the original ordered amount.

            Order under-payment - If the customer pays less than the payment amount for their order and the order expiration time has passed, the company reserves the right to either:

            a) Cancel the order and refund the payment amount
            or
            b) Recalculate the order totals based on the payment amount received and the current bitcoin exchange rate
            </marquee>
             </li>);
            
        }
        // console.log(store.getState());
        store.subscribe(()=>{let x=store.getState();
        if(x.loggedIn===false)
    {
        return <Redirect to = '/login'></Redirect>
    }});
        return this.state.red?(<React.Fragment>
            <div className=' row'>
            <div className='offset-md-2 col-md-8 '>
            <div className='card instr'>
            <div className='card-header instrheadcard' style={customHeaderBg}>
            <h2>INSTRUCTIONS</h2>
            </div>
            <div className='card-body instrbodycard'>
            <ul>{li}</ul>
            </div>
            <div className='card-footer instrfoot text-center' style={customHeaderBg}>
            <Link to='/analytics'><button className='btn btn-primary text-center cus' style={customBtnStyle}>Continue<i class="fa fa-arrow-right"></i></button></Link>
            </div>
            </div>
            </div>
            </div>
            </React.Fragment>):<Redirect to='/login'></Redirect>
    }
}