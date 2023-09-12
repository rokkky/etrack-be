import { Schema, model } from "mongoose";

const TokenModel = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
});

const Token = model('Token', TokenModel)
export default Token;