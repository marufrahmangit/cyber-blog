const Writeup = require('../models/Writeup');

exports.getAllWriteups = async (req, res, next) => {
  try {
    const writeups = await Writeup.findAll();
    res.json(writeups);
  } catch (error) {
    next(error);
  }
};

exports.getWriteupById = async (req, res, next) => {
  try {
    const writeup = await Writeup.findById(req.params.id);
    
    if (!writeup) {
      return res.status(404).json({ error: 'Writeup not found' });
    }

    res.json(writeup);
  } catch (error) {
    next(error);
  }
};

exports.createWriteup = async (req, res, next) => {
  try {
    const { title, content, excerpt, tags, status } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content required' });
    }

    const writeupId = await Writeup.create(
      { title, content, excerpt, tags, status },
      req.user.id
    );

    const writeup = await Writeup.findById(writeupId);
    res.status(201).json(writeup);
  } catch (error) {
    next(error);
  }
};

exports.updateWriteup = async (req, res, next) => {
  try {
    const { title, content, excerpt, tags, status } = req.body;
    
    const affectedRows = await Writeup.update(req.params.id, {
      title,
      content,
      excerpt,
      tags,
      status
    });

    if (affectedRows === 0) {
      return res.status(404).json({ error: 'Writeup not found' });
    }

    const writeup = await Writeup.findById(req.params.id);
    res.json(writeup);
  } catch (error) {
    next(error);
  }
};

exports.deleteWriteup = async (req, res, next) => {
  try {
    const affectedRows = await Writeup.delete(req.params.id);

    if (affectedRows === 0) {
      return res.status(404).json({ error: 'Writeup not found' });
    }

    res.json({ message: 'Writeup deleted successfully' });
  } catch (error) {
    next(error);
  }
};