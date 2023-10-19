import React from 'react';

const Pay = () => {

    const handleClick = () =>{
        document.getElementById('paid').innerHTML = "You have successfully purchased the Tickets!\n Happy Journey!!!";
    }

  return (
    <div>
        <p id = 'paid'></p>
        <button onClick = {handleClick}>Pay</button>
    </div>
    
  )
}

export default Pay;