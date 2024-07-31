const cleaning_servicesModel = require('../models/cleaning_services');

const update = async (req, res) => {
    const {id} = req.params;
    const {body} = req;
    try {
        await cleaning_servicesModel.update(body, id);
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
        await cleaning_servicesModel.createNew(body);
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
        await cleaning_servicesModel.deleteid(id);
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

const getbyid = async(req, res) => {
    const {id} = req.params;
    try {
        const [data] = await cleaning_servicesModel.getbyid(id);

        const formattedResults = data.map(item => ({
            id:item.csid, 
            user_id:item.user_id,
            description:item.description, 
            address:item.address, 
            customer_contact:item.customer_contact, 
            cleaning_date:item.cleaning_date, 
            status:item.status, 
            type:item.type, 
            created_at:item.created_at, 
            updated_at:item.updated_at,
            
            user:{
                id:item.userid,
                name:item.name,
                email:item.email,
                photo_url:item.photo_url
            }

        }));
        res.status(200).json({
            message:'Success',
            data:formattedResults
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
            data:[]
        });
    }
}

const getcleaningservices = async(req, res) =>{
    const {search} = req.query;
    try {
        if (search) {
            const [rows] = await cleaning_servicesModel.getallsearch(search);

        const formattedResults = rows.map(item => ({
            id:item.csid, 
            user_id:item.user_id,
            description:item.description, 
            address:item.address, 
            customer_contact:item.customer_contact, 
            cleaning_date:item.cleaning_date, 
            status:item.status, 
            type:item.type, 
            created_at:item.created_at, 
            updated_at:item.updated_at,
            
            user:{
                id:item.userid,
                name:item.name,
                email:item.email,
                photo_url:item.photo_url
            }

        }));
        res.status(200).json({
            message:'Success',
            data:formattedResults
        })
        } else {
            const [data] = await cleaning_servicesModel.getAll();

        const formattedResults = data.map(item => ({
            id:item.csid, 
            user_id:item.user_id,
            description:item.description, 
            address:item.address, 
            customer_contact:item.customer_contact, 
            cleaning_date:item.cleaning_date, 
            status:item.status, 
            type:item.type, 
            created_at:item.created_at, 
            updated_at:item.updated_at,
            
            user:{
                id:item.userid,
                name:item.name,
                email:item.email,
                photo_url:item.photo_url
            }

        }));
        res.status(200).json({
            message:'Success',
            data:formattedResults
        })
        }
    } catch (error) {
        res.status(400).json({
            message: error.message,
            data:[]
        });
    }
}

module.exports ={
    createNew,
    deleteid,
    update,
    getbyid,
    getcleaningservices,

}