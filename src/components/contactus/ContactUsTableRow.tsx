import React, { useState } from 'react'
import ContactUsViewModel from './ContactUsViewModel'

const ContactUsTableRow = ({ row }: any) => {
  const [openView, setOpenView] = useState(false)
  const date = new Date(row.createdAt)
  return (
    <>
      <tr key={row.id}>
      <td className="whitespace-nowrap p-4 text-sm text-gray-500">
          {date.toLocaleDateString()} at {date.toTimeString().slice(0,5)}
        </td>
        <td className="whitespace-nowrap p-4 text-sm text-gray-500">
          {row.name}
        </td>
        <td className="whitespace-nowrap p-4 text-sm text-gray-500">
          {row.email}
        </td>
        <td className="whitespace-nowrap p-4 text-sm text-gray-500">
          {row.message}
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
        </td>
      </tr>
      <ContactUsViewModel open={openView} setOpen={setOpenView} data={row} />

    </>
  )
}

export default ContactUsTableRow
