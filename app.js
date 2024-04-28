const express = require('express')
const peliculas = require('./movies.json')
const {validarPelicula} = require('./schema/valmovie')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.disable('x-powered-by')

app.get('/',(request,response)=>{
    response.send('Bienvenido')
})

app.get('/peliculas',(request,response)=>{
    response.json(peliculas)
})

app.get('/peliculas/:id',(request,response)=>{
    const {id} = request.params
    const peliculaID = id
    if(!peliculaID){
        response.status(400).json({error:'No hay ninguna pelicula en el catalogo'})
    }
    const pelicula = peliculas.find(({id}) => id === peliculaID)
    response.json(pelicula)
})

app.post('/peliculas',(request,response)=>{
      let data = request.body 
      const validacion = validarPelicula(data)
  
      if(validacion.success)
      {
          data ={
              id: Date.now(),
              ...data
          }
          peliculas.unshift(data)
          response.status(201).json(peliculas)
      }else{
          response.status(400).json(validacion.error)
      }
})

app.put('/peliculas/:id', (request, response) => {
    const { id } = request.params;
    let data = request.body;

    const index = peliculas.findIndex(pelicula => pelicula.id === id);

    if (index === -1) {
        return response.status(404).json({ error: true, message: 'Película no encontrada' });
    }

    peliculas[index] = { ...peliculas[index], ...data };

    response.status(200).json(peliculas[index]);
})

app.delete('/peliculas/:id', (request, response) => {
    const { id } = request.params;

    const index = peliculas.findIndex(pelicula => pelicula.id === id);

    if (index === -1) {
        return response.status(404).json({ error: true, message: 'Película no encontrada' });
    }
    response.status(200).json(peliculas.splice(index, 1)[0]);

});

app.listen(PORT, () => {
    console.log(`Server on port http://localhost:${PORT}`)
})