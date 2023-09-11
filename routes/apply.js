const router = require("express").Router();
const Application = require("./../models/Apply");
const verify = require('./verifyToken')


router.post('/',  async (req,res, next) => {
    const newApplication = new Application(req.body)
    try{
        const savedApplication = await newApplication.save();
        res.status(200).json(savedApplication);
    }catch(err) {
        res.status(500).json(err)
    }
})



module.exports = router;