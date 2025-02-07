import { colors } from '@/styles/colors'
import { IconTicket } from '@tabler/icons-react-native'
import { Text, View } from 'react-native'
import { s } from './styles'

type CouponProps = {
  code: string
}

export function Coupon({ code }: CouponProps) {
  return (
    <View style={s.container}>
      <Text style={s.title}>Ultilize esse cupom</Text>

      <View style={s.content}>
        <IconTicket size={24} color={colors.green.light} />
        <Text style={s.code}>{code}</Text>
      </View>
    </View>
  )
}
