const waste_reportsModel = require('../models/waste_reports');

const update = async (req, res) => {
    const {id} = req.params;
    const {body} = req;
    try {
        await waste_reportsModel.update(body, id);
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
    const {body, file}= req;
    const image = file.filename;
    try {
        await waste_reportsModel.createNew(body, image);
        body.image = 'http://localhost:4000/assets/' + image;
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
        await waste_reportsModel.deleteid(id);
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

const getbyid = async (req, res) => {
    const {id} = req.params;
    try {
        const [data] = await waste_reportsModel.getbyid(id);

        const formattedResults = data.map(item =>({
            id: item.wsid,
            user_id: item.user_id,
            description: item.description,
            image: item.image,
            location: item.location,
            point: item.point,
            coin: item.coin,
            status: item.status,
            created_at: item.created_at,
            updated_at: item.updated_at,

            user:{
                id:item.userid,
                name:item.name,
                email:item.email,
                photo_url:item.photo_url
            }

        }));
        res.status(200).json({
            message:'Success',
            data: formattedResults
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
            data:[]
        });
    }
}

const getwastereports = async(req, res) => {
    const {search} = req.query;
    try {
        if (search) {
            const rows = await waste_reportsModel.getallsearch(search);
            const formattedResults = rows.map(item =>({
                id: item.wsid,
                user_id: item.user_id,
                description: item.description,
                image: item.image,
                location: item.location,
                point: item.point,
                coin: item.coin,
                status: item.status,
                created_at: item.created_at,
                updated_at: item.updated_at,
    
                user:{
                    id:item.userid,
                    name:item.name,
                    email:item.email,
                    photo_url:item.photo_url
                }
    
            }));
            res.status(200).json({
                message:'Success',
                data: formattedResults
            })
        } else {
            const [data] = await waste_reportsModel.getAll();
            const formattedResults = data.map(item =>({
                id: item.wsid,
                user_id: item.user_id,
                description: item.description,
                image: item.image,
                location: item.location,
                point: item.point,
                coin: item.coin,
                status: item.status,
                created_at: item.created_at,
                updated_at: item.updated_at,
    
                user:{
                    id:item.userid,
                    name:item.name,
                    email:item.email,
                    photo_url:item.photo_url
                }
    
            }));
            res.status(200).json({
                message:'Success',
                data: formattedResults
            })
        }
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
    getbyid,
    getwastereports,

}