const dbPool = require('../config/database');

const getAllProducts = () => {
    return dbPool.execute(`SELECT * FROM products`);
}

const searchProduct = (search) => {
    const searchTerm = `%${search}%`;

    return dbPool.execute(`SELECT * FROM products WHERE name LIKE ?;`, [searchTerm]);
}

const deleteProduct = (productId) => {
    return dbPool.execute(`DELETE FROM products WHERE id = ?`, [productId]);
}

const getProduct = (productId) => {
    return dbPool.execute(`SELECT * FROM products WHERE id = ?`, [productId]);
}

const updateProduct = ({id, name, description, image, price}) => {
    return dbPool.execute(`UPDATE products SET name = ?, description = ?, image = ?, price = ? WHERE id = ?;`,
         [name, description, image, price, id]);
}

const addProduct = ({id, name, description, image, price}) => {
    return dbPool.execute(`INSERT INTO products (id, name, description, image, price) VALUES (?, ?, ?, ?, ?);`,
        [id, name, description, image, price]);
}

module.exports = {
    getAllProducts,
    searchProduct,
    deleteProduct,
    getProduct,
    updateProduct,
    addProduct,
}