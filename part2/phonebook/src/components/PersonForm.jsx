import React from 'react';

export const PersonForm=({newName,addDetails,newNumber,handleInputChange,handleInputNumber})=>{
    return(
        <div>
           <form onSubmit={addDetails}>
        <div>
          name:<input value={newName} onChange={handleInputChange} /><br />
          number:<input value={newNumber} onChange={handleInputNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
        </div>
    )
}