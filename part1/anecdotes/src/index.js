import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Button = ({onClick, text}) => {

    return (
        <button onClick={onClick}>{text}</button>
    )
}

const Anecdote = ({anecdote, votes}) => {
    return (
        <p>
            {anecdote}<br></br>
            <strong>{votes}</strong>
        </p>
        

    )
}


const App = ({anecdotes, points, rand}) => {
    const [selected, setSelected] = useState(rand)

    const handleNewAnecdote = () => {
        let min = 0
        let max = anecdotes.length
        setSelected(Math.floor(Math.random() * (+max - +min)) + +min)
    }
    const handleNewVote = () => {
        points[selected] = points[selected]+1
        refresh()
    }

    
    return (
      <div>
        <h1>Anecdote of the day</h1>
        <Anecdote anecdote = {anecdotes[selected]} votes ={points[selected]}/>
        <Button onClick = {handleNewAnecdote} text="Random"/>
        <Button onClick = {handleNewVote} text="Vote"/>
        <hr></hr>
        <h1>Anecdote with most votes</h1>
        <Anecdote anecdote={anecdotes[points.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0)]} votes = {Math.max.apply(null,points)}/>
      </div>
    )
  }
  
  const points = Array.apply(null, new Array(6)).map(Number.prototype.valueOf,0);
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const randomAnecdote = () => {
    let min = 0
    let max = anecdotes.length
    return Math.floor(Math.random() * (+max - +min)) + +min
    }
  
  ReactDOM.render(
    <App anecdotes={anecdotes} points = {points} rand= {randomAnecdote}/>,
    document.getElementById('root')
  )

  const refresh = () => {
    ReactDOM.render(<App  anecdotes={anecdotes} points = {points}/>, 
    document.getElementById('root'))
  }

