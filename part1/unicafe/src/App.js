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


const Statistics = (props) => {


  if (props.statistics.all === 0) {
    return (
      <h2>
        No feedback given 
      </h2>
    )
  }
  return (
    <div>      
      <Feedback name={"good"} feedback={props.statistics.good}/>
      <Feedback name={"neutral"} feedback={props.statistics.neutral}/>
      <Feedback name={"bad"} feedback={props.statistics.bad}/>
      <Feedback name={"all"} feedback={props.statistics.all}/>
      <Feedback name={"average"} feedback={props.statistics.average()}/>
      <Feedback name={"positive"} feedback={props.statistics.positive()}/>
    </div>
  )
}




const App = () => {
  // save clicks of each button to its own state
  
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = (good + neutral + bad);

  const average = () => {
    return ((good * 1) + (neutral * 0) + (bad * -1)) / all
  }

  const positive = () => {
    return (((good + neutral)/ all) * 100).toString() + " %"
  }
  
  const unicafe = {
    feedbackname: "give feedback",
    statisticsname: "statistics",
    statistics: {
      good: good,
      neutral: neutral,
      bad: bad,
      all: all,
      average: average,
      positive: positive
    }
  }


  return (
    <div>
      <HeaderFeedback name={unicafe.feedbackname}/>
      <Button handleClick={() => setGood(good + 1)} text="good"/>
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral"/>
      <Button handleClick={() => setBad(bad + 1)} text="bad"/>
      <HeaderStatistics name={unicafe.statisticsname}/>
      <Statistics statistics={unicafe.statistics}/>
    </div>
  )
}

export default App