// 数据库连接文件
const mongoose = require('mongoose')

const HOST_NAME = '127.0.0.1'

const PORT = '27017'

const DB_NAME = '1908'

const DB_URL = `mongodb://${ HOST_NAME }:${ PORT }/${ DB_NAME }`

const connect = {
    init() {
        // 连接代码
        //mongoose.connect(数据库连接地址，错误有限的回调函数)
        mongoose.connect(DB_URL, (err) => {
            if (err) {
                console.log(err)
            } else {
                console.log('db connect is success.....')
            }
        })

    }
}

module.exports = connect