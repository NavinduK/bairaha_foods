import React, { useEffect, useState } from 'react'
import FormProvider from '../hook-form/FormProvider'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import Button from '../button/Button'
import InputText from '../hook-form/InputText'
import { dispatch } from '../../redux/store'
import { createPricing, updatePricing } from '../../redux/slices/pricing'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { TrashIcon, PlusIcon } from '@heroicons/react/outline'
import { updateImage, updateSlider } from '../../redux/slices/slider'

type Slider = {
  id: number
  title: string
  subtitle: string
  image: FileList
}

const CardEditForm = (props: { sliderData?: Slider; afterUpdated?: any }) => {
  const { sliderData, afterUpdated } = props
  const [image, setImage] = useState<any>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    if (sliderData) {
      reset({
        title: sliderData.title,
        subtitle: sliderData.subtitle,
      })
    }
  }, [sliderData])

  const PricingSchema = Yup.object().shape({
    title: Yup.string()
      .required('Slider title is required')
      .min(5, 'Must be more than 5 characters!'),
    // .max(30, 'Must be less than 30 characters!'),
    subtitle: Yup.string()
      .required('Slider subtitle is required')
      .min(5, 'Must be more than 5'),
  })

  const methods = useForm<Slider>({
    resolver: yupResolver(PricingSchema),
  })

  const { handleSubmit, control, reset } = methods

  const onSubmit = async (data: any) => {
    setIsLoading(true)
    try {
      let imageName = ''
      if (sliderData) {
        if (image) {
          const imageFile = new FormData()
          imageFile.append('image', image)
          const res = await dispatch(updateImage(imageFile))
          const url = res.data.data.split('/')
          imageName = url[url.length - 1]
        }

        const obJ = {
          id: sliderData.id,
          title: data.title,
          subtitle: data.subtitle,
          image: image && imageName ? imageName : sliderData.image,
        }

        dispatch(updateSlider(obJ, sliderData.id)).then(() => {
          toast.success(`Slider successfully updated`)
          afterUpdated()
        })
      }
      setIsLoading(false)
    } catch (e) {
      console.log(e)
      setIsLoading(false)
      toast.error('Error updating slider')
      afterUpdated()
    }
  }

  return (
    <FormProvider
      className="space-y-6"
      methods={methods}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="bg-white px-4 py-5 sm:p-6">
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-6 sm:col-span-6">
            <InputText
              type="text"
              label="Title *"
              name="title"
              control={control}
              required
              fullWidth
            />
          </div>
          <div className="col-span-6 sm:col-span-6">
            <InputText
              type="text"
              label="Subtitle *"
              name="subtitle"
              control={control}
              required
              fullWidth
            />
          </div>
          <div className="col-span-6 sm:col-span-6">
            <label
              htmlFor={image}
              className="block text-md font-medium text-gray-700 mb-2"
            >
              Change image
            </label>
            <input
              type="file"
              name="image"
              accept=".jpg, .jpeg, .png"
              onChange={(e) => e.target.files && setImage(e.target.files[0])}
            />
          </div>
        </div>
        <div className="flex justify-end mt-5">
          <Button
            disabled={isLoading}
            text={isLoading ? 'Saving..' : 'Update'}
            variant="primary"
            type="submit"
          />
        </div>
      </div>
    </FormProvider>
  )
}

export default CardEditForm
