import React, { useState } from 'react'

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

  // increment the property 2 value by one
  // copy[2] += 1

  return (
    <div>
      <div>
        {anecdotes[selected]}
      </div>
      <div>has {copy[selected]} votes</div>
      <Button handleClick={voteHandler} text="vote"/>
      <Button handleClick={generateRandomNumber} text="next anecdote"/>
    </div>
  )
}

export default App