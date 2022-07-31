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
            console.log(err)
            next()
        }

        // let rappers = Rapper.find({})
        // if(req.query.hasOwnProperty('_sort')){
        //     rappers.sort({
        //         [req.query.column]: req.query.type
        //     })
        // }

        // Promise.all([rappers, Rapper.countDocumentsDeleted({})])
        //     .then(([rappers, deletedAmount]) => {
        //         res.render('me/store-rapper', {
        //             deletedAmount,
        //             rappers: multipleMongooseToObject(rappers)
        //         })
        //     })
        //     .catch(next)
    }
    
    // [GET] /me/trash-rappers
    async trashRappers(req, res, next) {
        try{
            const rappers = await Rapper.findDeleted({})
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