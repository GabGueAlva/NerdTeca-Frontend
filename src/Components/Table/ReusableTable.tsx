import DataTable, { TableColumn } from 'react-data-table-component';

interface ReusableTableProps<T> {
  columns: TableColumn<T>[]
  data: T[]
  paginationPerPage?: number
}

const ReusableTable = <T,>({ columns, data, paginationPerPage = 8}: ReusableTableProps<T>) => {
  return (
    <DataTable
      columns={columns}
      data={data}
      pagination
      paginationPerPage={paginationPerPage}
      highlightOnHover
      pointerOnHover
      responsive
      striped
      noHeader
    />
  );
};

export default ReusableTable;