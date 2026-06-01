const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./inspirations.db')

// 初始化数据库
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS inspirations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT NOT NULL,
    time INTEGER NOT NULL
  )`)
})

// 获取所有记录
function getAllItems(callback) {
  db.all('SELECT * FROM inspirations ORDER BY time DESC', callback)
}

// 添加记录
function addItem(content, callback) {
  const time = Date.now()
  db.run('INSERT INTO inspirations (content, time) VALUES (?, ?)', [content, time], callback)
}

// 删除记录
function deleteItem(id, callback) {
  db.run('DELETE FROM inspirations WHERE id = ?', [id], callback)
}

// 清空所有记录
function clearAll(callback) {
  db.run('DELETE FROM inspirations', callback)
}

module.exports = { getAllItems, addItem, deleteItem, clearAll }