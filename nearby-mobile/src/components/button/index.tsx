import { colors } from '@/styles/theme'
import type { IconProps as IconTablerProps } from '@tabler/icons-react-native'
import {
  ActivityIndicator,
  Text,
  type TextProps,
  TouchableOpacity,
  type TouchableOpacityProps,
} from 'react-native'
import { s } from './styles'

type ButtonProps = TouchableOpacityProps & {
  children: React.ReactNode
  isLoading?: boolean
}

function Button({ children, style, isLoading = false, ...props }: ButtonProps) {
  return (
    <TouchableOpacity
      style={[s.container, style]}
      activeOpacity={0.8}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={colors.gray[100]} />
      ) : (
        children
      )}
    </TouchableOpacity>
  )
}

function Title({ children, ...props }: TextProps) {
  return (
    <Text style={s.title} {...props}>
      {children}
    </Text>
  )
}

type IconProps = IconTablerProps & {
  icon: React.ComponentType<IconTablerProps>
}

function Icon({ icon: Icon }: IconProps) {
  return <Icon size={24} color={colors.gray[100]} />
}

Button.Title = Title
Button.Icon = Icon

export { Button }
