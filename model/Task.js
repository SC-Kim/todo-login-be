const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = Schema({
    task: {
        type: String,
        required: true
    },
    isComplete: {
        type: Boolean,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,    //_id 에 대한 데이터타입으로 지정한다. 
        required: true,
        ref: "User"
    }
}, { timestamps: true })

const Task = mongoose.model("Task", taskSchema)

module.exports = Task;
