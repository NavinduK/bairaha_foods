import React, { useEffect } from 'react'
import { getEmployeeAttendance } from '../../redux/slices/attendance'
import { TableHead } from '../../types/table'
import Button from '../button/Button'
import Pagination from '../table/Pagination'
import TableComponent from '../table/TableComponent'
import EmployeeTableRow from './AttendanceTableRow'
import { useDispatch, useSelector } from '../../redux/store'
import useTable from '../table/useTable'
import router, { useRouter } from 'next/router'
import AttendanceTableRow from './AttendanceTableRow'
import _ from 'lodash'

const tableHead: TableHead[] = [
  { name: 'Day', width: '30%', align: 'left' },
  { name: 'Checkin', width: '27.5%', align: 'left' },
  { name: 'Checkout', width: '27.5%', align: 'left' },
  { name: 'Duration', width: '15%', align: 'left' },
]

const AttendanceList = () => {
  const { page, rowsPerPage, handlePageChange, handleRowsPerPage } = useTable()

  const { employeeAttendance } = useSelector((state) => state.attendance)
  const dispatch = useDispatch()
  const { push } = useRouter()
  const { email } = router.query

  useEffect(() => {
    dispatch(getEmployeeAttendance(email + '', page - 1, rowsPerPage * 2))
  }, [email, page, rowsPerPage])

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          {employeeAttendance && (
            <div className="flex">
              <p className="mt-2 px-2 py-1 text-sm text-[#3f9944]">
                Employee Name:
              </p>
              <p className="mt-2 px-2 py-1 text-sm text-white bg-[#3f9944] rounded-md">
                {employeeAttendance.employee.firstName}{' '}
                {employeeAttendance.employee.lastName}
              </p>
              <p className="ml-3 mt-2 px-2 py-1 text-sm text-[#3f9944]">
                Employee Num:
              </p>
              <p className="mt-2 px-2 py-1 text-sm text-white bg-[#3f9944] rounded-md">
                {employeeAttendance.employee.employeeNumber}
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            {employeeAttendance ? (
              <div className="relative overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <TableComponent template={tableHead}>
                  {employeeAttendance &&
                    _.chunk(employeeAttendance.attendance, 2).map(
                      (item: any) => (
                        <AttendanceTableRow key={item[0].id} row={item} />
                      )
                    )}
                </TableComponent>
                <Pagination
                  count={employeeAttendance?.count || 0}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  handleRowsPerPage={handleRowsPerPage}
                  handlePageChange={handlePageChange}
                />
              </div>
            ) : <p className='text-center'>No attendance data found</p>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AttendanceList
