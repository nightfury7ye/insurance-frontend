import logo from './logo.svg';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import AdminPanel from './components/admin/AdminPanel/AdminPanel';
import CustomerPanel from './components/customer/CustomerPanel/CustomerPanel';
import EmployeePanel from './components/employee/EmployeePanel/EmployeePanel';
import AgentPanel from './components/agent/AgentPanel/AgentPanel';
import RegisterCustomer from './components/registerCustomer/RegisterCustomer';
import Home from './components/home/Home';
import CustomerViewPlans from './components/customer/CustomerViewPlans/CustomerViewPlans';


function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Navigate to="login"/>} />
      <Route path='/home' element={<Home/>}/>
      <Route path='/viewplans' element={<CustomerViewPlans/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<RegisterCustomer/>}/>
      <Route path='/customerdashboard' element={<CustomerPanel/>}/>
      <Route path='/admindashboard' element={<AdminPanel/>}/>
      <Route path='/employeedashboard' element={<EmployeePanel/>}/>
      <Route path='/agentdashboard' element={<AgentPanel/>}/>
    </Routes>
    </>
  );
}

export default App;
