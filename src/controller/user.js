const userModel = require('../models/user');
const {createProductObject, createProductHistory} = require('../util/util');

const getUserPurchase  = async (req, res) => {
    const {userId} = req.params;
    if (!userId) return res.status(400).json({message: "No user id found in params!"});
    try {
        const [result] = await userModel.getUserPurchase(userId);
        if (result.length == 0) return res.status(200).json({message: 'Successfully retreived all user purchase', data: []});
        const allUserPurchaseHistory = result.map((purchase) => {
            return {
                ...createProductHistory(purchase),
                product : createProductObject(purchase)
            }
        })

        return res.status(200).json({
            message: 'Successfully retreived all user purchase',
            data: allUserPurchaseHistory,
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data:[]
        });
    }
}

module.exports = {
    getUserPurchase
}