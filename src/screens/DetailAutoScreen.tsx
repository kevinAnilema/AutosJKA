import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Button, Divider, Text, TextInput } from 'react-native-paper'
import { styles } from '../theme/styles'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Auto } from './HomeScreens/HomeScreen'
import { ref, remove, update } from 'firebase/database'
import { auth, dbRealTime } from '../config/firebaseConfig'

export const DetailAutoScreen = () => {
  //Hook use root: acceder a tosda la informacion de navegacion 
  const route=useRoute()
  //console.log(route);
  //@ts-ignore
  const {auto}=route.params
  console.log(auto);
  //hooj usenavigation: permite navegar de un screen a otro
  const navigate=useNavigation();

    //Hook UserState para cambiar el estado del formulario de editar y eliminar
    const [formEdit, setformEdit] = useState<Auto>({
      id:'',
      codigo:'',
      modeloAuto:'',
      precio:0,
      kilometraje:0,
      placa:'',
      descripcion:''
    });
    //hook useEffect: cargar y mostrar la data en el formulario de detalle
    useEffect(()=>{
      //Actualizar los datos en el formulario
      setformEdit(auto);
    },[])
    //funcion para actualizar los datos capturados desde el formulario
    const handleSetValues=(key:string, value:string)=>{
      setformEdit({...formEdit,[key]:value})           
    }
    //Funcion: actualizar la data del auto
    const handleUpdateAuto =async()=>{
      console.log(formEdit);
      //1. Direccionar a la table y elemento seleccionado
      const dbRef=ref(dbRealTime,'autos/'+auth.currentUser?.uid+'/'+formEdit.id)      
      // actualizar el dato selecionado
      try {
        await update(dbRef,{
          codigo:formEdit.codigo,
          modeloAuto:formEdit.modeloAuto,
          precio:formEdit.precio,
          kilometraje:formEdit.kilometraje,
          placa:formEdit.placa,
          descripcion:formEdit.descripcion
        });
        //Regresar al anterior screen
        navigate.goBack();  
      } catch (error) {
        console.log(error);
        
      }      
    }
    //funcion apra eliminar
    const handleRemoveAuto=async()=>{
      //1 Direccionar a la tabla y el elemento
      const dbRef=ref(dbRealTime,'autos/'+auth.currentUser?.uid+'/'+formEdit.id)
      //2 eliminar el elemto de la db
      try {
        await remove(dbRef)
        navigate.goBack();
      } catch (error) {
        console.log(error);
        
      }
    }
  return (
    <View style={styles.rootDetail}>
      <View>
        <Text variant="headlineSmall">Codigo</Text>
        <TextInput 
        mode='outlined'
        value={formEdit.codigo}
        onChangeText={(value)=>handleSetValues('codigo',value)}
        />
        <Divider/>
        <View>
        <Text variant="bodyLarge">Modelo</Text>        
        <TextInput 
        mode='outlined'
        value={formEdit.modeloAuto}        
        onChangeText={(value)=>handleSetValues('modeloAuto',value)}
        />
        </View>
        <Divider/>
        <View style={styles.rootImputsProduct}>
        <Text variant="bodyLarge">Placa</Text>        
        <TextInput 
        mode='outlined'
        value={formEdit.placa} 
        style={{width:'31%'}}
        onChangeText={(value)=>handleSetValues('placa',value)}
        />        
        <Text variant="bodyLarge">Kilometraje</Text>
        <TextInput 
        mode='outlined'
        value={formEdit.kilometraje.toString()}
        keyboardType='numeric'
        style={{width:'31 %'}}        
        onChangeText={(value)=>handleSetValues('kilometraje',value)}
        />
        </View>
        <View>
        <Text variant="bodyLarge">Descricpcion</Text>
        <TextInput 
        multiline
        numberOfLines={3}
        value={formEdit.descripcion}        
        onChangeText={(value)=>handleSetValues('descripcion',value)}
        />
        </View>
        <View>
        <Text variant="bodyLarge">Precio</Text>
        <TextInput 
        mode='outlined'
        value={formEdit.precio.toString()}
        keyboardType='numeric'
        onChangeText={(value)=>handleSetValues('precio',value)}
        />
        </View>
      </View>
        <Button 
        icon={'update'} 
        mode='contained' 
        onPress={handleUpdateAuto}
        >Actualizar      
        </Button>

        <Button 
        icon={'delete'} 
        mode='contained'         
        onPress={handleRemoveAuto}
        >Eliminar
        </Button>      
    </View>
  )
}
