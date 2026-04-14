import * as React from 'react';
import { SingleSelectDropDown } from '../../SingleSelectDropDown/SingleSelectDropDown';
import './TreeListDropdowns.css';

export interface TreeListDropdownsNode {
  id: string;
  label: string;
  description?: string;
  children?: TreeListDropdownsNode[];
  // Selected value for the dropdown
  value?: string;
  // Options for the dropdown
  options?: { value: string; label: string }[];
  // If disabled
  disabled?: boolean;
}

export const TREE_LIST_DROPDOWNS_SAMPLE_ITEMS: TreeListDropdownsNode[] = [
  {
    id: 'retention-1',
    label: 'Location',
    options: [{ value: 'loc1', label: 'Loc 1' }, { value: 'loc2', label: 'Loc 2' }],
    children: [
      {
        id: 'loc-1',
        label: 'Location',
        description: 'Sub Text',
        options: [{ value: 'sub1', label: 'Sub 1' }, { value: 'sub2', label: 'Sub 2' }],
      },
      {
        id: 'loc-2',
        label: 'Location',
        description: 'Sub Text',
        options: [{ value: 'sub3', label: 'Sub 3' }, { value: 'sub4', label: 'Sub 4' }],
      },
    ],
  },
  {
    id: 'retention-2',
    label: 'Location',
    options: [{ value: 'loc3', label: 'Loc 3' }, { value: 'loc4', label: 'Loc 4' }],
    children: [
      {
        id: 'loc-3',
        label: 'Location',
        description: 'Sub Text',
        options: [{ value: 'sub5', label: 'Sub 5' }, { value: 'sub6', label: 'Sub 6' }],
      },
    ],
  },
];

export interface TreeListDropdownsProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: TreeListDropdownsNode[];
  /** The overall title of the section (e.g. "Retention Preferences") */
  title?: string;
  /** Fired when a dropdown changes its value */
  onChangeValue?: (id: string, nextValue: string) => void;
}

export const TreeListDropdowns = React.forwardRef<HTMLDivElement, TreeListDropdownsProps>(
  function TreeListDropdowns({ items = TREE_LIST_DROPDOWNS_SAMPLE_ITEMS, title = 'Retention Preferences', onChangeValue, className = '', ...rest }, ref) {
    const rootClass = ['tree-list-dropdowns', className].filter(Boolean).join(' ');

    const renderNode = (node: TreeListDropdownsNode, depth: number) => {
      const hasChildren = node.children != null && node.children.length > 0;

      return (
        <div key={node.id} className="tree-list-dropdowns__node">
          {depth === 0 ? (
            // Root nodes just show the label and a dropdown, then children
            <div className="tree-list-dropdowns__root-block">
              <div className="tree-list-dropdowns__root-label">{node.label}</div>
              <div className="tree-list-dropdowns__dropdown-wrapper">
                <SingleSelectDropDown
                  label=""
                  options={node.options || []}
                  placeholder="Select"
                  value={node.value}
                  state={node.disabled ? 'disabled' : 'default'}
                  onChange={(val) => onChangeValue?.(node.id, val)}
                />
              </div>
            </div>
          ) : (
            // Child nodes show the label, dropdown, and description below
            <div className="tree-list-dropdowns__child-block">
              <div className="tree-list-dropdowns__child-block-inner">
                <div className="tree-list-dropdowns__child-label">{node.label}</div>
                <div className="tree-list-dropdowns__dropdown-wrapper">
                  <SingleSelectDropDown
                    label=""
                    options={node.options || []}
                    placeholder="Select"
                    value={node.value}
                    state={node.disabled ? 'disabled' : 'default'}
                    onChange={(val) => onChangeValue?.(node.id, val)}
                  />
                </div>
              </div>
              {node.description ? (
                <div className="tree-list-dropdowns__child-description">{node.description}</div>
              ) : null}
            </div>
          )}

          {hasChildren ? (
            <div className="tree-list-dropdowns__children">
              {node.children!.map((c) => renderNode(c, depth + 1))}
            </div>
          ) : null}
        </div>
      );
    };

    return (
      <div ref={ref} className={rootClass} {...rest}>
        <div className="tree-list-dropdowns__title">{title}</div>
        <div className="tree-list-dropdowns__list">
          {items.map((node) => renderNode(node, 0))}
        </div>
      </div>
    );
  },
);

TreeListDropdowns.displayName = 'TreeListDropdowns';
