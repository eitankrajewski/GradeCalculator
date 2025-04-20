import { useState } from "react";

function AssignmentsForm() {

    let [assignments, setAssignments] = useState([])
    let [newAssignment, setNewAssignment] = useState({
      assignmentGrade: '',
      assignmentCategory: ''
    })  
  
    function handleSubmit(e) {
      e.preventDefault();
      setAssignments(previousAssignments => [...previousAssignments, newAssignment]);
      console.log(newAssignment)
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
      {/* <ul> */}
        {assignments.map(assignment => (
        <li>{assignment.assignmentGrade}</li>,
        <button onClick={() => assignments.filter(assignment)}>Remove</button>
        ))}

      {/* </ul> */}
      <form>
      <div>
        <input 
        type="number" 
        name="assignmentGrade"
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
        </select>
      </div>
      <button type="submit" onClick={handleSubmit}>Add Assignment</button>
      </form>
      </>
    )
  }

export default AssignmentsForm;