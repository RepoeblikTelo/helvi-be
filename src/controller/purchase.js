const cuid = require('cuid');
const purchaseModel = require('../models/purchase');
const {createProductObject, createProductHistory, createUserObject} = require('../util/util');

const getAllPurchase = async (_, res) => {
    try {
        const [result] = await purchaseModel.getAllPurchase();
        const allPurchases = result.map((purchase) => {
            return {
                ...createProductHistory(purchase),
                product: createProductObject(purchase),
                user: createUserObject(purchase),
            }
        })
        return res.status(200).json({message: "Successfully all purchase(s)!", data: allPurchases});
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data:[]
        });
    }
}

const savePurchase = async (req, res) => {
    const body = req.body;
    console.log(body);
    const id = cuid();
    const defaultStatus =  false;
    body.id = id;
    body.status = defaultStatus;
    try {
        await purchaseModel.savePurchase(body);
        return res.status(201).json({message: "Successfully save purchase!", data: body});
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data:[]
        });
    }
}

const updatePurchaseStatus = async (req, res) => {
    const status = req.body.status;
    const purchaseId = req.params.purchaseId;

    try {
        if (!status) return res.status(400).json({message: "No purchase status found! in body!"});
        if (!purchaseId) return res.status(400).json({message: "No purchase id found! in body!"});
        await productModel.updatePurchaseStatus(status, purchaseId);
        return res.status(200).json({message: "Successfully update purchase status!", data: null});
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data:[]
        });
    }
}



module.exports = {
   getAllPurchase,
   savePurchase,
   updatePurchaseStatus, 
}