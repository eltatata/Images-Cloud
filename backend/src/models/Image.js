import mongoose from "mongoose";
const { Schema, model } = mongoose;

const imageSchema = new Schema({
    imageUrl: {
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
        updatedAt: false,
    }
});

export const Image = model("Image", imageSchema);