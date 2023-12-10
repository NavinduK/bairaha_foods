import React, { useEffect, useState } from 'react'
import { useLoadScript, GoogleMap, MarkerF } from '@react-google-maps/api'
import { useMemo } from 'react'

const Map = ({ location }: any) => {
  const libraries = useMemo(() => ['places'], [])
  const [place, setPlace] = useState<any>()

  useEffect(() => {
    setPlace({
      lat: Number(location.lat),
      lng: Number(location.lng),
    })
  }, [])

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: false,
      clickableIcons: true,
      scrollwheel: false,
    }),
    []
  )

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string,
    libraries: libraries as any,
  })

  if (!isLoaded) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <GoogleMap
        options={mapOptions}
        zoom={15}
        center={place}
        mapTypeId={google.maps.MapTypeId.ROADMAP}
        mapContainerStyle={{ width: '100%', height: '400px' }}
      >
        <MarkerF position={place} />
      </GoogleMap>
    </div>
  )
}

export default Map
