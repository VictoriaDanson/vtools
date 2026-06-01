const express = require('express')
const sqlite = require('./db-sqlite-record')
const cors = require('cors')
const path = require('path')

const app = express()
const port = 3000

// 中间件
app.use(cors())
app.use(express.json())

// 静态文件服务 - 服务 record 目录
app.use('/record', express.static(path.join(__dirname, '../../record')))

// 获取所有记录
app.get('/api/inspirations', (req, res) => {
  sqlite.getAllItems((err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.json(rows)
  })
})

// 添加记录
app.post('/api/inspirations', (req, res) => {
  const { content } = req.body
  if (!content) {
    res.status(400).json({ error: '内容不能为空' })
    return
  }

  sqlite.addItem(content, (err) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.status(201).json({ message: '记录添加成功' })
  })
})

// 删除记录
app.delete('/api/inspirations/:id', (req, res) => {
  const { id } = req.params
  sqlite.deleteItem(id, (err) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.json({ message: '记录删除成功' })
  })
})

// 启动服务器
app.listen(port, () => {
  console.log(`服务器运行在 http://localhost:${port}`)
})