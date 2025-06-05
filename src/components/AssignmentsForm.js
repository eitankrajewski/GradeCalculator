import { useState, useEffect } from "react";
import "./AssignmentsForm.css"

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
    <div className="category-page">
    <div className="category-container">
    {categories.map(category => { // https://stackoverflow.com/questions/38282997/rendering-an-array-map-in-react
      return(
          <div className="category-card">
            <div className="remove-button-container">
              <button className="remove-button" onClick={() => handleRemoveForCategories(category)}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg></button>
            </div>
            {/* <p>Category Weighting: <hr/>{category.weighting} <br/>Category Type: {category.categoryType}</p> */}
            <div className="non-remove-icon">
            <p className="subtitle">
            <svg className="icons" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#AAAAAA"><path d="M240-320h320v-80H240v80Zm0-160h480v-80H240v80Zm-80 320q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h240l80 80h320q33 0 56.5 23.5T880-640v400q0 33-23.5 56.5T800-160H160Zm0-80h640v-400H447l-80-80H160v480Zm0 0v-480 480Z"/></svg> 
               Category Name:<hr/></p>
            <p className="data-values">{category.categoryType}</p>
            <p className="subtitle">
            <svg className="icons" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#AAAAAA"><path d="M80-120v-80h360v-447q-26-9-45-28t-28-45H240l120 280q0 50-41 85t-99 35q-58 0-99-35t-41-85l120-280h-80v-80h247q12-35 43-57.5t70-22.5q39 0 70 22.5t43 57.5h247v80h-80l120 280q0 50-41 85t-99 35q-58 0-99-35t-41-85l120-280H593q-9 26-28 45t-45 28v447h360v80H80Zm585-320h150l-75-174-75 174Zm-520 0h150l-75-174-75 174Zm335-280q17 0 28.5-11.5T520-760q0-17-11.5-28.5T480-800q-17 0-28.5 11.5T440-760q0 17 11.5 28.5T480-720Z"/></svg> 
              Category Weighting:<hr/></p>
            <p className="data-values">{category.weighting}</p>
            </div>
          </div>
        );
      })}
    </div>
  <form className="new-item">
    <div className="new-item-info">
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
      <button className="submit-new" onClick={handleSubmitForCategories} >Enter New Category</button>
    </div>
      <button className="submit" onClick={(e) => {
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
   </div>
  )
} else {
  return (  
    <>
    <div className="assignments-page">
      <div className="assignment-container">
      {assignments.map(assignment => { // https://stackoverflow.com/questions/38282997/rendering-an-array-map-in-react
      return(
          <div className="assignment-card">
            <div className="remove-button-container">
              <button className="remove-button" onClick={() => handleRemoveForAssignments(assignment)}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg></button>
            </div>
            <div className="non-remove-icon">
            <p className="subtitle">
            <svg className="icons" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#AAAAAA"><path d="M657-121 544-234l56-56 57 57 127-127 56 56-183 183Zm-537 1v-80h360v80H120Zm0-160v-80h360v80H120Zm0-160v-80h720v80H120Zm0-160v-80h720v80H120Zm0-160v-80h720v80H120Z"/></svg>
              Assignment Grade:<hr/></p>
            <p className="data-values">{assignment.assignmentGrade}</p>
            <p className="subtitle">
            <svg className="icons" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#AAAAAA"><path d="m260-520 220-360 220 360H260ZM700-80q-75 0-127.5-52.5T520-260q0-75 52.5-127.5T700-440q75 0 127.5 52.5T880-260q0 75-52.5 127.5T700-80Zm-580-20v-320h320v320H120Zm580-60q42 0 71-29t29-71q0-42-29-71t-71-29q-42 0-71 29t-29 71q0 42 29 71t71 29Zm-500-20h160v-160H200v160Zm202-420h156l-78-126-78 126Zm78 0ZM360-340Zm340 80Z"/></svg>
              Assignment Category:<hr/></p>
            <p className="data-values">{assignment.assignmentCategory}</p>
            </div>
          </div>
        );
      })}
      </div>
      <form className="center">
        <div className="">
          <div className="new-item row-format">
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
        </div>
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