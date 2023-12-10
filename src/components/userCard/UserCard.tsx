import React from 'react'
import { useAuthContext } from '../../auth/useAuthContext'
import { useSelector } from '../../redux/store'
import Spinner from '../spinner/Spinner'
import CountDownTimer from './StopWatch'

type Props = {
  onCheckinCheckout: () => void
  isCheckedIn: boolean
}

const UserCard = ({ onCheckinCheckout, isCheckedIn }: Props) => {
  const { user } = useAuthContext()
  const { isLoading, attendance } = useSelector((state) => state.attendance)

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow">
      <div
        className="flex flex-col items-center py-10"
        style={{ minHeight: '424px' }}
      >
        <img className="w-48 h-3/6" src="/svg/checkin.svg" alt="Bonnie image" />
        <div className="mt-6 flex flex-col items-center h-full w-full">
          {isLoading ? (
            <div className="mt-20">
              <Spinner />
            </div>
          ) : (
            <>
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-black">
                {user?.firstName + ' ' + user?.lastName}
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {user?.role.name}
              </span>
              {user?.employee && (
                <>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {user?.employee.address}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {user?.employee.nic}
                  </span>
                </>
              )}
              {isCheckedIn && attendance && (
                <CountDownTimer
                  isCheckedIn={isCheckedIn}
                  checkedInTime={
                    attendance ? attendance[1]?.attendanceDateTime : 0
                  }
                />
              )}
              <div className="flex mt-5 space-x-3 w-full px-7 items-center justify-center">
                <button
                  onClick={() => onCheckinCheckout()}
                  className={`w-full sm:w-2/3 inline-flex items-center px-4 py-2 text-sm font-medium text-center justify-center text-white ${
                    isCheckedIn
                      ? 'bg-red-500 hover:bg-red-600'
                      : 'bg-[#3f9944] hover:bg-[#31736D]'
                  } rounded-lg focus:outline-none`}
                >
                  {isCheckedIn ? 'Check Out' : 'Check In'}
                </button>
              </div>
            </>
          )}
          {attendance && attendance.length && !isCheckedIn ? (
            <div className="text-sm sm:text-xs text-center text-gray-400 mx-0 w-full px-7 sm:px-14 mt-4">
              <p className="mb-1">Last Shift</p>
              <p className="rounded-lg border border-gray-300 p-2">
                Checked In at{' '}
                {
                  new Date(
                    attendance.filter(
                      (item) => item.direction === 'CHECKIN'
                    )[0].attendanceDateTime
                  )
                    .toLocaleString()
                    .split(',')[1]
                }{' '}
                on{' '}
                {
                  new Date(
                    attendance.filter(
                      (item) => item.direction === 'CHECKIN'
                    )[0].attendanceDateTime
                  )
                    .toLocaleString()
                    .split(',')[0]
                }
                <br /> Checked Out at{' '}
                {
                  new Date(
                    attendance.filter(
                      (item) => item.direction === 'CHECKOUT'
                    )[0].attendanceDateTime
                  )
                    .toLocaleString()
                    .split(',')[1]
                }{' '}
                on{' '}
                {
                  new Date(
                    attendance.filter(
                      (item) => item.direction === 'CHECKOUT'
                    )[0].attendanceDateTime
                  )
                    .toLocaleString()
                    .split(',')[0]
                }
              </p>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserCard
