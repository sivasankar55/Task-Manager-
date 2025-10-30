import express from "express";
import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    title: {
        type:String,
        required: true,
        trim: true,
    },
    description: {
        type:String,
        required: false,
    },
    status: {
        type: String,
        enum:["Pending", "In Progress", "Completed"],
        default: 'Pending',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    createdAt: {
        type:Date,
        default:Date.now,
    }
});

const Task = mongoose.model('Task', TaskSchema);

export default Task;