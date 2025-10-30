import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema  = new mongoose.Schema({
   name: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true,
      unique: true
   },
    password: {
       type: String,
       required: true
    },
    date: {
       type: Date,
       default: Date.now
    }
});

// Middleware to hash pass before saving to DB
UserSchema.pre('save', async function (next) {
    if(!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password =await bcrypt.hash(this.password,salt);
    next();
});

//  Method to compare entered pass with hashed pass

UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", UserSchema);

export default User;