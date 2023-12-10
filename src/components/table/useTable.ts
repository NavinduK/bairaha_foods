import { useState } from 'react'
import { TableProps } from './types'

type ReturnType = TableProps

export type UseTableProps = {
  defaultRowsPerPage?: number
  defaultCurrentPage?: number
}

export default function useTable(props?: UseTableProps): ReturnType {
  const [page, setPage] = useState(props?.defaultCurrentPage || 1)

  const [rowsPerPage, setRowsPerPage] = useState(props?.defaultRowsPerPage || 5)

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  const handleRowsPerPage = (rpp: number) => {
    setPage(1)
    setRowsPerPage(rpp)
  }

  return {
    page,
    rowsPerPage,
    handlePageChange,
    handleRowsPerPage,
    setPage,
    setRowsPerPage,
  }
}
