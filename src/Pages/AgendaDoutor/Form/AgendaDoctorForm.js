import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import FieldArray from './NestedForm/fieldArray.js';
import '../../../input.css';
import { useNavigate, useSearchParams } from "react-router-dom";
import { isDateAfterType } from "react-day-picker";
import { GiConsoleController } from "react-icons/gi";

export default function AgendaDoctorForm() {

  const[especialidades, setEspecialidades] = useState([]);
  const[agenda, setAgenda] = useState([]);
  const navigate = useNavigate();

  const defaultValues = {
    speciality:"1",
    doctorID: localStorage.getItem("id"),
    schedule:[{}]
  };
  const {
    control,
    register,
    handleSubmit,
    getValues,
    errors,
    reset,
    setValue
  } = useForm({defaultValues: defaultValues});

const[searchParams, setSearchParams] = useSearchParams();
  useEffect(() =>{
    const doctorID = searchParams.get("doctorID");
        const specialityID = searchParams.get("speciality");

          if(doctorID != null){
      
            fetch(`${process.env.REACT_APP_URI_API}/Doctor/${doctorID}/schedule/${specialityID}`,{
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
          setAgenda(data.data);
          var scheduleAux=[];
          if(data.data.schedule.length > 0){
            console.log(data.data.schedule.length)
            reset({
              speciality:data.data.speciality,
              doctorID: localStorage.getItem("id"),
              schedule: data.data.schedule
            });
          }
         
         })
         .catch(error => console.error(error));
          }
      
    fetch(`${process.env.REACT_APP_URI_API}/Doctor/${localStorage.getItem("id")}/speciality`,{
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
     setEspecialidades(data.data)
   return data;
    })
    .catch(error => console.error(error));

  },[]);

  




  function onSubmit(data) {


    data.schedule.map((item, k)=>{

          item.scheduleTime = item.scheduleTime.filter(s => s.time != false && s.time != true)

    })

    fetch(`${process.env.REACT_APP_URI_API}/Doctor/schedule`, {
      method:  "POST",
      body: JSON.stringify(data),
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
        navigate({pathname:"/agendas"})

       return data;

      }
  
    })
    .catch(error => console.error(error));

  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full text-center">
      <h1>Quadro de horário</h1>
      <p>
        Segue abaixo a configuração dos seus horários.
      </p>
      Especialidade da Agenda
      <select defaultValue={agenda && agenda.speciality} className="flex self-center" {...register("speciality")}>
        {especialidades && especialidades.map((item, index)=>{

            return (
                <option key={index} value={item.speciality} >{item.description}</option>
            )
        })}


    </select>
      <FieldArray
        {...{ control, register, defaultValues, getValues, setValue, errors,reset }}
      />

      <input type="submit" />
    </form>
  );
}
