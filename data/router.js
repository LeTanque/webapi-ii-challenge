const express = require('express');

const Database = require('./db.js');

const router = express.Router();

// handles urls beginning with /posts. 
// Might change this to something more semantic now that I know what this API does
// UPDATE: Changed to posts

// /posts
router.get('/', async (req, res) => {
    try {
        const posts = await Database.find(req.query);
        res.status(200).json(posts);
    } catch (error) {
        // log error to database
        console.log(error);
        res.status(500).json({ error:"The posts information could not be retrieved." });
    }
});


// /posts/:id
router.get('/:id', async (req, res) => {
    try {
        const data = await Database.findById(req.params.id);
        // If the object returned has a length of zero, we know the post doesn't exist. Error instead of returning empty object
        if (data.length === 0) {  
            res.status(404).json({ message:"The post with the specified ID does not exist." });
        } else {
            res.status(200).json(data);
        }
    } 
    catch (error) {  // log error to database
        console.log(error);
        res.status(500).json({ error:"The post information could not be retrieved." });
    }
});


router.post('/', async (req, res) => {
    // Couldn't nest the if statement in the try for some reason
    // Tried alternating between req.body and post inside of the try to no avail
    // Function kept defaulting to the catch when if inside of the try and I wasn't getting the correct error message
    if (!req.body.title || !req.body.contents) { 
        res.status(400).json({ errorMessage:"Please provide title and contents for the post." });
        return;
    }
    try {
        const post = await Database.insert(req.body);
        res.status(201).json(post);
    } 
    catch (error) { // Log error to db
        console.log(error);
        res.status(500).json({ error:"There was an error while saving the post to the database" });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const count = await Database.remove(req.params.id);
        // If the post doesn't exist to be deleted, 404. Otherwise, 200 and delete
        if (count > 0) {
            res.status(200).end();
        } else {
            res.status(404).json({ message:"The post with the specified ID does not exist."});
        }
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({ error:"The post could not be removed" });
    }
});


router.put('/:id', async (req, res) => {
    // First of all, is the request formatted correctly. If not, 400 and end.
    if (!req.body.title || !req.body.contents) { 
        res.status(400).json({ errorMessage:"Please provide title and contents for the post."})
        return;
    }
    // So we have a good request. Now let's see if the item to be updated exists. If it does, we move forward.
    try {
        const postById = await Database.findById(req.params.id); // These two awaits are 'caught' by the catch below, according to hackernoon
        const post = await Database.update(req.params.id, req.body);
        if (postById.length === 0) {  // This is the same trick we used on getById. Hopefully not super resouce wasteful.
            res.status(404).json({ message: "The post with the specified ID does not exist." });
        }
        else {
            res.status(200).json(post);
        }
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "The post information could not be modified." });
    }
});


module.exports = router;
