import { colors } from '@/styles/theme'
import { ActivityIndicator } from 'react-native'
import { s } from './styles'

export function Loading() {
  return <ActivityIndicator style={s.container} color={colors.green.base} />
}
