import React from 'react';

export const Persons=({filterNames,remove})=>{
    return(
     <div>
       {
        filterNames.map((person) => (
          <div key={person.id}>
            <p>{person.name}:{person.number}
              <button key={person.id} onClick={()=>remove(person.id)}>delete</button>
            </p>
          </div>
        ))
      }
     </div>
    )
}