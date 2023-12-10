import React, { useEffect, useState } from 'react'
import { getAllPricing } from '../../redux/slices/pricing'
import { TableHead } from '../../types/table'
import Pagination from '../table/Pagination'
import TableComponent from '../table/TableComponent'
import { useDispatch, useSelector } from '../../redux/store'
import useTable from '../table/useTable'
import { useRouter } from 'next/router'
import { SearchIcon } from '@heroicons/react/solid'
import FormProvider from '../hook-form/FormProvider'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import MaintainTableRow from './MaintainTableRow'
import { getMachinesLogs } from '../../redux/slices/machinelogs'
import Button from '../button/Button'
import Datepicker from 'react-tailwindcss-datepicker'
import * as XLSX from 'xlsx'

const tableHead: TableHead[] = [
  { name: 'Machine Name', width: '20%', align: 'left' },
  {
    name: 'Breakdown',
    width: '25%',
    align: 'center',
    children: [
      { name: 'Date', width: '15%' },
      { name: 'Time', width: '10%' },
    ],
  },
  {
    name: 'Active',
    width: '25%',
    align: 'center',
    children: [
      { name: 'Date', width: '15%' },
      { name: 'Time', width: '10%' },
    ],
  },
  { name: 'Total Breakdown Hours', width: '20%', align: 'left' },
]

