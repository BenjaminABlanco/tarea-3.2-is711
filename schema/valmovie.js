const z = require('zod')

const peliculaschema = z.object({
    id: z.string().uuid(),
    title: z.string(),
    year: z.number().int().positive().min(1000).max(2024),
    director: z.string(),
    duration: z.number().positive(),
    poster: z.string().url(),
    genre: z.array(z.string()),
    rate: z.number().nonnegative()
})

const validarPelicula = (pelicula)=>{
    return peliculaschema.safeParse(pelicula)
}

module.exports={
    validarPelicula
}