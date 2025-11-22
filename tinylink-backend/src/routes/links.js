const express = require('express');
const Link = require('../models/Link');
const { isValidUrl, isValidCode, generateCode } = require('../lib/validate');

const router = express.Router();

/**
 * POST /api/links
 * Body: { target: string, code?: string }
 * - 201 created
 * - 400 invalid input
 * - 409 duplicate code
 */
router.post('/', async (req, res) => {
  try {
    const { target, code: rawCode } = req.body;
    if (!target || !isValidUrl(target)) {
      return res.status(400).json({ error: 'Invalid URL' });
    }

    let code = rawCode;
    if (code) {
      if (!isValidCode(code)) {
        return res.status(400).json({ error: 'Invalid code format. Must match [A-Za-z0-9]{6,8}' });
      }
      // check duplicate
      const exists = await Link.findOne({ code });
      if (exists && !exists.isDeleted) {
        return res.status(409).json({ error: 'Code already exists' });
      }
      // if exists but deleted, allow reuse? to be safe, treat as exists -> 409 (spec expects unique globally)
      if (exists) {
        return res.status(409).json({ error: 'Code already exists' });
      }
    } else {
      // generate unique code (retry a few times)
      let tries = 0;
      do {
        code = generateCode(6);
        const ex = await Link.findOne({ code });
        if (!ex) break;
        tries++;
      } while (tries < 5);

      // if still exists after retries, increase length
      if (!code) {
        return res.status(500).json({ error: 'Unable to generate unique code' });
      }
    }

    const link = await Link.create({ code, target });
    return res.status(201).json({
      code: link.code,
      target: link.target,
      clicks: link.clicks,
      lastClicked: link.lastClicked,
      createdAt: link.createdAt
    });
  } catch (err) {
    console.error('POST /api/links error', err);
    // Handle unique index duplicate throw (race)
    if (err.code === 11000 && err.keyPattern && err.keyPattern.code) {
      return res.status(409).json({ error: 'Code already exists' });
    }
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

/**
 * GET /api/links
 * List all non-deleted links
 */
router.get('/', async (req, res) => {
  try {
    const docs = await Link.find({ isDeleted: false }).sort({ createdAt: -1 }).select('-__v');
    return res.status(200).json(docs);
  } catch (err) {
    console.error('GET /api/links error', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
