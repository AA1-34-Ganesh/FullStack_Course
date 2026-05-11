import { useState } from 'react'
import { Header } from './components/Header'
import { Content } from './components/Content'

const App = () => {

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  
  function rateGood(){
    setGood(good+1);
   
  }
   function rateNeutral(){
    setNeutral(neutral+1);
      
  }
   function rateBad(){
    setBad(bad+1);
    
  }
  return (
    <div>
     <Header good={rateGood} neutral={rateNeutral} bad={rateBad} />
     <Content good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App