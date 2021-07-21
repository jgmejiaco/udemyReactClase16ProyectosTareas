import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './components/auth/Login';
import NuevaCuenta from './components/auth/NuevaCuenta';
import Proyectos from './components/proyectos/Proyectos';

import ProyectoState from './context/proyectos/proyectoState';
import TareaState from './context/tareas/tareaState';
import AlertaState from './context/alertas/alertaState';
import AuthState from './context/autenticacion/authState';
import tokenAuth from './config/token';
import RutaPrivada from './components/rutas/RutaPrivada';

//  Revisar si tenemos un token
const token = localStorage.getItem('token');
if(token) {
  tokenAuth(token);
}

function App() {

  return (
    <ProyectoState>
      <TareaState>
        <AlertaState>
          <AuthState>
            <Router> {/* Lo que esté dentro del Router pero fuera del switch se verá en todas las páginas */}
              <Switch> {/* Lo que esté dentro del Switch es la lista de páginas */}
                <Route exact path="/" component={Login} /> {/*Usuario para autenticar*/}
                <Route exact path="/nueva-cuenta" component={NuevaCuenta} /> {/*Se crea nueva cuenta*/}
                <RutaPrivada exact path="/proyectos" component={Proyectos} /> {/*Usuario ya autenticado*/}
              </Switch>
            </Router>
          </AuthState>
        </AlertaState>
      </TareaState>
    </ProyectoState>
  );
}

export default App;
