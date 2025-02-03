import { api } from '@/services/api'
import { Alert } from 'react-native'

export type Category = {
  id: string
  name: string
}

export type PlaceProps = {
  id: string
  name: string
  description: string
  coupons: number
  cover: string
  address: number
}

export class HomeViewModel {
  private _categories: Category[] = []
  private _setCategories: (categories: Category[]) => void

  private _selectedCategory = ''
  private _setSelectedCategory: (category: string) => void

  private _markets: PlaceProps[] = []
  private _setMarkets: (markets: PlaceProps[]) => void

  constructor(
    setCategories: (categories: Category[]) => void,
    setSelectedCategory: (category: string) => void,
    setMarkets: (markets: PlaceProps[]) => void
  ) {
    this._setCategories = setCategories
    this._setSelectedCategory = setSelectedCategory
    this._setMarkets = setMarkets
  }

  get categories(): Category[] {
    return this._categories
  }

  get selectedCategory(): string {
    return this._selectedCategory
  }

  setSelectedCategory(category: string) {
    this._selectedCategory = category
    this._setSelectedCategory(category)
  }

  get markets(): PlaceProps[] {
    return this._markets
  }

  setMarkets(markets: PlaceProps[]) {
    this._markets = markets
    this._setMarkets(markets)
  }

  fetchCategories = async () => {
    try {
      const { data } = await api.get('/categories')

      this._categories = data
      this._setCategories(data)

      this._selectedCategory = data[0].id
      this._setSelectedCategory(data[0].id)
    } catch (error) {
      console.log(error)
      Alert.alert('Categorias', 'Não foi possível carregar as categorias')
    }
  }

  fetchMarkets = async () => {
    try {
      if (!this._selectedCategory) return

      const { data } = await api.get(
        `/markets/category/${this._selectedCategory}`
      )

      this._markets = data
      this._setMarkets(data)
    } catch (error) {
      console.log(error)
      Alert.alert('Locais', 'Não foi possível carregar os locais')
    }
  }
}
