const dbPool = require('../config/database');
const cuid = require('cuid');

const createNew = (body) => {
    const id = cuid();
    const SQLQuery = `INSERT INTO comments (id ,user_id, blog_id, content)
                        VALUES (?, ?, ?, ?)`;

                        return dbPool.execute(SQLQuery, [id, body.user_id, body.blog_id, body.content]);
}

module.exports = {
    createNew,
}