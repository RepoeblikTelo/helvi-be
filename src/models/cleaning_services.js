const dbPool = require('../config/database');
const cuid = require('cuid');

const createNew = (body) => {
    const id = cuid();
    const SQLQuery = `INSERT INTO cleaning_services (id, user_id, description, address, customer_contact, cleaning_date, status, type)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

                        return dbPool.execute(SQLQuery, [id, body.user_id, body.description, body.address, body.customer_contact, body.cleaning_date, body.status, body.type]);
}

const update = (body, id) => {
    const SQLQuery = `UPDATE cleaning_services
                        SET
                        status = ?
                        WHERE id = ?
                        `;
                        return dbPool.execute(SQLQuery, [body.status, id]);
}

const deleteid = (id) => {
    const SQLQuery = `DELETE FROM cleaning_services WHERE id = ?`;
    return dbPool.execute(SQLQuery, [id]);
}

const getAll = () =>{
    const SQLQuery = `SELECT 
                        cleaning_services.id AS csid,
                        cleaning_services.user_id,
                        cleaning_services.description,
                        cleaning_services.address,
                        cleaning_services.customer_contact,
                        cleaning_services.cleaning_date,
                        cleaning_services.status,
                        cleaning_services.type,
                        cleaning_services.created_at,
                        cleaning_services.updated_at,
                        users.id AS userid,
                        users.name,
                        users.email,
                        users.photo_url
                        FROM 
                        cleaning_services
                        LEFT JOIN
                        users
                        ON
                        cleaning_services.id = users.id
                        `;
                        return dbPool.execute(SQLQuery)
}

const getallsearch = (search) => {
    const SQLQuery = `SELECT 
                        cleaning_services.id AS csid,
                        cleaning_services.user_id,
                        cleaning_services.description,
                        cleaning_services.address,
                        cleaning_services.customer_contact,
                        cleaning_services.cleaning_date,
                        cleaning_services.status,
                        cleaning_services.type,
                        cleaning_services.created_at,
                        cleaning_services.updated_at,
                        users.id AS userid,
                        users.name,
                        users.email,
                        users.photo_url
                        FROM 
                        cleaning_services
                        LEFT JOIN
                        users
                        ON
                        cleaning_services.id = users.id
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
                        cleaning_services.id AS csid,
                        cleaning_services.user_id,
                        cleaning_services.description,
                        cleaning_services.address,
                        cleaning_services.customer_contact,
                        cleaning_services.cleaning_date,
                        cleaning_services.status,
                        cleaning_services.type,
                        cleaning_services.created_at,
                        cleaning_services.updated_at,
                        users.id AS userid,
                        users.name,
                        users.email,
                        users.photo_url
                        FROM 
                        cleaning_services
                        LEFT JOIN
                        users
                        ON
                        cleaning_services.id = users.id
                        WHERE 
                        cleaning_services.id = ?
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