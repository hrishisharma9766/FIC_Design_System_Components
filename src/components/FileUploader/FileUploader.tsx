import * as React from 'react';
import { Button } from '../Button/Button';
import { ProgressBar } from '../ProgressBar/ProgressBar';
import './FileUploader.css';

export type FileUploaderVariant = 'large' | 'compact';

/** `imageSlots` — fixed grid of image placeholders (Evaa multi-image uploader). */
export type FileUploaderLayout = 'dropzone' | 'imageSlots';

export interface FileUploaderItem {
  id: string;
  file: File;
  /** 0–100 while uploading; omit when complete */
  progress?: number;
  /** Set automatically in `imageSlots` layout; optional for controlled data. */
  slotIndex?: number;
}

export interface FileUploaderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'title' | 'defaultValue'> {
  variant?: FileUploaderVariant;
  /** `imageSlots` shows a grid of empty/filled image slots (Figma multi-image pattern). */
  layout?: FileUploaderLayout;
  /** Number of image slots when `layout="imageSlots"`. */
  imageSlotCount?: number;
  /** Columns in the slots grid (responsive fallback below `minSlotWidth`). */
  imageSlotColumns?: number;
  /** Minimum width of each slot cell (CSS length). */
  minSlotWidth?: string;
  /**
   * When `layout="imageSlots"`, the file list under the grid is hidden unless at least one
   * file has `progress` &lt; 100. Set `true` to always show the list when there are files.
   */
  showFileListInSlotsLayout?: boolean;
  /** Passed to the native `<input type="file" accept="…" />` (MIME types and/or extensions, e.g. `image/png,image/jpeg,.pdf`). */
  accept?: string;
  /** Shown under the title. If omitted, built from `acceptDescription` and `maxSizeBytes`. */
  hint?: string;
  /** Human-readable types for the default hint (e.g. `"JPG, PNG or PDF"`). */
  acceptDescription?: string;
  title?: string;
  selectButtonLabel?: string;
  multiple?: boolean;
  maxFiles?: number;
  /** Maximum size per file in bytes. */
  maxSizeBytes?: number;
  disabled?: boolean;
  value?: FileUploaderItem[];
  defaultValue?: FileUploaderItem[];
  onChange?: (items: FileUploaderItem[]) => void;
  /** Called when some files fail validation (type/size/count). */
  onReject?: (message: string, rejected: File[]) => void;
  allowRemove?: boolean;
  /** Show a preview control for image files when `onPreview` is provided. */
  showPreviewLink?: boolean;
  previewLabel?: string;
  onPreview?: (item: FileUploaderItem) => void;
  showSuccess?: boolean;
  successTitle?: string;
  successDescription?: string;
  successActionLabel?: string;
  onSuccessAction?: () => void;
  hideSuccessButton?: boolean;
}

