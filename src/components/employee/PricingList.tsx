import React, { useEffect, useState } from 'react'
import { getAllPricing } from '../../redux/slices/pricing'
import { TableHead } from '../../types/table'
import Button from '../button/Button'
import Pagination from '../table/Pagination'
import TableComponent from '../table/TableComponent'
import PricingTableRow from './PricingTableRow'
import { useDispatch, useSelector } from '../../redux/store'
import useTable from '../table/useTable'
import { useRouter } from 'next/router'
import { SearchIcon } from '@heroicons/react/solid'
import FormProvider from '../hook-form/FormProvider'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import TabsComponent from '../tabs/TabsComponent'

const tableHead: TableHead[] = [
  { name: 'Name', width: '30%', align: 'left' },
  { name: 'Price', width: '15%', align: 'left' },
  { name: '# Features', width: '15%', align: 'left' },
  { name: 'Status', width: '15%', align: 'left' },
  { name: 'Actions', width: '25%', align: 'center' },
]

const tabsStatus = [
  { name: 'All', value: 'ALL' },
  { name: 'Active', value: 'ACTIVE' },
  { name: 'Inactive', value: 'INACTIVE' },
]

const PricingList = () => {
  const { page, rowsPerPage, handlePageChange, handleRowsPerPage } = useTable()
  const { pricings, count } = useSelector((state) => state.pricing)
  const [filterStatus, setFilterStatus] = useState<string>('ALL')
  const dispatch = useDispatch()
  const { push } = useRouter()

  useEffect(() => {
    fetchData()
  }, [page, rowsPerPage])

  const fetchData = () => {
    dispatch(getAllPricing(page - 1, rowsPerPage))
  }

  const searchSchema = Yup.object().shape({
    query: Yup.string()
      .min(3, 'Must be more than 3 characters')
      .required('Search keyword is required'),
  })

  const handleFilterStatus = (newValue: string) => {
    handleRowsPerPage(5)
    handlePageChange(1)
    setFilterStatus(newValue)
  }

  const methods = useForm({
    resolver: yupResolver(searchSchema),
  })

  const { handleSubmit, register, reset } = methods

  // const onSubmit = async (data: any) => {
  //   handleRowsPerPage(5)
  //   handlePageChange(1)
  //   setSearchedEmployees([])
  //   setIsSearched(true)
  //   await dispatch(searchEmployee(data.query)).then((res) => {
  //     setSearchedEmployees(res)
  //   })
  // }

  const clearSearch = () => {
    reset({ query: '' })
    handleRowsPerPage(5)
    handlePageChange(1)
  }

  const dataFiltered = applyFilter({
    inputData: pricings,
    filterStatus,
  })

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="flex-auto">
          <div className="sm:flex">
            <TabsComponent
              onChange={handleFilterStatus}
              tabs={tabsStatus}
              currentTab={filterStatus}
            />
          </div>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Button
            variant="primary"
            text="Create Package"
            onClick={() => push('/admin/pricing/create')}
          />
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="relative overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <TableComponent template={tableHead}>
                {dataFiltered &&
                  dataFiltered.length &&
                  dataFiltered.map((item: any) => (
                    <PricingTableRow
                      key={item.id}
                      row={item}
                      fetchData={fetchData}
                    />
                  ))}
              </TableComponent>
              <Pagination
                count={count}
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
  )
}

export default PricingList

function applyFilter({
  inputData,
  filterStatus,
}: {
  inputData: any[]
  filterStatus: any
}) {
  if (filterStatus !== 'ALL') {
    const status = filterStatus == 'ACTIVE' ? true : false
    inputData = inputData.filter((item) => item.isActive === status)
  }

  return inputData
}
