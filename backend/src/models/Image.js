import mongoose from "mongoose";
const { Schema, model } = mongoose;

const imageSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    width: {
        type: Number,
        required: true,
    },
    height: {
        type: Number,
        required: true,
    },
    url: {
        type: String,
        required: true,
        trim: true,
    },
    public_id: {
        type: String,
        required: true,
    },
    uid: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: {
        createdAt: true,
        updatedAt: true,
    }
});

export const Image = model("Image", imageSchema);