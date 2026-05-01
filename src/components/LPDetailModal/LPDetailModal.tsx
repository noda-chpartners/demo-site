import { ExternalLink, Monitor, Smartphone, X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { INDUSTRY_LABELS } from '../../data/lpData';
import type { LPItem } from '../../types/lp';
import styles from './LPDetailModal.module.css';

type Props = {
  item: LPItem | null;
  onClose: () => void;
};

export function LPDetailModal({ item, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (!item) {
      if (dialog.open) dialog.close();
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    if (!dialog.open) dialog.showModal();

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [item]);

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-modal="true"
      aria-labelledby="lp-detail-title"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
    >
      {item && (
        <div className={styles.panel}>
          <header className={styles.header}>
            <div className={styles.headerInfo}>
              <p className={styles.industry}>{INDUSTRY_LABELS[item.categories.industry]}</p>
              <h2 id="lp-detail-title" className={styles.title}>
                {item.title}
              </h2>
            </div>
            <button
              type="button"
              className={styles.closeButton}
              onClick={onClose}
              aria-label="閉じる"
            >
              <X size={16} aria-hidden />
            </button>
          </header>

          <div className={styles.body}>
            <div className={styles.screenshots}>
              <figure className={styles.deviceGroup}>
                <figcaption className={styles.deviceLabel}>
                  <Monitor size={12} aria-hidden />
                  <span>PC</span>
                </figcaption>
                <div className={styles.deviceFrame}>
                  <img
                    src={item.thumbnail.pc}
                    alt={`${item.title} PC版スクリーンショット`}
                    width={1440}
                    height={1600}
                    loading="eager"
                    decoding="async"
                  />
                </div>
              </figure>

              <figure className={`${styles.deviceGroup} ${styles.deviceGroupSp}`}>
                <figcaption className={styles.deviceLabel}>
                  <Smartphone size={12} aria-hidden />
                  <span>SP</span>
                </figcaption>
                <div className={`${styles.deviceFrame} ${styles.deviceFrameSp}`}>
                  <img
                    src={item.thumbnail.sp}
                    alt={`${item.title} スマートフォン版スクリーンショット`}
                    width={390}
                    height={1600}
                    loading="eager"
                    decoding="async"
                  />
                </div>
              </figure>
            </div>

            <aside className={styles.meta}>
              <div className={styles.metaSection}>

                <ul className={styles.tags}>

                </ul>
              </div>

              {item.description && (
                <div className={styles.metaSection}>
                  <p className={styles.metaLabel}>説明</p>
                  <p className={styles.description}>{item.description}</p>
                </div>
              )}



              <a
                className={styles.link}
                href={item.url}
                target="_blank"
                rel="noreferrer noopener"
              >
                <span>デモサイトを開く</span>
                <ExternalLink size={14} aria-hidden />
              </a>
            </aside>
          </div>
        </div>
      )}
    </dialog>
  );
}
