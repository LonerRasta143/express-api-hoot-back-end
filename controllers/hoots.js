onst express = require('express');
const router = express.Router();
const Hoot = require('../models/hoot.js');
const verifyToken = require('../middlewares/verify-jwt.js'); 

// POST - Create a Hoot
router.post('/', verifyToken, async (req, res) => {
  try {
    // 1. Assign the ID from the middleware to the author field
    req.body.author = req.user._id;

    // 2. create the hoot
    const hoot = await Hoot.create(req.body);

    // 3. add the user info to the document for the response
    // hoot._doc = Mongoose stores data here
    hoot._doc.author = req.user;

    res.status(201).json(hoot);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

module.exports = router;