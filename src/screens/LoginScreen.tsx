//rafc

import React, { useState } from 'react'
import { View } from 'react-native'
import { Button, Snackbar, Text, TextInput } from 'react-native-paper'
import { styles } from '../theme/styles'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebaseConfig'
import { CommonActions, useNavigation } from '@react-navigation/native'

//interfaz - Form Login
interface FormLogin{
    email:string,
    password:string
}

// Inteface - Message
interface ShowMessage{
    visible:boolean;
    message:string;
    color:string;
}


export const LoginScreen = () => {
    //hook usestate para cmabiar el estado del formulario
const [FormLogin, setFormLogin] = useState<FormLogin>({
    email:"",
    password:""
})

//Hook para cambiar el estado y mostrar el mesaje
const [showMessage, setshowMessage] = useState<ShowMessage>({
        visible:false,
        message:"",
        color:"#37eaf0"
});

//Hook para el estado del formulario
const handleSetValues=(key:string, value:string)=>{
    setFormLogin({...FormLogin,[key]:value});
}

//hook para hacer visible o no la contraseña
const [ShowPassword, setShowPassword] = useState<boolean>(true)


// Hook useNavigation permitir la navegacion de una pantalla a otra
const navigation=useNavigation();

// Funcion: iniciar sesion
const handleSingIn=async()=>{
    if(!FormLogin.email||!FormLogin.password){
        setshowMessage({
            visible:true,
            message:"Completa todos los campso",
            color:'#3777f0'
        });
        return
    }
    //console.log(FormLogin);
    try {     
        const response =await signInWithEmailAndPassword(
        auth,
        FormLogin.email,
        FormLogin.password
        );
        //console.log(response);   
    } catch (error) {
        //console.log(error)
        setshowMessage({
            visible:true,
            message:"Correo y/o constraseña incorrecta",
            color:"#f03753"
        })
    }    
}

  return (
    <View style={styles.root}>        
    <Text style={styles.text}>Login</Text>
    <TextInput
        label="Email"
        mode="outlined"
        placeholder='Email'
        onChangeText={(value)=>handleSetValues('email',value)}
        />
    <TextInput
        label="Contraseña"
        mode="outlined"
        placeholder='Contraseña'
        secureTextEntry={ShowPassword}
        onChangeText={(value)=>handleSetValues('password',value)}            
        right={<TextInput.Icon icon="eye" onPress={()=>setShowPassword(!ShowPassword)}/>}
        />
    <Button 
        mode="contained" 
        onPress={handleSingIn}>
        Iniciar sesion
    </Button>
    <Text style={styles.textRedirect}
    onPress={()=>navigation.dispatch(CommonActions.navigate({name:'Register'}))}>
        Registrarse Ahora
     </Text>
    <Snackbar
    visible={showMessage.visible}
    onDismiss={()=>setshowMessage({...showMessage,visible:false})}
    style={{
        ...styles.message,
        backgroundColor:showMessage.color
    }}
    >
    {showMessage.message}
  </Snackbar>

</View>
  )
}
