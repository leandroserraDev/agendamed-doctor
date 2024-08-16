import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import '../../../input.css';
import { useNavigate, useSearchParams } from "react-router-dom";

export default function EspecialidadeDoctorForm() {
  const navigate = useNavigate();
  const { register, control, handleSubmit, reset, trigger, setError} = useForm({
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const [doctor, setDoctor] = useState();

  const[errorAPI, setErrorAPI] = useState([]);

//   useEffect(() =>{
//   const idParameter = searchParams.get("id");
//     if(idParameter != null){

//       fetch(`https://localhost:7036/api/Doctor/${idParameter}`)
//    .then( response => {
//       return response.json() 
//    }
 
//   )
//    .then(  data => {
//       setDoctor(data)
//       reset( data);
//    })
//    .catch(error => console.error(error));


//   }
    
//  },[])


  function submitData(data){
    
  var dataSend = {
    "speciality":  parseInt(data.speciality),
    "doctorID": localStorage.getItem("id")
  };
    fetch(`${process.env.REACT_APP_URI_API}/Doctor/speciality`, {
      method:  "POST",
      body: JSON.stringify(dataSend),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
         'Authorization': `Bearer ${localStorage.getItem("token")}`
         }
    })
    .then( response => {
       return response.json() 
    }
  
  )
    .then(  data => {

      if(data.success){
        navigate({pathname:"/especialidades/doctor"})
        return data;
      }
      setErrorAPI(data)
  
    })
    .catch(error => console.error(error));
  };
  
  return (
    <div className="flex absolute w-full h-[90%]  justify-center items-center">

    <form className="flex flex-col w-[50%] border border-black " onSubmit={handleSubmit(data =>submitData(data))}>
      <ul className="flex flex-col">
        Especialidade
        <select {...register("speciality",  {  required: "Please enter your speciality." })}>
  <option value="1">Clínico Geral</option>
  <option value="2">Ortopedista</option>
  <option value="3">Pediatra</option>

</select>
  

      </ul>

      <input type="submit" />
      {
            errorAPI.error && errorAPI.error.map((item,index)=>{
              return(
                <li className=' h-[20px]  text-red-500' key={item.id}>
                  <span>
                    {item.message}
                  </span>
                  </li>
              )
            })
          }
    </form>
    </div>

  );
}
