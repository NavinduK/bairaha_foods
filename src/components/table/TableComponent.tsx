import React from 'react'
import { TableHead } from '../../types/table'

type Props = {
  template: TableHead[]
  children: React.ReactNode
}

const TableComponent = (props: Props) => {
  return (
    <table className="relative min-w-full table-fixed divide-y divide-gray-300">
      {props.template.length && (
        <thead className="bg-gray-50">
          <tr>
            {props.template?.map((item) => (
              <th
                key={item.name}
                scope="col"
                style={{ width: `${item.width}`, textAlign: `${item.align}` }}
                className={`p-4 text-sm font-semibold text-gray-900`}
              >
                {item.name}
              </th>
            ))}
          </tr>
        </thead>
      )}

      <tbody className="divide-y divide-gray-200 bg-white">
        {props.children}
      </tbody>
    </table>
  )
}

export default TableComponent
