import React from 'react';

// 记录详情页
export function RecordDetail({ record, onBack }) {
  if (!record) return null;

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1 rounded-full bg-mf-surface px-3 py-1 text-xs text-mf-textMuted shadow-mf-card-soft transition hover:-translate-y-0.5 hover:shadow-mf-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mf-accent/60"
      >
        <span className="text-sm">←</span>
        返回列表
      </button>

      <article className="space-y-5 rounded-3xl bg-mf-surface p-5 shadow-mf-card-soft sm:p-6">
        {record.imageUrl && (
          <div className="overflow-hidden rounded-3xl bg-mf-surfaceSoft">
            <img
              src={record.imageUrl}
              alt={record.title || '记录图片'}
              className="max-h-[420px] w-full object-cover"
            />
          </div>
        )}
        <header className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-mf-surfaceSoft px-3 py-1 text-[11px] text-mf-textMuted">
            <span>{record.dateLabel}</span>
            <span className="h-1 w-1 rounded-full bg-mf-accent/70" />
            <span>日常片段</span>
          </div>
          <h2 className="text-lg font-semibold tracking-tight text-mf-text sm:text-xl">
            {record.title || '无标题记录'}
          </h2>
        </header>
        <p className="whitespace-pre-wrap text-sm leading-relaxed text-mf-text sm:text-base">
          {record.content || '暂无内容。可以在写下第一句话时，让这条记录真正拥有重量。'}
        </p>
      </article>
    </div>
  );
}
