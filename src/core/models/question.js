const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const QuestionSchema = new Schema({
    questionNumber: { type: Number, unique: 1 },
    text: { type: String, default: "" },


    vote: {
        type: Map,
        of: Number,
        default: { 'Oui': 0, 'Non': 0, 'S\'abstenir': 0 }
    }


});




module.exports = mongoose.model('Question', QuestionSchema);