const DEFAULT_MAX_BYTES = 10 * 1024 * 1024;

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb >= 10 ? Math.round(kb) : kb.toFixed(1)} KB`;
  const mb = kb / 1024;
  return `${mb >= 10 ? Math.round(mb) : mb.toFixed(1)} MB`;
}

function acceptsFile(file: File, accept: string | undefined): boolean {
  if (!accept?.trim()) return true;
  const parts = accept.split(',').map((s) => s.trim()).filter(Boolean);
  for (const part of parts) {
    if (part === '*/*') return true;
    if (part.endsWith('/*')) {
      const main = part.slice(0, -2).toLowerCase();
      if (file.type.toLowerCase().startsWith(`${main}/`)) return true;
    }
    if (part.startsWith('.')) {
      const ext = part.toLowerCase();
      if (file.name.toLowerCase().endsWith(ext)) return true;
    }
    if (file.type && file.type.toLowerCase() === part.toLowerCase()) return true;
  }
  return false;
}

function nextId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

function defaultHint(acceptDescription: string | undefined, maxBytes: number): string {
  const mb = Math.max(1, Math.round(maxBytes / (1024 * 1024)));
  const types = acceptDescription?.trim() || 'Allowed file types';
  return `${types}, file size no more than ${mb}MB`;
}

function withNormalizedSlots(items: FileUploaderItem[]): FileUploaderItem[] {
  return items.map((x, i) => ({ ...x, slotIndex: x.slotIndex ?? i }));
}

function itemAtSlot(items: FileUploaderItem[], slotIndex: number): FileUploaderItem | undefined {
  return withNormalizedSlots(items).find((x) => x.slotIndex === slotIndex);
}

function replaceOrAddAtSlot(items: FileUploaderItem[], slotIndex: number, file: File): FileUploaderItem[] {
  const base = withNormalizedSlots(items);
  const others = base.filter((x) => x.slotIndex !== slotIndex);
  return [...others, { id: nextId(), file, slotIndex }].sort((a, b) => a.slotIndex! - b.slotIndex!);
}

function usePreviewObjectUrls(items: FileUploaderItem[]): Record<string, string> {
  const [urls, setUrls] = React.useState<Record<string, string>>({});
  const key = items.map((i) => `${i.id}:${i.file.size}:${i.file.lastModified}`).join('|');
  React.useEffect(() => {
    const next: Record<string, string> = {};
    for (const it of items) {
      if (it.file.type.startsWith('image/')) {
        next[it.id] = URL.createObjectURL(it.file);
      }
    }
    setUrls(next);
    return () => {
      Object.values(next).forEach((u) => URL.revokeObjectURL(u));
    };
  }, [key]);
  return urls;
}

function PlusSlotIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <path
        d="M14 6v16M6 14h16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloudUploadIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="52"
      height="52"
      viewBox="0 0 52 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M14.502 43.3224C8.28028 43.3224 3.22266 38.2647 3.22266 32.0431C3.22266 27.0858 6.43384 22.8711 10.8894 21.3659C10.789 20.7638 10.7489 20.1617 10.7489 19.5194C10.7489 13.2978 15.8065 8.24013 22.0282 8.24013C26.3633 8.24013 30.1364 10.6887 32.023 14.2812C33.1268 13.6389 34.4314 13.2576 35.8162 13.2576C39.9707 13.2576 43.3224 16.6294 43.3224 20.7638C43.3224 21.988 43.0213 23.1521 42.4995 24.1757C45.9515 25.7612 48.3398 29.2333 48.3398 33.2874C48.3398 38.8267 43.8442 43.3023 38.325 43.3023H14.522L14.502 43.3224ZM27.1059 20.7036C26.3633 19.961 25.1792 19.961 24.4566 20.7036L18.817 26.3432C18.0744 27.0858 18.0744 28.2699 18.817 28.9924C19.5596 29.715 20.7437 29.735 21.4662 28.9924L23.8947 26.564V34.5518C23.8947 35.5954 24.7376 36.4384 25.7812 36.4384C26.8249 36.4384 27.6678 35.5954 27.6678 34.5518V26.564L30.0963 28.9924C30.8389 29.735 32.023 29.735 32.7455 28.9924C33.468 28.2499 33.4881 27.0657 32.7455 26.3432L27.1059 20.7036Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ImageFileIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M4.12341 1.375C2.61012 1.375 1.375 2.61012 1.375 4.12341V17.8766C1.375 19.3899 2.61012 20.625 4.12341 20.625H17.8766C19.3899 20.625 20.625 19.3899 20.625 17.8766V4.12341C20.625 2.61012 19.3899 1.375 17.8766 1.375H4.12341ZM6.87182 4.81329C8.00679 4.81329 8.93035 5.73685 8.93035 6.87182C8.93035 8.00679 8.00679 8.93035 6.87182 8.93035C5.73685 8.93035 4.81329 8.00679 4.81329 6.87182C4.81329 5.73685 5.73685 4.81329 6.87182 4.81329ZM13.0697 9.62023C13.4257 9.62023 13.7595 9.80939 13.9487 10.1098L17.7319 16.2965C17.9211 16.6192 17.9322 17.0198 17.7542 17.3425C17.5762 17.6652 17.2201 17.8655 16.8529 17.8655H5.15824C4.77991 17.8655 4.42385 17.654 4.24581 17.3091C4.06778 16.9642 4.09003 16.5525 4.31257 16.2409L6.71604 12.8026C6.9052 12.5244 7.22789 12.3686 7.56171 12.3686C7.89552 12.3686 8.21821 12.5355 8.40737 12.8026L9.54234 14.4272L12.1795 10.1098C12.3686 9.80939 12.7025 9.62023 13.0585 9.62023H13.0697Z"
        fill="currentColor"
      />
    </svg>
  );
}

function SuccessCheckIcon() {
  return (
    <svg width="35" height="25" viewBox="0 0 35 25" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        d="M33.4157 0.727085C34.3679 1.69653 34.3679 3.27091 33.4157 4.24036L13.9151 24.0946C12.963 25.0641 11.4166 25.0641 10.4644 24.0946L0.714134 14.1675C-0.238045 13.1981 -0.238045 11.6237 0.714134 10.6542C1.66631 9.68478 3.21265 9.68478 4.16483 10.6542L12.1936 18.8208L29.9727 0.727085C30.9248 -0.242362 32.4712 -0.242362 33.4234 0.727085H33.4157Z"
        fill="var(--Colors-PrimitiveColorTokens-Lime-700, #578421)"
      />
    </svg>
  );
}

const PENDING_SLOT_FILL_EMPTY = -1;

export const FileUploader = React.forwardRef<HTMLDivElement, FileUploaderProps>(function FileUploader(
  {
    variant = 'large',
    layout = 'dropzone',
    imageSlotCount = 3,
    imageSlotColumns = 3,
    minSlotWidth = '104px',
    showFileListInSlotsLayout = false,
    accept,
    hint: hintProp,
    acceptDescription = 'JPG, PNG or PDF',
    title = 'Select a file or drag and drop here',
    selectButtonLabel,
    multiple = false,
    maxFiles,
    maxSizeBytes = DEFAULT_MAX_BYTES,
    disabled = false,
    value: valueProp,
    defaultValue,
    onChange,
    onReject,
    allowRemove = true,
    showPreviewLink = true,
    previewLabel = 'Preview',
    onPreview,
    showSuccess = false,
    successTitle = 'Success!',
    successDescription = 'Documents have been uploaded successfully, check your registered email for confirmation.',
    successActionLabel = 'RETURN HOME',
    onSuccessAction,
    hideSuccessButton = false,
    className = '',
    id: idProp,
    ...rest
  },
  ref,
) {
  const reactId = React.useId();
  const inputId = idProp ?? `file-uploader-${reactId}`;
  const inputRef = React.useRef<HTMLInputElement>(null);
  const pendingSlotRef = React.useRef<number | undefined>(undefined);
  const [internalItems, setInternalItems] = React.useState<FileUploaderItem[]>(defaultValue ?? []);
  const [isDragging, setIsDragging] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const isControlled = valueProp !== undefined;
  const items = isControlled ? valueProp! : internalItems;
  const previewUrls = usePreviewObjectUrls(items);
  const isImageSlots = layout === 'imageSlots';

  const setItems = React.useCallback(
    (next: FileUploaderItem[]) => {
      if (!isControlled) setInternalItems(next);
      onChange?.(next);
    },
    [isControlled, onChange],
  );

  const hint = hintProp ?? defaultHint(acceptDescription, maxSizeBytes);
  const buttonLabel = selectButtonLabel ?? (multiple ? 'SELECT FILE(S)' : 'SELECT FILE');

  const showCompactDropzone =
    !isImageSlots && (variant === 'compact' || items.length > 0);

  const showSlotsFileList =
    !isImageSlots ||
    showFileListInSlotsLayout ||
    items.some((i) => i.progress !== undefined && i.progress < 100);

  const slotCap = Math.min(imageSlotCount, maxFiles ?? imageSlotCount);

  const openPicker = (slotMode?: number) => {
    if (disabled) return;
    if (isImageSlots) {
      pendingSlotRef.current =
        slotMode === undefined ? PENDING_SLOT_FILL_EMPTY : slotMode;
    }
    inputRef.current?.click();
  };

  const ingestFiles = React.useCallback(
    (fileList: FileList | File[]) => {
      const incoming = Array.from(fileList);
      if (incoming.length === 0) return;

      const rejected: File[] = [];
      const accepted: File[] = [];

      for (const file of incoming) {
        if (!acceptsFile(file, accept)) {
          rejected.push(file);
          continue;
        }
        if (file.size > maxSizeBytes) {
          rejected.push(file);
          continue;
        }
        accepted.push(file);
      }

      const reportReject = (msg: string, files: File[]) => {
        setError(msg);
        onReject?.(msg, files);
      };

      if (!multiple) {
        const pick = accepted[0];
        if (!pick) {
          if (rejected.length > 0) {
            reportReject(
              'No files matched the allowed types or size limits.',
              rejected,
            );
          }
          return;
        }
        setItems([{ id: nextId(), file: pick }]);
        if (rejected.length > 0) {
          reportReject('Extra files were not added (single file only).', rejected);
        } else {
          setError(null);
        }
        return;
      }

      const cap = maxFiles ?? Infinity;
      const room = Math.max(0, cap - items.length);
      const toAdd = accepted.slice(0, room);
      const overflow = accepted.slice(room);
      const allRejected = [...rejected, ...overflow];

      if (toAdd.length === 0) {
        if (allRejected.length > 0) {
          reportReject(
            room === 0
              ? 'Maximum number of files reached.'
              : 'No files matched the allowed types or size limits.',
            allRejected,
          );
        }
        return;
      }

      setError(null);
      const newItems: FileUploaderItem[] = toAdd.map((file) => ({ id: nextId(), file }));
      setItems([...items, ...newItems]);

      if (allRejected.length > 0) {
        reportReject('Some files were skipped (type, size, or max file count).', allRejected);
      }
    },
    [accept, items, maxFiles, maxSizeBytes, multiple, onReject, setItems],
  );

  const ingestSlotSelection = React.useCallback(
    (fileList: FileList | File[]) => {
      const incoming = Array.from(fileList);
      const pending = pendingSlotRef.current;
      pendingSlotRef.current = undefined;

      const reportReject = (msg: string, files: File[]) => {
        setError(msg);
        onReject?.(msg, files);
      };

      if (pending !== undefined && pending >= 0) {
        const file = incoming[0];
        if (!file) return;
        if (!acceptsFile(file, accept) || file.size > maxSizeBytes) {
          reportReject('File type or size is not allowed.', [file]);
          return;
        }
        setError(null);
        setItems(replaceOrAddAtSlot(items, pending, file));
        if (incoming.length > 1) {
          reportReject('Only one image per slot was added.', incoming.slice(1));
        }
        return;
      }

      const effectiveSlotCount = Math.min(imageSlotCount, slotCap);
      const occupied = new Set(withNormalizedSlots(items).map((x) => x.slotIndex!));
      const empty: number[] = [];
      for (let i = 0; i < effectiveSlotCount; i++) {
        if (!occupied.has(i)) empty.push(i);
      }

      let next = [...withNormalizedSlots(items)];
      const rejected: File[] = [];
      let ei = 0;
      for (const file of incoming) {
        if (ei >= empty.length) {
          rejected.push(file);
          continue;
        }
        if (!acceptsFile(file, accept) || file.size > maxSizeBytes) {
          rejected.push(file);
          continue;
        }
        const si = empty[ei++];
        next = next.filter((x) => x.slotIndex !== si);
        next.push({ id: nextId(), file, slotIndex: si });
        next.sort((a, b) => a.slotIndex! - b.slotIndex!);
      }

      if (ei === 0 && rejected.length === incoming.length && incoming.length > 0) {
        reportReject('No files matched the allowed types or size limits.', rejected);
        return;
      }

      setError(null);
      setItems(next);
      if (rejected.length > 0) {
        reportReject('Some files were skipped (type, size, or no empty slots).', rejected);
      }
    },
    [accept, imageSlotCount, items, maxSizeBytes, onReject, setItems, slotCap],
  );

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = e.target.files;
    if (!list?.length) {
      pendingSlotRef.current = undefined;
      e.target.value = '';
      return;
    }
    if (isImageSlots) {
      ingestSlotSelection(list);
    } else {
      ingestFiles(list);
    }
    e.target.value = '';
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (disabled) return;
    const dt = e.dataTransfer.files;
    if (!dt?.length) return;
    if (isImageSlots) {
      pendingSlotRef.current = PENDING_SLOT_FILL_EMPTY;
      ingestSlotSelection(dt);
    } else {
      ingestFiles(dt);
    }
  };

  const removeItem = (id: string) => {
    setItems(items.filter((i) => i.id !== id));
    setError(null);
  };

  const canPreview = (item: FileUploaderItem) =>
    Boolean(onPreview && showPreviewLink && item.file.type.startsWith('image/'));

  if (showSuccess) {
    return (
      <div ref={ref} className={['file-uploader', className].filter(Boolean).join(' ')} {...rest}>
        <div className="file-uploader__success">
          <div className="file-uploader__success-icon" aria-hidden>
            <span className="file-uploader__success-icon-bg" />
            <span className="file-uploader__success-icon-bg2" />
            <SuccessCheckIcon />
          </div>
          <h3 className="file-uploader__success-title">{successTitle}</h3>
          <p className="file-uploader__success-desc">{successDescription}</p>
          {!hideSuccessButton && onSuccessAction ? (
            <div className="file-uploader__success-actions">
              <Button type="button" variant="secondary" size="sm" onClick={onSuccessAction}>
                {successActionLabel}
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  const describedBy = [hint ? `${inputId}-hint` : '', error ? `${inputId}-err` : '']
    .filter(Boolean)
    .join(' ') || undefined;

  return (
    <div ref={ref} className={['file-uploader', className].filter(Boolean).join(' ')} {...rest}>
      <input
        ref={inputRef}
        id={inputId}
        type="file"
        className="file-uploader__input"
        accept={accept}
        multiple={isImageSlots ? true : multiple}
        disabled={disabled}
        onChange={onInputChange}
        aria-label={title}
        aria-describedby={describedBy}
      />

      {isImageSlots ? (
        <div
          className={[
            'file-uploader__slots',
            isDragging ? 'file-uploader__slots--drag' : '',
            disabled ? 'file-uploader__slots--disabled' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          onDragEnter={onDragOver}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          <div className="file-uploader__slots-head">
            <div className="file-uploader__text-block">
              <p className="file-uploader__title">{title}</p>
              <p id={`${inputId}-hint`} className="file-uploader__hint">
                {hint}
              </p>
            </div>
            <div className="file-uploader__slots-action">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                disabled={disabled}
                onClick={() => openPicker()}
              >
                {buttonLabel}
              </Button>
            </div>
          </div>
          <div
            className="file-uploader__slots-grid"
            style={{
              gridTemplateColumns: `repeat(${imageSlotColumns}, minmax(${minSlotWidth}, 1fr))`,
            }}
          >
            {Array.from({ length: imageSlotCount }, (_, slotIndex) => {
              const item = itemAtSlot(items, slotIndex);
              const outOfCap = slotIndex >= slotCap;
              if (!item) {
                return (
                  <button
                    key={`slot-${slotIndex}`}
                    type="button"
                    className="file-uploader__slot file-uploader__slot--empty"
                    disabled={disabled || outOfCap}
                    aria-label={`Add image, slot ${slotIndex + 1} of ${imageSlotCount}`}
                    onClick={() => openPicker(slotIndex)}
                  >
                    <PlusSlotIcon className="file-uploader__slot-plus" />
                  </button>
                );
              }
              const thumb = previewUrls[item.id];
              return (
                <div key={item.id} className="file-uploader__slot file-uploader__slot--filled">
                  {thumb ? (
                    <img src={thumb} alt={item.file.name} className="file-uploader__slot-img" />
                  ) : (
                    <div className="file-uploader__slot-nonimage">
                      <ImageFileIcon className="file-uploader__slot-file-icon" />
                      <span className="file-uploader__slot-filename">{item.file.name}</span>
                    </div>
                  )}
                  {allowRemove ? (
                    <button
                      type="button"
                      className="file-uploader__slot-remove"
                      aria-label={`Remove ${item.file.name}`}
                      disabled={disabled}
                      onClick={() => removeItem(item.id)}
                    >
                      ×
                    </button>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <label
          htmlFor={inputId}
          className={[
            'file-uploader__zone',
            showCompactDropzone ? 'file-uploader__zone--compact' : 'file-uploader__zone--large',
            isDragging ? 'file-uploader__zone--drag' : '',
            disabled ? 'file-uploader__zone--disabled' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          onDragEnter={onDragOver}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          aria-label={title}
        >
          <CloudUploadIcon className="file-uploader__icon" />

          <div className="file-uploader__body">
            <div className="file-uploader__text-block">
              <p className="file-uploader__title">{title}</p>
              <p id={`${inputId}-hint`} className="file-uploader__hint">
                {hint}
              </p>
            </div>
            <div className="file-uploader__select">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                disabled={disabled}
                onClick={() => openPicker()}
              >
                {buttonLabel}
              </Button>
            </div>
          </div>
        </label>
      )}

      {error ? (
        <p id={`${inputId}-err`} className="file-uploader__error" role="alert">
          {error}
        </p>
      ) : null}

      {items.length > 0 && showSlotsFileList ? (
        <div className="file-uploader__list">
          {items.map((item) => {
            const pct = item.progress;
            const showBar = pct !== undefined && pct < 100;
            return (
              <div key={item.id} className="file-uploader__file">
                <ImageFileIcon className="file-uploader__file-icon" />
                <div className="file-uploader__file-main">
                  <div className="file-uploader__file-row">
                    <div className="file-uploader__file-name-row">
                      <span className="file-uploader__file-name">{item.file.name}</span>
                      {canPreview(item) ? (
                        <>
                          <span className="file-uploader__file-sep" aria-hidden />
                          <button
                            type="button"
                            className="file-uploader__preview"
                            onClick={() => onPreview?.(item)}
                          >
                            {previewLabel}
                          </button>
                        </>
                      ) : null}
                    </div>
                    <span className="file-uploader__file-size">{formatBytes(item.file.size)}</span>
                  </div>
                  {showBar ? (
                    <div className="file-uploader__file-progress">
                      <ProgressBar
                        hideHeader
                        percentage={Math.min(100, Math.max(0, pct))}
                        width="100%"
                        size="sm"
                        variant="default"
                        aria-label={`Upload progress for ${item.file.name}`}
                      />
                    </div>
                  ) : null}
                </div>
                {allowRemove ? (
                  <button
                    type="button"
                    className="file-uploader__remove"
                    aria-label={`Remove ${item.file.name}`}
                    disabled={disabled}
                    onClick={(e) => {
                      e.stopPropagation();
                      removeItem(item.id);
                    }}
                  >
                    ×
                  </button>
                ) : null}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
});
