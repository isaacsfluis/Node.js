import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema(
    {
        id: { type: String, require: true, unique: true, default: uuidv4 },
        name: { type: String, require: true },
        email: { type: String, require: true, unique: true, lowecase: true, trim: true },
        password: { type: String, require: true, minlength: 8 },
        role: { type: String, enum: ['user', 'admin'], default: 'user' },
    }, {
    toJSON: {
        transform: function (doc, ret) {
            delete ret.__v;
            delete ret._id;
            delete ret.password;
        },
        virtuals: true
    }
});

// una funcion para que pre aguardar codifique el paswword

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    
});

//creacion de index para que pueda indexar
userSchema.index({
    id:1, 
    email:1
});

const User = mongoose.model('User', userSchema);

export default User;

