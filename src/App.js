import logo from './logo.svg';
import './App.css';
import Header from './Header/Header.js'
import EspecialidadesDoctorPage from './Pages/EspecialidadeDoctor/viewList/EspecialidadesDoctorPage.js';
import EspecialidadeDoctorPage from './Pages/EspecialidadeDoctor/Form/EspecialidadeDoctorPage.js';
import AgendasDoctorPage from './Pages/AgendaDoutor/viewList/AgendasDoctorPage.js';
import AgendaDoctorPage from './Pages/AgendaDoutor/Form/AgendaDoctorPage.js';
import Login from './Pages/Auth/Login.js';
import Home from './Pages/Home/Home.js';
import ConsultasPage from'./Pages/Consultas/ConsultaView/ConsultasPage.js'
import FormPage from'./Pages/Consultas/Form/FormPage.js';
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import PrivateRoutes from './Pages/Protected/PrivateRoutes.js';
import AuthPage from './Pages/Auth/AuthPage.js';

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoutes />,
    children:[
     
      {
        path: "/home",
        element: <Home />
      },
      {
        path: 'especialidades/doctor',
        element: <EspecialidadesDoctorPage/>
      },
      {
        path:'especialidade/doctor',
        element: <EspecialidadeDoctorPage/>

      },{
        path: '/agendas',
        element: <AgendasDoctorPage/>
      },
      {
        path:'agenda/nova-agenda',
        element:<AgendaDoctorPage/>
      },      {
        path:"consultas",
        element: <ConsultasPage/>
      },
      ,
      {
        path:"agendar-consulta",
        element: <FormPage/>
      }
    ]
  },
  
  {
    path: 'auth',
    element: <AuthPage/>
  }
  
]);

function App() {
  return (
    <>
<Header/>
  <RouterProvider router={router}/>

    </>
  );
}

export default App;
