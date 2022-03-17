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

  .get('/:id', async (req, res, next) => {
    try {
      const lib = await Library.findById(req.params.id);
      res.send(lib);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  })

  .get('/', async (req, res) => {
    try {
      const libs = await Library.findAll();
      res.send(libs);
    } catch (error) {
      console.log(error.message);
    }
  })

  .patch('/:id', async (req, res) => {
    try {
      const lib = await Library.updateById(req.params.id, req.body);
      res.send(lib);
    } catch (error) {
      console.log(error);
    }
  });
