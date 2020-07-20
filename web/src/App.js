import React from 'react'
import {useParams} from 'react-router-dom'

const App = () => {

   
    const [equipo, setEquipo] = React.useState([])

    React.useEffect(() => {
        obtenerDatos()
    }, [])

    const obtenerDatos = async () => {
        const data = await fetch('https://www.etnassoft.com/api/v1/get/?num_items=25')
        const title = await data.json()
        //console.log()
        setEquipo(title)
    }

    return (
        <div>
            <h1>CATOLOGO GENERAL:</h1>

                <div class="col-lg-14" >
                <div class="row mx-md-5">
                  <ul class="list-group">
                    {
                     equipo.map(item =>(
                     
                    <a href="#" class="list-group-item list-group-item-action "key="item.ID">
                        <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">Titulo: {item.title}</h5>
                        </div>
                        <p class="mb-1">Autor: {item.author}</p>
                        <small>Lenguaje:  {item.language}.</small>
                     
                    </a>
                        )) 
                    }
                    </ul>
                     </div>
                </div>
            </div>
        
        
    )
}

export default App