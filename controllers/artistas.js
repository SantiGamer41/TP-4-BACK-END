import { conn } from "../db.js";

const getArtistas = async (_, res) => {

    const [rows, fields] = await conn.query('SELECT * from artistas');
    res.json(rows);
        // Completar con la consulta que devuelve todos los artistas
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        [
            {
                "id": "Id del artista",
                "nombre": "Nombre del artista"
            },
            {
                "id": "Id del artista",
                "nombre": "Nombre del artista"
            },
            ...
        ]
    */
};

const getArtista = async (req, res) => {

    const id = req.params.id;
    const [rows, fields] = await conn.query('SELECT id,nombre from artistas WHERE id = ?',[id]);
    res.json(rows[0]);
        // Completar con la consulta que devuelve un artista
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        {
            "id": "Id del artista",
            "nombre": "Nombre del artista"
        }
    */
};

const createArtista = async (req, res) => {
    
    const nombre = req.body.nombre;
    const [rows, fields] = await conn.query('INSERT INTO artistas (nombre) VALUES (?)',[nombre]);
    res.send(`Se Creó El Artista: ${nombre}`);
    // Completar con la consulta que crea un artista
    // Recordar que los parámetros de una consulta POST se encuentran en req.body
    // Deberían recibir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre del artista",
        }
    */
};

const updateArtista = async (req, res) => {
   
    const id = req.params.id;
    const nombre = req.body.nombre;
    const [rows, fields] = await conn.query(`UPDATE artistas SET nombre = ? WHERE id = ?`,[nombre,id]);
    res.send(`Se Updateo El Artista ${nombre}`);
    // Completar con la consulta que actualiza un artista
    // Recordar que en este caso tienen parámetros en req.params (el id) y en req.body (los demás datos)
    // Deberían recibir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre del artista"
        }
    */
};

const deleteArtista = async (req, res) => {
   
    const id = req.params.id;
    const [rows, fields] = await conn.query(`DELETE FROM artistas WHERE id = ?`,[id]);
    res.send(`Se Eliminó El Artista`);
    // Completar con la consulta que elimina un artista
    // Recordar que los parámetros de una consulta DELETE se encuentran en req.params
    
};

const getAlbumesByArtista = async (req, res) => {
   
    const id = req.params.id;
    const [rows, fields] = await conn.query(`
    SELECT albumes.id,albumes.nombre,artistas.nombre AS nombre_artista from albumes
    JOIN artistas on artistas.id=albumes.artista
    WHERE artistas.id= ?`,[id]);
    res.json(rows);
    // Completar con la consulta que devuelve las canciones de un artista
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la misma forma que getAlbumes
};

const getCancionesByArtista = async (req, res) => {

    const id = req.params.id;
    const [rows, fields] = await conn.query(`
    SELECT canciones.id, canciones.nombre, artistas.nombre AS nombre_artista, albumes.nombre AS nombre_album, canciones.duracion, canciones.reproducciones  
    from canciones
    JOIN albumes on canciones.album = albumes.id
    JOIN artistas on albumes.artista = artistas.id
    WHERE artistas.id = ?`,[id]);
    res.json(rows);
    // Completar con la consulta que devuelve las canciones de un artista
    // (tener en cuenta que las canciones están asociadas a un álbum, y los álbumes a un artista)
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la misma forma que getCanciones
};

const artistas = {
    getArtistas,
    getArtista,
    createArtista,
    updateArtista,
    deleteArtista,
    getAlbumesByArtista,
    getCancionesByArtista,
};

export default artistas;