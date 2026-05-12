import React from 'react';

// 应用整体布局外壳：顶部标题 + 内容容器
export function LayoutShell({ children, view, onChangeView }) {
  return (
    <div className="min-h-screen bg-mf-background">
      <header className="border-b border-mf-borderSoft/70 bg-mf-surface/70 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-semibold tracking-tight text-mf-text sm:text-2xl">
              Moment Flow
            </h1>
            <p className="text-xs text-mf-textMuted sm:text-sm">
              把零碎日常，慢慢收集成温柔片段。
            </p>
          </div>
          <nav className="flex gap-2 text-xs sm:text-sm">
            <button
              type="button"
              onClick={() => onChangeView('list')}
              className={`rounded-full px-3 py-1 font-medium transition-colors duration-200 ${
                view === 'list'
                  ? 'bg-mf-accent text-white shadow-mf-card-soft'
                  : 'bg-mf-surface text-mf-textMuted hover:bg-mf-surfaceSoft'
              }`}
            >
              记录列表
            </button>
            <button
              type="button"
              onClick={() => onChangeView('create')}
              className={`rounded-full px-3 py-1 font-medium transition-colors duration-200 ${
                view === 'create'
                  ? 'bg-mf-accent text-white shadow-mf-card-soft'
                  : 'bg-mf-surface text-mf-textMuted hover:bg-mf-surfaceSoft'
              }`}
            >
              新增记录
            </button>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
        {children}
      </main>
    </div>
  );
}
