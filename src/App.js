import logo from './logo.svg';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import AdminPanel from './components/admin/AdminPanel/AdminPanel';
import CustomerPanel from './components/customer/CustomerPanel/CustomerPanel';
import EmployeePanel from './components/employee/EmployeePanel/EmployeePanel';


function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Navigate to="login"/>} />
      <Route path='/login' element={<Login/>}/>
      <Route path='/customerdashboard' element={<CustomerPanel/>}/>
      <Route path='/admindashboard' element={<AdminPanel/>}/>
      <Route path='/employeedashboard' element={<EmployeePanel/>}/>
    </Routes>
    </>
  );
}

export default App;
