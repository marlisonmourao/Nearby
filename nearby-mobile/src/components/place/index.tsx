import { colors } from '@/styles/colors'
import type { PlaceProps } from '@/view-models/home-models-view'
import { IconTicket } from '@tabler/icons-react-native'
import {
  Image,
  Text,
  TouchableOpacity,
  type TouchableOpacityProps,
  View,
} from 'react-native'
import { s } from './styles'

type Props = TouchableOpacityProps & {
  data: PlaceProps
}

export function Place({ data, ...props }: Props) {
  return (
    <TouchableOpacity style={s.container} {...props}>
      <Image style={s.image} source={{ uri: data.cover }} />

      <View style={s.content}>
        <Text style={s.name}>{data.name}</Text>
        <Text style={s.description} numberOfLines={2}>
          {data.description}
        </Text>

        <View style={s.footer}>
          <IconTicket size={16} color={colors.red.base} />
          <Text style={s.tickets}> {data.coupons} coupons disponíveis</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}
