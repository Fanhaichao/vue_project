const express = require('express')

const router = express.Router()

const fs = require('fs')

const jwt = require('jsonwebtoken')

const path = require('path')

const { user } = require('../db/index.js')

router.post('/', async(req, res, next) => {

    // 1. 拿到前端发来的数据
    // 2. 数据库进行数据查询， 看用户名/ 密码是否正确 
    const result = await user.query(req.body)

    const { token, username } = req.body

    let access_token = ''

    if (!token) {
        //如果存在token 那么我们不需要再次发送token
        // 没有token  需要生成token 然后返还给前端
        //payload 负载 负载就是前端传过来的数据
        let private_key = fs.readFileSync(path.join(__dirname, '../rsa/private_key.pem'))
        let public_key = fs.readFileSync(path.join(__dirname, '../rsa/public_key.pem'))
        access_token = jwt.sign(username, private_key, { algorithm: 'RS256' });
    }

    res.render('login', {
        data: JSON.stringify({
            status: result.status,
            info: result.info,
            token: token && '' || access_token
        })
    })
})

module.exports = router