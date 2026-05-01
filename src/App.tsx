import { useMemo, useState } from 'react';
import { Filter, Search, X } from 'lucide-react';
import {
  INDUSTRY_LABELS,
  lpData,
} from './data/lpData';
import type { Color, Industry, LPItem, Taste } from './types/lp';
import { Sidebar } from './components/Sidebar/Sidebar';
import { LPGrid } from './components/LPGrid/LPGrid';
import { LPDetailModal } from './components/LPDetailModal/LPDetailModal';
import styles from './App.module.css';

export default function App() {
  const [keyword, setKeyword] = useState('');
  const [industry, setIndustry] = useState<Industry | 'All'>('All');
  const [colors, setColors] = useState<Color[]>([]);
  const [tastes, setTastes] = useState<Taste[]>([]);
  const [selected, setSelected] = useState<LPItem | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    if (typeof window === 'undefined') return true;
    return window.matchMedia('(min-width: 769px)').matches;
  });

  const filteredItems = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();

    return lpData.filter((item) => {
      const matchesKeyword =
        normalizedKeyword === '' ||
        `${item.title} ${item.description ?? ''}`.toLowerCase().includes(normalizedKeyword);

      const matchesIndustry = industry === 'All' || item.categories.industry === industry;

      return matchesKeyword && matchesIndustry;
    });
  }, [keyword, industry, colors, tastes]);

  const activeFilterCount =
    (keyword.trim() ? 1 : 0) + (industry !== 'All' ? 1 : 0) + colors.length + tastes.length;

  const resetFilters = () => {
    setKeyword('');
    setIndustry('All');
    setColors([]);
    setTastes([]);
  };

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <span className={styles.brandMark} aria-hidden />
          <div className={styles.brandText}>
            <p className={styles.brandLabel}>Internal Reference</p>
            <h1 className={styles.brandTitle}>LP Demo Gallery</h1>
          </div>
        </div>

        <div className={styles.headerActions}>
          <span className={styles.resultCount} aria-live="polite">
            <strong>{filteredItems.length}</strong>
            <span className={styles.resultDivider}>/</span>
            <span>{lpData.length}</span>
            <span className={styles.resultUnit}>件</span>
          </span>

          <button
            type="button"
            className={styles.toggleButton}
            onClick={() => setSidebarOpen((prev) => !prev)}
            aria-expanded={sidebarOpen}
            aria-controls="filter-sidebar"
          >
            <Filter size={15} aria-hidden />
            <span className={styles.toggleLabel}>絞り込み</span>
            {activeFilterCount > 0 && (
              <span className={styles.toggleBadge} aria-label={`${activeFilterCount}件適用中`}>
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>
      </header>

      <main className={`${styles.layout} ${!sidebarOpen ? styles.layoutFull : ''}`}>
        {sidebarOpen && (
          <>
            <button
              type="button"
              className={styles.backdrop}
              onClick={() => setSidebarOpen(false)}
              aria-label="フィルターを閉じる"
            />

            <Sidebar
              id="filter-sidebar"
              keyword={keyword}
              industry={industry}
              colors={colors}
              tastes={tastes}
              activeFilterCount={activeFilterCount}
              onKeywordChange={setKeyword}
              onIndustryChange={setIndustry}
              onColorsChange={setColors}
              onTastesChange={setTastes}
              onReset={resetFilters}
              onClose={() => setSidebarOpen(false)}
            />
          </>
        )}

        <section className={styles.content} aria-label="LPデモ一覧">
          {activeFilterCount > 0 && (
            <div className={styles.activeChips} role="group" aria-label="適用中のフィルター">
              <span className={styles.chipsLabel}>適用中</span>

              {keyword.trim() && (
                <button
                  type="button"
                  className={styles.chip}
                  onClick={() => setKeyword('')}
                  aria-label={`キーワード「${keyword}」を解除`}
                >
                  <Search size={12} aria-hidden />
                  <span className={styles.chipValue}>{keyword}</span>
                  <X size={12} aria-hidden />
                </button>
              )}

              {industry !== 'All' && (
                <button
                  type="button"
                  className={styles.chip}
                  onClick={() => setIndustry('All')}
                  aria-label={`業種「${INDUSTRY_LABELS[industry]}」を解除`}
                >
                  <span className={styles.chipKey}>業種</span>
                  <span className={styles.chipValue}>{INDUSTRY_LABELS[industry]}</span>
                  <X size={12} aria-hidden />
                </button>
              )}

              <button type="button" className={styles.chipsReset} onClick={resetFilters}>
                すべてクリア
              </button>
            </div>
          )}

          <LPGrid items={filteredItems} onSelect={setSelected} />
        </section>
      </main>

      <footer className={styles.footer}>
        <p>社内共有用のLPデモリファレンスです。コンテンツは静的データで管理します。</p>
      </footer>

      <LPDetailModal item={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
