var intialState={
    loggedIn:false,
    emailId:'',
    currency:null
}
export default function reducer(state=intialState,action)
{
    let stateCopy=state;
    switch (action.type)
    {
        case 'LOG_IN':
            stateCopy.loggedIn=true;
            stateCopy.emailId=action.payload.emailId;
            return stateCopy;
        case 'LOG_OUT':
            stateCopy.loggedIn=false;
            stateCopy.emailId='';
            return stateCopy;
        case 'CHANGE_CURRENCY':
            stateCopy.currency=action.payload.currency;
            return stateCopy;
        default:
            return stateCopy;
    }
}