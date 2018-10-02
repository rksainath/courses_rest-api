const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', { title: 'My Express App', messageOne: 'Welcome', messageTwo: 'This is to test the PUG package.' });
});

module.exports = router;