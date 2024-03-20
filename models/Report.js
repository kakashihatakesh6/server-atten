const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReportSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name:{
        type: String,
        required: true,
    },  
    date:{
        type: String,
        unique: true,
        required: true,
    }, 
    in:{
        type: String,
        required: true,
    },
    out:{
        type: String,
        // default: Date.now
    },
});

module.exports = mongoose.model("report", ReportSchema);