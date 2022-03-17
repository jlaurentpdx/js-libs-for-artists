const { Router } = require('express');
const Library = require('../models/Library');

module.exports = Router()
  .post('/', async (req, res) => {
    const lib = await Library.insert(req.body);
    res.send(lib);
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
    const libs = await Library.findAll();
    res.send(libs);
  })

  .patch('/:id', async (req, res) => {
    const lib = await Library.updateById(req.params.id, req.body);
    res.send(lib);
  })

  .delete('/:id', async (req, res) => {
    const lib = await Library.deleteById(req.params.id);
    res.send(lib);
  });
