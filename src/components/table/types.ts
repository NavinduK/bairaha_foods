export type TableProps = {
  page: number
  rowsPerPage: number
  handlePageChange: (newPage: number) => void
  handleRowsPerPage: (rpp: number) => void
  setPage: React.Dispatch<React.SetStateAction<number>>
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>
}
