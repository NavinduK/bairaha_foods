import moment from 'moment'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import GoogleMapReact from 'google-map-react'
import MapModel from './MapModel'

const AttendanceTableRow = ({ row }: any) => {
  const { push } = useRouter()

  const duration = moment.duration(
    moment(row[0].attendanceDateTime).diff(moment(row[1].attendanceDateTime))
  )

  const [open, setOpen] = useState<boolean>(false)
  const [position, setPosition] = useState<any>()

  const handleCloseModel = () => {
    setOpen(false)
    setPosition(null)
  }

  const handleOpenModel = (row: any) => {
    setOpen(true)
    setPosition({ lat: row.latitude, lng: row.longitude })
  }

  return (
    <>
      <tr key={row.id}>
        <td className="whitespace-nowrap p-4 text-sm text-gray-500">
          {moment(row[0].attendanceDateTime).format('dddd')},{' '}
          {moment(row[0].attendanceDateTime).format('MMMM Do YYYY')}
        </td>
        <td className="whitespace-nowrap p-4 text-sm text-gray-500">
          {moment(row[1].attendanceDateTime).format('LT')}{' '}
          <span
            className="ml-2 text-[#3f9944] hover:text-[#24857c cursor-pointer"
            onClick={() => handleOpenModel(row[1])}
          >
            Location
          </span>
        </td>
        <td className="whitespace-nowrap p-4 text-sm text-gray-500">
          {row[0].status === 'PENDING' ? (
            'Work in progress'
          ) : (
            <>
              {moment(row[0].attendanceDateTime).format('LT')}{' '}
              <span
                className="ml-2 text-[#3f9944] hover:text-[#24857c cursor-pointer"
                onClick={() => handleOpenModel(row[0])}
              >
                Location
              </span>
            </>
          )}
        </td>
        <td className="whitespace-nowrap p-4 text-sm text-gray-500">
          {duration.hours() > 0 && duration.hours() + ' h '}
          {duration.minutes() > 0 && duration.minutes() + ' min '}
          {row[0].status === 'PENDING'
            ? '-'
            : duration.hours() <= 0 &&
              duration.minutes() <= 0 &&
              duration.seconds() > 0
            ? duration.seconds() + ' sec'
            : ''}
        </td>
      </tr>
      <MapModel
        handleCloseModel={handleCloseModel}
        open={open}
        position={position}
      />
    </>
  )
}

export default AttendanceTableRow
