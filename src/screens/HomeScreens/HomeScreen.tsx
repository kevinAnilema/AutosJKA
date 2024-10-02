import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Avatar, Text } from 'react-native-paper'
import { styles } from '../../theme/styles'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../config/firebaseConfig'

//Interfaz UserAuth
interface UserAuth{
  name:string
}
export const HomeScreen = () => {
  //hook usetState:cambiar el estado del formulario
  const [UserAuth, setUserAuth] = useState<UserAuth>({
    name:""
  })
  // hook useEffect: validar el estado de autenticacion para estraer los datos
  useEffect(()=>{
    onAuthStateChanged(
      auth,(user)=>{
        if(user){
          setUserAuth({name:user.displayName??'NA'})
        }
      }
    )
  })
  return (
    <View style={styles.rootHome}>
      <View style={styles.headerHome}>
        <Avatar.Text size={40} label="JK" />
        <View>
        <Text variant="titleMedium">Bienvenido</Text>
        <Text variant="titleMedium">{UserAuth.name}</Text>
        </View>
      </View>
    </View>
  )
}
