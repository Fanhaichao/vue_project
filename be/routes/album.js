const express = require('express')

const multer = require('multer')

const path = require('path')

const router = express.Router()

//进行文件的磁盘存储
var storage = multer.diskStorage({
    destination: function (req, file, cb) { // 这个表示存储路径 ,
        cb(null, path.join(__dirname, '../public/upload'))
    },
    filename: function (req, file, cb) { // 给前端发来的文件起名
        console.log('file', file)
        const type = file.originalname.slice(file.originalname.indexOf('.'))
        const filename = file.fieldname + '-' + Date.now() + type
        cb(null, filename)
    }
})

var upload = multer({
    storage: storage
})


router.post('/', upload.any(), (req, res, next) => {

    res.render('album', {
        data: JSON.stringify({
            status: 0,
            info: '上传成功'
        })
    })
})

module.exports = router