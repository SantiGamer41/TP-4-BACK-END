import { conn } from "../db.js";

const getAlbumes = async (_, res) => {
    // Completar con la consulta que devuelve todos los albumes
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        [
            {
                "id": 1,
                "nombre": "Nombre del album",
                "nombre_artista": "Nombre del artista"
            },
            {
                "id": 2,
                "nombre": "Nombre del album",
                "nombre_artista": "Nombre del artista"
            },
            ...
        ]
    */

    const [rows, fields] = await conn.query(`
    SELECT albumes.id,albumes.nombre,artistas.nombre AS nombre_artista from albumes
    JOIN artistas on artistas.id=albumes.artista`);
    res.json(rows);
};

const getAlbum = async (req, res) => {
    // Completar con la consulta que devuelve un album por id
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        {
            "id": 1,
            "nombre": "Nombre del album",
            "nombre_artista": "Nombre del artista"
        }
    */
    const id = req.params.id;
    const [rows, fields] = await conn.query(`
    SELECT albumes.id,albumes.nombre,artistas.nombre AS nombre_artista from albumes
    JOIN artistas on artistas.id=albumes.artista
    WHERE albumes.id= ?`,[id]);
    res.json(rows[0]);
};

const createAlbum = async (req, res) => {
    // Completar con la consulta que crea un album
    // Recordar que los parámetros de una consulta POST se encuentran en req.body
    // Deberían recbir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre del album",
            "artista": "Id del artista"
        }
    */
    const nombre = req.body.nombre;
    const artista = req.body.artista;
    const [rows, fields] = await conn.query('INSERT INTO albumes (nombre,artista) VALUES (?,?)',[nombre,artista]);
    res.send(`Se ha creado el correctamente el album: ${nombre}`);
};

const updateAlbum = async (req, res) => {
    // Completar con la consulta que actualiza un album
    // Recordar que en este caso tienen parámetros en req.params (el id) y en req.body (los demás datos)
    // Deberían recbir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre del album",
            "artista": "Id del artista"
        }
    */
    const id = req.params.id;
    const nombre = req.body.nombre;
    const artista = req.body.artista;
    const [rows, fields] = await conn.query(`UPDATE albumes SET nombre = ?, artista =?
    WHERE id = ?`,[nombre,artista,id]);
    res.send(`El albuem se actualizó correctamente`);

};

const deleteAlbum = async (req, res) => {
    // Completar con la consulta que elimina un album
    // Recordar que los parámetros de una consulta DELETE se encuentran en req.params
    const id = req.params.id;
    const [rows, fields] = await conn.query(`DELETE FROM albumes WHERE id = ?`,[id]);
    res.send(`El album fue eliminado correctamente`);
};

const getCancionesByAlbum = async (req, res) => {
    // Completar con la consulta que devuelve las canciones de un album
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la misma forma que getCanciones

    const id = req.params.id;
    const [rows, fields] = await conn.query(`
    SELECT canciones.id, canciones.nombre, artistas.nombre AS nombre_artista, albumes.nombre AS nombre_album, canciones.duracion, canciones.reproducciones  
    from canciones
    JOIN albumes on canciones.album = albumes.id
    JOIN artistas on albumes.artista = artistas.id
    WHERE albumes.id = ?`,[id]);
    res.json(rows);
};

const albumes = {
    getAlbumes,
    getAlbum,
    createAlbum,
    updateAlbum,
    deleteAlbum,
    getCancionesByAlbum,
};

export default albumes;