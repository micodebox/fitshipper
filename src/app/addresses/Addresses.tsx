import { useMemo } from "react";
import { Column, useFilters, useGlobalFilter, usePagination, useSortBy, useTable } from "react-table";
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon } from "@heroicons/react/solid";
import { Address, AddressesProps } from "./Addresses.types";
import { useHistory } from "react-router-dom";
import { AppRoute } from "../routing/AppRoutes.enum";

export const Addresses = ({
  addresses,
  orderBy,
  sortDirection,
  pageSize = 5,
  page = 0,
  totalCount = 0,
  totalPages = 0,
  keyword,
  loading = false,
  onSetOrderBy,
  onChangePageSize,
  onChangePage,
  onChangeKeyword,
  onDeleteAddress
}: AddressesProps) => {
  const { push } = useHistory();
  const columns = useMemo<Column<Address>[]>(() => ([
    {
      Header: 'ID',
      accessor: 'id',
    },
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Address 1',
      accessor: 'address1',
    },
    {
      Header: 'Address 2',
      accessor: 'address2',
      disableSortBy: true,
    },
    {
      Header: 'City',
      accessor: 'city',
    },
    {
      Header: 'State',
      accessor: 'state',
    },
    {
      Header: 'Zip',
      accessor: 'zip',
      disableSortBy: true,
    },
  ]), []);

  const pageSizeOptions = [5, 10, 25];

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({
    columns,
    data: addresses,
  }, useFilters, useGlobalFilter, useSortBy, usePagination);

  return (
    <>
      <div className="mb-2 flex justify-between">
        {loading && (
          <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
          </div>
        )}
        <input
          value={keyword}
          onChange={(event) => onChangeKeyword?.(event.target.value)}
          placeholder="Type in some keywords..."
          className="rounded px-2 border-2 active:border-blue-500"
        />
        <button
          className="btn-primary"
          onClick={() => push(AppRoute.newAddress)}
        >Create New</button>
      </div>
      <table {...getTableProps()} className="border w-full">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps()}
                  className={`${column.disableSortBy ? 'cursor-default' : ''} px-1 py-2`}
                  onClick={() => !column.disableSortBy && onSetOrderBy?.(column.id)}
                >
                  <div className="flex items-center">
                    <span>{column.render('Header')}</span>
                    <span className="ml-2">
                      {column.id === orderBy
                        ? sortDirection === 'asc'
                          ?  <ChevronDownIcon className="w-4 h-4" />
                          : <ChevronUpIcon className="w-4 h-4" />
                        : null}
                    </span>
                  </div>
                </th>
              ))}
              <th>Actions</th>
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps}>
          {rows.map((row, index) => {
            prepareRow(row);

            return (
              <tr
                {...row.getRowProps()}
                onClick={() => push(
                  AppRoute.addressDetails.replace(
                    ':addressId',
                    row.original.id.toString()
                  )
                )}
                className="hover:bg-gray-100 cursor-pointer"
              >
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()} className="px-1 py-1">{cell.render('Cell')}</td>
                ))}
                <td>
                  <button
                    className="btn-secondary text-sm"
                    onClick={(event) => {
                      event.stopPropagation();
                      onDeleteAddress?.(row.original.id);
                    }}
                  >Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex justify-between mt-2">
        <div className="flex items-center">
          <select
            value={pageSize}
            onChange={(value) => onChangePageSize?.(parseInt(value.target.value, 10))}
            className="p-2 cursor-pointer border border-gray-500 hover:border-blue-500"
          >
            {pageSizeOptions.map((option => (
              <option key={option} value={option}>{option}</option>
            )))}
          </select>
          <span className="ml-2">of {totalCount} items</span>
        </div>
        <div className="flex items-center">
          <button
            disabled={page === 0}
            onClick={() => onChangePage?.(Math.max(0, page - 1))}
            className={`p-2 border border-gray-200 hover:border-blue-500 hover:bg-blue-500 hover:text-white ${page === 0 ? 'cursor-not-allowed' : ''}`}
          >
            <ChevronLeftIcon className="w-4 h-4" />
          </button>
          <button
            disabled={page === totalPages - 1}
            onClick={() => onChangePage?.(Math.min(totalPages - 1, page + 1))}
            className={`p-2 border border-gray-200 hover:border-blue-500 hover:bg-blue-500 hover:text-white ${page === totalPages - 1 ? 'cursor-not-allowed' : ''}`}
          >
            <ChevronRightIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
};
