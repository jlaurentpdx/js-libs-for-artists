const { Router } = require('express');
const Library = require('../models/Library');

module.exports = Router().post('/', async (req, res) => {
  try {
    const lib = await Library.insert(req.body);
    res.send(lib);
  } catch (error) {
    console.log(error.message);
  }
});
