import bcryptjs from "bcryptjs";
import mongoose from "mongoose";
const { Schema, model } = mongoose;


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
});

userSchema.pre("save", async function (next) {
    const user = this;

    if (!user.isModified("password")) return next();

    try {
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(user.password, salt);
        next();
    } catch (error) {
        console.log(error);
        throw new Error("Falló el hash de contraseña");
    }
});

userSchema.methods.comparePassword = function (password) {
    return bcryptjs.compareSync(password, this.password);
}

export const User = model("User", userSchema);