import React from 'react';

// 单个记录卡片，展示缩略信息
export function RecordCard({ record, onOpen }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group flex h-full flex-col rounded-3xl bg-mf-surface p-4 text-left shadow-mf-card-soft transition-all duration-200 hover:-translate-y-0.5 hover:shadow-mf-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mf-accent/70"
    >
      {record.imageUrl && (
        <div className="mb-3 overflow-hidden rounded-2xl bg-mf-surfaceSoft">
          <img
            src={record.imageUrl}
            alt={record.title || '记录图片预览'}
            className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col">
        <div className="mb-2 flex items-center justify-between gap-2">
          <h2 className="line-clamp-1 text-sm font-semibold text-mf-text sm:text-base">
            {record.title || '无标题记录'}
          </h2>
          <span className="shrink-0 rounded-full bg-mf-surfaceSoft px-2 py-0.5 text-[10px] text-mf-textMuted">
            {record.dateLabel}
          </span>
        </div>
        <p className="line-clamp-3 text-xs leading-relaxed text-mf-textMuted sm:text-sm">
          {record.content || '这是一条空白的记录，可以写下今天的小情绪、小瞬间。'}
        </p>
      </div>
    </button>
  );
}
