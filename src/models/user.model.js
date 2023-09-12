import { Schema, model } from "mongoose";

const UserModel = new Schema({
    username: {
        type: String
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    registrationDate: {
        type: Date,
        required: true,
    }
});

const User = model('User', UserModel)
export default User;