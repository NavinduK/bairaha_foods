import { useRouter } from 'next/router'
import React, { useState } from 'react'
import PackageViewModel from './PackageViewModel'
import PackageEditModel from './PackageEditModel'
import { dispatch } from '../../redux/store'
import { updatePricing } from '../../redux/slices/pricing'
import { toast } from 'react-toastify'

const PricingTableRow = ({ row, fetchData }: any) => {
  const [openView, setOpenView] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)

  const afterUpdated = () => {
    fetchData()
    setOpenEdit(false)
  }

  return (
    <>
      <tr key={row.id}>
        <td className="whitespace-nowrap p-4 text-sm text-gray-500">
          {row.name}
        </td>
        <td className="whitespace-nowrap p-4 text-sm text-gray-500">
          {row.price}
        </td>
        <td className="whitespace-nowrap p-4 text-sm text-gray-500">
          {row.features.length}
        </td>
        <td className="whitespace-nowrap p-4 text-sm text-gray-500">
          {row.isActive ? 'Active' : 'Inactive'}
        </td>
        <td className="whitespace-nowrap p-4 text-center text-sm font-medium sm:pr-6">
          <a
            href="#"
            className="hover:text-[#31736D] text-[#3f9944] mr-3"
            onClick={() => {
              setOpenView(true)
            }}
          >
            View
          </a>
          <a
            href="#"
            className="hover:text-[#31736D] text-[#3f9944] mr-3"
            onClick={() => {
              setOpenEdit(true)
            }}
          >
            Edit
          </a>
          <a
            href="#"
            className="hover:text-[#31736D] text-[#3f9944]"
            onClick={() => {
              const obJ = {
                id: row.id,
                name: row.name,
                price: row.price,
                isActive: row.isActive ? false : true,
                features: [],
              }
              dispatch(updatePricing(obJ))
                .then(() => {
                  toast.success(
                    `Package ${row.isActive ? 'Unarchived!' : 'Archived!'}!`
                  )
                  afterUpdated()
                })
                .catch((error) => {
                  toast.error('Something went wrong!')
                  afterUpdated()
                })
            }}
          >
            {row.isActive ? 'Unarchive' : 'Archive'}
          </a>
        </td>
      </tr>
      <PackageViewModel open={openView} setOpen={setOpenView} data={row} />
      <PackageEditModel
        open={openEdit}
        setOpen={setOpenEdit}
        data={row}
        afterUpdated={afterUpdated}
      />
    </>
  )
}

export default PricingTableRow
