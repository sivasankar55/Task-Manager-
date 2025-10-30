import express from "express";
import {check ,validationResult} from "express-validator";
import protect from "../middleware/auth.js";
import Task from "../models/Task.js";


const router = express.Router();


// Post/api/tasks
// create a new task

router.post(
    '/',
    protect,
    [
        check('title','Title is required').not().isEmpty(),
        check('status','Invalid status').isIn(['Pending','In Progress', 'Completed']),
    ],
    async (req,res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
    try {
        const newTask = new Task({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            user: req.user.id, // to set the task owner to the logged-in user
        })
          
        const task = await newTask.save();
        res.json(task);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
    });

    // get/api/tasks
    //get all tasks for the logged in user(search/filter)

    router.get('/',protect, async(req,res) => {
        try {
            const {search,status} = req.query;
            let query = {user: req.user.id}; // filter by logged in user

            if(search)  {
                query.title = {$regex: search, $options:'i'}; // for case insensitive search
            }

            if(status) {
                query.status = status;
            }

            const tasks = await Task.find(query).sort({createdAt:-1});
            res.json(tasks)
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    });

    // put/api/tasks/:id
    //update a task

    router.put('/:id',protect,async (req,res) => {
        const {title,description,status} = req.body;

        try {
            let task = await Task.findById(req.params.id);

            if(!task) return res.status(404).json({msg:'Task not found'});

            // check ownership
            if(task.user.toString() !== req.user.id) {
                return res.status(401).json({msg:'Not authorized to modify this task'});
            }
             // if new value exit use it or keep teh old value
            task.title = title || task.title;
            task.description  = description || task.description;
            task.status = status || task.status;

            await task.save();
            res.json(task);

        } catch (error) {
              console.error(error.message);
    res.status(500).send('Server Error');
        }
    });

    // delete/api/tasks/:id
    // delete a task

    router.delete('/:id', protect, async(req,res) => {
        try {
            const task = await Task.findById(req.params.id);

            if(!task) return res.status(404).json({msg:'Task not found'});

            // check the ownership
            if(task.user.toString() !== req.user.id) {
                return res.status(401).json({msg:'Not authorized'});
            }

            await Task.deleteOne({_id: req.params.id});
            res.json({msg:'Task removed'});
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    });

    export default router;