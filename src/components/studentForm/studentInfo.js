import React, { useState,useContext } from 'react';
import {Notification} from "react-pnotify";
import StudentDataService from '../../services/StudentService';
import "./studentInfo.css";
import ViewStudent from '../viewStudent/viewStudent';


export default function StudentInfo() 
{
  const [State,setState] = useState({
      name :"",
      dateofbirth:"",
      class:"I",
      division:'A',
      gender:"Male",
      notifications:[],
      errors : {}
  })

  const handleSubmit = (e) =>
  {
  //  e.preventDefault();
   if(handleValidation())
   {
   console.log("correct");

   let student;
   student = {
                name:State.name,
                dateOfBirth:State.dateofbirth,
                className:State.class,
                division:State.division,
                gender:State.gender
             }
             console.log(student);
             StudentDataService.create(student)
                .then(res => {
                  console.log(res.data)
                  if("errors" in res.data)
                  {
                    setState({...State,
                    notifications: [...State.notifications,
                      <Notification
                          type="error"
                          title={"Fields are empty or invalid fields"}
                          delay={1500}
                          shadow={false}
                          hide={false}
                          nonblock={true}
                          desktop={true}/>]
                    })
                  }
                  else
                  {
                    setState({
                      ...State,
                      notifications: [...State.notifications,
                          <Notification
                              type="success"
                              text="Successfully Verified"
                              delay={500}
                              shadow={false}
                              hide={true}
                              nonblock={false}
                              desktop={false}/>],
                              is_verified: true
                    })
                    console.log(State.notifications.text);
                  }
              });
            }
            else
            {
              //
            }
  //  dispatch({type:"save student",payload:false});
  
  }

  //validation
  const handleValidation=()=>{
    console.log("h");
    let errors = {},
    isValid = true;

    //For Name
    if(State.name === ""){
       isValid = false;
       errors["name"] = "Enter your Name!"
    }
    else if(!State.name.match(/^[a-zA-Z\s]*$/))
    {
      isValid = false;
      errors["name"] = "Name can only have letters and spaces!"
    }
    
    //For DateofBirth
    if(State.dateofbirth === ""){
      isValid = false;
       errors["dateofbirth"] = "Enter your date of birth!"
    }
    // else
    // {
    // var pattern = /(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/;
    // if(!State.dateofbirth.match(pattern))
    // {
    //     errors["dateofbirth"] = "Your Age should be below 18!"
    // }
    // else{
    //   //
    // }
    // }

    //For Class
    if(State.class === ""){
       isValid = false;
       errors["class"] = "Choose your class"
    }

    //For Division 
    if(State.division === ""){
        isValid = false;
        errors["division"] = "Choose your division"
    }

    //For Gender
    if(State.gender === ""){
      isValid = false;
        errors["gender"] = "Select your gender"
    }
    
      
    setState({...State,errors:errors});
    return isValid;
 } 

 const handleChange = (event) =>
 {
    setState({...State, [event.target.getAttribute('name')]: event.target.value})
 }

  return(
    <div className = "container-fluid">
      <div>
        <div className="bg-light m-3">
          <span className="d-flex bd-highlight   ">
            <div className="font-style p-3 flex-grow-1 bd-highlight font-weight-bold">STUDENT-ENROLLMENT</div>
          </span>   
        </div>
      </div>
      <div class="container-fluid">
      <div className="row">
          
            <div className="col-sm-6  mb-3">
              <div className="card shadow p-3">
              <form onSubmit={(e)=>handleSubmit(e)} id="formid">
              <div className="card-header bg-transparent">
                <label className="form-check-label d-flex justify-content-center font-style " htmlFor="exampleCheck1" >Student Details</label>
              </div>
              <div className="card-body">
                <div className="form-group ">
                  <label className="d-flex justify-content-left font-weight-bold">Enter Name</label>
                  <input type="text"
                         
                         placeholder ="Name" 
                         className="form-control mt-3" 
                         id="name"
                         name="name"
                         onChange = {(event) =>handleChange(event)}
                         onKeyPress="return (event.charCode > 64 && event.charCode < 91) || (event.charCode > 96 && event.charCode < 123) || (event.charCode==32)"
                    /> 
                    <div severity="error" className="text-danger d-flex mt-1 show-alert">{State.errors.name}</div>
                    {/* <div className="text-danger">Hello</div> */}
                  {/* {ShippingState.is_Alert?<Alert severity="error">This is an error alert — check it out!</Alert>:null}    */}
                </div>
                <div className="form-group">
                  <label className="d-flex justify-content-left font-weight-bold">Enter Date of Birth</label>
                  <input type="date" 
                    placeholder ="Date Of Birth" className="form-control" 
                    id="dateofbirth" 
                    name="dateofbirth"
                    value={State.dateofbirth}
                    onChange = {(event) =>handleChange(event)}
                    
                   />
                   <div severity="error" className="text-danger d-flex mt-1">{State.errors.dateofbirth}</div>
                </div>
                <div className="row">
                    <div className="form-group col-sm-6">
                        <label className="d-flex justify-content-left font-weight-bold">Choose Class</label>
                        <select className="form-control" id="class" placeholder="choose class" value={State.class}
                            onChange = {(event) => setState({...State,class: event.target.value})} required>
                            <option defaultValue="I">I</option>
                            <option value="II">II</option>
                            <option value="III">III</option>
                            <option value="IV">IV</option>
                            <option value="V">V</option>
                            <option value="VI">VI</option>
                            <option value="VII">VII</option>
                            <option value="VIII">VIII</option>
                            <option value="IX">IX</option>
                            <option value="X">X</option>
                            <option value="XI">XI</option>
                            <option value="XII">XII</option>
                        </select>
                        <div severity="error" className="text-danger d-flex mt-1">{State.errors.class}</div>
                    </div>
                    <div className="form-group col-sm-6">
                        <label className="d-flex justify-content-left font-weight-bold">Choose Division</label>
                        <select className="form-control" id="division" placeholder="choose division" value={State.division}
                            onChange ={(event) =>handleChange(event)} required>
                            <option defaultValue="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                        </select>
                        <div severity="error" className="text-danger d-flex mt-1">{State.errors.division}</div>
                    </div>
                </div>
                <div className="form-group" onChange = {(event) =>handleChange(event)} required>
                    <label className="d-flex justify-content-left font-weight-bold">Gender</label>
                    <div class="row" >
                        <div class="form-group col-sm-6 d-flex justify-content-left">
                            <label  htmlFor="exampleRadios1" >
                            <input  type="radio" className="mr-2" name="gender" id="exampleRadios1" value="Male" defaultChecked />
                                Male
                            </label>
                        </div>
                        <div class="form-group col-sm-6 d-flex justify-content-left">
                            <label  htmlFor="exampleRadios2" className="pl-2">
                                <input  type="radio" name="gender" className="mr-2" id="exampleRadios2" value="Female"/>  
                                Female
                            </label>
                        </div>
                    </div>

                </div>
              </div>
              <div className="card-footer bg-transparent">
                <span className = "form-group d-flex justify-content-right ">
                  <button type="submit" className="btn btn-primary col-sm-12" id="formid" >Submit</button>
                </span>
              </div>
              </form>
              </div>
            </div>
            
            <div className="col-sm-6 mb-3">
                <div className="card shadow card-height">
                   <ViewStudent/>
                </div>
            </div>
        </div> 
      </div>
    </div>
    );
}