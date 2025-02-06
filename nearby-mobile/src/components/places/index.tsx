import type { PlaceProps } from '@/view-models/home-models-view'
import { Text, useWindowDimensions } from 'react-native'

import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import { useRouter } from 'expo-router'
import { useRef } from 'react'
import { Place } from '../place'
import { s } from './styles'

interface Props {
  data: PlaceProps[]
}

export function Places({ data }: Props) {
  const dimensions = useWindowDimensions()
  const router = useRouter()

  const bottomSheetRef = useRef<BottomSheet>(null)

  const snapPoints = {
    min: 278,
    max: dimensions.height - 140,
  }

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={[snapPoints.min, snapPoints.max]}
      handleIndicatorStyle={s.indicator}
      backgroundStyle={s.container}
      enableOverDrag={false}
    >
      <BottomSheetFlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Place
            data={item}
            onPress={() => router.push(`/market/${item.id}`)}
          />
        )}
        contentContainerStyle={s.content}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <Text style={s.title}>Explore locais perto de você</Text>
        )}
      />
    </BottomSheet>
  )
}
