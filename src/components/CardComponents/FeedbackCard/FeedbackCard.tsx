import * as React from 'react';
import './FeedbackCard.css';

type SvgProps = React.SVGProps<SVGSVGElement>;

/** Thumbs-down / negative feedback (20×19). */
export function FeedbackCardIconNegative(props: SvgProps) {
  return (
    <svg
      className="feedback-card__icon feedback-card__icon--negative"
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={19}
      viewBox="0 0 20 19"
      fill="none"
      aria-hidden
      {...props}
    >
      <path
        fill="currentColor"
        d="M15.4839 0C16.5513 0 17.4194 0.882058 17.4194 1.96675C17.4194 2.22898 17.3724 2.46738 17.2786 2.69385C18.0997 2.92033 18.7097 3.68319 18.7097 4.58908C18.7097 4.95859 18.6041 5.30427 18.4282 5.61418C19.3196 5.78105 20 6.57967 20 7.54517C20 8.35571 19.5191 9.04705 18.8387 9.34504C19.5191 9.64304 20 10.3344 20 11.1449C20 12.2296 19.132 13.1117 18.0645 13.1117H11.6129L12.7507 15.9962C12.8563 16.2585 12.9032 16.5326 12.9032 16.8068V16.9736C12.9032 18.0941 12.0117 19 10.9091 19C10.1584 19 9.46628 18.5709 9.1261 17.8795L6.86217 13.2785C6.59238 12.7302 6.45161 12.1343 6.45161 11.5263V3.88582C6.45161 3.0872 6.81525 2.33626 7.41349 1.83563L7.90616 1.44228C9.05572 0.512547 10.4751 0 11.9296 0H15.4721H15.4839ZM3.22581 2.62233C3.94135 2.62233 4.51613 3.2064 4.51613 3.9335V14.4228C4.51613 15.1499 3.94135 15.734 3.22581 15.734H1.29032C0.57478 15.734 0 15.1499 0 14.4228V3.9335C0 3.2064 0.57478 2.62233 1.29032 2.62233H3.22581Z"
      />
    </svg>
  );
}

/** Thumbs-up / positive feedback (20×18). */
export function FeedbackCardIconPositive(props: SvgProps) {
  return (
    <svg
      className="feedback-card__icon feedback-card__icon--positive"
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={18}
      viewBox="0 0 20 18"
      fill="none"
      aria-hidden
      {...props}
    >
      <path
        fill="currentColor"
        d="M3.22581 5.58621C3.94135 5.58621 4.51613 6.13918 4.51613 6.82758V16.7586C4.51613 17.447 3.94135 18 3.22581 18H1.29032C0.57478 18 0 17.447 0 16.7586V6.82758C0 6.13918 0.57478 5.58621 1.29032 5.58621H3.22581ZM10.9091 0C12.0117 0 12.9032 0.857679 12.9032 1.91849V2.07649C12.9032 2.33605 12.8563 2.6069 12.7507 2.84389L11.6129 5.57492H18.0645C19.132 5.57492 20 6.41003 20 7.43699C20 8.20439 19.5191 8.85893 18.8387 9.14107C19.5191 9.4232 20 10.0777 20 10.8451C20 11.748 19.3196 12.5041 18.4282 12.6734C18.6041 12.9555 18.7097 13.2828 18.7097 13.6439C18.7097 14.5016 18.0997 15.2238 17.2786 15.4382C17.3724 15.6527 17.4194 15.8897 17.4194 16.1266C17.4194 17.1536 16.5513 17.9887 15.4839 17.9887H11.9413C10.4751 17.9887 9.05572 17.5034 7.91789 16.6232L7.42522 16.2508C6.81525 15.7768 6.46334 15.0658 6.46334 14.3097V7.07586C6.46334 6.50031 6.60411 5.92476 6.8739 5.41693L9.13783 1.06081C9.47801 0.417553 10.1701 0 10.9208 0H10.9091Z"
      />
    </svg>
  );
}

export type FeedbackCardSentiment = 'negative' | 'positive';

const defaultIcon: Record<FeedbackCardSentiment, React.ReactNode> = {
  negative: <FeedbackCardIconNegative />,
  positive: <FeedbackCardIconPositive />,
};

const SAMPLE_COMMENT =
  'The chatbot took over my google home and started telling my dog what to do.';

export interface FeedbackCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Negative = orange row, positive = teal row (Figma Feedback Cards). */
  sentiment?: FeedbackCardSentiment;
  authorName?: string;
  organization?: string;
  date?: string;
  comment?: string;
  /** Override the default thumbs icon for this sentiment. */
  icon?: React.ReactNode;
}

export const FeedbackCard = React.forwardRef<HTMLDivElement, FeedbackCardProps>(function FeedbackCard(
  {
    sentiment = 'negative',
    authorName = 'Sarah M',
    organization = 'Eastgate Eye Care',
    date = '12/07/25',
    comment = SAMPLE_COMMENT,
    icon,
    className = '',
    children,
    ...rest
  },
  ref,
) {
  const rootClass = ['feedback-card', `feedback-card--${sentiment}`, className].filter(Boolean).join(' ');

  const metaChunks: { kind: 'author' | 'detail'; text: string }[] = [];
  if (authorName != null && authorName !== '') metaChunks.push({ kind: 'author', text: authorName });
  if (organization != null && organization !== '') metaChunks.push({ kind: 'detail', text: organization });
  if (date != null && date !== '') metaChunks.push({ kind: 'detail', text: date });

  return (
    <article ref={ref} className={rootClass} {...rest}>
      <div className="feedback-card__main">
        <div className="feedback-card__icon-wrap" aria-hidden>
          {icon ?? defaultIcon[sentiment]}
        </div>
        <div className="feedback-card__content">
          <div className="feedback-card__meta">
            {metaChunks.map((chunk, i) => (
              <React.Fragment key={`${chunk.kind}-${chunk.text}-${i}`}>
                {i > 0 ? (
                  <span className="feedback-card__meta-strong" aria-hidden>
                    •
                  </span>
                ) : null}
                {chunk.kind === 'author' ? (
                  <span className="feedback-card__author">{chunk.text}</span>
                ) : (
                  <span className="feedback-card__meta-detail">{chunk.text}</span>
                )}
              </React.Fragment>
            ))}
          </div>
          {comment != null && comment !== '' && <p className="feedback-card__comment">{comment}</p>}
          {children}
        </div>
      </div>
    </article>
  );
});

FeedbackCard.displayName = 'FeedbackCard';
