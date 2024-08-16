import { useNavigate , createSearchParams, Navigate, useSearchParams } from "react-router-dom";


export default function ItemTableAgenda({data}){
    const navigate =  useNavigate();

    const goToAgenda = () =>
        navigate({
          pathname: '/agenda/nova-agenda',
          search: `${createSearchParams({doctorID: data.doctorID, speciality: data.speciality})}`,
        });

        function MudarStatus(){
   
    fetch(`${process.env.REACT_APP_URI_API}/Doctor/${data.doctorID}/speciality/${data.speciality}/mudarstatus`,{
        method:"PATCH"
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
                  {data.specialityName}
                </th>
                <td className="px-6 py-4 text-right">
                
                <button      onClick={goToAgenda}  className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
            
            
            </td>

            </tr>
          
        </tbody>
   )
}
