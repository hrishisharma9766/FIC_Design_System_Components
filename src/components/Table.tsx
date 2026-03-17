

import * as React from "react";

import { cn } from "../lib/utils";

function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  );
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn(
        "bg-background border-b border-border",
        className
      )}
      {...props}
    />
  );
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  );
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
        className,
      )}
      {...props}
    />
  );
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "h-[40px] items-center border-b border-border last:border-b-0 data-[state=selected]:bg-muted",
        className,
      )}
      {...props}
    />
  );
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "px-4 text-left align-middle border-r border-border last:border-r-0 h-full text-secondary text-[14px] font-[800] whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className,
      )}
      {...props}
    />
  );
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "px-4 align-middle border-r border-border last:border-r-0 h-full text-secondary text-[14px] font-[500] truncate whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className,
      )}
      {...props}
    />
  );
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("text-muted-foreground mt-4 text-sm", className)}
      {...props}
    />
  );
}

// ========== EVAA TABLE COMPONENT ==========

type ActionType = 'edit-cancel' | 'save-cancel' | 'pay-alert' | 'practice-location';

interface TableRowData {
  id: string;
  location: string;
  accountId: string;
  acceptorId: string;
  acceptorToken: string;
  actionType?: ActionType;
  isEditing?: boolean;
  isEditingAccountId?: boolean;
  isEditingAcceptorId?: boolean;
  isEditingAcceptorToken?: boolean;
  showCheckbox?: boolean;
  alternateBackground?: boolean;
}

interface ReusableTableProps {
  data: TableRowData[];
  showHeaderCheckbox?: boolean;
  title?: string;
}

