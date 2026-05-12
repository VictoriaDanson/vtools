const express = require('express');
const path = require('path');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

// Simple CORS so前端应用可以直接调用本服务
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

const DEFAULT_USER_NAME = 'momentflow_default';

// 确保存在一个默认用户，便于前端简单创建笔记
function ensureDefaultUser(callback) {
  db.get('SELECT id FROM users WHERE name = ?', [DEFAULT_USER_NAME], (err, row) => {
    if (err) {
      return callback(err);
    }
    if (row) {
      return callback(null, row.id);
    }
    const stmt = db.prepare('INSERT INTO users (name) VALUES (?)');
    stmt.run(DEFAULT_USER_NAME, function (insertErr) {
      if (insertErr) {
        return callback(insertErr);
      }
      callback(null, this.lastID);
    });
  });
}

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Create user
app.post('/users', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'name is required' });
  }

  const stmt = db.prepare('INSERT INTO users (name) VALUES (?)');
  stmt.run(name, function (err) {
    if (err) {
      return res.status(500).json({ error: 'failed to create user' });
    }
    res.status(201).json({ id: this.lastID, name });
  });
});

// List users
app.get('/users', (req, res) => {
  db.all('SELECT * FROM users ORDER BY id DESC', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'failed to fetch users' });
    }
    res.json(rows);
  });
});

// Create note
app.post('/notes', (req, res) => {
  const { user_id, title, content, image_url } = req.body;

  // 如果没有传 user_id，则为前端创建一个默认用户并使用其 id
  const insertWithUser = (resolvedUserId) => {
    const stmt = db.prepare(
      'INSERT INTO notes (user_id, title, content, image_url) VALUES (?, ?, ?, ?)',
    );
    stmt.run(
      resolvedUserId,
      title || null,
      content || null,
      image_url || null,
      function (err) {
        if (err) {
          return res.status(500).json({ error: 'failed to create note' });
        }
        res.status(201).json({
          id: this.lastID,
          user_id: resolvedUserId,
          title: title || null,
          content: content || null,
          image_url: image_url || null,
        });
      },
    );
  };

  if (user_id) {
    return insertWithUser(user_id);
  }

  ensureDefaultUser((err, defaultUserId) => {
    if (err) {
      return res.status(500).json({ error: 'failed to resolve default user' });
    }
    insertWithUser(defaultUserId);
  });
});

// List notes
app.get('/notes', (req, res) => {
  db.all('SELECT * FROM notes ORDER BY id DESC', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'failed to fetch notes' });
    }
    res.json(rows);
  });
});

// Get single note
app.get('/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  db.get('SELECT * FROM notes WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'failed to fetch note' });
    }
    if (!row) {
      return res.status(404).json({ error: 'note not found' });
    }
    res.json(row);
  });
});

// Update note
app.put('/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  const { title, content, image_url } = req.body;

  const stmt = db.prepare(
    `UPDATE notes
     SET title = COALESCE(?, title),
         content = COALESCE(?, content),
         image_url = COALESCE(?, image_url),
         updated_at = datetime('now')
     WHERE id = ?`,
  );

  stmt.run(title, content, image_url, id, function (err) {
    if (err) {
      return res.status(500).json({ error: 'failed to update note' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'note not found' });
    }
    res.json({ message: 'note updated' });
  });
});

// Delete note
app.delete('/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  const stmt = db.prepare('DELETE FROM notes WHERE id = ?');
  stmt.run(id, function (err) {
    if (err) {
      return res.status(500).json({ error: 'failed to delete note' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'note not found' });
    }
    res.status(204).send();
  });
});

// Serve SQLite file path info (for debugging, not recommended in production)
app.get('/debug/db-path', (req, res) => {
  res.json({ dbPath: path.join(__dirname, '..', 'data', 'notes.db') });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Note service listening on port ${PORT}`);
});
