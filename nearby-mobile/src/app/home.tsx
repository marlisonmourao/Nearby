import { Categories } from '@/components/categories'
import { Places } from '@/components/places'
import {
  type Category,
  HomeViewModel,
  type PlaceProps,
} from '@/view-models/home-models-view'
import { useEffect, useState } from 'react'
import { View } from 'react-native'

export default function Home() {
  const [, setCategories] = useState<Category[]>([])
  const [, setSelectedCategory] = useState<string>('')
  const [, setMarkets] = useState<PlaceProps[]>([])

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
      <Categories
        categories={viewModel.categories}
        onSelect={value => viewModel.setSelectedCategory(value)}
        selected={viewModel.selectedCategory}
      />

      <Places data={viewModel.markets} />
    </View>
  )
}
