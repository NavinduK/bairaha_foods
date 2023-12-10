import React, { useEffect, useState } from 'react'
import FormProvider from '../hook-form/FormProvider'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import Button from '../button/Button'
import { dispatch } from '../../redux/store'
import { toast } from 'react-toastify'
import { updateHomepageItem } from '../../redux/slices/homepage'
import InputTextarea from '../hook-form/InputTextarea'

type Item = {
  id: number
  section: string
  data: string
}

const CardEditForm = (props: { homeData?: Item; afterUpdated?: any }) => {
  const { homeData, afterUpdated } = props
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    if (homeData) {
      reset({
        data: homeData.data,
      })
    }
  }, [homeData])

  const PricingSchema = Yup.object().shape({
    data: Yup.string()
      .required('This section is required')
      .min(3, 'Must be more than 3'),
  })

  const methods = useForm<Item>({
    resolver: yupResolver(PricingSchema),
  })

  const { handleSubmit, control, reset } = methods

  const onSubmit = async (data: any) => {
    setIsLoading(true)
    if (homeData) {
      const obJ = {
        id: homeData.id,
        section: homeData.section,
        data: data.data,
      }

      dispatch(updateHomepageItem(obJ))
        .then(() => {
          toast.success(`Item successfully updated!`)
          afterUpdated()
        })
        .catch((error) => {
          toast.error('Error updating item')
          afterUpdated()
        })
    }
    setIsLoading(false)
  }

  return (
    <FormProvider
      className="space-y-6"
      methods={methods}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="bg-white px-4 py-5 sm:p-6" style={{ width: '100%' }}>
        <div className="grid grid-cols-6 gap-6">
          {/* <div className="col-span-6 sm:col-span-6">
            <InputText
              type="text"
              label="Title *"
              name="title"
              control={control}
              required
              fullWidth
            />
          </div> */}
          <div className="col-span-6 sm:col-span-6">
            <InputTextarea
              type="text"
              label="Data *"
              name="data"
              control={control}
              required
              fullWidth
            />
          </div>
        </div>
        <div className="flex justify-end mt-5">
          <Button
            variant="primary"
            disabled={isLoading}
            text={isLoading ? 'Saving..' : 'Update'}
            type="submit"
          />
        </div>
      </div>
    </FormProvider>
  )
}

export default CardEditForm
