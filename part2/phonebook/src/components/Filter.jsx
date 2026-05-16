import React from 'react';

export const  Filter=({search,handleSearch})=>{
    return(
       <div>

        <form action="">
        <div>
          filter shown with :<input value={search} onChange={handleSearch} />
        </div>
      </form>
       </div>
    )
}

