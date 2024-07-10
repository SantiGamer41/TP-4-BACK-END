import { conn } from "../db.js";

const getCanciones = async (_, res) => {
    
    const [rows, fields] = await conn.query(`
    SELECT canciones.id, canciones.nombre, artistas.nombre AS nombre_artista, albumes.nombre AS nombre_album, canciones.duracion, canciones.reproducciones  
    from canciones
    JOIN albumes on canciones.album = albumes.id
    JOIN artistas on albumes.artista = artistas.id`);
    res.json(rows);
};
    // Completar con la consulta que devuelve todas las canciones
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        [
            {
                "id": "Id de la canción",
                "nombre": "Nombre de la canción",
                "nombre_artista": "Nombre del artista",
                "nombre_album": "Nombre del album",
                "duracion": "Duración de la canción",
                "reproducciones": "Reproducciones de la canción"
            },
            {
                "id": "Id de la canción",
                "nombre": "Nombre de la canción",
                "nombre_artista": "Nombre del artista",
                "nombre_album": "Nombre del album",
                "duracion": "Duración de la canción",
                "reproducciones": "Reproducciones de la canción"
            },
            ...
        ]
    */

const getCancion = async (req, res) => {
   
    const id = req.params.id;
    const [rows, fields] = await conn.query(`
    SELECT canciones.id, canciones.nombre, artistas.nombre AS nombre_artista, albumes.nombre AS nombre_album, canciones.duracion, canciones.reproducciones  
    from canciones
    JOIN albumes on canciones.album = albumes.id
    JOIN artistas on albumes.artista = artistas.id
    WHERE canciones.id = ?`,[id]);
    res.json(rows[0]);
     // Completar con la consulta que devuelve una canción
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        {
            "id": "Id de la canción",
            "nombre": "Nombre de la canción",
            "nombre_artista": "Id del artista",
            "nombre_album": "Id del album",
            "duracion": "Duración de la canción",
            "reproducciones": "Reproducciones de la canción"
        }
    */

   
};

const createCancion = async (req, res) => {
    
    const nombre = req.body.nombre;
    const album = req.body.album;
    const duracion = req.body.duracion;
    const [rows, fields] = await conn.query('INSERT INTO canciones (nombre,album,duracion) VALUES (?,?,?)',[nombre,album,duracion]);
    res.send(`Se Creó La Canción: ${nombre} En El Album ${album} Con Una Duración De ${duracion} Segundos`);
    // Completar con la consulta que crea una canción
    // Recordar que los parámetros de una consulta POST se encuentran en req.body
    // Deberían recibir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre de la canción",
            "album": "Id del album",
            "duracion": "Duración de la canción",
        }
    */
    // (Reproducciones se inicializa en 0)
};

const updateCancion = async (req, res) => {
   
    const id = req.params.id;
    const nombre = req.body.nombre;
    const album = req.body.album;
    const duracion = req.body.duracion;    
    const [rows, fields] = await conn.query(`UPDATE canciones SET nombre = ?, album = ?, duracion = ?
    WHERE id = ?`,[nombre,album,duracion,id]);
    res.send(`Se Updateo La Canción ${nombre} el album ahora es ${album} y una duración de ${duracion}`);
     // Completar con la consulta que actualiza una canción
    // Recordar que los parámetros de una consulta PUT se encuentran en req.body
    // Deberían recibir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre de la canción",
            "album": "Id del album",
            "duracion": "Duración de la canción",
        }
    */
    // (Reproducciones no se puede modificar con esta consulta)
};

const deleteCancion = async (req, res) => {
  const id = req.params.id;
    const [rows, fields] = await conn.query(`DELETE FROM canciones WHERE id = ?`,[id]);
    res.send(`Se Eliminó La Canción Seleccionada`);
    // Completar con la consulta que elimina una canción
    // Recordar que los parámetros de una consulta DELETE se encuentran en req.params
    
};

const reproducirCancion = async (req, res) => {
   const id = req.params.id;  
    const [rows, fields] = await conn.query(`UPDATE canciones SET reproducciones = reproducciones + 1
    WHERE id = ?`,[id]);
    res.send(`Se Ha Sumado Una Reproducción`);
     // Completar con la consulta que aumenta las reproducciones de una canción
    // En este caso es una consulta PUT, pero no recibe ningún parámetro en el body, solo en los params
    
};

const canciones = {
    getCanciones,
    getCancion,
    createCancion,
    updateCancion,
    deleteCancion,
    reproducirCancion,
};

export default canciones;