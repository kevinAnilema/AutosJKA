import React from 'react'
import { View } from 'react-native'
import { Divider, IconButton, Text } from 'react-native-paper'
import { styles } from '../../../theme/styles'

export const ProductCardComponent = () => {
  return (
    <View style={styles.rootListAutos}>
        <View >
        <Text variant="labelLarge">Modelo:</Text>
        <Text variant="bodyMedium">Precio:</Text>
        </View>
        <View style={styles.icon}>
        <IconButton
            icon="chevron-double-right"
            size={20}
            mode='contained'
            onPress={() => console.log('Pressed')}
        />
        </View>
    </View>
  )
}
