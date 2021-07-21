/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect} from 'react';
import {Route, Redirect} from 'react-router-dom';
import AuthContext from '../../context/autenticacion/authContext';

//  Higher order component
const RutaPrivada = ({component: Component, ...props}) => {

    console.log();

    const authContext = useContext(AuthContext);
    const {autenticado, cargando, usuarioAutenticado} = authContext;

    useEffect(() => {
        usuarioAutenticado();
        // eslint-disable-next-line
    }, []);

    return(
        <Route { ...props } render={props => !autenticado && !cargando ? (
            <Redirect to="/"  />
            ) : (
                <Component {...props} />
            )}
        />
    );
}

export default RutaPrivada;
