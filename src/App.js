import { useState } from 'react'
import './App.css'

function AddAssignment() {

  const [assignments, setAssignments] = useState([])
  const [newAssignment, setNewAssignment] = useState({
    assignmentGrade: '',
    assignmentCategory: ''
  })  

  function handleSubmit(e) {
    e.preventDefault();
    setAssignments(previousAssignments => [...previousAssignments, newAssignment]);
    setNewAssignment({
      assignmentGrade: '',
      assignmentCategory: ''
    })


  }
  function handleChange(e) {
    const { name, value } = e.target;

    setNewAssignment(previousNewAssignments => ({
      ...previousNewAssignments,
      [name]: value
    }));
  }

  return (
    <>
    <form>
    <div>
      <input type="number" 
      placeholder='Enter assignment/assessment grade' 
      value={newAssignment.assignmentGrade}
      onChange={handleChange}
      />
      
    </div>
    <div>
      <select
      name="assignmentCategory"
      value={newAssignment.assignmentCategory}
      onChange={handleChange}
      >
        <option value="">Select an assignment type</option>
        <option value="Assignment">Assignment</option>
        <option value="Assessment">Summative Assessment</option>
        <option value="Other 1">Select an assignment type</option>
      </select>
    </div>
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