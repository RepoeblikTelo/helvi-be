const dbPool = require('../config/database');


const getUserPurchase = (userId) => {
    const query = `SELECT b.*,
                        p.name as product_name,
                        p.created_at as product_created_at,
                        p.updated_at as product_updated_at,
                        p.image,
                        p.price
                        FROM user_buys b LEFT JOIN products p ON p.id = b.product_id
                        WHERE b.user_id = ?`
    return dbPool.execute(query, [userId]);
}

module.exports = {
    getUserPurchase
}