import { View, Text, SafeAreaView, Image } from 'react-native'
import React from 'react'
import NavOptions from '../components/NavOptions'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { GOOGLE_MAPS_APIKEY } from '@env'
import { useDispatch } from 'react-redux'
import { setDestination, setOrigin } from '../slices/navSlice'
import NavFavourites from '../components/NavFavourites'

const HomeScreen = () => {
  const dispatch = useDispatch()

  return (
    <SafeAreaView className='h-full bg-white'>
      <View className='p-5'>
        <Image
          source={{ uri: 'https://links.papareact.com/gzs' }}
          style={{ width: 100, height: 100, resizeMode: 'contain' }}
        />

        <GooglePlacesAutocomplete
          placeholder='Where From?'
          nearbyPlacesAPI='GooglePlacesSearch'
          debounce={400}
          styles={{
            container: {
              flex: 0
            },
            textInput: {
              fontSize: 18
            }
          }}
          onPress={(data, details = null) => {
            dispatch(
              setOrigin({
                location: details.geometry.location,
                description: data.description
              })
            )

            dispatch(setDestination(null))
          }}
          fetchDetails={true}
          enablePoweredByContainer={false}
          minLength={2}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: 'en'
          }}
          returnKeyType={'search'}
        />

        <NavOptions />

        <NavFavourites />
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen
