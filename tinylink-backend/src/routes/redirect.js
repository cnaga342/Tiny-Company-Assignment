const express = require('express');
const Link = require('../models/Link');
const { isValidCode } = require('../lib/validate');

const router = express.Router();

// Redirect route: GET /:code
// Note: This must be after /api routes to not clash.
router.get('/:code', async (req, res, next) => {
  try {
    const { code } = req.params;
    if (!isValidCode(code)) {
      // If code doesn't match expected pattern, let 404
      return res.status(404).send('Not found');
    }

    // Use findOneAndUpdate atomically: increment clicks and set lastClicked; return original target
    const updated = await Link.findOneAndUpdate(
      { code, isDeleted: false },
      { $inc: { clicks: 1 }, $set: { lastClicked: new Date() } },
      { new: true } // return new doc
    );

    if (!updated) {
      return res.status(404).send('Not found');
    }

    // Redirect (302)
    return res.redirect(302, updated.target);
  } catch (err) {
    console.error('Redirect error', err);
    return res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
