const Rapper = require('../models/Rapper')
const {multipleMongooseToObject,  mongooseToObject} = require('../../util')
   
class SiteController{

    // [GET] /
    index(req, res, next) {
        Rapper.find({})
            .then(rappers => {
                res.render('home',{
                    rappers: multipleMongooseToObject(rappers)
                })
            })
            .catch(next)
    }

    
}

module.exports = new SiteController()