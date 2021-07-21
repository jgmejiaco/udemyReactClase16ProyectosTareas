import React, {useReducer} from 'react';

import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';
import { 
    FORMULARIO_PROYECTO, 
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTO,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO,
    PROYECTO_ERROR,
    // VALIDAR_FORMULARIO,
} from '../../types';

import clienteAxios from '../../config/axios';

const ProyectoState = props => {

    const initialState = {
        proyectos : [],
        formulario : false,
        errorformulario : false,
        proyecto : null,
        mensaje : null
    }

    //  Dispatch para ejecutar las accciones
    const [state, dispatch] = useReducer(proyectoReducer, initialState);

    //  Serie de funciones para el CRUD (Create, Read, Update y Delete)
    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        })
    }
    
    //  Obtener los Proyectos
    const obtenerProyectos = async () => {
        try {

            const resultado =  await clienteAxios.get('/api/proyectos');

            dispatch({
                type: OBTENER_PROYECTOS,
                payload: resultado.data.proyectos
            })
            
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
             dispatch({
                 type: PROYECTO_ERROR,
                 payload: alerta
             })
        }
    }

    //  Agregar nuevo proyecto
    const agregarProyecto = async proyecto => {

        try {
            const resultado = await clienteAxios.post('/api/proyectos', proyecto);
            console.log(resultado);
            // Insertar el proyecto en el state
            dispatch({
                type: AGREGAR_PROYECTO,
                payload: resultado.data
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
             dispatch({
                 type: PROYECTO_ERROR,
                 payload: alerta
             })
        }
    }

    //  Validar formulario por errores
    const mostrarError = () => {
        dispatch({
            type: VALIDAR_FORMULARIO
        })
    }

    //  Selecciona el proyecto que el usuario dió click
    const proyectoActual = proyectoId => {
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyectoId
        })
    }

    //  Elimina un proyecto
    const eliminarProyecto = async proyectoId => {
       try {
           await clienteAxios.delete(`/api/proyectos/${proyectoId}`);
            dispatch({
                type: ELIMINAR_PROYECTO,
                payload: proyectoId
            })
       } catch (error) {
           const alerta = {
               msg: 'Hubo un error',
               categoria: 'alerta-error'
           }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
       }
    }

    return (
        <proyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                formulario: state.formulario, // State de una sola palabra en minúsculas
                errorformulario: state.errorformulario,
                proyecto: state.proyecto,
                mensaje: state.mensaje,
                mostrarFormulario, // las funciones de 2 palabras con camelCase
                obtenerProyectos,
                agregarProyecto,
                mostrarError,
                proyectoActual,
                eliminarProyecto
            }}
        >
            {props.children}
        </proyectoContext.Provider>
    )
}

export default ProyectoState;