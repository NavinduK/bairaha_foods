import React, { useState } from 'react'
import CardEditModel from './CardEditModel'

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL

const CardComponent = ({ row, fetchData }: any) => {
  const [openEdit, setOpenEdit] = useState(false)

  const afterUpdated = () => {
    fetchData()
    setOpenEdit(false)
  }

  return (
    <div>
      <div className="rounded overflow-hidden shadow-md mt-4 ml-3 block sm:flex">
        <div className="flex flex-shrink-0 justify-center pt-5 pb-0 sm:pl-4 sm:pr-0 sm:py-4">
          <img
            className="w-20 h-20 object-cover rounded-full"
            src={
              row?.image && row?.image != ' '
                ? `${NEXT_PUBLIC_API_URL}image/${row?.image}`
                : 'https://cdn-icons-png.flaticon.com/512/6596/6596121.png'
            }
            alt="Sunset in the mountains"
          />
        </div>
        <div className="flex-grow text-center sm:text-left">
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{row?.name}</div>
            <p className="text-gray-700 text-base">{row?.feeback}</p>
          </div>
          <div className="px-6 pb-4 text-right">
            <a
              href="#"
              className="hover:text-[#31736D] text-[#3f9944] mr-3"
              onClick={() => {
                setOpenEdit(true)
              }}
            >
              Edit
            </a>
          </div>
        </div>
      </div>

      <CardEditModel
        open={openEdit}
        setOpen={setOpenEdit}
        data={row}
        afterUpdated={afterUpdated}
      />
    </div>
  )
}

export default CardComponent
