import React from 'react';
import './Table.css';

export interface TableColumn<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  width?: string | number;
}

export interface TableProps<T> {
  title?: string;
  subtitle?: string;
  actionButton?: {
    label: string;
    onClick: () => void;
  };
  columns: TableColumn<T>[];
  data: T[];
  onRowSelect?: (item: T, isSelected: boolean) => void;
  selectedItems?: T[];
  className?: string;
}

export function Table<T extends { id?: string | number }>({
  title,
  subtitle,
  actionButton,
  columns,
  data,
  onRowSelect,
  selectedItems = [],
  className = '',
}: TableProps<T>) {
  const isSelected = (item: T) => {
    return selectedItems.some(selected => 
      (selected.id !== undefined && selected.id === item.id) || selected === item
    );
  };

  return (
    <div className={`table-container ${className}`}>
      {(title || subtitle || actionButton) && (
        <div className="table-header">
          <div className="table-header__content">
            {title && <h2 className="table-header__title">{title}</h2>}
            {subtitle && <p className="table-header__subtitle">{subtitle}</p>}
          </div>
          {actionButton && (
            <button className="table-header__button" onClick={actionButton.onClick}>
              {actionButton.label}
            </button>
          )}
        </div>
      )}

      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              {onRowSelect && (
                <th className="table__cell table__cell--header table__cell--checkbox">
                  <div className="table__checkbox-wrapper">
                    <input 
                      type="checkbox" 
                      className="table__checkbox"
                      checked={data.length > 0 && data.every(item => isSelected(item))}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        data.forEach(item => onRowSelect(item, checked));
                      }}
                    />
                  </div>
                </th>
              )}
              {columns.map((column, index) => (
                <th 
                  key={index} 
                  className="table__cell table__cell--header"
                  style={{ width: column.width }}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, rowIndex) => (
                <tr 
                  key={item.id || rowIndex} 
                  className={`table__row ${isSelected(item) ? 'table__row--selected' : ''}`}
                >
                  {onRowSelect && (
                    <td className="table__cell table__cell--checkbox">
                      <div className="table__checkbox-wrapper">
                        <input 
                          type="checkbox" 
                          className="table__checkbox"
                          checked={isSelected(item)}
                          onChange={(e) => onRowSelect(item, e.target.checked)}
                        />
                      </div>
                    </td>
                  )}
                  {columns.map((column, colIndex) => (
                    <td key={colIndex} className="table__cell">
                      {typeof column.accessor === 'function' 
                        ? column.accessor(item) 
                        : (item[column.accessor] as React.ReactNode)}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + (onRowSelect ? 1 : 0)} className="table__cell table__cell--empty">
                  No Data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
