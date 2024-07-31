const dbPool = require('../config/database');
const cuid = require('cuid');

const createNew = (body, image)=> {
    const id = cuid();
    const SQLQuery = `INSERT INTO wastereports (id, user_id, description, image, location, point, coin, status)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

                        return dbPool.execute(SQLQuery, [id, body.user_id, body.description, image, body.location, body.point, body.coin, body.status]);
}

const deleteid = (id) => {
    const SQLQuery = `DELETE FROM wastereports WHERE id = ?`;

    return dbPool.execute(SQLQuery, [id]);
}

const update =  async(body, id) => {
    const SQLQuery = `UPDATE wastereports
                        SET
                        status = ?
                        WHERE
                        id = ?
                        `;
            await dbPool.execute(SQLQuery, [body.status, id]);

            const wastereportsQuery = `SELECT * FROM wastereports WHERE id = ?`;
            const [rows] = await dbPool.execute(wastereportsQuery, [id]);

            if(rows.length > 0 ){
                const userId=rows[0].user_id;
                const point=rows[0].point;
                const coin=rows[0].coin;

                if(body.status === "true" ){
                    const userQuery = `UPDATE user
                                        SET
                                        point = point + ?,
                                        coin = coin + ?
                                        WHERE id = ?
                                        `;
                                        
                    const uservalues = [point, coin, userId];
                    await dbPool.execute(userQuery, uservalues);
                }
            }else{
                throw new Error(`No user id found for waste reports id ${id}`);
            }
}

const getbyid = (id) =>{
    const SQLQuery = `SELECT
                        wastereports.id AS wsid,
                        wastereports.user_id,
                        wastereports.description,
                        wastereports.image,
                        wastereports.location,
                        wastereports.point,
                        wastereports.coin,
                        wastereports.status,
                        wastereports.created_at,
                        wastereports.updated_at,
                        user.id AS userid,
                        user.name,
                        user.email,
                        user.photo_url
                        FROM
                        wastereports
                        LEFT JOIN
                        user
                        ON
                        wastereports.id = user.id
                        WHERE
                        wastereports.id = ?
                        `;
                        return dbPool.execute(SQLQuery, [id]);

} 

const getAll = () => {
    const SQLQuery = `SELECT
                        wastereports.id AS wsid,
                        wastereports.user_id,
                        wastereports.description,
                        wastereports.image,
                        wastereports.location,
                        wastereports.point,
                        wastereports.coin,
                        wastereports.status,
                        wastereports.created_at,
                        wastereports.updated_at,
                        user.id AS userid,
                        user.name,
                        user.email,
                        user.photo_url
                        FROM
                        wastereports
                        LEFT JOIN
                        user
                        ON
                        wastereports.id = user.id
                        `;
                        return dbPool.execute(SQLQuery);
}

const getallsearch = (search) => {
    const SQLQuery = `SELECT
                        wastereports.id AS wsid,
                        wastereports.user_id,
                        wastereports.description,
                        wastereports.image,
                        wastereports.location,
                        wastereports.point,
                        wastereports.coin,
                        wastereports.status,
                        wastereports.created_at,
                        wastereports.updated_at,
                        user.id AS userid,
                        user.name,
                        user.email,
                        user.photo_url
                        FROM
                        wastereports
                        LEFT JOIN
                        user
                        ON
                        wastereports.id = user.id
                        WHERE 
                        wastereports.location
                        LIKE ?
                        `;
    const searchParam = `%${search}%`;
    return dbPool.execute(SQLQuery, [searchParam])
    .then(([results]) => results);
}



module.exports = {
    createNew,
    update,
    deleteid,
    getbyid,
    getAll,
    getallsearch,
}