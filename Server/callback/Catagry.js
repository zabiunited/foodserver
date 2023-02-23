const Catagry = require('../database/Catagry')

const AddCatagry = async (req, res) => {
    try {
        const { title } = req.body
        Catagry.findOne({ title: title })
            .then(async (data) => {
                if (data == null) {
                    await Catagry.create(req.body)
                        .then(data => {
                            return res.status(200).json("Done")
                        })
                        .catch(err => {
                            return res.status(401).json(err)
                        })
                }
                else {
                    return res.status(400).json("This Catagry is already exist")
                }
            })
            .catch(err => {
                return res.status(401).json(err)
            })
    }
    catch (err) {
        return res.status(500).json(err)
    }
}

const ListCatagry=async(req,res)=>{
    try{
        await Catagry.find()
        .then(data=>{
            return res.status(200).json(data)
        })
        .catch(err=>{
            return res.status(401).json(err)
        })
    }
    catch(err){
        return res.status(500).json(err)
    }
}

const UpdateCatagry=async(req,res)=>{
    try{
        const {title}=req.body
        const {id}=req.params
        await Catagry.findOne({title:title})
        .then(async(data)=>{
            
            if(data==null || data._id.toString()===id){
                await Catagry.findByIdAndUpdate(id,req.body)
                .then(data=>{
                    return res.status(200).json("Done")
                })
                .catch(err=>{
                    return res.status(401).json(err)
                })
            }
            else{
                return res.status(400).json("This Catagry is already exist")
            }
        })
        .catch(err=>{
            return res.status(500).json(err)
        })
    }
    catch(err){
        return res.status(500).json(err)
    }
}

const DeleteCatagry=async(req,res)=>{
    try{
        const {id}=req.params
        await Catagry.findByIdAndDelete(id)
        .then(data=>{
            return res.status(200).json("Done")
        })
    }
    catch(err){
        return res.status(500).json(err)
    }
}

module.exports = { AddCatagry, ListCatagry, UpdateCatagry, DeleteCatagry }