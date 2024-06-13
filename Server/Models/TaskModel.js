import mongoose from 'mongoose';

const { Schema } = mongoose;

const taskSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "name is required"]
        },
        desc: {
            type: String,
        },
        date: {
            type: Date,
        },
        completed: {
            type: Boolean,
            default: false
        },
        important: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

const TaskModel = mongoose.model('task', taskSchema);

export default TaskModel;