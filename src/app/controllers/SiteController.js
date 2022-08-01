const Rapper = require('../models/Rapper')
const {multipleMongooseToObject,  mongooseToObject} = require('../../util')
   
class SiteController{

    // [GET] /
    async index(req, res, next) {
        try{
            let rappers = await Rapper.find({})
            if(req.query.hasOwnProperty('q')){
                rappers = await Rapper.find({categories: req.query.q})
            }

            res.render('home',{
                rappers: multipleMongooseToObject(rappers)
            })
        }
        catch(err){
            next()
        }
    }

    
}

module.exports = new SiteController()