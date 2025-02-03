import type { Category as CategoryType } from '@/view-models/home-models-view'
import { FlatList } from 'react-native'
import { Category } from '../category'
import { s } from './styles'

type CategoriesProps = {
  categories: CategoryType[]
  selected: string
  onSelect: (id: string) => void
}

export function Categories({
  categories,
  selected,
  onSelect,
}: CategoriesProps) {
  return (
    <FlatList
      data={categories}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <Category
          iconId={item.id}
          name={item.name}
          onPress={() => onSelect(item.id)}
          isSelected={selected === item.id}
        />
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={s.container}
      contentContainerStyle={s.content}
    />
  )
}
