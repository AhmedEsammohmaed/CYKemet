'use client'

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type OnChangeFn,
  type PaginationState,
  type RowData,
  type SortingState,
} from '@tanstack/react-table'
import { useState } from 'react'
import { ArrowDown, ArrowUp, ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

// ─── Column meta type augmentation ───────────────────────────────────────────
declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    /** Fixed pixel width for the column */
    width?: number | string
    /** Text/content alignment within the column */
    align?: 'start' | 'center' | 'end'
  }
}

// ─── Props ────────────────────────────────────────────────────────────────────

export interface DataTableProps<TData> {
  columns: ColumnDef<TData, any>[] // eslint-disable-line @typescript-eslint/no-explicit-any
  data: TData[]
  /** Called when a row is clicked */
  onRowClick?: (row: TData) => void
  // ── Server-side props — pass these when integrating with Laravel ──────────
  /** Total page count from the server (enables server-side pagination UI) */
  pageCount?: number
  /** Controlled pagination state (server-side mode) */
  pagination?: PaginationState
  /** Called when the user changes page or page size (server-side mode) */
  onPaginationChange?: OnChangeFn<PaginationState>
  /** Controlled sorting state (server-side mode) */
  sorting?: SortingState
  /** Called when the user clicks a sortable column header (server-side mode) */
  onSortingChange?: OnChangeFn<SortingState>
  /**
   * Set true when the server handles pagination.
   * The table will treat `data` as already-paginated and won't slice it.
   */
  manualPagination?: boolean
  /**
   * Set true when the server handles sorting.
   * The table will treat `data` as already-sorted and won't reorder it.
   */
  manualSorting?: boolean
  /** Shows skeleton rows while data is loading */
  isLoading?: boolean
  /** Default page size (ignored in controlled mode) */
  defaultPageSize?: number
  className?: string
}

const PAGE_SIZE_OPTIONS = [10, 20, 50]

// ─── Component ────────────────────────────────────────────────────────────────

export function DataTable<TData>({
  columns,
  data,
  onRowClick,
  pageCount,
  pagination: paginationProp,
  onPaginationChange,
  sorting: sortingProp,
  onSortingChange,
  manualPagination = false,
  manualSorting = false,
  isLoading = false,
  defaultPageSize = 10,
  className,
}: DataTableProps<TData>) {
  // Internal state — used when caller does NOT pass controlled props (client-side mode)
  const [internalPagination, setInternalPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: defaultPageSize,
  })
  const [internalSorting, setInternalSorting] = useState<SortingState>([])

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    state: {
      pagination: paginationProp ?? internalPagination,
      sorting: sortingProp ?? internalSorting,
    },
    // Server-side: caller provides the total page count
    pageCount,
    // Pagination
    onPaginationChange: onPaginationChange ?? setInternalPagination,
    ...(manualPagination
      ? { manualPagination: true }
      : { getPaginationRowModel: getPaginationRowModel() }),
    // Sorting
    onSortingChange: onSortingChange ?? setInternalSorting,
    ...(manualSorting
      ? { manualSorting: true }
      : { getSortedRowModel: getSortedRowModel() }),
    getCoreRowModel: getCoreRowModel(),
  })

  const { pageIndex } = table.getState().pagination
  const totalPages = table.getPageCount()

  return (
    <div className={cn('flex flex-col', className)}>

      {/* ── Table ──────────────────────────────────────────────────────────── */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">

          {/* Header */}
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-auth-left-bg">
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort()
                  const sorted  = header.column.getIsSorted()
                  const align   = header.column.columnDef.meta?.align ?? 'start'
                  return (
                    <th
                      key={header.id}
                      style={{ width: header.column.columnDef.meta?.width }}
                      onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                      className={cn(
                        'pb-4 text-body-md font-medium text-grey-main whitespace-nowrap pe-3',
                        align === 'center' && 'text-center',
                        align === 'end'    && 'text-end',
                        canSort && 'cursor-pointer select-none hover:text-content-500 transition-colors',
                      )}
                    >
                      <div className={cn(
                        'flex items-center gap-1',
                        align === 'center' && 'justify-center',
                        align === 'end'    && 'justify-end',
                      )}>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {canSort && (
                          sorted === 'asc'  ? <ArrowUp   size={13} className="shrink-0" /> :
                          sorted === 'desc' ? <ArrowDown size={13} className="shrink-0" /> :
                                             <ArrowUpDown size={13} className="shrink-0 opacity-40" />
                        )}
                      </div>
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>

          {/* Body */}
          <tbody>
            {isLoading ? (
              // Skeleton rows while data is fetching
              Array.from({ length: table.getState().pagination.pageSize }).map((_, i) => (
                <tr key={i} className="border-b border-auth-left-bg last:border-0">
                  {columns.map((_, j) => (
                    <td key={j} className="py-4 pe-3">
                      <div className="h-4 rounded bg-auth-left-bg animate-pulse" />
                    </td>
                  ))}
                </tr>
              ))
            ) : table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="py-12 text-center text-body-lg text-grey-main"
                >
                  No results found.
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  onClick={() => onRowClick?.(row.original)}
                  className={cn(
                    'border-b border-auth-left-bg last:border-0 transition-colors hover:bg-auth-left-bg',
                    onRowClick && 'cursor-pointer',
                  )}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className={cn(
                        'py-4 pe-3',
                        cell.column.columnDef.meta?.align === 'center' && 'text-center',
                        cell.column.columnDef.meta?.align === 'end'    && 'text-end',
                      )}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ── Pagination bar ─────────────────────────────────────────────────── */}
      {totalPages > 0 && (
        <div className="flex items-center justify-between pt-5 mt-4 border-t border-auth-left-bg">

          {/* Rows per page */}
          <div className="flex items-center gap-2 text-body-md text-grey-main">
            <span>Rows per page:</span>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => table.setPageSize(Number(e.target.value))}
              className="border border-auth-left-bg rounded-btn px-2 py-1 text-body-md text-content-500 bg-white outline-none cursor-pointer"
            >
              {PAGE_SIZE_OPTIONS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Page indicator + nav buttons */}
          <div className="flex items-center gap-3">
            <span className="text-body-md text-grey-main">
              Page {pageIndex + 1} of {totalPages}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="size-8 flex items-center justify-center rounded-btn border border-auth-left-bg text-content-500 disabled:opacity-40 hover:bg-secondary-50 transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="size-8 flex items-center justify-center rounded-btn border border-auth-left-bg text-content-500 disabled:opacity-40 hover:bg-secondary-50 transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  )
}
