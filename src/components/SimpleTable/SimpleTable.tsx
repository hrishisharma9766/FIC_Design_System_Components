import React from 'react';
import './SimpleTable.css';

export interface SimpleTableColumn<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  width?: string | number;
  isSortable?: boolean;
  sortDirection?: 'asc' | 'desc' | null;
}

export interface SimpleTableProps<T> {
  columns: SimpleTableColumn<T>[];
  data: T[];
  onRowSelect?: (item: T, isSelected: boolean) => void;
  selectedItems?: T[];
  className?: string;
  noDataMessage?: string;
  isResponsive?: boolean;
  onColumnSort?: (columnKey: string, direction: 'asc' | 'desc') => void;
  variant?: 'default' | 'striped';
}

export function SimpleTable<T extends { id?: string | number }>({
  columns,
  data,
  onRowSelect,
  selectedItems = [],
  className = '',
  noDataMessage = 'No Data',
  isResponsive = false,
  onColumnSort,
  variant = 'striped'
}: SimpleTableProps<T>) {
  const isSelected = (item: T) => selectedItems.some(selected => 
    (selected.id !== undefined && selected.id === item.id) || selected === item
  );

  const handleSelectAll = (checked: boolean) => {
    if (onRowSelect) {
      data.forEach(item => onRowSelect(item, checked));
    }
  };

  const handleSortClick = (column: SimpleTableColumn<T>) => {
    if (!column.isSortable || !onColumnSort) return;
    const columnKey = typeof column.accessor === 'string' ? column.accessor : column.header;
    const newDirection = column.sortDirection === 'asc' ? 'desc' : 'asc';
    onColumnSort(columnKey, newDirection);
  };

  return (
    <div className={`simple-table-container ${className} ${isResponsive ? 'simple-table-container--responsive' : ''} simple-table-container--${variant}`}>
      <div className="simple-table-wrapper">
        <table className="simple-table">
          <thead>
            <tr>
              {onRowSelect && (
                <th className="simple-table__cell simple-table__cell--header simple-table__cell--checkbox">
                  <div className="simple-table__checkbox-wrapper">
                    <input 
                      type="checkbox" 
                      className="simple-table__checkbox"
                      checked={data.length > 0 && data.every(item => isSelected(item))}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                    />
                  </div>
                </th>
              )}
              {columns.map((column, index) => (
                <th 
                  key={index} 
                  className={`simple-table__cell simple-table__cell--header ${column.isSortable ? 'simple-table__cell--sortable' : ''}`}
                  style={{ width: column.width }}
                  onClick={() => handleSortClick(column)}
                >
                  <div className="simple-table__header-content">
                    {column.header}
                    {column.isSortable && (
                      <span className={`simple-table__sort-icon ${column.sortDirection || ''}`}>
                        {column.sortDirection === 'asc' ? '↑' : column.sortDirection === 'desc' ? '↓' : '↕'}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, rowIndex) => (
                <tr 
                  key={item.id || rowIndex} 
                  className={`simple-table__row ${isSelected(item) ? 'simple-table__row--selected' : ''}`}
                >
                  {onRowSelect && (
                    <td className="simple-table__cell simple-table__cell--checkbox">
                      <div className="simple-table__checkbox-wrapper">
                        <input 
                          type="checkbox" 
                          className="simple-table__checkbox"
                          checked={isSelected(item)}
                          onChange={(e) => onRowSelect(item, e.target.checked)}
                        />
                      </div>
                    </td>
                  )}
                  {columns.map((column, colIndex) => (
                    <td key={colIndex} className="simple-table__cell">
                      {typeof column.accessor === 'function' 
                        ? column.accessor(item) 
                        : (item[column.accessor] as React.ReactNode)}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td 
                  colSpan={columns.length + (onRowSelect ? 1 : 0)} 
                  className="simple-table__cell simple-table__cell--empty"
                >
                  {noDataMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
