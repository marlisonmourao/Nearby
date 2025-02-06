import { Button } from '@/components/button'
import { IconArrowLeft } from '@tabler/icons-react-native'
import { useRouter } from 'expo-router'
import { ImageBackground, View } from 'react-native'
import { s } from './styles'

type CoverProps = {
  uri: string
}

export function Cover({ uri }: CoverProps) {
  const router = useRouter()

  return (
    <ImageBackground source={{ uri }} style={s.container}>
      <View style={s.header}>
        <Button style={{ height: 40, width: 40 }} onPress={() => router.back()}>
          <Button.Icon icon={IconArrowLeft} />
        </Button>
      </View>
    </ImageBackground>
  )
}
