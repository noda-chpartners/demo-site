import { Search, X } from 'lucide-react';
import {
  INDUSTRIES,
  INDUSTRY_LABELS,
} from '../../data/lpData';
import type { Color, Industry, Taste } from '../../types/lp';
import styles from './Sidebar.module.css';

type Props = {
  id: string;
  keyword: string;
  industry: Industry | 'All';
  colors: Color[];
  tastes: Taste[];
  activeFilterCount: number;
  onKeywordChange: (value: string) => void;
  onIndustryChange: (value: Industry | 'All') => void;
  onColorsChange: (value: Color[]) => void;
  onTastesChange: (value: Taste[]) => void;
  onReset: () => void;
  onClose: () => void;
};

export function Sidebar(props: Props) {
  return (
    <aside id={props.id} className={styles.sidebar} aria-label="絞り込み条件">
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>絞り込み</h2>
          <p className={styles.subtitle}>
            {props.activeFilterCount > 0
              ? `${props.activeFilterCount}件 適用中`
              : '条件を選択してください'}
          </p>
        </div>
        <button
          type="button"
          className={styles.closeButton}
          onClick={props.onClose}
          aria-label="絞り込みを閉じる"
        >
          <X size={16} aria-hidden />
        </button>
      </div>

      <fieldset className={styles.section}>
        <legend className={styles.legend}>キーワード</legend>
        <div className={styles.searchField}>
          <Search size={14} className={styles.searchIcon} aria-hidden />
          <input
            type="search"
            value={props.keyword}
            onChange={(event) => props.onKeywordChange(event.target.value)}
            placeholder="サイト名・説明文で検索"
            className={styles.searchInput}
          />
        </div>
      </fieldset>

      <fieldset className={styles.section}>
        <legend className={styles.legend}>業種</legend>
        <div className={styles.pillGroup} role="radiogroup" aria-label="業種">
          <label className={styles.pill}>
            <input
              type="radio"
              name="industry"
              value="All"
              checked={props.industry === 'All'}
              onChange={() => props.onIndustryChange('All')}
            />
            <span>すべて</span>
          </label>
          {INDUSTRIES.map((industry) => (
            <label key={industry} className={styles.pill}>
              <input
                type="radio"
                name="industry"
                value={industry}
                checked={props.industry === industry}
                onChange={() => props.onIndustryChange(industry)}
              />
              <span>{INDUSTRY_LABELS[industry]}</span>
            </label>
          ))}
        </div>
      </fieldset>


      {props.activeFilterCount > 0 && (
        <button type="button" className={styles.resetButton} onClick={props.onReset}>
          条件をリセット
        </button>
      )}
    </aside>
  );
}
