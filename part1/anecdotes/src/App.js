import React, { useState } from 'react'

const AnecdoteHeader = (props) => {
  return (
    <h1>{props.name}</h1>
  )
}

const Anecdote = (props) => {
  return (
    <div>
      <div>
        {props.anecdote}
      </div>
      <div>has {props.votes} votes</div>
    </div>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Votes = (props) => {
    return (
      <div>has {props.votes} votes</div>
    )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const points = { 0: 1, 
                  1: 3, 
                  2: 4, 
                  3: 2, 
                  4: 2, 
                  5: 3, 
                  6: 4}
  
  const [selected, setSelected] = useState(0)
  const [copy, vote] = useState({ ...points})

  const generateRandomNumber = () => {
      setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const voteHandler = () => {
      copy[selected]+=1;
      const copy2 = {...copy}
      vote(copy2)
      
  }

  const mostVotes = () => {
    const votes = Object.values(copy);
    const max = Math.max(...votes)

    for (const [key, value] of Object.entries(copy)) {
      if(copy[key] === max){
        return anecdotes[key];
      };
    }
  }

  const mostCount = () => {
    const votes = Object.values(copy);
    const max = Math.max(...votes)

    for (const [key, value] of Object.entries(copy)) {
      if(copy[key] === max){
        return copy[key];
      };
    }
  }

  // increment the property 2 value by one
  // copy[2] += 1

  return (
    
    <div>
      <AnecdoteHeader name={"Anecdote of the day"}/>
      <Anecdote anecdote={anecdotes[selected]} votes={copy[selected]}/>
      <Button handleClick={voteHandler} text="vote"/>
      <Button handleClick={generateRandomNumber} text="next anecdote"/>
      <AnecdoteHeader name={"Anecdote with most votes"}/>
      <Anecdote anecdote={mostVotes()} votes={mostCount()}/>
    </div>
  )
}

export default App