const admin_posModel = require('../models/admin_pos');

const update = async (req, res) => {
    const {id} = req.params;
    const {body} = req;
    try {
        await admin_posModel.update(body, id);
        res.status(200).json({
            message:'Success',
            data: id,
            ...body
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
            data:[]
        });
    }
}

const createNew = async(req, res)=> {
    const {body}= req;
    try {
        await admin_posModel.createNew(body);
        res.status(201).json({
            message: 'Success',
            data: body
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
            data:[]
        });
    }
}
const deleteid = async(req, res) => {
    const {id} = req.params;
    try {
        await admin_posModel.deleteid(id);
        res.status(200).json({
            message: 'Success',
            data: null,
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
            data:[]
        });
    }
}

const getadminpos = async (req, res) => {
    const {search} = req.query;
    try {
        if (search){
            const rows = await admin_posModel.getallsearch(search);
            res.status(200).json({
                message:'Success',
                data: rows
            });
        }else{
            const [data] = await admin_posModel.getAll();
            res.status(200).json({
                message:'Success',
                data:data
            })
        }
    } catch (error) {
        res.status(400).json({
            message: error.message,
            data:[]
        });
    }
}

const getbyid = async (req, res) => {
    const {id} = req.params;
    try {
        const [data] = await admin_posModel.getbyid(id);
        res.status(200).json({
            message:'Success',
            data: data,
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
            data:[]
        });
    }
}


module.exports = {
    createNew,
    deleteid,
    update,
    getadminpos,
    getbyid,
}