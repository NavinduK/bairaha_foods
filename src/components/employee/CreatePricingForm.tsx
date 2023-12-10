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

type PricingPackage = {
  id?: number
  name: string
  price: number
  isActive?: boolean
  features: Feature[]
}

type Feature = {
  id?: number
  feature: string
  isActive: boolean
  pricingId?: number
}

const CreatePricingForm = (props: {
  pricingData?: PricingPackage
  afterUpdated?: any
}) => {
  const { pricingData, afterUpdated } = props
  const { push } = useRouter()
  const router = useRouter()
  // const dispatch = useDispatch()
  // const [currentEmployee, setCurrentEmployee] = useState<any>()
  // const { pricings } = useSelector((state) => state.pricing)
  const [features, setFeatures] = useState<Feature[]>([])

  useEffect(() => {
    // if (pricingData) {
    //   dispatch(getEmployeeById(+router.query.update))
    // }
    pricingData
      ? setFeatures(pricingData.features)
      : setFeatures([
          {
            feature: '',
            isActive: true,
          },
        ])
  }, [pricingData])

  useEffect(() => {
    console.log(features)
  }, [features])

  const onFeatureChange = (value: string, index: number) => {
    const prevFeatures = [...features]
    const updatedFeature = { ...prevFeatures[index], feature: value }
    prevFeatures[index] = updatedFeature
    setFeatures(prevFeatures)
  }

  const onFeatureDelete = (index: number) => {
    if (features.length > 1) {
      const prevFeatures = [...features]
      if (prevFeatures[index].id) prevFeatures[index].isActive = false
      else prevFeatures.splice(index, 1)
      setFeatures(prevFeatures)
    }
  }

  useEffect(() => {
    if (pricingData) {
      reset({
        name: pricingData.name,
        price: pricingData.price,
      })
    }
  }, [pricingData])

  const PricingSchema = Yup.object().shape({
    name: Yup.string()
      .required('Package Name is required')
      .matches(
        /^[A-Za-z]+$/,
        'Invalid Name! You can insert only alphabet characters'
      )
      .min(3, 'Must be more than 3 characters!')
      .max(30, 'Must be less than 30 characters!'),
    price: Yup.number()
      .required('Price is required')
      .min(1, 'Must be more than $1'),
  })

  const methods = useForm<PricingPackage>({
    resolver: yupResolver(PricingSchema),
  })

  const { handleSubmit, control, reset } = methods

  const onSubmit = (data: PricingPackage) => {
    if (!pricingData) {
      const obJ = {
        name: data.name,
        price: data.price,
        isActive: true,
        features: features,
      }
      dispatch(createPricing(obJ))
        .then(() => {
          toast.success(`Pricing package successfully created`)
          push('/admin/pricing/list')
        })
        .catch((error) => {
          toast.error('Error creating pricing package')
        })
    } else {
      const obJ = {
        id: pricingData.id,
        name: data.name,
        price: data.price,
        isActive: pricingData.isActive,
        features: features,
      }
      dispatch(updatePricing(obJ))
        .then(() => {
          toast.success(`Pricing package successfully updated`)
          afterUpdated()
        })
        .catch((error) => {
          toast.error('Error updating pricing package')
          afterUpdated()
        })
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
          <div className="col-span-6 sm:col-span-3">
            <InputText
              type="text"
              label="Package Name"
              name="name"
              control={control}
              required
              fullWidth
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <InputText
              type="number"
              label="Price"
              name="price"
              control={control}
              required
              fullWidth
            />
          </div>
          <div className="col-span-6">
            <label className="block text-md font-medium text-gray-700 mb-3">
              Features
            </label>
            {features.map(
              (feature, index) =>
                feature.isActive && (
                  <div className="flex py-2" key={index}>
                    <label className="px-3 py-2">{index + 1}.</label>
                    <textarea
                      required
                      value={feature.feature}
                      onChange={(value) =>
                        onFeatureChange(value.target.value, index)
                      }
                      className="w-full h-10 px-3 py-2 text-sm block appearance-none rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                    />
                    <TrashIcon
                      onClick={() => onFeatureDelete(index)}
                      className={'text-red-500 flex-shrink-0 h-6 w-6 my-2 mx-1'}
                      aria-hidden="true"
                    />
                  </div>
                )
            )}
            <PlusIcon
              onClick={() =>
                setFeatures([
                  ...features,
                  {
                    feature: '',
                    isActive: true,
                    pricingId: pricingData && pricingData.id,
                  },
                ])
              }
              className={
                'bg-[#3f9944] text-white font-black px-2 py-1 flex-shrink-0 h-8 w-10 ml-9 mt-3 rounded-md cursor-pointer'
              }
              aria-hidden="true"
            />
          </div>
        </div>
        <div className="flex justify-end mt-5">
          <Button
            variant="primary"
            text={`${!pricingData ? 'Create' : 'Update'}`}
            type="submit"
          />
        </div>
      </div>
    </FormProvider>
  )
}

export default CreatePricingForm
