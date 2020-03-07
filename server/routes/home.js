const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    console.log('빽 타니??');
    res.status(200).json({ success : true, message : 'Hello World!'})
})


router.get('/home', (req, res) => {
    console.log('home 타니?');
    res.status(200).json({ success : true, message : 'Hello World!'})
})

module.exports = router;