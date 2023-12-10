import React, { useState } from 'react'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
} from '@heroicons/react/solid'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'

type Props = {
  count: number
  page: number
  rowsPerPage: number
  handleRowsPerPage: (rows: number) => void
  handlePageChange: (page: number) => void
}

const RowsPerPageDropdown = ({
  value,
  onChange,
}: {
  value: number
  onChange: (value: number) => void
}) => {
  const options = [5, 10, 25, 50]

  return (
    <Menu as="div" className="inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          {value}
          <ChevronUpIcon
            className="-mr-1 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="bottom-14 absolute z-10 w-100 origin-top-right rounded-md bg-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {options.map((option) => (
              <Menu.Item key={option}>
                {({ active }) => (
                  <a
                    href="#"
                    className={`${
                      active ? 'bg-gray-200 text-gray-900' : 'text-gray-700'
                    } block px-5 py-2 text-sm`}
                    onClick={() => onChange(option)}
                  >
                    {option}
                  </a>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

const Pagination = (props: Props) => {
  const totalPages = Math.ceil(props.count / props.rowsPerPage)
  const currentPage = props.page
  const pageNumbers = []
  const [rowsPerPage, setRowsPerPage] = useState(props.rowsPerPage)

  const handleRowsPerPageChange = (rows: number) => {
    setRowsPerPage(rows)
    props.handleRowsPerPage(rows)
  }

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }

  const handleClickPage = (page: number) => {
    props.handlePageChange(page)
  }

  const handleClickPrevious = () => {
    if (currentPage > 1) {
      props.handlePageChange(currentPage - 1)
    }
  }

  const handleClickNext = () => {
    if (currentPage < totalPages) {
      props.handlePageChange(currentPage + 1)
    }
  }

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 items-center justify-between">
        <div className="flex items-center">
          <RowsPerPageDropdown
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
          />
          <p className="ml-3 text-sm text-gray-700">Rows per page</p>
        </div>
        <div>
          <p className="text-sm text-gray-700">
            Showing
            <span className="font-medium">
              {' '}
              {(currentPage - 1) * props.rowsPerPage + 1}{' '}
            </span>
            to
            <span className="font-medium">
              {' '}
              {props.count < props.rowsPerPage
                ? props.count
                : (currentPage - 1) * props.rowsPerPage +
                  props.rowsPerPage}{' '}
            </span>
            of
            <span className="font-medium"> {props.count} </span> results
          </p>
        </div>

        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <a
              href="#"
              onClick={handleClickPrevious}
              className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                currentPage === 1 ? 'opacity-50 cursor-default' : ''
              }`}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>
            {pageNumbers.map((page) => (
              <a
                key={page}
                href="#"
                onClick={() => handleClickPage(page)}
                aria-current={page === currentPage ? 'page' : undefined}
                className={`relative z-10 inline-flex items-center ${
                  page === currentPage
                    ? 'bg-[#3f9944] text-white font-semibold'
                    : 'text-gray-900 font-semibold hover:bg-gray-50 ring-1 ring-inset ring-gray-300'
                } px-4 py-2 focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3f9944]`}
              >
                {page}
              </a>
            ))}
            <a
              href="#"
              onClick={handleClickNext}
              className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ${
                currentPage >= totalPages ? 'opacity-50 cursor-default' : ''
              }`}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Pagination
