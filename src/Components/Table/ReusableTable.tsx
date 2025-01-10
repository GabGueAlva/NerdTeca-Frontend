import DataTable, { TableColumn } from 'react-data-table-component';

interface ReusableTableProps<T> {
  columns: TableColumn<T>[]
  data: T[]
  paginationPerPage?: number
}

const ReusableTable = <T,>({ columns, data, paginationPerPage = 8}: ReusableTableProps<T>) => {
  return (
    <div className="overflow-x-auto  w-full">
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
    </div>
  );
};

export default ReusableTable;