import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Header = () =>{

    return (
        <h1>Give us feedback</h1>
    )
}

const Button = ({onClick, text}) =>{

    return (
        <button onClick={onClick}>{text}</button>
    )
}

const Statistic = ({text, stat}) =>{

    return(
        <tr>
            <td>{text} </td>
            <td>{stat}</td>
        </tr>
    )
}


const Statistics = ({good, neutral, bad}) =>{
    let all = bad + neutral + good;
    let average = (good-bad)/all
    let positive =  good/(good+bad)
    
    
    return (
        <div>
            <h1>Statistics</h1>
            <table>
                <tbody>
            <Statistic text="Good" stat={good} />
            <Statistic text="Neutral" stat={neutral} />
            <Statistic text="Bad" stat={bad} />
            <Statistic text="All" stat={all} />
            <Statistic text="Average" stat={average} />
            <Statistic text="Positive" stat={(positive * 100)+"%"} />
            </tbody>
            </table>
        </div>
    )
}

const Content = ({good, neutral, bad}) => {

    if(good + neutral + bad){
        return(
            <div>
                <Statistics good = {good} neutral={neutral} bad={bad}/>
            </div>
        )
    } else {
        return (
            <p>
                No feedback given.
            </p>
        )
    }
    
}

const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleGood = () =>{
        setGood(good +1)
    }
    const handleNeutral = () =>{
        setNeutral(neutral +1)
    }
    const handleBad = () =>{
        setBad(bad +1)
    }

  
    return (
        <div>
        <Header />
        <Button onClick={handleGood} text="Good" />
        <Button onClick={handleNeutral} text="Neutral" />
        <Button onClick={handleBad} text="Bad" />
        <Content good = {good} neutral={neutral} bad={bad}/>
      </div>
    )
  }
  
  ReactDOM.render(<App />, 
    document.getElementById('root')
  )