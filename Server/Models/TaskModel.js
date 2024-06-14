import mongoose from 'mongoose';

const { Schema } = mongoose;

const taskSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "name is required"]
        },
        description: {
            type: String,
        },
        date: {
            type: Date,
            default: () => new Date()
        },
        completed: {
            type: Boolean,
            default: false
        },
        important: {
            type: Boolean,
            default: false
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
    },
    { timestamps: true }
);

const TaskModel = mongoose.model('task', taskSchema);

export default TaskModel;