import { useEffect, useState } from 'react';
import '../../../input.css';
import ConsultaPage from '../ConsultaPage.js';
import { useNavigate,createSearchParams } from 'react-router-dom';
import TableConsulta from './TableConsulta.js';




function ConsultasPage(){
    const [consultas, setConsultas] = useState([]);
const navigate = useNavigate();
const goToNewConsulta = () =>
   navigate({
     pathname: '/agendar-consulta'
   });
    useEffect(() =>{

        fetch(`${process.env.REACT_APP_URI_API}/doctor/appointments`,{
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
      console.log(data)
      setConsultas(data.data)
   
     })
     .catch(error => console.error(error));
   },[])
    return (
    <>
   
    <TableConsulta consultas={consultas}/>
    </>
    )
}

export default ConsultasPage;