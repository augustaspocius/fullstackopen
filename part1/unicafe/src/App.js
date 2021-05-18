import React, { useState } from 'react'

const HeaderFeedback = (props) => {
  return (
    <h1>{props.name}</h1>
  )
}

const HeaderStatistics = (props) => {
  return (
    <h1>{props.name}</h1>
  )
}

const Feedback = (props) => {
  return (
    <div>{props.name} {props.feedback}</div>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)




const App = () => {
  // save clicks of each button to its own state
  const unicafe = {
    feedbackname: "give feedback",
    statisticsname: "statistics"
  }


  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad;


  const average = () => {
    return ((good * 1) + (neutral * 0) + (bad * -1)) / all
  }

  const positive = () => {
    return (((good + neutral)/ all) * 100).toString() + " %"
  }

  return (
    <div>
      <HeaderFeedback name={unicafe.feedbackname}/>
      <Button handleClick={() => setGood(good + 1)} text="good"/>
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral"/>
      <Button handleClick={() => setBad(bad + 1)} text="bad"/>
      <HeaderStatistics name={unicafe.statisticsname}/>
      <Feedback name={"good"} feedback={good}/>
      <Feedback name={"neutral"} feedback={neutral}/>
      <Feedback name={"bad"} feedback={bad}/>
      <Feedback name={"all"} feedback={all}/>
      <Feedback name={"average"} feedback={average()}/>
      <Feedback name={"positive"} feedback={positive()}/>

    </div>
  )
}

export default App