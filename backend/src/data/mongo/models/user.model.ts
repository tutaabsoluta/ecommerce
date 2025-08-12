import mongoose from "mongoose";



const userSchema = new mongoose.Schema({

    user: {
        type: String,
        required: [true, 'User is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },

    password: {
        type: String,
        required: [true, 'Password is required']
    },

    role: {
        type: String,
        default: 'USER_ROLE',
        enum: ['ADMIN_ROLE', 'USER_ROLE'],
    }

});


export const UserModel = mongoose.model('User', userSchema);

