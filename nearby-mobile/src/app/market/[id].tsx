import { Loading } from '@/components/loading'
import { Cover } from '@/components/market/cover'
import { Details } from '@/components/market/details'
import {
  MarkerModelsView,
  type MarkerProps,
} from '@/view-models/marker-models-view'
import { useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { View } from 'react-native'

export default function Market() {
  const params = useLocalSearchParams<{ id: string }>()

  const [, setMarker] = useState<MarkerProps>({} as MarkerProps)
  const [, setIsLoading] = useState(true)
  const [viewModel] = useState(
    () => new MarkerModelsView(setMarker, setIsLoading)
  )

  useEffect(() => {
    viewModel.fetchMarker(params.id)
  }, [params.id])

  if (viewModel.isLoading) {
    return <Loading />
  }

  return (
    <View style={{ flex: 1 }}>
      <Cover uri={viewModel.marker.cover} />

      <Details data={viewModel.marker} />
    </View>
  )
}
