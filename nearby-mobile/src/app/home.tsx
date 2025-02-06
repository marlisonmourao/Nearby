import { Categories } from '@/components/categories'

import { Places } from '@/components/places'
import {
  type Category,
  HomeViewModel,
  type PlaceProps,
} from '@/view-models/home-models-view'
import { useEffect, useState } from 'react'
import { StatusBar, Text, View } from 'react-native'
import MapView, { Callout, Marker } from 'react-native-maps'

import { colors, fontFamily } from '@/styles/theme'
import { useRouter } from 'expo-router'

const currentLocation = {
  latitude: -23.561187293883442,
  longitude: -46.656451388116494,
}

export default function Home() {
  const [, setCategories] = useState<Category[]>([])
  const [, setSelectedCategory] = useState<string>('')
  const [, setMarkets] = useState<PlaceProps[]>([])

  const router = useRouter()

  const [viewModel] = useState(
    () => new HomeViewModel(setCategories, setSelectedCategory, setMarkets)
  )

  useEffect(() => {
    viewModel.fetchCategories()
  }, [viewModel])

  useEffect(() => {
    viewModel.fetchMarkets()
  }, [viewModel.selectedCategory])

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <Categories
        categories={viewModel.categories}
        onSelect={value => viewModel.setSelectedCategory(value)}
        selected={viewModel.selectedCategory}
      />

      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >
        <Marker
          identifier="current"
          coordinate={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
          }}
          image={require('@/assets/location.png')}
        />
        {viewModel.markets.map(market => (
          <Marker
            key={market.id}
            identifier={market.id}
            coordinate={{
              latitude: market.latitude,
              longitude: market.longitude,
            }}
            image={require('@/assets/pin.png')}
          >
            <Callout onPress={() => router.navigate(`/market/${market.id}`)}>
              <View>
                <Text
                  style={{
                    fontSize: 14,
                    color: colors.gray[600],
                    fontFamily: fontFamily.medium,
                  }}
                >
                  {market.name}
                </Text>

                <Text
                  style={{
                    fontSize: 12,
                    color: colors.gray[600],
                    fontFamily: fontFamily.regular,
                  }}
                >
                  {market.address}
                </Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <Places data={viewModel.markets} />
    </View>
  )
}
