import React, { useState } from 'react'
import CardViewModel from './CardViewModel'
import { dispatch } from '../../redux/store'
import { updatePricing } from '../../redux/slices/pricing'
import { toast } from 'react-toastify'
import CardEditModel from './CardEditModel'

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL

const CardComponent = ({ row, fetchData }: any) => {
  const [openView, setOpenView] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)

  const afterUpdated = () => {
    fetchData()
    setOpenEdit(false)
  }

  return (
    <div>
      <div className="rounded overflow-hidden shadow-md mt-4 ml-3">
        <img
          className="h-48 w-96 object-cover"
          src={`${NEXT_PUBLIC_API_URL}image/${row?.image}`}
          alt="Sunset in the mountains"
        />

        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{row?.title}</div>
          <p className="text-gray-700 text-base">{row?.subtitle}</p>
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

      <CardViewModel open={openView} setOpen={setOpenView} data={row} />
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
