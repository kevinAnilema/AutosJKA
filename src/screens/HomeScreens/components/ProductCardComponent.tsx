import React from 'react'
import { View } from 'react-native'
import { Divider, IconButton, Text } from 'react-native-paper'
import { styles } from '../../../theme/styles'
import { Auto } from '../HomeScreen'
import { CommonActions, useNavigation } from '@react-navigation/native'
//Interfaz de Props
interface Props{
  auto:Auto;
}
export const ProductCardComponent = ({auto}:Props) => {
  //Hook useNvifation : permitir navegar a los detalles de un producto
  const navigation=useNavigation();

  return (
    <View style={styles.rootListAutos}>
        <View >
        <Text variant="labelLarge">{auto.modeloAuto}</Text>
        <Text variant="bodyMedium">{auto.precio}</Text>
        </View>
        <View style={styles.icon}>
        <IconButton
            icon="chevron-double-right"
            size={20}
            mode='contained'
            onPress={() => navigation.dispatch(CommonActions.navigate({name:'Detail',params:{auto}}))}
        />
        </View>
    </View>
  )
}