function EvaaTable({ data, showHeaderCheckbox = false, title }: ReusableTableProps) {
  if (data.length === 0) {
    return (
      <div className="w-full rounded-[13px] border border-border overflow-hidden bg-background font-sans select-none">
        <div className="flex h-[80px] items-center justify-center border-b-0">
          <span className="text-secondary text-[14px] font-[500]">No Data</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full rounded-[13px] border border-border overflow-hidden bg-background font-sans select-none">
      {/* HEADER ROW */}
      <div className="grid h-[40px] bg-background border-b border-border grid-cols-[207px_1fr_1fr_1fr_267px]">
        <div className="flex items-center px-4 border-r border-border h-full">
          {showHeaderCheckbox && (
            <div className="w-[18px] h-[18px] rounded-[4px] border border-border mr-2.5 bg-background flex-shrink-0">
              <input type="checkbox" className="w-full h-full cursor-pointer" />
            </div>
          )}
          <span className="text-secondary text-[14px] font-[800]">Location Name</span>
        </div>
        <div className="flex items-center px-4 border-r border-border h-full">
          <span className="text-secondary text-[14px] font-[800]">Account Id</span>
        </div>
        <div className="flex items-center px-4 border-r border-border h-full">
          <span className="text-secondary text-[14px] font-[800]">Acceptor ID</span>
        </div>
        <div className="flex items-center px-4 border-r border-border h-full">
          <span className="text-secondary text-[14px] font-[800]">Acceptor Token</span>
        </div>
        <div className="flex items-center px-4 border-r-0 h-full justify-center">
          <span className="text-secondary text-[14px] font-[800]">Actions</span>
        </div>
      </div>

      {/* DATA ROWS */}
      {data.map((row, index) => {
        const isAlt = index % 2 !== 0;
        return (
          <div 
            key={row.id} 
            className={cn(
              "grid h-[40px] items-center border-b border-border last:border-b-0 grid-cols-[207px_1fr_1fr_1fr_267px]",
              isAlt ? "bg-muted/30" : "bg-background"
            )}
          >
            {/* Location Name Column */}
            <div className="flex items-center px-4 border-r border-border h-full">
              {row.showCheckbox !== false && (
                <div className="w-[18px] h-[18px] rounded-[4px] border border-border mr-2.5 bg-background flex-shrink-0">
                  <input type="checkbox" className="w-full h-full cursor-pointer" />
                </div>
              )}
              <span className="text-secondary text-[14px] font-[500] truncate">{row.location}</span>
            </div>

            {/* Account Id Column */}
            <div className="flex items-center px-4 border-r border-border h-full">
              {row.isEditingAccountId ? (
                <div className="flex h-[32px] w-full items-center rounded-[13px] border border-border bg-background px-4 focus-within:border-primary">
                  <input
                    type="text"
                    defaultValue={row.accountId}
                    className="w-full bg-transparent outline-none text-secondary text-[14px] font-[500]"
                  />
                </div>
              ) : (
                <span className="text-secondary text-[14px] font-[500] truncate">{row.accountId}</span>
              )}
            </div>

            {/* Acceptor ID Column */}
            <div className="flex items-center px-4 border-r border-border h-full">
              {row.isEditingAcceptorId ? (
                <div className="flex h-[32px] w-full items-center rounded-[13px] border border-border bg-background px-4 focus-within:border-primary">
                  <input
                    type="text"
                    defaultValue={row.acceptorId}
                    className="w-full bg-transparent outline-none text-secondary text-[14px] font-[500]"
                  />
                </div>
              ) : (
                <span className="text-secondary text-[14px] font-[500] truncate">{row.acceptorId}</span>
              )}
            </div>

            {/* Acceptor Token Column */}
            <div className="flex items-center px-4 border-r border-border h-full">
              {row.isEditingAcceptorToken ? (
                <div className="flex h-[32px] w-full items-center rounded-[13px] border border-border bg-background px-4 focus-within:border-primary">
                  <input
                    type="text"
                    defaultValue={row.acceptorToken}
                    className="w-full bg-transparent outline-none text-secondary text-[14px] font-[500]"
                  />
                </div>
              ) : (
                <span className="text-secondary text-[14px] font-[500] truncate">{row.acceptorToken}</span>
              )}
            </div>

            {/* Actions Column */}
            <div className="flex items-center px-4 border-r-0 h-full justify-center">
              {row.actionType === 'edit-cancel' && (
                <div className="flex gap-2">
                  <div className="flex items-center gap-1 px-2 text-[12px] font-[500] text-primary cursor-pointer">
                    <i className="fa-solid fa-pen-to-square"></i>
                    <span>Edit</span>
                  </div>
                  <div className="flex items-center gap-1 px-2 text-[12px] font-[500] text-destructive cursor-pointer">
                    <i className="fa-solid fa-xmark"></i>
                    <span>Cancel</span>
                  </div>
                </div>
              )}
              {row.actionType === 'save-cancel' && (
                <div className="flex gap-2">
                  <div className="flex items-center gap-1 px-2 text-[12px] font-[500] text-primary cursor-pointer">
                    <i className="fa-solid fa-floppy-disk"></i>
                    <span>Save</span>
                  </div>
                  <div className="flex items-center gap-1 px-2 text-[12px] font-[500] text-destructive cursor-pointer">
                    <i className="fa-solid fa-xmark"></i>
                    <span>Cancel</span>
                  </div>
                </div>
              )}
              {row.actionType === 'pay-alert' && (
                <div className="flex items-center">
                  <button className="h-[35px] px-4 rounded-full border border-primary bg-background text-[14px] font-[800] text-secondary hover:bg-muted/20">
                    PAY
                  </button>
                  <div className="w-4 h-4 rounded-full bg-destructive flex items-center justify-center text-white text-[10px] font-bold ml-2">
                    !
                  </div>
                </div>
              )}
              {row.actionType === 'practice-location' && (
                <div className="flex items-center gap-2">
                  <div className="w-[18px] h-[18px] rounded-[4px] border border-border bg-background flex-shrink-0">
                    <input type="checkbox" className="w-full h-full" />
                  </div>
                  <span className="text-secondary text-[14px] font-[500]">Practice Location</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  EvaaTable,
};
