import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'

export default function MaintainViewModel(props: any) {
  const { open, setOpen, data } = props
  const date = new Date(data.createdAt)

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => setOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="w-90 relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Booking Details
                    </Dialog.Title>
                    <div className="my-6">
                      <p className="mb-2">
                        Date:{' '}
                        <span className="text-[#3f9944] font-bold">
                          {date.toDateString()} at{' '}
                          {date.toTimeString().slice(0, 5)}
                        </span>
                      </p>
                      <p className="mb-2">
                        Name:{' '}
                        <span className="text-[#3f9944] font-bold">
                          {data.fullName}
                        </span>
                      </p>
                      <p className="mb-2">
                        Contact Number:{' '}
                        <span className="text-[#3f9944] font-bold">
                          {data.contactNumber}
                        </span>
                      </p>
                      <p className="mb-2">
                        Email:{' '}
                        <span className="text-[#3f9944] font-bold">
                          {data.email}
                        </span>
                      </p>
                      <p className="mb-2">
                        Square Feets:{' '}
                        <span className="text-[#3f9944] font-bold">
                          {data.sqFt}
                        </span>
                      </p>
                      <p className="mb-2">
                        House Age:{' '}
                        <span className="text-[#3f9944] font-bold">
                          {data.houseAge}
                        </span>
                      </p>
                      <p className="mb-2">
                        Zip Code:{' '}
                        <span className="text-[#3f9944] font-bold">
                          {data.zipCode}
                        </span>
                      </p>
                      <p className="mb-2">
                        No Of AC Units:{' '}
                        <span className="text-[#3f9944] font-bold">
                          {data.noOfACUnits}
                        </span>
                      </p>
                      <p className="mb-2">
                        Year of last AC cleaning :{' '}
                        <span className="text-[#3f9944] font-bold">
                          {data.lastACCleaning}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                {/* <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setOpen(false)}
                  >
                    Deactivate
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </button>
                </div> */}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
