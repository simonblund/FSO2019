import React from 'react';

const Form = ({handleChange, action, newVariables})=> {
    return(
        <form onSubmit={action}>
            <Input onChange={handleChange.name} text="name" value={newVariables.name}/>
            <Input onChange={handleChange.number} text="phone" value={newVariables.number}/>
            <div>
            <button type="submit">add</button>
            </div>
        </form>  
    )
}

const Input = ({onChange, text, value}) =>{

    return(
        <div>
            {text}: <input onChange={onChange} value={value}/>
            
            </div>
    )
}

export default Form;