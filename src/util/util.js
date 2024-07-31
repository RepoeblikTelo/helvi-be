const createProductHistory = ({id, product_id, user_id, status, created_at, updated_at}) => {
    return {
        id: id,
        product_id: product_id,
        user_id: user_id,
        status: status,
        created_at: created_at,
        updated_at: updated_at,
    }
};

const createProductObject = ({product_id, product_name, description, price, image, product_created_at, product_updated_at}) => {
    return {
        id: product_id,
        name: product_name,
        description: description,
        price: price,
        image: image,
        created_at: product_created_at,
        updated_at: product_updated_at,
    }
};

const createUserObject = ({user_name, email, role, user_id}) => {
    return {
        id: user_id,
        name: user_name,
        email: email,
        role: role
    }
}


module.exports = {
    createProductObject,
    createProductHistory,
    createUserObject,
}