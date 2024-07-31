const dbPool = require('../config/database');
const cuid = require('cuid');

const getAll = () => {
    const SQLQuery =`SELECT * FROM admin_pos `;
    return dbPool.execute(SQLQuery);
}

const getallsearch = (search) => {
    const SQLQuery = `SELECT * FROM admin_pos WHERE location LIKE ?`;
    const searchParam = `%${search}%`;
    return dbPool.execute(SQLQuery, [searchParam])
    .then(([results]) => results);
}

const getbyid = (id) => {
    const SQLQuery = `SELECT * FROM admin_pos WHERE id = ?`;
    return dbPool.execute(SQLQuery, [id]);
}


const createNew = (body) => {
    const id = cuid();
    const SQLQuery = `INSERT INTO admin_pos (id, name, description, location)
                        VALUES(?, ?, ?, ?)`;

                        return dbPool.execute(SQLQuery, [id, body.name, body.description, body.location]);
}

const deleteid = (id) => {
    const SQLQuery = `DELETE FROM admin_pos WHERE id = ?`
    return dbPool.execute(SQLQuery, [id]);
}

const update = (body, id) => {
    const  SQLQuery =`UPDATE admin_pos
                        SET
                        name = ?, description = ?, location = ?
                        WHERE 
                        id = ?        
                        `;

                        return dbPool.execute(SQLQuery, [body.name, body.description, body.location, id]);
}

module.exports = {
    createNew,
    deleteid,
    update,
    getallsearch,
    getAll,
    getbyid,

}