const mongoose = require('mongoose')
const Schema = mongoose.Schema
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')
const AutoIncrement = require('mongoose-sequence')(mongoose)
const Rapper = new Schema({
    _id: {type: Number},
    fullname: {type: String, default: ''},
    rapname: {type: String, require: true, default: 'Ẩn danh'},
    categories: {type: Array},
    region: {type: String, maxLength: 255},
    image: {type: String},
    desc: {type: String, default: 'Newbie'},
    birth: {type: Date},
    impressActions: {type: Array, default: []},
    slug: { type: String, slug: "rapname", unique: true },
},{
    timestamps: true,
    _id: false
})

// Add plugin
mongoose.plugin(slug)
Rapper.plugin(mongooseDelete,{ deletedAt : true,overrideMethods: 'all' })
Rapper.plugin(AutoIncrement)
module.exports = mongoose.model('Rapper', Rapper)