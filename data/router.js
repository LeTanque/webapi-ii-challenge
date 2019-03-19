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
        res.status(400).json({ message:"Please provide title and contents for the post." });
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
    try {
        const data = await Database.update(req.params.id, req.body);
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(404).json({ message: 'The data could not be found' });
        }
    } catch (error) {
        // log error to database
        console.log(error);
        res.status(500).json({ error: 'Error updating the data' });
    }
});


router.get('/:id/messages', async (req, res) => {
  try {
    const messages = await Database.findHubMessages(req.params.id);

    if (messages && messages.length > 0) {
      res.status(200).json(messages);
    } else {
      res.status(404).json({ message: 'No messages for this data' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: 'error getting the messages for this data' });
  }
});

module.exports = router;
