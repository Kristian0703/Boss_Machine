const express = require('express');
const ideasRouter = express.Router();

const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
  getNextId,
} = require("./db");

// GET /api/ideas - Get all ideas
ideasRouter.get('/', (req, res, next) => {
    const ideas = getAllFromDatabase('ideas');
    res.send(ideas);
})

// GET /api/ideas/:ideaId - Get an idea by ID
ideasRouter.get('/:ideaId', (req, res, next) => {
    const idea = getFromDatabaseById('ideas', req.params.ideaId);
    if (idea) {
        res.send(idea);
    } else {
        res.status(404).send();
    }
})

// POST /api/ideas - Add a new idea
ideasRouter.post("/", (req, res) => {
  const newIdea = { ...req.body, id: getNextId("ideas") };
  const added = addToDatabase("ideas", newIdea);
  res.status(201).send(added);
});

// PUT /api/ideas/:ideaId - Update an idea by ID
ideasRouter.put('/:ideaId', (req, res) => {
    const updatedIdea = updateInstanceInDatabase('ideas', req.body);
    if (updatedIdea) {
        res.send(updatedIdea);
    } else {
        res.status(404).send();
    }
})

// DELETE /api/ideas/:ideaId - Delete an idea by ID
ideasRouter.delete("/:ideaId", (req, res) => {
    const deleted = deleteFromDatabasebyId("ideas", req.params.ideaId);
    if (deleted) {
        res.status(204).send();
    } else {
        res.status(404).send();
    }   
})

// Export the ideasRouter
module.exports = ideasRouter;