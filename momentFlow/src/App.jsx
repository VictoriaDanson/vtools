import React, { useEffect, useMemo, useState } from 'react';
import { LayoutShell } from './components/LayoutShell.jsx';
import { RecordList } from './pages/RecordList.jsx';
import { RecordCreate } from './pages/RecordCreate.jsx';
import { RecordDetail } from './pages/RecordDetail.jsx';
import { createRecord, fetchRecords } from './api/client.js';

// 生成今天的日期文案
function formatTodayLabel() {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  return `${month.toString().padStart(2, '0')}/${day
    .toString()
    .padStart(2, '0')} 今天`;
}

export default function App() {
  const [view, setView] = useState('list'); // list | create | detail
  const [records, setRecords] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const activeRecord = useMemo(
    () => records.find((r) => r.id === activeId) || null,
    [records, activeId],
  );

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const list = await fetchRecords();
        if (isMounted) {
          setRecords(list);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || '加载记录时出现问题');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleCreateRecord = async (payload) => {
    setError('');
    try {
      const created = await createRecord(payload);
      setRecords((prev) => [created, ...prev]);
      setView('list');
    } catch (err) {
      setError(err.message || '保存记录时出现问题');
    }
  };

  const handleOpenDetail = (id) => {
    setActiveId(id);
    setView('detail');
  };

  const renderView = () => {
    if (view === 'create') {
      return <RecordCreate onCreate={handleCreateRecord} />;
    }

    if (view === 'detail') {
      return <RecordDetail record={activeRecord} onBack={() => setView('list')} />;
    }

    return <RecordList records={records} onOpenDetail={handleOpenDetail} />;
  };

  return (
    <LayoutShell view={view} onChangeView={setView}>
      {error && (
        <div className="mb-4 rounded-3xl border border-mf-borderSoft bg-mf-surfaceSoft px-4 py-3 text-xs text-mf-text sm:text-sm">
          <div className="flex items-start gap-2">
            <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-mf-accent" />
            <p className="leading-relaxed">{error}</p>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex min-h-[40vh] flex-col items-center justify-center rounded-3xl bg-mf-surface p-8 text-center shadow-mf-card-soft">
          <p className="mb-2 text-sm text-mf-text">在帮你整理这些日常片段…</p>
          <p className="text-xs text-mf-textMuted">稍等一小会儿，画面就会慢慢亮起来。</p>
        </div>
      ) : (
        renderView()
      )}
    </LayoutShell>
  );
}
