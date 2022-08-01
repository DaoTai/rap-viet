const Rapper = require('../models/Rapper')
const {multipleMongooseToObject, mongooseToObject} = require('../../util')

class MeController{

    // [GET] /me/store-rappers
    async storeRappers(req, res, next) {
        try{
            let rappers = await Rapper.find({})
            if(req.query.hasOwnProperty('_sort')){
                rappers = await Rapper.find({}).sort({
                    [req.query.column]: req.query.type
                })
            }
            const countDeletedRapper = await Rapper.countDocumentsDeleted({})
            res.render('me/store-rapper',{
                rappers: multipleMongooseToObject(rappers),
                countDeletedRapper
            })

        }
        catch(err){
            next()
        }

    }
    
    // [GET] /me/trash-rappers
    async trashRappers(req, res, next) {
        try{
            let rappers = await Rapper.findDeleted({})
            if(req.query.hasOwnProperty('_sort')){
                rappers = await Rapper.findDeleted({}).sort({
                    [req.query.column]: req.query.type
                })
            }
            res.render('me/trash-rapper',{
                rappers: multipleMongooseToObject(rappers),
            })
        }
        catch(err){
            next()
        }
    }
    
}

module.exports = new MeController()