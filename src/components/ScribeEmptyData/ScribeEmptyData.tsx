import * as React from 'react';
import './ScribeEmptyData.css';

/**
 * Raster assets from Figma (Evaa Design System V.2 — Scribe Empty Data).
 * Re-fetch via Figma MCP if URLs expire (~7 days).
 */
const SCRIBE_EMPTY_ASSETS = {
  noteFrame: 'https://www.figma.com/api/mcp/asset/f9052789-489f-4766-94a6-8e84d3c2ae1d',
  noteScribeIcon: 'https://www.figma.com/api/mcp/asset/f4c9e03d-8885-4357-a6a7-22ee53f99c66',
  microphone: 'https://www.figma.com/api/mcp/asset/4f92df9a-1718-4608-9436-988addd3c5c0',
  folder: 'https://www.figma.com/api/mcp/asset/6371a0a6-c2d8-4b87-8a6d-f704db2800fe',
  personVector: 'https://www.figma.com/api/mcp/asset/2400e8da-e31d-489d-a5d1-c429233d837c',
  personVector1: 'https://www.figma.com/api/mcp/asset/96ddc4d4-e318-4665-9c50-5903290e0c79',
  personVector2: 'https://www.figma.com/api/mcp/asset/d7240973-75a9-4e71-b4bd-6f4d5ab33b5c',
} as const;

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
      <img
        className="scribe-empty-data__note-frame"
        src={SCRIBE_EMPTY_ASSETS.noteFrame}
        alt=""
      />
      <div className="scribe-empty-data__note-scribe-icon">
        <img
          src={SCRIBE_EMPTY_ASSETS.noteScribeIcon}
          alt=""
          className="scribe-empty-data__note-scribe-icon-img"
        />
      </div>
    </div>
  );
}

function IllustrationMicrophone() {
  return (
    <div className="scribe-empty-data__illustration scribe-empty-data__illustration--microphone" aria-hidden>
      <div className="scribe-empty-data__mic-img-wrap">
        <img src={SCRIBE_EMPTY_ASSETS.microphone} alt="" className="scribe-empty-data__mic-img" />
      </div>
    </div>
  );
}

function IllustrationFolder() {
  return (
    <div className="scribe-empty-data__illustration scribe-empty-data__illustration--folder" aria-hidden>
      <img src={SCRIBE_EMPTY_ASSETS.folder} alt="" className="scribe-empty-data__folder-img" />
    </div>
  );
}

/** Person icon — layered vectors from Figma `Frame` (10876:15036). */
function IllustrationPerson() {
  return (
    <div className="scribe-empty-data__illustration scribe-empty-data__person-frame" aria-hidden>
      <div className="scribe-empty-data__person-layer scribe-empty-data__person-layer--1">
        <div className="scribe-empty-data__person-layer-pad scribe-empty-data__person-layer-pad--1">
          <img src={SCRIBE_EMPTY_ASSETS.personVector} alt="" />
        </div>
      </div>
      <div className="scribe-empty-data__person-layer scribe-empty-data__person-layer--2">
        <div className="scribe-empty-data__person-layer-pad scribe-empty-data__person-layer-pad--2">
          <img src={SCRIBE_EMPTY_ASSETS.personVector1} alt="" />
        </div>
      </div>
      <div className="scribe-empty-data__person-layer scribe-empty-data__person-layer--3">
        <div className="scribe-empty-data__person-layer-pad scribe-empty-data__person-layer-pad--3">
          <img src={SCRIBE_EMPTY_ASSETS.personVector2} alt="" />
        </div>
      </div>
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
