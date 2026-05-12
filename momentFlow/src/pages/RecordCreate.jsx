import React from 'react';
import { RecordForm } from '../components/RecordForm.jsx';

// 新增记录页
export function RecordCreate({ onCreate }) {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-mf-text">今天，想留下什么片段？</h2>
        <p className="text-xs text-mf-textMuted sm:text-sm">
          一张照片、一句话，或是一整段的心情，都值得被温柔存放。
        </p>
      </div>
      <RecordForm onSubmit={onCreate} />
    </div>
  );
}
