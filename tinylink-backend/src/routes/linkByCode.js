const express = require('express');
const Link = require('../models/Link');
const router = express.Router();

// GET /api/links/:code
router.get('/:code', async (req, res) => {
  try {
    const { code } = req.params;
    const link = await Link.findOne({ code, isDeleted: false }).select('-__v');
    if (!link) return res.status(404).json({ error: 'Not found' });
    return res.status(200).json(link);
  } catch (err) {
    console.error('GET /api/links/:code error', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE /api/links/:code
router.delete('/:code', async (req, res) => {
  try {
    const { code } = req.params;
    const link = await Link.findOne({ code });
    if (!link) return res.status(404).json({ error: 'Not found' });

    // soft delete
    link.isDeleted = true;
    await link.save();
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('DELETE /api/links/:code error', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
