const dbPool = require('../config/database');

const getAllPurchase = () => {
    const query = `SELECT b.*,
                    p.name as product_name,
                    p.created_at as product_created_at,
                    p.updated_at as product_updated_at,
                    p.image,
                    p.price,
                    u.name as user_name,
                    u.email,
                    u.role,
                    u.updated_at as user_updated_at,
                    u.created_at as user_created_at,
                    u.photo_url
                    FROM user_buys b LEFT JOIN products p ON p.id = b.product_id
                    LEFT JOIN users u ON  b.user_id = u.id;`

    return dbPool.execute(query);
}

const savePurchase = ({user_id, status, id, product_id}) => {
    return dbPool.execute(`INSERT INTO user_buys (id, product_id, user_id, status) VALUES (?, ?, ?, ?);`,
        [id, product_id, user_id, status]);
}

const updatePurchaseStatus = (status, purchaseId) => {
    return dbPool.execute(`UPDATE products SET status = ? WHERE id = ?;`,
        [status, purchaseId]);
}

module.exports = {
    getAllPurchase,
    savePurchase,
    updatePurchaseStatus
}