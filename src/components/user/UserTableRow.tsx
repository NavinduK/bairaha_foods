import React, { useState } from 'react'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/solid'
import { approveUser, getAllUsers, rejectUser } from '../../redux/slices/user'
import { useDispatch } from '../../redux/store'
import { toast } from 'react-toastify'
import Spinner from '../spinner/Spinner'

const UserTableRow = ({ row, handleOpenModel }: any) => {
  const dispatch = useDispatch()
  const [isLoadingLocal, setIsLoadingLoacal] = useState<boolean>(false)

  const approve = () => {
    setIsLoadingLoacal(true)
    dispatch(approveUser(row.id)).then((res) => {
      if (res.message === 'SUCCESS') {
        toast.success('User approved')
        dispatch(getAllUsers())
        setIsLoadingLoacal(false)
      } else toast.error('Error approving user')
    })
  }

  const reject = () => {
    setIsLoadingLoacal(true)
    dispatch(rejectUser(row.id)).then((res) => {
      if (res.message === 'SUCCESS') {
        toast.success('User rejected')
        dispatch(getAllUsers())
        setIsLoadingLoacal(false)
      } else toast.error('Error rejecting user')
    })
  }

  return (
    <tr key={row.id}>
      <td className="whitespace-nowrap p-4 text-sm text-gray-500">
        {row.firstName} {row.lastName}
      </td>
      <td className="whitespace-nowrap p-4 text-sm text-gray-500">
        {row.email}
      </td>
      <td className="whitespace-nowrap p-4 text-sm text-gray-500">
        {row.mobileNumber}
      </td>
      <td className="whitespace-nowrap p-4 text-sm text-gray-500 capitalize">
        {row.role.name.replace('_', ' ').toLowerCase()}
      </td>
      <td className={`relative whitespace-nowrap p-1 text-sm text-center `}>
        {isLoadingLocal ? (
          <span className="w-full justify-center flex">
            <Spinner />
          </span>
        ) : (
          <span
            className={` border rounded-md p-1.5 ${
              row.status === 'ACTIVE'
                ? 'text-green-500 border-green-500'
                : row.status === 'PENDING'
                ? 'text-yellow-500 border-yellow-500'
                : 'text-red-500 border-red-500'
            }`}
          >
            {row.status}
          </span>
        )}
        {!isLoadingLocal &&
          (row.status === 'PENDING' ? (
            <>
              <CheckCircleIcon
                onClick={() => approve()}
                cursor="pointer"
                className="h-5 w-5 absolute ml-0 sm:ml-3 left-20 top-1.5 text-green-500"
              />
              <XCircleIcon
                onClick={() => reject()}
                cursor="pointer"
                className="h-5 w-5 absolute ml-0 sm:ml-3 left-20 bottom-1.5 text-red-500"
              />
            </>
          ) : row.status === 'ACTIVE' ? (
            <XCircleIcon
              onClick={() => reject()}
              cursor="pointer"
              className="h-5 w-5 absolute ml-0 sm:ml-1.5 left-20 top-4 text-red-500"
            />
          ) : row.status === 'INACTIVE' ? (
            <CheckCircleIcon
              onClick={() => approve()}
              cursor="pointer"
              className="h-5 w-5 absolute ml-0 sm:ml-3 left-20 top-4 text-green-500"
            />
          ) : (
            <></>
          ))}
      </td>
      <td className="whitespace-nowrap p-4 text-center text-sm font-medium sm:pr-6">
        <a
          href="#"
          onClick={() => handleOpenModel(row.email)}
          className="hover:text-[#31736D] text-[#3f9944]"
        >
          Reset Password
        </a>
        {/* <KeyIcon cursor='pointer' onClick={() => handleOpenModel(row.email)} className="ml-auto mr-auto h-5 w-5 hover:text-[#31736D] text-[#3f9944]" /> */}
      </td>
    </tr>
  )
}

export default UserTableRow
