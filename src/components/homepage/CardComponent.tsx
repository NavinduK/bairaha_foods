import React, { useState } from 'react'
import { dispatch } from '../../redux/store'
import { updatePricing } from '../../redux/slices/pricing'
import { toast } from 'react-toastify'
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
      <div className="rounded overflow-hidden shadow-md mt-4 ml-3">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{row?.section}</div>
          <p className="text-gray-700 text-base">{row?.data}</p>
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