const BookingList = () => {
  const { page, rowsPerPage, handlePageChange, handleRowsPerPage } = useTable()
  const { machinelogs, count, isLoading } = useSelector(
    (state) => state.machinelogs
  )
  // const [filterStatus, setFilterStatus] = useState<string>('ALL')
  const dispatch = useDispatch()
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  })

  const handleValueChange = (newValue: any) => {
    console.log('newValue:', newValue)
    setValue(newValue)
  }

  useEffect(() => {
    fetchData()
  }, [value])

  useEffect(() => {
    console.log(value)
  }, [value])

  const fetchData = () => {
    value.startDate &&
      value.endDate &&
      dispatch(getMachinesLogs(value.startDate, value.endDate))
  }

  // const searchSchema = Yup.object().shape({
  //   query: Yup.string()
  //     .min(3, 'Must be more than 3 characters')
  //     .required('Search keyword is required'),
  // })

  // const dataFiltered = applyFilter({
  //   inputData: pricings,
  //   filterStatus,
  // })

  const handlePrint = async () => {
    const elementId = 'containerToPrint'
    const containerToPrint = document.getElementById(elementId)

    if (containerToPrint) {
      if (machinelogs && machinelogs.length) {
        const wb = XLSX.utils.book_new()
        const ws = XLSX.utils.table_to_sheet(containerToPrint)
        XLSX.utils.book_append_sheet(
          wb,
          ws,
          `${value.startDate}-${value.endDate}`
        )
        const xlsxFile = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' })
        const blob = new Blob([s2ab(xlsxFile)], {
          type: 'application/octet-stream',
        })

        // Create a download link for the XLSX blob
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `Report ${value.startDate}-${value.endDate}.xlsx`
        a.setAttribute(
          'download',
          `Report ${value.startDate}-${value.endDate}.xlsx`
        )
        a.click()
        window.URL.revokeObjectURL(url)
      }
    }
  }

  function s2ab(s: string) {
    const buf = new ArrayBuffer(s.length)
    const view = new Uint8Array(buf)
    for (let i = 0; i !== s.length; i++) {
      view[i] = s.charCodeAt(i) & 0xff
    }
    return buf
  }

  function calculateDuration(startTime: any, endTime: any) {
    const duration = endTime - startTime

    const days = Math.floor(duration / (24 * 60 * 60 * 1000))
    const hours = Math.floor(
      (duration % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
    )
    const minutes = Math.floor((duration % (60 * 60 * 1000)) / (60 * 1000))

    const formatUnit = (value: any, unit: any) => {
      if (value === 0) {
        return ''
      } else if (value === 1) {
        return `${value} ${unit.slice(0, -1)}`
      } else {
        return `${value} ${unit}`
      }
    }

    const formattedDays = formatUnit(days, 'days')
    const formattedHours = formatUnit(hours, 'hours')
    const formattedMinutes = formatUnit(minutes, 'mins')

    const formattedDuration = [formattedDays, formattedHours, formattedMinutes]
      .filter(Boolean)
      .join(' : ')

    return formattedDuration || '0 seconds'
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex">
          <div className="ring-1 ring-black ring-opacity-30 rounded-lg sm:w-[400px]">
            <Datepicker
              placeholder={'Select Date Range'}
              value={value}
              onChange={handleValueChange}
              showShortcuts={true}
              primaryColor={'blue'}
            />
          </div>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-auto sm:ml-16 sm:flex-none">
          <Button
            disabled={machinelogs.length == 0}
            variant="primary"
            text="Download Report"
            onClick={() => {
              handlePrint()
            }}
          />
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            {isLoading ? (
              <div className="flex justify-center pt-10">
                <div
                  className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status"
                ></div>
              </div>
            ) : machinelogs.length > 0 && value.startDate && value.endDate ? (
              <div
                id="containerToPrint"
                className="relative overflow-x-auto shadow ring-1 ring-black ring-opacity-5 rounded-lg"
              >
                <table className="relative min-w-full table-fixed divide-y divide-gray-300">
                  {tableHead && (
                    <thead className="bg-gray-50">
                      <tr>
                        {tableHead?.map((item) => (
                          <th
                            key={item.name}
                            rowSpan={item.children ? 1 : 2}
                            colSpan={item.children ? item.children.length : 1}
                            style={{
                              width: `${item.width}`,
                              textAlign: `${item.align}`,
                            }}
                            className={`p-4 text-sm font-semibold text-gray-900 ring-1 ring-black ring-opacity-5 bg-opacity-70 ${
                              item.name == 'Breakdown'
                                ? 'bg-red-100'
                                : item.name == 'Active'
                                ? 'bg-green-100'
                                : 'bg-blue-100'
                            }`}
                          >
                            {item.name}
                          </th>
                        ))}
                      </tr>
                      {tableHead?.some((item) => item.children) && (
                        <tr>
                          {tableHead
                            .filter((item) => item.children)
                            .flatMap((parent) =>
                              parent?.children?.map((child) => (
                                <th
                                  key={`${parent.name}_${child.name}`}
                                  style={{
                                    width: `${child.width}`,
                                    textAlign: 'center',
                                  }}
                                  className={`p-4 text-sm font-semibold text-gray-900 ring-1 ring-black ring-opacity-5 bg-opacity-70 ${
                                    parent.name == 'Breakdown' && 'bg-red-100'
                                  } ${
                                    parent.name == 'Active' && 'bg-green-100'
                                  }`}
                                >
                                  {child.name}
                                </th>
                              ))
                            )}
                        </tr>
                      )}
                    </thead>
                  )}

                  <tbody className="divide-y divide-gray-200 bg-white">
                    {machinelogs.map((row: any, index: number) => (
                      <tr key={index}>
                        <td className="whitespace-nowrap p-4 text-sm text-gray-500 bg-blue-50 bg-opacity-50 ring-1 ring-black ring-opacity-5">
                          {row.machine.name}
                        </td>
                        <td className="whitespace-nowrap p-4 text-sm text-gray-500 text-center bg-red-50 bg-opacity-50 ring-1 ring-black ring-opacity-5">
                          {
                            row.log.broken.createdAt
                              .toLocaleString()
                              .split(',')[0]
                          }
                        </td>
                        <td className="whitespace-nowrap p-4 text-sm text-gray-500 text-center bg-red-50 bg-opacity-50 ring-1 ring-black ring-opacity-5">
                          {row.log.broken.createdAt
                            .toLocaleString()
                            .split(',')[1]
                            .split(':')[0] +
                            ':' +
                            row.log.broken.createdAt
                              .toLocaleString()
                              .split(',')[1]
                              .split(':')[1] +
                            ' ' +
                            row.log.broken.createdAt
                              .toLocaleString()
                              .split(',')[1]
                              .split(' ')[2]}
                        </td>
                        <td className="whitespace-nowrap p-4 text-sm text-gray-500 text-center bg-green-50 bg-opacity-50 ring-1 ring-black ring-opacity-5">
                          {
                            row.log.active.createdAt
                              .toLocaleString()
                              .split(',')[0]
                          }
                        </td>
                        <td className="whitespace-nowrap p-4 text-sm text-gray-500 text-center bg-green-50 bg-opacity-50 ring-1 ring-black ring-opacity-5">
                          {row.log.active.createdAt
                            .toLocaleString()
                            .split(',')[1]
                            .split(':')[0] +
                            ':' +
                            row.log.active.createdAt
                              .toLocaleString()
                              .split(',')[1]
                              .split(':')[1] +
                            ' ' +
                            row.log.active.createdAt
                              .toLocaleString()
                              .split(',')[1]
                              .split(' ')[2]}
                        </td>
                        <td className="whitespace-nowrap p-4 text-sm text-gray-500 bg-blue-50 bg-opacity-50 ring-1 ring-black ring-opacity-5">
                          {calculateDuration(
                            new Date(row.log.broken.createdAt),
                            new Date(row.log.active.createdAt)
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : machinelogs.length == 0 && value.startDate && value.endDate ? (
              <div className="flex justify-center py-40 bg-gray-100 shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                <h5>No data found for the selected Date Range</h5>
              </div>
            ) : (
              <div className="flex justify-center py-40 bg-gray-100 shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                <h5>Select a Date Range to Generate Report</h5>
              </div>
            )}
            {/* <Pagination
                count={count}
                page={page}
                rowsPerPage={rowsPerPage}
                handleRowsPerPage={handleRowsPerPage}
                handlePageChange={handlePageChange}
              /> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingList

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
