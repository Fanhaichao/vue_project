const express = require('express')

const router = express.Router()

const path = require('path')

var multer = require('multer');

const {
    shop
} = require('../db/index')

// 关于图片的磁盘处理
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/upload'))
    },
    filename: function (req, file, cb) {
        var fileFormat = file.originalname.split('.')
        const type = fileFormat[fileFormat.length - 1]
        const filename = file.fieldname + '-' + Date.now() + '.' + type
        cb(null, filename)
    }
})

var upload = multer({
    storage: storage
})

router.route('/')
    .post(upload.any(), async (req, res, next) => {
        //接收前端发来的数据 req.body
        //进行数据库操作
        //将数据库结果返回给前端

        const result = await shop.add(req.body)

        res.render('shop', {
            data: JSON.stringify({
                info: result.info,
                status: result.status,
                result: result.result
            })
        })
    })
    .delete(async (req, res, next) => {
        //接收前端发来的数据 req.body
        //进行数据库操作
        //将数据库结果返回给前端
        const {
            _id
        } = req.query
        const result = await shop.del(_id)

        res.render('shop', {
            data: JSON.stringify({
                info: result.info,
                status: result.status,
                result: result.result
            })
        })
    })
    .put(upload.any(), async (req, res, next) => {
        //接收前端发来的数据 req.body
        //进行数据库操作
        //将数据库结果返回给前端

        const result = await shop.modify(req.body)

        res.render('shop', {
            data: JSON.stringify({
                info: result.info,
                status: result.status,
                result: result.result
            })
        })
    })
    .get(async (req, res, next) => {
        //接收前端发来的数据 req.query
        //进行数据库操作
        //将数据库结果返回给前端
        const result = await shop.query()
        res.render('shop', {
            data: JSON.stringify({
                info: result.info,
                status: result.status,
                result: result.result
            })
        })
    })

module.exports = router