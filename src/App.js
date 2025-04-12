import { useState } from 'react'
import './App.css'

function AddAssignment() {
  function handleSubmit() {
    
  }
  return (
    <>
    <form>
    <div><input type="number" placeholder='Enter assignment/assessment grade'/></div>
    <div><input type="dropdown" placeholder='Enter grade category'/></div>
    <button type="submit" onClick={handleSubmit}></button>
    </form>
    </>
  )
}

function GradeCalculator() {
  const [currentGrade, setCurrentGrade] = useState(0)
  return (
  <div className="background-app">
    <div className="background-grades">
      <div className="display-grade">
        Grade Calculator
        <br />
        {currentGrade}
      </div>
      <div className="assignments">
        <AddAssignment>
        </AddAssignment>
      </div>
    </div>
    </div>
  )
}

export default GradeCalculator;