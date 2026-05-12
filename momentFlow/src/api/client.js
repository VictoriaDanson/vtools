// 与 Node.js + SQLite 后端 RESTful 接口的实际对接

// 支持通过环境变量配置后端地址：
// - 开发环境：Vite 中设置 VITE_API_BASE_URL
// - 生产环境（GitHub Pages）：构建前也可注入对应变量
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

async function handleResponse(res) {
  if (!res.ok) {
    let message = `请求失败：${res.status}`;
    try {
      const data = await res.json();
      if (data && data.error) {
        message = data.error;
      }
    } catch (e) {
      // ignore JSON parse error
    }
    throw new Error(message);
  }
  return res.json();
}

// 将后端 notes 数据映射为前端记录结构
function mapNoteToRecord(note) {
  const createdAt = note.created_at ? new Date(note.created_at) : new Date();
  const month = (createdAt.getMonth() + 1).toString().padStart(2, '0');
  const day = createdAt.getDate().toString().padStart(2, '0');
  return {
    id: note.id,
    title: note.title || '',
    content: note.content || '',
    imageUrl: note.image_url || '',
    dateLabel: `${month}/${day}`,
    raw: note,
  };
}

/**
 * 获取记录列表
 */
export async function fetchRecords() {
  const res = await fetch(`${API_BASE_URL}/notes`);
  const data = await handleResponse(res);
  return Array.isArray(data) ? data.map(mapNoteToRecord) : [];
}

/**
 * 创建记录
 * @param {Object} payload { title, content, imageUrl }
 */
export async function createRecord(payload) {
  const res = await fetch(`${API_BASE_URL}/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      // 后端会为未传 user_id 的情况创建默认用户
      title: payload.title,
      content: payload.content,
      image_url: payload.imageUrl,
    }),
  });
  const data = await handleResponse(res);
  return mapNoteToRecord(data);
}

/**
 * 获取单条记录详情
 * @param {number|string} id
 */
export async function fetchRecordDetail(id) {
  const res = await fetch(`${API_BASE_URL}/notes/${id}`);
  const data = await handleResponse(res);
  return mapNoteToRecord(data);
}
