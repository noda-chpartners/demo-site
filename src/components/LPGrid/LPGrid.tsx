import { Inbox } from 'lucide-react';
import type { LPItem } from '../../types/lp';
import { LPCard } from '../LPCard/LPCard';
import styles from './LPGrid.module.css';

type Props = {
  items: LPItem[];
  onSelect: (item: LPItem) => void;
};

export function LPGrid({ items, onSelect }: Props) {
  if (items.length === 0) {
    return (
      <div className={styles.empty} role="status">
        <Inbox size={28} aria-hidden className={styles.emptyIcon} />
        <p className={styles.emptyTitle}>該当するLPはありません</p>
        <p className={styles.emptyText}>条件を変更するか、絞り込みをリセットしてください。</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {items.map((item) => (
        <LPCard key={item.id} item={item} onSelect={onSelect} />
      ))}
    </div>
  );
}
