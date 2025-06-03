const express = require('express');
const minionsRouter = express.Router();

const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
} = require("./db");

// GET / api/minions - Get all minions
minionsRouter.get('/', (req, res, next) => {
    const minions = getAllFromDatabase('minions');
    res.send(minions);
})

// GET / api/minions/:minionId - Get a minion by ID
minionsRouter.get('/:minionId', (req, res, next) => {
    const minion = getFromDatabaseById('minions', req.params.minionId);
    if (minion) {
        res.send(minion);
    } else {
        res.status(404).send();
    }
})

// POST / api/minions - Add a new minion
minionsRouter.post('/', (req, res, next) => {
    const newMinion = addToDatabase('minions', req.body);
    res.status(201).send(newMinion);
})

// PUT / api/minions/:minionId - Update a minion by ID
minionsRouter.put('/:minionId', (req, res, next) => {
    const updatedMinion = updateInstanceInDatabase('minions', req.body);
    if (updatedMinion) {
        res.send(updatedMinion);
    } else {
        res.status(404).send();
    }
})

// DELETE / api/minions/:minionId - Delete a minion by ID
minionsRouter.delete("/:minionId", (req, res, next) => {
  const deleted = deleteFromDatabasebyId("minions", req.params.minionId);
  if (deleted) {
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

module.exports = minionsRouter;