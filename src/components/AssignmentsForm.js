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
    let [ setupFinished, setSetupFinished ] = useState(false)
  
    function handleSubmit(e) {
      e.preventDefault(); // https://stackoverflow.com/questions/23427384/get-form-data-in-react
      setAssignments(previousAssignments => [...previousAssignments, newAssignment]);
      setKeyNumber(keyNumber + 1)
      console.log(assignments)
      setNewAssignment({
        assignmentGrade: '',
        assignmentCategory: '',
        key: {keyNumber}
      })
  
    }
    function handleChange(e) {
      const { name, value } = e.target;
      setNewAssignment(previousNewAssignments => ({ // https://stackoverflow.com/questions/54676966/push-method-in-react-hooks-usestate
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
      <button type="submit" onClick={() => setSetupFinished(true)} ></button>
    </form>
   </>
  )
} else {
  return (  
    <>

    <div>
      {assignments.map(assignment => { // https://stackoverflow.com/questions/38282997/rendering-an-array-map-in-react
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