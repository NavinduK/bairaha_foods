import React, { useEffect, useState } from 'react'
import { TableHead } from '../../types/table'
import Button from '../button/Button'
import Pagination from '../table/Pagination'
import TableComponent from '../table/TableComponent'
import UserTableRow from './UserTableRow'
import { useDispatch, useSelector } from '../../redux/store'
import useTable from '../table/useTable'
import { useRouter } from 'next/router'
import { getAllUsers } from '../../redux/slices/user'
import TabsComponent from '../tabs/TabsComponent'
import { resetUserPassword } from '../../redux/slices/userAccount'
import ResetPasswordModel from './ResetPasswordModel'
import { toast } from 'react-toastify'

const tableHead: TableHead[] = [
  { name: 'Name', width: '20%', align: 'left' },
  { name: 'Email', width: '25%', align: 'left' },
  { name: 'Mobile Number', width: '15%', align: 'left' },
  { name: 'Role', width: '10%', align: 'left' },
  { name: 'Status', width: '10%', align: 'center' },
  { name: 'Actions', width: '20%', align: 'center' },
]

const tabsRole = [
  { name: 'All', value: 'ALL' },
  { name: 'Employees', value: 'EMPLOYEE' },
  { name: 'Users', value: 'USER' },
  { name: 'Admins', value: 'ADMINS' },
  { name: 'Super Admins', value: 'SUPER_ADMIN' },
]

const tabsStatus = [
  { name: 'All', value: 'ALL' },
  { name: 'Pending', value: 'PENDING' },
  { name: 'Active', value: 'ACTIVE' },
  { name: 'Inactive', value: 'INACTIVE' },
]

const UserList = () => {
  const { page, rowsPerPage, handlePageChange, handleRowsPerPage } = useTable()
  const [filterRole, setFilterRole] = useState<string>('ALL')
  const [filterStatus, setFilterStatus] = useState<string>('ALL')
  const { users } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const { push } = useRouter()
  const [open, setOpen] = useState<boolean>(false)
  const [updateUserEmail, setUpdateUserEmail] = useState<string>('')

  useEffect(() => {
    dispatch(getAllUsers())
  }, [])

  const handleFilterRole = (newValue: string) => {
    handleRowsPerPage(5)
    handlePageChange(1)
    setFilterRole(newValue)
  }

  const handleFilterStatus = (newValue: string) => {
    handleRowsPerPage(5)
    handlePageChange(1)
    setFilterStatus(newValue)
  }

  const handleResetPassword = (password: string) => {
    updateUserEmail &&
      dispatch(resetUserPassword(updateUserEmail, password)).then((res) => {
        if (res.message === 'SUCCESS')
          toast.success('Password updated succesfully!')
        else toast.error('Password update error!')
      })
  }

  const handleCloseModel = () => {
    setUpdateUserEmail('')
    setOpen(false)
  }

  const handleOpenModel = (email: string) => {
    setUpdateUserEmail(email)
    setOpen(true)
  }

  const dataFiltered = applyFilter({
    inputData: users,
    filterRole,
    filterStatus,
  })

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="flex-auto">
            <div className="hidden sm:flex">
              <TabsComponent
                onChange={handleFilterStatus}
                tabs={tabsStatus}
                currentTab={filterStatus}
              />
              <div className="p-3 d-none hidden sm:block"></div>
              {/* <TabsComponent
                onChange={handleFilterRole}
                tabs={tabsRole}
                currentTab={filterRole}
              /> */}
            </div>
          </div>
          <div className="sm:ml-16 sm:flex-none">
            <Button
              variant="primary"
              text="Add User"
              onClick={() => push('/admin/user/create')}
            />
          </div>
        </div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="relative overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <TableComponent template={tableHead}>
                  {dataFiltered &&
                    dataFiltered
                      .slice(
                        (page - 1) * rowsPerPage,
                        (page - 1) * rowsPerPage + rowsPerPage
                      )
                      .map((item: any) => (
                        <UserTableRow
                          key={item.id}
                          row={item}
                          handleOpenModel={handleOpenModel}
                        />
                      ))}
                </TableComponent>
                <Pagination
                  count={dataFiltered.length}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  handleRowsPerPage={handleRowsPerPage}
                  handlePageChange={handlePageChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ResetPasswordModel
        open={open}
        handleCloseModel={handleCloseModel}
        handleResetPassword={handleResetPassword}
      />
    </>
  )
}

export default UserList

function applyFilter({
  inputData,
  filterRole,
  filterStatus,
}: {
  inputData: any[]
  filterRole: any
  filterStatus: any
}) {
  if (filterRole !== 'ALL') {
    inputData = inputData.filter((item) => item.role.name === filterRole)
  }

  if (filterStatus !== 'ALL') {
    inputData = inputData.filter((item) => item.status === filterStatus)
  }

  return inputData
}
