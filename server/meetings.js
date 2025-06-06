const express = require('express');
const meetingsRouter = express.Router();

const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
  getNextId,
} = require("./db");

// GET /api/meetings - Get all meetings
meetingsRouter.get('/', (req, res) => {
    const meetings = getAllFromDatabase('meetings');
    res.send(meetings); 
})

// POST /api/meetings - Add a new meeting
meetingsRouter.post('/', (req, res) => {
    const newMeeting = { ...req.body, id: getNextId("meetings") };
    const added = addToDatabase("meetings", newMeeting);
    res.status(201).send(added);
});

// DELETE /api/meetings/:meetingId - Delete a meeting by ID
meetingsRouter.delete("/:meetingId", (req, res) => {
    const deleted = deleteFromDatabasebyId("meetings", req.params.meetingId);
    if (deleted) {
        res.status(204).send();
    } else {
        res.status(404).send();
    }
});

module.exports = meetingsRouter;