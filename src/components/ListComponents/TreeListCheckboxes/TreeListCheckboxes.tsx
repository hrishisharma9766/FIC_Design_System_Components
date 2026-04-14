import * as React from 'react';
import { Checkbox } from '../../Checkbox/Checkbox';
import './TreeListCheckboxes.css';

export interface TreeListCheckboxesNode {
  id: string;
  label: string;
  description?: string;
  children?: TreeListCheckboxesNode[];
  disabled?: boolean;
  readOnly?: boolean;
}

export type TreeListCheckboxesValue = Record<string, boolean>;

export const TREE_LIST_CHECKBOXES_SAMPLE_ITEMS: TreeListCheckboxesNode[] = [
  {
    id: 'org',
    label: 'Enterprise Optical Group (Organization)',
    description: 'Grant access to all businesses and locations',
    children: [
      {
        id: 'business',
        label: 'VisionCare Optical Centers',
        description: 'All locations within this business',
        children: [
          { id: 'westside', label: 'Westside Eye Clinic' },
          { id: 'downtown', label: 'Downtown Vision Center' },
          { id: 'eastgate', label: 'Eastgate Opticalll'},
        ],
      },
    ],
  },
];

export interface TreeListCheckboxesProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  items?: TreeListCheckboxesNode[];
  value?: TreeListCheckboxesValue;
  defaultValue?: TreeListCheckboxesValue;
  onChange?: (next: TreeListCheckboxesValue) => void;
  ariaLabel?: string;
  name?: string;
}

function useStableId(prefix: string) {
  const id = React.useId();
  return `${prefix}-${id.replace(/:/g, '')}`;
}

function branchClass(depth: number) {
  if (depth === 0) return 'tree-list-checkboxes__branch tree-list-checkboxes__branch--depth-0';
  if (depth === 1) return 'tree-list-checkboxes__branch tree-list-checkboxes__branch--depth-1';
  return 'tree-list-checkboxes__branch tree-list-checkboxes__branch--depth-n';
}

function nodeClass(depth: number) {
  if (depth === 0) return 'tree-list-checkboxes__node tree-list-checkboxes__node--depth-0';
  if (depth === 1) return 'tree-list-checkboxes__node tree-list-checkboxes__node--depth-1';
  return 'tree-list-checkboxes__node tree-list-checkboxes__node--depth-n';
}

export const TreeListCheckboxes = React.forwardRef<HTMLDivElement, TreeListCheckboxesProps>(
  function TreeListCheckboxes(
    {
      items = TREE_LIST_CHECKBOXES_SAMPLE_ITEMS,
      value,
      defaultValue = {},
      onChange,
      ariaLabel,
      name: nameProp,
      className = '',
      ...rest
    },
    ref,
  ) {
    const isControlled = value !== undefined;
    const [internal, setInternal] = React.useState<TreeListCheckboxesValue>(defaultValue);
    const selected = isControlled ? value! : internal;
    const generatedName = useStableId('tree-list-checkboxes');
    const groupName = nameProp ?? generatedName;

    const setSelected = React.useCallback(
      (next: TreeListCheckboxesValue) => {
        if (!isControlled) {
          setInternal(next);
        }
        onChange?.(next);
      },
      [isControlled, onChange],
    );

    const toggle = React.useCallback(
      (id: string, nextChecked: boolean) => {
        setSelected({ ...selected, [id]: nextChecked });
      },
      [selected, setSelected],
    );

    const renderNode = (node: TreeListCheckboxesNode, depth: number) => {
      const checked = Boolean(selected[node.id]);
      const hasChildren = node.children != null && node.children.length > 0;
      const isLeaf = !hasChildren && depth >= 2;
      const disabled = Boolean(node.disabled);
      const readOnly = Boolean(node.readOnly);
      const checkboxId = `${groupName}-${node.id}`;

      return (
        <div key={node.id} className={nodeClass(depth)}>
          {isLeaf ? (
            <div className="tree-list-checkboxes__leaf">
              <p className="tree-list-checkboxes__leaf-title">{node.label}</p>
              <div className="tree-list-checkboxes__checkbox-wrapper">
                <Checkbox
                  id={checkboxId}
                  label=""
                  checked={checked}
                  disabled={disabled}
                  readOnly={readOnly}
                  onChange={(e) => {
                    if (disabled || readOnly) return;
                    toggle(node.id, e.target.checked);
                  }}
                  aria-label={node.label}
                />
              </div>
            </div>
          ) : (
            <div className="tree-list-checkboxes__card">
              <div className="tree-list-checkboxes__card-row">
                <div
                  className={[
                    'tree-list-checkboxes__text',
                    node.description ? 'tree-list-checkboxes__text--with-subtitle' : 'tree-list-checkboxes__text--title-only',
                  ].join(' ')}
                >
                  <p className="tree-list-checkboxes__title">{node.label}</p>
                  {node.description ? (
                    <p className="tree-list-checkboxes__subtitle">{node.description}</p>
                  ) : null}
                </div>
                <div className="tree-list-checkboxes__checkbox-wrapper">
                  <Checkbox
                    id={checkboxId}
                    label=""
                    checked={checked}
                    disabled={disabled}
                    readOnly={readOnly}
                    onChange={(e) => {
                      if (disabled || readOnly) return;
                      toggle(node.id, e.target.checked);
                    }}
                    aria-label={node.label}
                  />
                </div>
              </div>
            </div>
          )}

          {hasChildren ? (
            <div className={branchClass(depth + 1)}>{node.children!.map((c) => renderNode(c, depth + 1))}</div>
          ) : null}
        </div>
      );
    };

    const rootClass = ['tree-list-checkboxes', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={rootClass} role="group" aria-label={ariaLabel} {...rest}>
        <div className={branchClass(0)}>{items.map((node) => renderNode(node, 0))}</div>
      </div>
    );
  },
);

TreeListCheckboxes.displayName = 'TreeListCheckboxes';
