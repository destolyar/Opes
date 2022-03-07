import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { Login } from './components/Auth/Login';
import { Register } from './components/Auth/Register';
import { Home } from './components/Home/Home';

import { Layout } from './components/Layout';

const App: React.FunctionComponent = () => {
  let [userLogIn, setUserLogIn] = useState(true)

  return(
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={(userLogIn) ? <Home/> : <Navigate to={'/login'}/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
      </Route>
    </Routes>
)}


export default App;
