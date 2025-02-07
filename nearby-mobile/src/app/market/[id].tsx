import { Loading } from '@/components/loading'
import { Coupon } from '@/components/market/coupon'
import { Cover } from '@/components/market/cover'
import { Details } from '@/components/market/details'
import {
  MarkerModelsView,
  type MarkerProps,
} from '@/view-models/marker-models-view'
import { useLocalSearchParams } from 'expo-router'
import { useEffect, useRef, useState } from 'react'
import { Alert, Modal, ScrollView, StatusBar, View } from 'react-native'

import { CameraView, useCameraPermissions } from 'expo-camera'

import { Button } from '@/components/button'
import { api } from '@/services/api'

export default function Market() {
  const params = useLocalSearchParams<{ id: string }>()
  const [coupon, setCoupon] = useState<string | null>(null)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const [couponIsFetching, setCouponIsFetching] = useState(false)

  const [, setMarker] = useState<MarkerProps>({} as MarkerProps)
  const [, setIsLoading] = useState(true)
  const [viewModel] = useState(
    () => new MarkerModelsView(setMarker, setIsLoading)
  )

  const [, requestPermission] = useCameraPermissions()

  const qrLock = useRef(false)

  async function handleOpenModal() {
    try {
      const { granted } = await requestPermission()

      if (!granted) {
        return Alert.alert('Câmera', 'Você precisa permitir o uso da câmera')
      }

      qrLock.current = false

      setIsModalVisible(true)
    } catch (error) {
      Alert.alert('Erro', 'Erro ao solicitar permissão de câmera')
    }
  }

  async function getCoupon(id: string) {
    try {
      setCouponIsFetching(true)

      const { data } = await api.patch(`/coupons/${id}`)

      Alert.alert('Cupom', data.coupon)
      setCoupon(data.coupon)
    } catch (error) {
      Alert.alert('Erro', 'Erro ao buscar cupom')
      console.log(error)
    } finally {
      setCouponIsFetching(false)
    }
  }

  function handleCloseModal() {
    setIsModalVisible(false)
  }

  function handleUserCoupon(id: string) {
    setIsModalVisible(false)

    Alert.alert(
      'Cupom',
      'Não é possível reutilizar um cupon resgatado. Deseja realmente resgatar o cupom ?',
      [
        {
          style: 'cancel',
          text: 'Cancelar',
        },
        {
          style: 'destructive',
          text: 'Sim',
          onPress: () => getCoupon(id),
        },
      ]
    )
  }

  useEffect(() => {
    viewModel.fetchMarker(params.id)
  }, [params.id, coupon])

  if (viewModel.isLoading) {
    return <Loading />
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" hidden={isModalVisible} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Cover uri={viewModel.marker.cover} />
        <Details data={viewModel.marker} />
        {coupon && <Coupon code={coupon} />}
      </ScrollView>

      <View style={{ padding: 32 }}>
        <Button onPress={handleOpenModal}>
          <Button.Title>Ler QR Code</Button.Title>
        </Button>
      </View>

      <Modal style={{ flex: 1 }} visible={isModalVisible}>
        <CameraView
          style={{ flex: 1 }}
          facing="back"
          onBarcodeScanned={({ data }) => {
            if (data && !qrLock.current) {
              qrLock.current = true

              setTimeout(() => {
                console.log(data)
              }, 500)

              handleUserCoupon(data)
            }
          }}
        />

        <View style={{ position: 'absolute', bottom: 0, left: 32, right: 32 }}>
          <Button onPress={handleCloseModal} isLoading={couponIsFetching}>
            <Button.Title>Voltar</Button.Title>
          </Button>
        </View>
      </Modal>
    </View>
  )
}
