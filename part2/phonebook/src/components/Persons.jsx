import React from 'react';

export const Persons=({filterNames})=>{
    return(
     <div>
       {
        filterNames.map((person) => (
          <div key={person.id}>
            <p>{person.name}:{person.number}</p>
          </div>
        ))
      }
     </div>
    )
}