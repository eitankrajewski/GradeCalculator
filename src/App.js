import { useState } from 'react'
import './App.css'
import AssignmentsForm from './components/AssignmentsForm'
import GradeManager from './components/GradeManager'
import Header from './components/Header'


function GradeCalculator() {
  return (
    <>
    <div className="background-app">
    <div className="background-grades">
         <div className="display-grade">
           Grade Calculator<hr className="overall-separation"/>
           <br />
         </div>
         <div className="assignments">
           <AssignmentsForm />
           {/* <GradeManager /> */}
         </div>
       </div>
       </div>
    </>
  )
}

export default GradeCalculator;