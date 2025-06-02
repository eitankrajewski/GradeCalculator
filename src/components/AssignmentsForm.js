import { useState, useEffect } from "react";

function AssignmentsForm() {

    let [gradeNeeded, setGradeNeeded] = useState(0)
    let [desiredCategory, setDesiredCategory] = useState("")
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

    useEffect(() => {
      let data = window.localStorage.getItem("CATEGORIES");
      if(data) {
        setCategories(JSON.parse(data))
      }
      data = window.localStorage.getItem("GRADE_NEEDED");
      if(data) {
        setGradeNeeded(JSON.parse(data))
      }
      data = window.localStorage.getItem("DESIRED_CATEGORY");
      if(data) {
        setDesiredCategory(JSON.parse(data))
      }
      data = window.localStorage.getItem("DESIRED_FINAL_GRADE");
      if(data) {
        setDesiredFinalGrade(JSON.parse(data))
      }
      data = window.localStorage.getItem("KEY_NUMBER");
      if(data) {
        setKeyNumber(JSON.parse(data))
      }
      data = window.localStorage.getItem("ASSIGNMENTS");
      if(data) {
        setAssignments(JSON.parse(data))
      }
      data = window.localStorage.getItem("NEW_CATEGORY");
      if(data) {
        setNewAssignment(JSON.parse(data))
      }
      data = window.localStorage.getItem("NEW_ASSIGNMENT");
      if(data) {
        setNewAssignment(JSON.parse(data))
      }
      data = window.localStorage.getItem("SETUP_FINISHED");
      if(data) {
        setSetupFinished(JSON.parse(data))
      }
    }, [])

    useEffect(() => {
      window.localStorage.setItem("GRADE_NEEDED", JSON.stringify(gradeNeeded));
      window.localStorage.setItem("DESIRED_CATEGORY", JSON.stringify(desiredCategory));
      window.localStorage.setItem("DESIRED_FINAL_GRADE", JSON.stringify(desiredFinalGrade));
      window.localStorage.setItem("KEY_NUMBER", JSON.stringify(keyNumber));
      window.localStorage.setItem("ASSIGNMENTS", JSON.stringify(assignments));
      window.localStorage.setItem("CATEGORIES", JSON.stringify(categories));
      window.localStorage.setItem("NEW_CATEGORY", JSON.stringify({newCategory}));
      window.localStorage.setItem("NEW_ASSIGNMENT", JSON.stringify({newAssignment}));
      window.localStorage.setItem("SETUP_FINISHED", JSON.stringify(setupFinished));
    }, [gradeNeeded, desiredCategory, desiredFinalGrade, keyNumber, assignments, categories,
      newCategory, newAssignment, setupFinished]);
  
    function handleSubmitForAssignments(e) {
      e.preventDefault(); // https://stackoverflow.com/questions/23427384/get-form-data-in-react
      setAssignments(previousAssignments => [...previousAssignments, newAssignment]);
      setKeyNumber(k => k + 1)
      setNewAssignment({
        assignmentGrade: '',
        assignmentCategory: '',
        key: {keyNumber}
      })
      console.log(assignments)
  
    }

    function handleSubmitForCategories(e) {
      e.preventDefault(); // https://stackoverflow.com/questions/23427384/get-form-data-in-react
      setCategories(previousCategories => [...previousCategories, newCategory]);
      // setKeyNumber(keyNumber + 1)
      console.log(categories)
      setNewCategories({
        categoryType: '',
        weighting: ''
      })

      // let total = 0;
      // categories.forEach(category => {
      //     total += parseInt(category.weighting);
      // });
      // if(total === 100) {
      //   updateTotalIs100();
      // } else {
      //   updateTotalIs100();
      // }
    }

    function handleChangeForAssignments(e) {
      const { name, value } = e.target;
      if (name === 'categoryType') {
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
      let currentWeighting = 0;
      let totalGrade = 0;
      let totalForAssignments = 0;
      let totalNumberOfAssignments = 0;
      setGradeNeeded(0);

      categories.forEach(category => {
        totalForAssignments = 0;
        totalNumberOfAssignments = 0;
        if(category.categoryType !== desiredCategory) {
          currentWeighting = parseInt(category.weighting) / 100;
          assignments.forEach(assignment => {
            if(assignment.assignmentCategory === category.categoryType) {
              totalForAssignments += parseFloat(assignment.assignmentGrade)
              totalNumberOfAssignments += 1;
            }
          })
          if(totalNumberOfAssignments !== 0) {
            totalGrade += (totalForAssignments / totalNumberOfAssignments) * currentWeighting
          }
        }
      })

      totalForAssignments = 0;
      totalNumberOfAssignments = 1;
      categories.forEach(category => {
        if(category.categoryType === desiredCategory) {
          currentWeighting = parseInt(category.weighting) / 100;
          assignments.forEach(assignment => {
            if(assignment.assignmentCategory === category.categoryType) {
              totalForAssignments += parseFloat(assignment.assignmentGrade)
              totalNumberOfAssignments += 1;
            }
          })
        }
      })


      setGradeNeeded((((desiredFinalGrade - totalGrade)*(totalNumberOfAssignments)/currentWeighting) - totalForAssignments))

    }

if(setupFinished === false) {
  return(
    <>
    {categories.map(category => { // https://stackoverflow.com/questions/38282997/rendering-an-array-map-in-react
      return(
          <>
            <p>Category Weighting: {category.weighting} Category Type: {category.categoryType}</p>
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
      <button onClick={(e) => {
        e.preventDefault();
        let total = 0;
        categories.forEach(category => {
          total += parseInt(category.weighting);
        });
        if(categories.length === 0) {
          console.log("Insert more categories!")
        } else if(total !== 100) {
          console.log(total)
          console.log("Weighting doesn't add up to 100!")
        } else {
          setSetupFinished(true)
        }
      }
      } >Finish</button>
      {/* {!totalIs100 && <div>Total is not 100!</div>} */}
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
            <p key={assignment.key}>Assignment Grade: {assignment.assignmentGrade} Assignment Category: {assignment.assignmentCategory}</p>
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
            <option default value="">Select a category</option>
            {categories.map((category) => { // https://stackoverflow.com/questions/63095583/looping-through-an-array-in-react-and-adding-them-to-a-select-option
              return(
                <> 
                <option value={category.categoryType}>{category.categoryType}</option>
                </>
              )
              })}
          </select>
          {newAssignment.assignmentCategory === "" && <div>Select an option from the dropdown!</div>}
        </div>
        <button disabled={newAssignment.assignmentCategory === ""} 
        type="submit" 
        onClick={handleSubmitForAssignments}>
          Add Assignment
          </button>
        <div>
          <h1>What is the last assignment type to be graded, and what is the desired ending grade?</h1>
        <select 
          name="desiredCategory"
          value={desiredCategory}
          onChange={(e) => setDesiredCategory(e.target.value)}
          >
            <option value="">Select a category</option>
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
          <button disabled={desiredCategory === ""}type="button" onClick={() => handleGrading()}>
            Calculate!
          </button>
          {desiredCategory === "" && <div>Select an option from the dropdown!</div>}
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