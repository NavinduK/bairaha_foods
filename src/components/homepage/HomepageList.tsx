import React, { useEffect } from 'react'
import { getAllHomepageData } from '../../redux/slices/homepage'
import CardComponent from './CardComponent'
import { useDispatch, useSelector } from '../../redux/store'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

const HomepageList = () => {
  const { homepage } = useSelector((state) => state.homepage)
  const dispatch = useDispatch()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    dispatch(getAllHomepageData())
  }

  useEffect(() => {
    console.log(homepage)
  }, [homepage])

  const sliderSchema = Yup.object().shape({
    title: Yup.string()
      .min(5, 'Must be more than 5 characters')
      .required('Title is required!'),
    subtitle: Yup.string()
      .min(5, 'Must be more than 5 characters')
      .required('Title is required!'),
  })

  const methods = useForm({
    resolver: yupResolver(sliderSchema),
  })

  const { handleSubmit, register, reset } = methods

  // const onSubmit = async (data: any) => {
  //   handleRowsPerPage(5)
  //   handlePageChange(1)
  //   setSearchedEmployees([])
  //   setIsSearched(true)
  //   await dispatch(searchEmployee(data.query)).then((res) => {
  //     setSearchedEmployees(res)
  //   })
  // }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="relative block gap-2">
              {homepage && homepage.length ? (
                homepage.map((item: any) => (
                  <CardComponent
                    key={item.id}
                    row={item}
                    fetchData={fetchData}
                  />
                ))
              ) : (
                <h2  className="text-[#3f9944]">No Data</h2>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomepageList
