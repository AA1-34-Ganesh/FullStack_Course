import React from "react";
import '../index.css'
function Notification({message,type}){
       if(message===null){
            return null;
          }
    return(
        <>
           <p className={type}>
              {message}
           </p>
        </>
    )
}

export default Notification