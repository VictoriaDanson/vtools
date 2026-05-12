import React from 'react';
import { RecordCard } from '../components/RecordCard.jsx';

// 记录列表页
export function RecordList({ records, onOpenDetail }) {
  if (!records.length) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center rounded-3xl bg-mf-surface p-8 text-center shadow-mf-card-soft">
        <p className="mb-3 text-sm text-mf-text">这里暂时还空空的。</p>
        <p className="text-xs text-mf-textMuted">
          从某个小瞬间开始，给自己的生活存一份温柔备份。
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
      {records.map((record) => (
        <RecordCard
          key={record.id}
          record={record}
          onOpen={() => onOpenDetail(record.id)}
        />
      ))}
    </div>
  );
}
