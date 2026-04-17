import * as React from 'react';
import './ScribeEmptyData.css';

import noteFrame from './icons/note-frame.svg';
import noteScribeIcon from './icons/note-scribe-icon.png';
import microphone from './icons/microphone.svg';
import folder from './icons/folder.svg';
import person from './icons/person.svg';

const DEFAULT_TITLE = 'Ready to create your first note?';
const DEFAULT_DESCRIPTION =
  'Start Recording or  Upload a Conversation to generate SOAP notes.';

export type ScribeEmptyDataVariant = 'note' | 'microphone' | 'folder' | 'person';

export interface ScribeEmptyDataProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: ScribeEmptyDataVariant;
  title?: string;
  description?: string;
}

function IllustrationNote() {
  return (
    <div className="scribe-empty-data__illustration scribe-empty-data__illustration--note" aria-hidden>
      <img className="scribe-empty-data__note-frame" src={noteFrame} alt="" />
      <div className="scribe-empty-data__note-scribe-icon">
        <img src={noteScribeIcon} alt="" className="scribe-empty-data__note-scribe-icon-img" />
      </div>
    </div>
  );
}

function IllustrationMicrophone() {
  return (
    <div className="scribe-empty-data__illustration scribe-empty-data__illustration--microphone" aria-hidden>
      <div className="scribe-empty-data__mic-img-wrap">
        <img src={microphone} alt="" className="scribe-empty-data__mic-img" />
      </div>
    </div>
  );
}

function IllustrationFolder() {
  return (
    <div className="scribe-empty-data__illustration scribe-empty-data__illustration--folder" aria-hidden>
      <img src={folder} alt="" className="scribe-empty-data__folder-img" />
    </div>
  );
}

function IllustrationPerson() {
  return (
    <div className="scribe-empty-data__illustration scribe-empty-data__person-frame" aria-hidden>
      <img className="scribe-empty-data__person-img" src={person} alt="" />
    </div>
  );
}

function renderIllustration(variant: ScribeEmptyDataVariant) {
  switch (variant) {
    case 'note':
      return <IllustrationNote />;
    case 'microphone':
      return <IllustrationMicrophone />;
    case 'folder':
      return <IllustrationFolder />;
    case 'person':
      return <IllustrationPerson />;
    default:
      return <IllustrationNote />;
  }
}

export const ScribeEmptyData = React.forwardRef<HTMLDivElement, ScribeEmptyDataProps>(
  function ScribeEmptyData(
    {
      variant = 'note',
      title = DEFAULT_TITLE,
      description = DEFAULT_DESCRIPTION,
      className = '',
      ...props
    },
    ref,
  ) {
    return (
      <div
        ref={ref}
        className={['scribe-empty-data', className].filter(Boolean).join(' ')}
        {...props}
      >
        {renderIllustration(variant)}
        <h2 className="scribe-empty-data__title">{title}</h2>
        <p className="scribe-empty-data__description">{description}</p>
      </div>
    );
  },
);

ScribeEmptyData.displayName = 'ScribeEmptyData';
