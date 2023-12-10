import React, { useEffect } from 'react'
import { TableHead } from '../../types/table'
import Pagination from '../table/Pagination'
import TableComponent from '../table/TableComponent'
import { useDispatch, useSelector } from '../../redux/store'
import useTable from '../table/useTable'
import BookingTableRow from './ContactUsTableRow'
import { getAllContactUs } from '../../redux/slices/contactus'

const tableHead: TableHead[] = [
  { name: 'Date', width: '10%', align: 'left' },
  { name: 'Full Name', width: '20%', align: 'left' },
  { name: 'Emial', width: '20%', align: 'left' },
  { name: 'Message', width: '40%', align: 'left' },
  { name: 'Action', width: '10%', align: 'center' },
]

const ContactUsList = () => {
  const { page, rowsPerPage, handlePageChange, handleRowsPerPage } = useTable()
  const { contactus, count } = useSelector((state) => state.contactus)
  // const [filterStatus, setFilterStatus] = useState<string>('ALL')
  const dispatch = useDispatch()

  useEffect(() => {
    fetchData()
  }, [page, rowsPerPage])

  // useEffect(() => {
  //   console.log(bookings)
  // }, [bookings])

  const fetchData = () => {
    dispatch(getAllContactUs(page - 1, rowsPerPage))
  }

  // const searchSchema = Yup.object().shape({
  //   query: Yup.string()
  //     .min(3, 'Must be more than 3 characters')
  //     .required('Search keyword is required'),
  // })

  // const dataFiltered = applyFilter({
  //   inputData: pricings,
  //   filterStatus,
  // })

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        {/* <div className="flex-auto">
          <div className="sm:flex">
            <TabsComponent
              onChange={handleFilterStatus}
              tabs={tabsStatus}
              currentTab={filterStatus}
            />
          </div>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Button
            variant="primary"
            text="Create Package"
            onClick={() => push('/admin/pricing/create')}
          />
        </div> */}
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="relative overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <TableComponent template={tableHead}>
                {contactus &&
                  contactus.length &&
                  contactus.map((item: any) => (
                    <BookingTableRow key={item.id} row={item} />
                  ))}
              </TableComponent>
              <Pagination
                count={count}
                page={page}
                rowsPerPage={rowsPerPage}
                handleRowsPerPage={handleRowsPerPage}
                handlePageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactUsList

function applyFilter({
  inputData,
  filterStatus,
}: {
  inputData: any[]
  filterStatus: any
}) {
  if (filterStatus !== 'ALL') {
    const status = filterStatus == 'ACTIVE' ? true : false
    inputData = inputData.filter((item) => item.isActive === status)
  }

  return inputData
}
