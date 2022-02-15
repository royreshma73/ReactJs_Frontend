import React,{useState,useEffect} from 'react';
import StudentDataService from '../../services/StudentService'

export default function ViewStudent()
{
   const [ViewState,setViewState] = useState({
       students:[]
   })

   useEffect( ()=>
        {
            //fetch all students
            StudentDataService.getAll().then(response => {
                console.log(response.data)
                setViewState({...ViewState,students:response.data});
            }).catch(ex =>
                {
                  console.log(ex.data);
                })

        },[]
    );


    if(ViewState.students.length>0)
    {
        return(
            <div>
                   <div className="card-header bg-transparent">
                        <label className=" d-flex justify-content-center font-style ">Student List</label>
                    </div>
                    <div className="mt-3">
                   <table className="table border-0">
                       <thead>
                           <tr>
                            <th>Roll No</th>
                            <th>Name</th>
                            <th>Class</th>
                            <th>Division</th>
                            <th>Date Of Birth</th>
                            <th>Gender</th>
                           </tr>
                       </thead>
                       <tbody>
                       {ViewState.students.map((student,index)=>
                       
                           <tr key={index}>
                               <td>{student.rollNo}</td>
                               <td>{student.name}</td>
                               <td>{student.className}</td>
                               <td>{student.division}</td>
                               <td>{new Date(student.dateOfBirth).toLocaleDateString()}</td>
                               <td>{student.gender}</td>

                           </tr>
                            )}
                       </tbody>
                      
                   </table>
                   </div>
                
            </div>
        )
    }
    else{
        return (
            <div>
                <div className="card-header bg-transparent">
                    <label className=" d-flex justify-content-center font-style ">Student List</label>
                </div>
                <div className="table border-0">
                    <div className="d-flex justify-content-center p-5"><h6>Oops ...No Students Added Yet!</h6></div>
                </div>
            </div>
        )
    }
}
