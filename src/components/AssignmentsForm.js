import { useState } from "react";

function AssignmentsForm() {

    let [keyNumber, setKeyNumber] = useState(1)
    let [assignments, setAssignments] = useState([])
    let [categories, setCategories] = useState({
      category: '',
      weighting: 0
    })
    let [newAssignment, setNewAssignment] = useState({
      assignmentGrade: '',
      assignmentCategory: '',
      key: keyNumber
    })
    let setupFinished = false;  
  
    function handleSubmit(e) {
      e.preventDefault();
      setAssignments(previousAssignments => [...previousAssignments, newAssignment]);
      setKeyNumber(keyNumber += 1)
      console.log(newAssignment)
      setNewAssignment({
        assignmentGrade: '',
        assignmentCategory: '',
        key: {keyNumber}
      })
  
  
    }
    function handleChange(e) {
      const { name, value } = e.target;
      setNewAssignment(previousNewAssignments => ({
        ...previousNewAssignments,
        [name]: value
      }));
    }

    function handleRemove(assignment) {
      let filteredAssignments = assignments.filter(otherGrades => otherGrades !== assignment)
      setAssignments(filteredAssignments)
      console.log(assignments)
    }

if(setupFinished == false) {
  return(
    <>
    <form>
      <button type="submit" onClick={() => setupFinished = true} ></button>
    </form>
   </>
  )
} else {
  return (  
<>

    <div>
      {assignments.map(assignment => {
      return(
          <>
            <p key={assignment.key}>{assignment.assignmentGrade}</p>
            <button onClick={() => handleRemove(assignment)}>Remove</button>
          </>
        );
      })}
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
        </div>
        
      </>
    )
  }
}
export default AssignmentsForm;