const express = require('express');
const { User } = require('../models/User');

const router = express.Router();

//회원가입 처리


router.post('/signup', (req, res) => {
    User.findOne({email : req.body.email})
        .then(user => {
            if(user) { //이메일 중복인 경우
                return res.json({
                    result : false,
                    message : '해당 이메일을 가진 사용자가 존재합니다.'
                })
            } else {
                const newUser = new User(req.body);
                newUser.save((err, doc) => {
                    if (err) return res.json({ result : false , err });
                    return res.status(200).json({
                        result : true,
                        message : '회원 가입이 완료되었습니다.'
                    });
                });
            }
        })
});



module.exports = router;