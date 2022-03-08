import { Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './components/Auth/Login';
import { Register } from './components/Auth/Register';
import { Home } from './components/Home/Home';
import { useSelector } from 'react-redux'
import { Layout } from './components/Layout';
import { RootState } from './app/store';
import { useEffect } from 'react';
import { useAuth } from './app/hooks'

const App: React.FunctionComponent = () => {
  let userAuth = useAuth();
  
  return(
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={(userAuth) ? <Home/> : <Navigate to={'/login'}/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
      </Route>
    </Routes>
)}


export default App;
