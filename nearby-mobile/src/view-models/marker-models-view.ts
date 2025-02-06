import type { DetailsProps } from '@/components/market/details'
import { api } from '@/services/api'
import { Alert } from 'react-native'

export interface MarkerProps extends DetailsProps {
  cover: string
}

export class MarkerModelsView {
  private _marker: MarkerProps = {} as MarkerProps
  private _setMarker: (marker: MarkerProps) => void

  private _isLoading = false
  private _setIsLoading: (isLoading: boolean) => void

  constructor(
    setMarker: (marker: MarkerProps) => void,
    setIsLoading: (isLoading: boolean) => void
  ) {
    this._setMarker = setMarker
    this._setIsLoading = setIsLoading
  }

  get marker(): MarkerProps {
    return this._marker
  }

  get isLoading(): boolean {
    return this._isLoading
  }

  setMarker(marker: MarkerProps) {
    this._marker = marker
    this._setMarker(marker)
  }

  fetchMarker = async (id: string): Promise<void> => {
    try {
      this._setIsLoading(true)
      const { data } = await api.get<MarkerProps>(`/markets/${id}`)

      this._marker = data
      this._setMarker(data)
    } catch (error) {
      console.error('Erro ao buscar local:', error)
      Alert.alert(
        'Erro',
        'Não foi possível buscar as informações do local. Tente novamente mais tarde.'
      )
    } finally {
      this._setIsLoading(false)
    }
  }
}
