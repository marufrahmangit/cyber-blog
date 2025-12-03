const Writeup = require('../models/Writeup');

exports.getAllWriteups = async (req, res, next) => {
  try {
    const writeups = await Writeup.findAll('published');
    res.json(writeups);
  } catch (error) {
    next(error);
  }
};

exports.getWriteupBySlug = async (req, res, next) => {
  try {
    const writeup = await Writeup.findBySlug(req.params.slug);
    
    if (!writeup || writeup.status !== 'published') {
      return res.status(404).json({ error: 'Writeup not found' });
    }

    res.json(writeup);
  } catch (error) {
    next(error);
  }
};

exports.searchWriteups = async (req, res, next) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({ error: 'Search query required' });
    }

    const writeups = await Writeup.search(q);
    res.json(writeups);
  } catch (error) {
    next(error);
  }
};