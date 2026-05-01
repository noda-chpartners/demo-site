import { memo } from 'react';
import { INDUSTRY_LABELS } from '../../data/lpData';
import type { LPItem } from '../../types/lp';
import styles from './LPCard.module.css';

type Props = {
  item: LPItem;
  onSelect: (item: LPItem) => void;
};

function LPCardBase({ item, onSelect }: Props) {
  return (
    <article className={styles.card}>
      <button
        type="button"
        className={styles.button}
        onClick={() => onSelect(item)}
        aria-label={`${item.title}の詳細を表示`}
      >
        <div className={styles.thumbWrap}>
          <img
            src={item.thumbnail.card}
            alt=""
            width={640}
            height={360}
            loading="lazy"
            decoding="async"
            className={styles.thumbnail}
          />
        </div>

        <div className={styles.body}>
          <p className={styles.industry}>{INDUSTRY_LABELS[item.categories.industry]}</p>
          <h2 className={styles.title}>{item.title}</h2>
          {item.description && (
            <p className={styles.description}>{item.description}</p>
          )}

        </div>
      </button>
    </article>
  );
}

export const LPCard = memo(LPCardBase);
