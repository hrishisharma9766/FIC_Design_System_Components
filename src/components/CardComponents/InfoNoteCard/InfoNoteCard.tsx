import * as React from 'react';
import { ErrorCardIconError } from '../ErrorCard/ErrorCard';
import { LinkButton, type LinkButtonProps } from '../../LinkButton/LinkButton';
import './InfoNoteCard.css';

type SvgProps = React.SVGProps<SVGSVGElement>;

/** 24×24 — info / focus banner (Blue600 glyph). */
export function InfoNoteCardIconBannerInfo(props: SvgProps) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden {...props}>
      <path
        fill="currentColor"
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
      />
    </svg>
  );
}

/** 24×24 — success banner (Lime600 glyph). */
export function InfoNoteCardIconBannerSuccess(props: SvgProps) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden {...props}>
      <path
        fill="currentColor"
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
      />
    </svg>
  );
}

/** 16×16 — detail / inline meta (neutral glyph). */
export function InfoNoteCardIconParagraph(props: SvgProps) {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden {...props}>
      <path
        fill="currentColor"
        d="M3 2h10a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V3a1 1 0 011-1zm1 2v1.5h8V4H4zm0 3v1h5V7H4zm0 2.5v1h8v-1H4zm0 2.5v1h5v-1H4z"
      />
    </svg>
  );
}

/** 16×16 — phone line (meta row). */
export function InfoNoteCardIconPhone(props: SvgProps) {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden {...props}>
      <path
        fill="currentColor"
        d="M3.78 2.05c.62-.11 1.27.04 1.76.45l1.58 1.32c.48.4.68 1.05.52 1.66l-.32 1.2a1 1 0 00.28.98l2.08 2.08a1 1 0 00.98.28l1.2-.32a1.7 1.7 0 011.66.52l1.32 1.58c.41.49.56 1.14.45 1.76-.12.63-.5 1.18-1.05 1.5A12.02 12.02 0 013 5.1c-.32-.55-.37-1.2-.05-1.83.32-.55.87-.93 1.5-1.05l.33-.17z"
      />
    </svg>
  );
}

const BANNER_ICONS: Record<InfoNoteCardBannerTone, React.ReactNode> = {
  error: <ErrorCardIconError width={21} height={20} />,
  info: <InfoNoteCardIconBannerInfo />,
  success: <InfoNoteCardIconBannerSuccess />,
  focus: <InfoNoteCardIconBannerInfo />,
};

/** Standard title + body strips (error, info, success, focus / teal). */
export type InfoNoteCardBannerTone = 'error' | 'info' | 'success' | 'focus';

/** Extended card: neutral, brand pink, or focus teal — with optional meta + pill link. */
export type InfoNoteCardDetailTone = 'neutral' | 'brand' | 'focus';

export type InfoNoteCardInlineTone = 'success';

export type InfoNoteCardPricingValueEmphasis = 'default' | 'discount' | 'strong';

export interface InfoNoteCardPricingLine {
  label: string;
  value: string;
  valueEmphasis?: InfoNoteCardPricingValueEmphasis;
}

const DETAIL_LINK_VARIANT: Record<InfoNoteCardDetailTone, NonNullable<LinkButtonProps['variant']>> = {
  neutral: 'teal',
  brand: 'brand',
  focus: 'teal',
};

const DEFAULT_DESCRIPTION =
  'Configure WorldPay credentials for each location and set up hosted e-commerce payments.';

const DEFAULT_PRICING_LINES: InfoNoteCardPricingLine[] = [
  { label: 'Original Price', value: '$0.00', valueEmphasis: 'default' },
  { label: 'Discount:', value: '-$0.00 (0%)', valueEmphasis: 'discount' },
  { label: 'Final Price', value: '$0.00', valueEmphasis: 'strong' },
];

export interface InfoNoteCardBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  mode?: 'banner';
  tone?: InfoNoteCardBannerTone;
  title?: string;
  description?: React.ReactNode;
  /** Overrides tone default icon (24×24 area). */
  icon?: React.ReactNode;
  showIcon?: boolean;
}

export interface InfoNoteCardDetailProps extends React.HTMLAttributes<HTMLDivElement> {
  mode: 'detail';
  detailTone: InfoNoteCardDetailTone;
  description?: React.ReactNode;
  metaText?: string;
  metaIcon?: React.ReactNode;
  showMeta?: boolean;
  actionLabel?: string;
  showAction?: boolean;
  /** Leading icon beside body (16×16). */
  leadIcon?: React.ReactNode;
  showLeadIcon?: boolean;
  linkButtonProps?: Omit<LinkButtonProps, 'variant'>;
}

