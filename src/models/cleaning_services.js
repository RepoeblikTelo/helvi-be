const dbPool = require('../config/database');
const cuid = require('cuid');

const createNew = (body) => {
    const id = cuid();
    const SQLQuery = `INSERT INTO cleaningservices (id, user_id, description, address, customer_contact, cleaning_date, status, type)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

                        return dbPool.execute(SQLQuery, [id, body.user_id, body.description, body.address, body.customer_contact, body.cleaning_date, body.status, body.type]);
}

const update = (body, id) => {
    const SQLQuery = `UPDATE cleaningservices
                        SET
                        status = ?
                        WHERE id = ?
                        `;
                        return dbPool.execute(SQLQuery, [body.status, id]);
}

const deleteid = (id) => {
    const SQLQuery = `DELETE FROM cleaningservices WHERE id = ?`;
    return dbPool.execute(SQLQuery, [id]);
}

const getAll = () =>{
    const SQLQuery = `SELECT 
                        cleaningservices.id AS csid,
                        cleaningservices.user_id,
                        cleaningservices.description,
                        cleaningservices.address,
                        cleaningservices.customer_contact,
                        cleaningservices.cleaning_date,
                        cleaningservices.status,
                        cleaningservices.type,
                        cleaningservices.created_at,
                        cleaningservices.updated_at,
                        user.id AS userid,
                        user.name,
                        user.email,
                        user.photo_url
                        FROM 
                        cleaningservices
                        LEFT JOIN
                        user
                        ON
                        cleaningservices.id = user.id
                        `;
                        return dbPool.execute(SQLQuery)
}

const getallsearch = (search) => {
    const SQLQuery = `SELECT 
                        cleaningservices.id AS csid,
                        cleaningservices.user_id,
                        cleaningservices.description,
                        cleaningservices.address,
                        cleaningservices.customer_contact,
                        cleaningservices.cleaning_date,
                        cleaningservices.status,
                        cleaningservices.type,
                        cleaningservices.created_at,
                        cleaningservices.updated_at,
                        user.id AS userid,
                        user.name,
                        user.email,
                        user.photo_url
                        FROM 
                        cleaningservices
                        LEFT JOIN
                        user
                        ON
                        cleaningservices.id = user.id
                        WHERE
                        address
                        LIKE ?
                        `;
    const searchParam = `%${search}%`;
    return dbPool.execute(SQLQuery, [searchParam])
    .then(([results]) => results);
}

const getbyid = (id) => {
    const SQLQuery = `SELECT
                        cleaningservices.id AS csid,
                        cleaningservices.user_id,
                        cleaningservices.description,
                        cleaningservices.address,
                        cleaningservices.customer_contact,
                        cleaningservices.cleaning_date,
                        cleaningservices.status,
                        cleaningservices.type,
                        cleaningservices.created_at,
                        cleaningservices.updated_at,
                        user.id AS userid,
                        user.name,
                        user.email,
                        user.photo_url
                        FROM 
                        cleaningservices
                        LEFT JOIN
                        user
                        ON
                        cleaningservices.id = user.id
                        WHERE 
                        cleaningservices.id = ?
                        `;
                        return dbPool.execute(SQLQuery, [id]);
}

module.exports ={
    createNew,
    update,
    deleteid,
    getAll,
    getallsearch,
    getbyid,

}