import { useState } from 'react'
import './App.css'

function AddAssignment() {
  return (
    <>
    <div><input type="number"/></div>
    </>
  )
}

function GradeCalculator() {
  const [currentGrade, setCurrentGrade] = useState(null)
  return (
  <div className="background-app">
    <div className="background-grades">
      <div className="display-grade">
        Grade Calculator
        <br />
        00.00%
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