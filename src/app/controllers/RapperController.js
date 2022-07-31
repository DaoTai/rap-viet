const Rapper = require('../models/Rapper')
const {mongooseToObject} = require('../../util')

class RapperController{

    // [GET] /rapper/:slug
    show(req, res, next) {
        Rapper.findOne({slug: req.params.slug})
            .then(rapper => {
                res.render('rapper/show',{
                    rapper: mongooseToObject(rapper)
                })
            })
            .catch(next)
    }
    
    // [GET] /create
    create(req, res) {
        res.render('rapper/create')
    }

    // [POST] /store
    store(req, res, next) {
        const formData = req.body
        if(!req.body.image){
            formData.image = 'https://hegka.com/storage/articles/bctd0K9YASlPYgpRNDpAlHXwrnj2hMb6O1rprMbf.jpg'
        }
        const rapper = new Rapper(formData)
        rapper.save()
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // [GET] /:slug/edit
    async edit(req, res, next) {
        try
        {
            const rapper = await Rapper.findOne({_id: req.params.slug})
            res.render('rapper/edit',{rapper: mongooseToObject(rapper)})
        }
        catch(err){
            next()
        }
    }

    // [PUT] /:slug/update
    async update(req, res, next) {
        try
        {
            const rapper = await Rapper.updateOne({_id: req.params.slug},req.body)
            res.redirect('back')
        }
        catch(err){
            next()
        }
    }

    // [DELETE] /:slug/delete
    async delete(req, res, next) {
        try
        {
            await Rapper.delete({_id: req.params.slug})
            res.redirect('back')
        }
        catch(err){
            next()
        }
    }

    // [DELETE] /:slug/force-delete
    async forceDelete(req, res, next) {
        try
        {
            await Rapper.deleteOne({_id: req.params.slug})
            res.redirect('back')
        }
        catch(err){
            next()
        }
    }
    
    // [PATCH] /:slug/restore
    async restore(req, res, next) {
        try
        {
            const rapper = await Rapper.restore({_id: req.params.slug})
            res.redirect('back')
        }
        catch(err){
            next()
        }
    }

    async handleAll(req, res, next){
        try
        {
            switch(req.body.action){
                case 'delete':
                    await Rapper.delete({_id: {"$in": req.body.idRappers}})
                    res.redirect('back')
                    break
                case 'restore':
                    await Rapper.restore({_id: {"$in": req.body.idRappers}})
                    res.redirect('back')
                    break
                case 'force-delete':
                    await Rapper.deleteMany({_id: {"$in": req.body.idRappers}})
                    res.redirect('back')
                break
                default:
                    res.json({message: "Action is invalid"})
            }
        }
        catch(err){
            next()
        }
    }
    
}

module.exports = new RapperController()