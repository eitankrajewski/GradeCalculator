import { useState } from 'react';

export default function GradeManager() {

    const [option1, setOption1] = useState("")

    function handleButtonClick1(e) {
        setOption1("Pick up")
    } 

    function handleButtonClick2(e) {
        setOption1("Delivery")
    }

    return(
        <>
        <p>What is the grading type?</p>
        <label>
            <input type="radio" value={"Pick up"} checked={option1 === "Pick up"} onClick={handleButtonClick1}/>
            Option 1
        </label>
        <label>
        <input type="radio" value={"Delivery"} checked={option1 === "Delivery"} onClick={handleButtonClick2}/>
            Option 2
        </label>
        {/* <option>Hello</option> */}
        </>
    )
}