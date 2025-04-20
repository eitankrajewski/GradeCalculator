import { useState } from 'react'
import './App.css'
import AssignmentsForm from './components/AssignmentsForm'


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
      {/* <ul>
        assignments.forEach(element => {
          assignments
        });
      </ul> */}
        {/* <AssignmentsDisplay /> */}
        <AssignmentsForm />
      </div>
    </div>
    </div>
  )
}

export default GradeCalculator;