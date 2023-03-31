import { useEffect, useState } from 'react'
import Die from './Die'
import './App.css'
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'

function App() {

  const [die, setDie] = useState(allNewDice)
  const [tenzies, setTenzies] = useState(false)

useEffect(() => {
  const allHeld = die.every((z) => z.isHeld === true);
  const firstValue = die[0].value;
  const sameValue = die.every((z) => z.value === firstValue);
  if (allHeld && sameValue) {
    setTenzies(true)
  }

},[die])

  function generateNewDie() {
    return {
      value: Math.round(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {
    const dieArray = []
    for (let i = 0; i < 10; i++) {
      dieArray.push(generateNewDie())
    }
      return dieArray
  }

  function rollDice() {
    if(!tenzies) {
        setDie(prevDie => prevDie.map(y => {
        return y.isHeld  ?
        y :
        generateNewDie()      
    }))}
    else {
      setTenzies(false)
      setDie(allNewDice())
    }
  }

  function holdDice(id) {
    setDie(prevDie => prevDie.map(x => {
        return x.id === id ? 
        {...x, isHeld: !x.isHeld} : 
        x
      }))
  }
  
  const diceElement = die.map(num =>(
    <Die  
      value={num.value}
      isHeld={num.isHeld}
      key={num.id}
      holdDice={() => holdDice(num.id)}
      />
    ))


  return (
    <main className='container'>
      {tenzies && <Confetti />}
      {tenzies && <h1>You won!</h1>}
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same.<br></br>
        Click each die to freeze it at its current value between rolls.</p>
        <div className='dice--container'>
          {diceElement}
        </div>
        <button onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
    </main>
  )
}

export default App
