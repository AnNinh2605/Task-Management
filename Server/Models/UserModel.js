import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, "username is required"],
        },
        email: {
            type: String,
            required: [true, "email is required"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "password is required"],
        },
        taskId: {
            type: Schema.Types.ObjectId,
            ref: 'task'
        },
        refreshToken: {
            type: String
        },
        resetToken: {
            type: String
        }
    }
);

const UserModel = mongoose.model('user', userSchema);

export default UserModel;