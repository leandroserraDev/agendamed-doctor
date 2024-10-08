import { useNavigate , createSearchParams, Navigate, useSearchParams } from "react-router-dom";


export default function ItemTableEspecialidade({data}){
    const navigate =  useNavigate();

        function MudarStatus(){
   
    fetch(`${process.env.REACT_APP_URI_API}/Doctor/${data.doctorID}/speciality/${data.speciality}/mudarstatus`,{
        method:"PATCH",
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
        window.location.reload()
  
    })
    .catch(error => console.error(error));

}

    return (
        <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {data.description}
                </th>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {data.description}
                </th>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {data.deleted? "Inativo": "Ativo"}
                </th>
          
                <td className="px-6 py-4 text-right">
                
                    <button onClick={MudarStatus} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                        {data.deleted? "Ativar" : "Desativar"}</button>
                
                
                </td>
            </tr>
        </tbody>
   )
}
