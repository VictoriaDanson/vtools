import React, { useState } from 'react';

// 新增 / 编辑记录表单
export function RecordForm({ onSubmit, initialValue }) {
  const [title, setTitle] = useState(initialValue?.title || '');
  const [content, setContent] = useState(initialValue?.content || '');
  const [imageUrl, setImageUrl] = useState(initialValue?.imageUrl || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content, imageUrl });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-3xl bg-mf-surface p-5 shadow-mf-card-soft sm:p-6"
    >
      <div className="space-y-2">
        <label className="block text-xs font-medium text-mf-text sm:text-sm">
          标题
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="给今天的小片段起个名字"
          className="w-full rounded-full border border-mf-borderSoft bg-mf-surfaceSoft px-4 py-2 text-sm text-mf-text placeholder:text-mf-textMuted/70 outline-none transition focus:border-mf-accent/60 focus:ring-2 focus:ring-mf-accent/40"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-xs font-medium text-mf-text sm:text-sm">
          图片链接（可选）
        </label>
        <input
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="粘贴一张令你心情变好的图片链接"
          className="w-full rounded-full border border-mf-borderSoft bg-mf-surfaceSoft px-4 py-2 text-sm text-mf-text placeholder:text-mf-textMuted/70 outline-none transition focus:border-mf-accent/60 focus:ring-2 focus:ring-mf-accent/40"
        />
        {imageUrl && (
          <div className="mt-2 overflow-hidden rounded-2xl bg-mf-surfaceSoft">
            <img
              src={imageUrl}
              alt="预览"
              className="max-h-56 w-full object-cover"
            />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-xs font-medium text-mf-text sm:text-sm">
          文字内容
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="写下今天让你感到温柔的瞬间、心情或想法。"
          rows={5}
          className="w-full rounded-3xl border border-mf-borderSoft bg-mf-surfaceSoft px-4 py-3 text-sm leading-relaxed text-mf-text placeholder:text-mf-textMuted/70 outline-none transition focus:border-mf-accent/60 focus:ring-2 focus:ring-mf-accent/40"
        />
      </div>

      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-full bg-mf-accent px-5 py-2 text-sm font-medium text-white shadow-mf-card-soft transition-all duration-200 hover:-translate-y-0.5 hover:bg-mf-accentSoft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mf-accent/70"
        >
          保存这条记忆
        </button>
      </div>
    </form>
  );
}
