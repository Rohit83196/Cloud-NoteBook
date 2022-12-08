import React from 'react';

function Alert(props) {
    const capitalize = (word)=>{
        if (word === "danger") {
          word = "error"
        }
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase()+lower.slice(1);
    }
  return (
    <div style={{height:'50px'}}>
        {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert" >
            <stromg>{capitalize(props.alert.type)}</stromg> : {props.alert.mes}
            </div>}
    </div>
   
  );
}

export default Alert;
