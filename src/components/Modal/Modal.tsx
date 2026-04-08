import * as React from 'react';
import { createPortal } from 'react-dom';
import { Button } from '../Button/Button';
import './Modal.css';

export type ModalSize = '20' | '30' | '40' | '50' | '60' | '70' | '80' | '90' | '95' | '100';

export interface ModalAction {
  label: string;
  onClick?: () => void;
}

export interface ModalProps {
  /** When false, nothing is rendered (portal unmounted). */
  open: boolean;
  onClose: () => void;
  title?: string;
  subTitle?: string;
  size?: ModalSize;
  primaryAction?: ModalAction;
  secondaryAction?: ModalAction;
  /** Main content. */
  children?: React.ReactNode;
  /**
   * Figma `ModalBodyWrapper` / node 12047:24697 — shows the light bordered content slot when there is no `children`.
   * Matches design: only used when the modal has a footer (with-footer body variant).
   */
  hasBackgroundBox?: boolean;
  hideHeader?: boolean;
  hideFooter?: boolean;
  className?: string;
  /** Dialog label id for aria-labelledby (auto-set when title is a string). */
  titleId?: string;
}

function CloseIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        d="M10.1907 6.71992C9.23082 5.76003 7.67981 5.76003 6.71992 6.71992C5.76003 7.67981 5.76003 9.23082 6.71992 10.1907L14.5292 18L6.71992 25.8093C5.76003 26.7692 5.76003 28.3202 6.71992 29.2801C7.67981 30.24 9.23082 30.24 10.1907 29.2801L18 21.4708L25.8093 29.2801C26.7692 30.24 28.3202 30.24 29.2801 29.2801C30.24 28.3202 30.24 26.7692 29.2801 25.8093L21.4708 18L29.2801 10.1907C30.24 9.23082 30.24 7.67981 29.2801 6.71992C28.3202 5.76003 26.7692 5.76003 25.8093 6.71992L18 14.5292L10.1907 6.71992Z"
        fill="currentColor"
      />
    </svg>
  );
}

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title = 'Header',
  subTitle = 'Sub Header ',
  size = '40',
  primaryAction = { label: 'OK' },
  secondaryAction = { label: 'CANCEL' },
  children,
  hasBackgroundBox = true,
  hideHeader = false,
  hideFooter = false,
  className = '',
  titleId: titleIdProp,
}) => {
  const autoTitleId = React.useId();
  const titleId = titleIdProp ?? autoTitleId;
  const isNarrowFooter = size === '20';

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const handlePrimary = () => {
    primaryAction.onClick?.();
  };

  const handleSecondary = () => {
    secondaryAction.onClick?.();
  };

  const modal = (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={['modal', `modal--${size}`, className].filter(Boolean).join(' ')}
        role="dialog"
        aria-modal="true"
        aria-labelledby={hideHeader || !title ? undefined : titleId}
      >
        {!hideHeader && (
          <header className="modal__header">
            <div className="modal__header-row">
              <div>
                {title ? (
                  <h2 id={titleId} className="modal__title">
                    {title}
                  </h2>
                ) : null}
              </div>
              <button type="button" className="modal__close" onClick={onClose} aria-label="Close dialog">
                <CloseIcon />
              </button>
            </div>
            {subTitle ? <p className="modal__subtitle">{subTitle}</p> : null}
          </header>
        )}

        <div className="modal__body">
          <div className="modal__body-inner">
            {children}
            {!children && hasBackgroundBox && !hideFooter ? (
              <div className="modal__placeholder" aria-hidden />
            ) : null}
          </div>
        </div>

        {!hideFooter && (
          <footer
            className={[
              'modal__footer',
              isNarrowFooter ? 'modal__footer--stacked' : 'modal__footer--row',
            ].join(' ')}
          >
            {isNarrowFooter ? (
              <>
                <Button
                  type="button"
                  variant="primary"
                  size="md"
                  className="modal__footer-btn--block"
                  onClick={handlePrimary}
                >
                  {primaryAction.label}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  size="md"
                  className="modal__footer-btn--block"
                  onClick={handleSecondary}
                >
                  {secondaryAction.label}
                </Button>
              </>
            ) : (
              <>
                <Button
                  type="button"
                  variant="secondary"
                  size="md"
                  className="modal__footer-btn--fixed-width"
                  onClick={handleSecondary}
                >
                  {secondaryAction.label}
                </Button>
                <Button
                  type="button"
                  variant="primary"
                  size="md"
                  className="modal__footer-btn--fixed-width"
                  onClick={handlePrimary}
                >
                  {primaryAction.label}
                </Button>
              </>
            )}
          </footer>
        )}
      </div>
    </div>
  );

  return createPortal(modal, document.body);
};

Modal.displayName = 'Modal';
