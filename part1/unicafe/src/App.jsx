import { useState } from 'react'
import { Header } from './components/Header'
import { Statistics } from './components/Statistics';

const App = () => {

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
 
  function rateGood(){
    setGood(good=>good+1);
  }
   function rateNeutral(){
    setNeutral(neutral=>neutral+1);
  }
   function rateBad(){
    setBad(bad=>bad+1);
  }

  const total=good+neutral+bad;
  const average=total===0?0:(good-bad)/total;
  const positiveFeedback=total===0 ? 0:(good/total)*100;
  return (
    <div>
     <Header good={rateGood} neutral={rateNeutral} bad={rateBad} />
     <Statistics good={good} neutral={neutral} bad={bad} average={average} total={total} positive={positiveFeedback}/>
    </div>
  )
}

export default App   