import { Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './components/Auth/Login';
import { Register } from './components/Auth/Register';
import { Home } from './components/Home/Home';
import { Layout } from './components/Layout';
import { useAuth } from './app/hooks'
import { Passive } from './components/Passive/Passive';
import { Wallet } from './components/Wallet/Wallet';
import { Stocks } from './components/Stocks/Stocks';
import { FormContext, HistoryContext } from './context/context';
import { useState } from 'react';

const App: React.FunctionComponent = () => {
  let userAuth = useAuth();
  let [formDisplay, setFormDisplay] = useState<boolean>(false);
  let [historyDisplay, setHistoryDisplay] = useState<boolean>(false);
  
  return(
    <FormContext.Provider value={{formDisplay, setFormDisplay}}>
      <HistoryContext.Provider value={{historyDisplay, setHistoryDisplay}}>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index element={(userAuth) ? <Home/> : <Navigate to={'/login'}/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/register' element={<Register/>}></Route>
            <Route path='/wallet' element={<Wallet/>}></Route>
            <Route path='/stocks' element={<Stocks/>}></Route>
            <Route path='/passive' element={<Passive/>}></Route>
          </Route>
        </Routes>
      </HistoryContext.Provider>
    </FormContext.Provider>
)}


export default App;
