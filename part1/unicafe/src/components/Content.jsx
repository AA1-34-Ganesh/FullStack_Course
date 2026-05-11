import React from "react";

export const Content= (props)=>{
    // console.log(props.good);
    //  console.log(props.neutral);
    //   console.log(props.bad);
    return(
    <div>
     <h1>Statistics</h1>
     <p>Good:{props.good}</p> 
     <p>Neutral:{props.neutral}</p>
     <p>Bad:{props.bad}</p>
     <p>All:{props.total}</p>
     <p>Average:{props.average}</p>
      <p>Positive:{props.positive}%</p>
    </div>
    )
}