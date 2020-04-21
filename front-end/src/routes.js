import React from 'react'
import {BrowserRouter, Route,Switch} from 'react-router-dom';

import LoginId from './pages/loginID';
import LoginSession from './pages/loginSession';
import DashboardGs from './pages/dashboardGs';
import Cadastro from './pages/cadastro';
import Editar from './pages/editar';

export default function Routes(){
  return(
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={LoginId}/>
        <Route path="/login" component={LoginSession}/>
        <Route path="/dashboardgs" exact component={DashboardGs}/>
        <Route path="/dashboardgs/cadastro" component={Cadastro}/>
        <Route path="/dashboardgs/editar" component={Editar}/>
      </Switch>
    </BrowserRouter>
  )
}