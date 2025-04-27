import { useState, useEffect } from "react";

function AssignmentsForm() {

    let [gradeNeeded, setGradeNeeded] = useState(0)
    let [desiredCategory, setDesiredCategory] = useState(0)
    let [desiredFinalGrade, setDesiredFinalGrade] = useState(0)
    let [keyNumber, setKeyNumber] = useState(1)
    let [assignments, setAssignments] = useState([])
    let [categories, setCategories] = useState([])
    let [newCategory, setNewCategories] = useState({
      categoryType: '',
      weighting: 0,
    })
    let [newAssignment, setNewAssignment] = useState({
      assignmentGrade: '',
      assignmentCategory: '',
      key: keyNumber
    })
    let [ setupFinished, setSetupFinished ] = useState(false)

    // useEffect(() => {

    //   console.log("Selection value updated ", newAssignment.assignmentCategory)
    // }, [newAssignment])
  
    function handleSubmitForAssignments(e) {
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

    function handleSubmitForCategories(e) {
      e.preventDefault(); // https://stackoverflow.com/questions/23427384/get-form-data-in-react
      setCategories(previousCategories => [...previousCategories, newCategory]);
      // setKeyNumber(keyNumber + 1)
      console.log(categories)
      setNewCategories({
        categoryType: '',
        weighting: ''
        // key: {keyNumber}
      })
      
  
    }

    function handleChangeForAssignments(e) {
      const { name, value } = e.target;
      if (name == 'categoryType') {
        setNewAssignment(previousNewAssignments => ({
          ...previousNewAssignments,
          assignmentCategory: value
        }));
      } else {
        setNewAssignment(previousNewAssignments => ({ // https://stackoverflow.com/questions/54676966/push-method-in-react-hooks-usestate
          ...previousNewAssignments,
          [name]: value
        }));
      }
    }

    function handleChangeForCategories(e) {
      const { name, value } = e.target;
      setNewCategories(previousNewCategories => ({
        ...previousNewCategories,
        [name]: value
      }));
    }

    function handleRemoveForAssignments(assignment) {
      let filteredAssignments = assignments.filter(otherGrades => otherGrades !== assignment)
      setAssignments(filteredAssignments)
      console.log(assignments)
    }

    function handleRemoveForCategories(category) {
      let filteredCategories = categories.filter(otherCategories => otherCategories !== category)
      setCategories(filteredCategories)
      console.log(categories)
    }

    function handleGrading() {
      let weightDesired = 0;
      setGradeNeeded(0);

      categories.forEach(category => {
        weightDesired = (category.categoryType == desiredCategory ? (category.weighting / 100) : 0);
      });

      categories.forEach(category => {
        let total = 0;
        let numberOfAssignments = 0;
        let currentWeighting = 0;
        assignments.forEach(assignment => {
          // console.log(assignment.assignmentCategory)
          // console.log(desiredCategory)
          if(String(assignment.assignmentCategory) !== String(desiredCategory) && String(assignment.assignmentCategory) === String(category.categoryType)) {
            total += parseInt(assignment.assignmentGrade);
            numberOfAssignments += 1;
            currentWeighting = parseInt(category.weighting) / 100;
            }
          console.log(total)
          console.log(currentWeighting)
        })
        
        total = (total / numberOfAssignments) * (parseInt(currentWeighting))
          // console.log(total)
          
        setGradeNeeded(gradeNeeded + total)
      });

      // console.log(gradeNeeded)
      
      // let total = 0;
      // let numberOfAssignments = 0;
      // assignments.forEach(assignment => {
      //   if(String(assignment.assignmentCategory) == String(desiredCategory)) {
      //     total += parseInt(assignment.assignmentGrade)
      //     numberOfAssignments += 1;
      //   }
      // })
      // total = (total / numberOfAssignments) * weightDesired
      // setGradeNeeded(((desiredFinalGrade - gradeNeeded) / weightDesired) - total)

    }

if(setupFinished == false) {
  return(
    <>
    {categories.map(category => { // https://stackoverflow.com/questions/38282997/rendering-an-array-map-in-react
      return(
          <>
            <p>{category.weighting} {category.categoryType}</p>
            <button onClick={() => handleRemoveForCategories(category)}>Remove</button>
          </>
        );
      })}
    <form>
      <input
      type="number"
       name="weighting"
       placeholder='Enter weighting of class'
       value={newCategory.weighting}
       onChange={handleChangeForCategories}>
       </input>
       <input
       name="categoryType"
       placeholder='Enter assignment category'
       value={newCategory.categoryType}
       onChange={handleChangeForCategories}>
       </input>
      <button onClick={handleSubmitForCategories} >Enter New Category</button>
      <button onClick={() => setSetupFinished(true)} >Finish</button>
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
            <button onClick={() => handleRemoveForAssignments(assignment)}>Remove</button>
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
          onChange={handleChangeForAssignments}
          />
          
        </div>
        <div>
          <select 
          name="assignmentCategory"
          value={newAssignment.assignmentCategory}
          onChange={(e) => setNewAssignment(previousNewAssignments => ({
            ...previousNewAssignments,
            assignmentCategory: e.target.value
          }))}
          >
            {categories.map((category) => { // https://stackoverflow.com/questions/63095583/looping-through-an-array-in-react-and-adding-them-to-a-select-option
              return(
                <> 
                <option value={category.categoryType}>{category.categoryType}</option>
                </>
              )
              })}
          </select>
        </div>
        <button type="submit" onClick={handleSubmitForAssignments}>Add Assignment</button>
        <div>
          <h1>What is the last assignment to be input?</h1>
        <select 
          name="desiredCategory"
          value={desiredCategory}
          onChange={(e) => setDesiredCategory(e.target.value)}
          >
            {categories.map((category) => { // https://stackoverflow.com/questions/63095583/looping-through-an-array-in-react-and-adding-them-to-a-select-option
              return(
                <> 
                <option value={category.categoryType}>{category.categoryType}</option>
                </>
              )
              })}
          </select>
          <input 
          type="number" 
          name="desiredFinalGrade"
          placeholder='Enter final assignment/assessment grade needed' 
          value={desiredFinalGrade}
          onChange={(e) => setDesiredFinalGrade(e.target.value)}
          />
          <button type="button" onClick={() => handleGrading()}>
            Calculate!
          </button>
        </div>
        <div>
          <h1>{gradeNeeded}</h1>
        </div>
        <button type="submit" onClick={() => setSetupFinished(false)}>Go Back!</button>
        </form>
        </div>
        
      </>
    )
  }
}
export default AssignmentsForm;