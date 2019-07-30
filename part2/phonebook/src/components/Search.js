import React, {useState} from 'react';

const Search = ({onChange})=> {

    return(
        <div>
            Search: <input onChange={onChange} />
            </div>
    )
}

export default Search;