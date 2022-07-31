const mongoose = require('mongoose');

const connect = async () => {
    try{
        await mongoose.connect('mongodb://localhost/rap-viet')
        console.log("Connect db successfully !!");
    }
    catch(err) {
        console.log("Connect db failed !!")
    }
}

module.exports = {connect}