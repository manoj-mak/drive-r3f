import React, { useState,useEffect } from 'react';

function PrizePot({ prizePot }) {
    const [prize, setPrize] = useState(0);


    //get the prize pot from local storage to update
    useEffect(() => {
        setInterval(() => {
            const prizePot = localStorage.getItem('score');
            if (prizePot != null) {
                setPrize(prizePot);
            }
            else{
                setPrize(0);
            }
            
            
        }, 500);
    }, [prizePot]);


   


  return (
    <div style={{ position: 'absolute', top: '10px', right: '10px',  display:'flex',flexDirection:'row',fontFamily:'Anton',fontSize:'2em'}}>
      <div style={{color:'white',marginRight:'5px'}}> Prize Pot : </div>
      <h7 id='prizecount' style={{color:'#c75e14',marginRight:'5px'}}> {prize}</h7>
    </div>
  );
}

export default PrizePot;