export interface InfoNoteCardInlineProps extends React.HTMLAttributes<HTMLDivElement> {
  mode: 'inline';
  inlineTone?: InfoNoteCardInlineTone;
  message: React.ReactNode;
  trailing?: React.ReactNode;
  showIcon?: boolean;
  icon?: React.ReactNode;
}

export interface InfoNoteCardPricingProps extends React.HTMLAttributes<HTMLDivElement> {
  mode: 'pricing';
  heading?: string;
  lines?: InfoNoteCardPricingLine[];
  /** Header icon (24×24). */
  icon?: React.ReactNode;
  showIcon?: boolean;
}

export type InfoNoteCardProps =
  | InfoNoteCardBannerProps
  | InfoNoteCardDetailProps
  | InfoNoteCardInlineProps
  | InfoNoteCardPricingProps;

function isDetail(p: InfoNoteCardProps): p is InfoNoteCardDetailProps {
  return p.mode === 'detail';
}

function isInline(p: InfoNoteCardProps): p is InfoNoteCardInlineProps {
  return p.mode === 'inline';
}

function isPricing(p: InfoNoteCardProps): p is InfoNoteCardPricingProps {
  return p.mode === 'pricing';
}

export const InfoNoteCard = React.forwardRef<HTMLDivElement, InfoNoteCardProps>(function InfoNoteCard(
  props,
  ref,
) {
  const { className = '' } = props;
  const rootClass = ['info-note-card', className].filter(Boolean).join(' ');

  if (isPricing(props)) {
    const {
      mode: _m,
      heading = 'Discount Preview',
      lines = DEFAULT_PRICING_LINES,
      icon,
      showIcon = true,
      ...divProps
    } = props;
    return (
      <div ref={ref} className={[rootClass, 'info-note-card--pricing'].join(' ')} {...divProps}>
        <div className="info-note-card__pricing-head">
          {showIcon && (
            <span className="info-note-card__pricing-head-icon" aria-hidden>
              {icon ?? <InfoNoteCardIconBannerSuccess />}
            </span>
          )}
          <p className="info-note-card__pricing-heading">{heading}</p>
        </div>
        <div className="info-note-card__pricing-rows">
          {lines.map((line, i) => (
            <div key={`${line.label}-${i}`} className="info-note-card__pricing-row">
              <span className="info-note-card__pricing-label">{line.label}</span>
              <p
                className={[
                  'info-note-card__pricing-value',
                  line.valueEmphasis === 'discount' ? 'info-note-card__pricing-value--discount' : '',
                  line.valueEmphasis === 'strong' ? 'info-note-card__pricing-value--strong' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {line.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isInline(props)) {
    const {
      mode: _m,
      inlineTone = 'success',
      message,
      trailing = 'Get 5% Discount',
      showIcon = true,
      icon,
      ...divProps
    } = props;
    return (
      <div
        ref={ref}
        className={[rootClass, 'info-note-card--inline', `info-note-card--inline-${inlineTone}`].join(' ')}
        {...divProps}
      >
        <div className="info-note-card__inline-inner">
          {showIcon && (
            <span className="info-note-card__inline-icon" aria-hidden>
              {icon ?? <InfoNoteCardIconBannerSuccess width={16} height={16} viewBox="0 0 24 24" />}
            </span>
          )}
          <p className="info-note-card__inline-message">{message}</p>
          {trailing != null && trailing !== '' && (
            <span className="info-note-card__inline-trailing">{trailing}</span>
          )}
        </div>
      </div>
    );
  }

  if (isDetail(props)) {
    const {
      mode: _m,
      detailTone,
      description = DEFAULT_DESCRIPTION,
      metaText = 'WorldPay Sales: 1-855-529-3515',
      metaIcon,
      showMeta = true,
      actionLabel = 'View Licenses & Billing',
      showAction = true,
      leadIcon,
      showLeadIcon = true,
      linkButtonProps,
      ...divProps
    } = props;

    const linkVariant = DETAIL_LINK_VARIANT[detailTone];
    const { className: linkClassName, label: linkLabelProp, ...linkRest } = linkButtonProps ?? {};

    return (
      <div
        ref={ref}
        className={[rootClass, 'info-note-card--detail', `info-note-card--detail-${detailTone}`].join(' ')}
        {...divProps}
      >
        {showLeadIcon && (
          <span className="info-note-card__detail-lead-icon" aria-hidden>
            {leadIcon ?? <InfoNoteCardIconParagraph />}
          </span>
        )}
        <div className="info-note-card__detail-main">
          <p className="info-note-card__detail-desc">{description}</p>
          {(showMeta || showAction) && (
            <div className="info-note-card__detail-footer">
              {showMeta && metaText != null && metaText !== '' && (
                <div className="info-note-card__detail-meta">
                  <span className="info-note-card__detail-meta-icon" aria-hidden>
                    {metaIcon ?? <InfoNoteCardIconPhone />}
                  </span>
                  <p className="info-note-card__detail-meta-text">{metaText}</p>
                </div>
              )}
              {showAction && (
                <LinkButton
                  type="button"
                  variant={linkVariant}
                  label={linkLabelProp ?? actionLabel}
                  className={linkClassName}
                  {...linkRest}
                />
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  const {
    mode: _m,
    tone = 'info',
    title = 'HIPAA Compliance',
    description = DEFAULT_DESCRIPTION,
    icon,
    showIcon = true,
    ...divProps
  } = props as InfoNoteCardBannerProps;

  return (
    <div
      ref={ref}
      className={[rootClass, 'info-note-card--banner', `info-note-card--banner-${tone}`].join(' ')}
      {...divProps}
    >
      {showIcon && (
        <div className="info-note-card__banner-icon" aria-hidden>
          {icon ?? BANNER_ICONS[tone]}
        </div>
      )}
      <div className="info-note-card__banner-body">
        {title != null && title !== '' && <h3 className="info-note-card__banner-title">{title}</h3>}
        {description != null && description !== '' && <p className="info-note-card__banner-desc">{description}</p>}
      </div>
    </div>
  );
});

InfoNoteCard.displayName = 'InfoNoteCard';

/** Maps each banner tone to its Figma background / border tokens (for docs or programmatic styling). */
export const INFO_NOTE_CARD_BANNER_THEMES: Record<
  InfoNoteCardBannerTone,
  { background: string; border: string; title: string }
> = {
  error: {
    background: 'var(--Colors-Functional-Bkg-Bkg_Error-Red50, #FFEAE9)',
    border: 'var(--Colors-Functional-Border-Border_Error, #E73D36)',
    title: 'var(--Colors-Functional-Txt-Txt_Error, #C9221C)',
  },
  info: {
    background: 'var(--Colors-Functional-Bkg-Bkg_Info50, #EDF8FF)',
    border: 'var(--Colors-Functional-Border-Border_Info, #64B9F2)',
    title: 'var(--Colors-Functional-Txt-Txt_Info, #195F8E)',
  },
  success: {
    background: 'var(--Colors-Functional-Bkg-Bkg_Success100, #EEFFD6)',
    border: 'var(--Colors-Functional-Border-Border_Success, #92D03D)',
    title: 'var(--Colors-Functional-Txt-Txt_Success, #5E981D)',
  },
  focus: {
    background: 'var(--Colors-Functional-Bkg-Bkg_Focus, #D6FFFB)',
    border: 'var(--Colors-Functional-Border-Border_Focus, #21A49F)',
    title: 'var(--Colors-Functional-Txt-Txt_Info, #195F8E)',
  },
};

export const INFO_NOTE_CARD_DETAIL_THEMES: Record<
  InfoNoteCardDetailTone,
  { background: string; border: string; linkVariant: NonNullable<LinkButtonProps['variant']> }
> = {
  neutral: {
    background: 'var(--Colors-Functional-Bkg-Bkg_Light, #F6F6F1)',
    border: 'var(--Colors-Functional-Border-Border_Default, #C3C1B5)',
    linkVariant: 'teal',
  },
  brand: {
    background: 'var(--Colors-Functional-Bkg-Bkg_Brand-100, #FEECF6)',
    border: 'var(--Colors-Functional-Border-Border_Brand-300, #F387C2)',
    linkVariant: 'brand',
  },
  focus: {
    background: 'var(--Colors-Functional-Bkg-Bkg_Focus, #D6FFFB)',
    border: 'var(--Colors-Functional-Border-Border_Focus, #21A49F)',
    linkVariant: 'teal',
  },
};

/** Compact strip (e.g. helper + trailing CTA text). */
export const INFO_NOTE_CARD_INLINE_THEMES: Record<
  InfoNoteCardInlineTone,
  { background: string; border: string; message: string; trailing: string }
> = {
  success: {
    background: 'var(--Colors-Functional-Bkg-Bkg_Success100, #EEFFD6)',
    border: 'var(--Colors-Functional-Border-Border_Success, #92D03D)',
    message: 'var(--Colors-Functional-Txt_Helper-Txt_Helper_Success, #5E981D)',
    trailing: 'var(--Colors-Functional-Txt-Txt_Success, #5E981D)',
  },
};

/** Pricing / “Discount preview” panel (success shell). */
export const INFO_NOTE_CARD_PRICING_THEME = {
  background: 'var(--Colors-Functional-Bkg-Bkg_Success100, #EEFFD6)',
  border: 'var(--Colors-Functional-Border-Border_Success, #92D03D)',
  heading: '#111827',
  label: '#6B7280',
  discountValue: '#10B981',
  strongValue: 'var(--Colors-Functional-Txt-Txt_Default, #303030)',
} as const;
