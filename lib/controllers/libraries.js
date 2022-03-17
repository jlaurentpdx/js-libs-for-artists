const { Router } = require('express');
const Library = require('../models/Library');

module.exports = Router()
  .post('/', async (req, res) => {
    try {
      const lib = await Library.insert(req.body);
      res.send(lib);
    } catch (error) {
      console.log(error.message);
    }
  })

  .get('/:id', async (req, res) => {
    try {
      const lib = await Library.findById(req.params.id);
      res.send(lib);
    } catch (error) {
      console.log(error);
    }
  })

  .get('/', async (req, res) => {
    try {
      const libs = await Library.findAll();
      res.send(libs);
    } catch (error) {
      console.log(error.message);
    }
  });
