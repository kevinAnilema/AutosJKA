import React, { useState } from 'react'
import { View } from 'react-native'
import { Button, Snackbar, Text, TextInput } from 'react-native-paper'
import { styles } from '../theme/styles'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebaseConfig'
import { CommonActions, useNavigation } from '@react-navigation/native'

//interfaz - Form resgister

interface FormRegister{
    email:string,
    password:string

}
// Inteface - Message
interface ShowMessage{
    visible:boolean;
    message:string;
    color:string;
}

export const RegisterScreen = () => {
    
    //Hook useState: cambiar el estado del formulario
    const [FormRegister, setFormRegister] = useState<FormRegister>({
        email:"",
        password:""
    });
    //Hook para cambiar el estado y mostrar el mesaje
    const [showMessage, setshowMessage] = useState<ShowMessage>({
        visible:false,
        message:"",
        color:"#37eaf0"
    });

    //Hooc para cambiar el estodo de password
    const [ShowPassword, setShowPassword] = useState<boolean>(true);

    //Hook para navegacion entre paginas
    const navigate=useNavigation();
    //Funcion para actualizar el estado del formulario
    const handleSetValues=(key: string, value:string)=>{
        setFormRegister({...FormRegister,[key]:value});
    }         

    //Funcion: registrar a nuvos usuarios
    const handleRegister= async()=>{
        if(!FormRegister.email||!FormRegister.password){
            setshowMessage({visible:true, message:'Completa todos los campos',color:'#660df'});
            return;
        }else{            
            //console.log(FormRegister)
            try {
             
            const response=await createUserWithEmailAndPassword(
                auth,
                FormRegister.email,
                FormRegister.password
            )
            setshowMessage({
                visible:true,
                message:"Registro exitoso",
                color:'#7c37f0'
            })
            } catch (e) {
                console.log(e)
                setshowMessage({
                    visible:true,
                    message:"No se logro completar la transaccion, intente mas tarde",
                    color:'#7c37f0'
                })
            }
        }
    }
  return (
    <View style={styles.root}>        
        <Text style={styles.text}>Registrate</Text>
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
            onPress={handleRegister}>
            Registrar
        </Button>
        <Text style={styles.textRedirect}
            onPress={()=>navigate.dispatch(CommonActions.navigate({name:'Login'}))}>
            Volver al login
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
