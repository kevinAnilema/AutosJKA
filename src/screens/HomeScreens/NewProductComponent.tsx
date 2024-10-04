import React, { useState } from 'react'
import { Button, Divider, IconButton, Modal, Portal, Snackbar, Text, TextInput } from 'react-native-paper'
import { styles } from '../../theme/styles';
import { View } from 'react-native';
import { dbRealTime } from '../../config/firebaseConfig';
import { push, ref, set } from 'firebase/database';

//Interfaz - props
interface Props{
  ShowModalProduct:boolean;
  setShowModalProduct:Function
}
//Intefaz: FormProduc
interface FormProduc{
  codigo:string;
  modeloAuto:string;
  precio:number;
  kilometraje:number;
  placa:string;
  descripcion:string;
}
// Inteface - Message
interface ShowMessage{
  visible:boolean;
  message:string;
  color:string;
}
export const NewProductComponent = ({ShowModalProduct,setShowModalProduct}:Props) => {
  //hook useState: cmaviar el estado del formulario
  const [formProduct, setformProduct] = useState<FormProduc>({
    codigo:'',
    modeloAuto:'',
    precio:0,
    kilometraje:0,
    placa:'',
    descripcion:''
  })

  //Hook para cambiar el estado y mostrar el mesaje
  const [showMessage, setshowMessage] = useState<ShowMessage>({
    visible:false,
    message:"",
    color:"#37eaf0"
  });
  //funcion que ayude a actualizar el formulario
  const handleSetValues=(key:string,value:string)=>{
    setformProduct({...formProduct,[key]:value});
  } 

  //Funcion: agregar los productos
  const handleSetProduct=async()=>{
    if (!formProduct.codigo || 
      !formProduct.modeloAuto || 
      !formProduct.placa || 
      !formProduct.descripcion || 
      formProduct.precio <= 0) {
      setshowMessage({
          visible:true,
          message:"Completa todos los campos",
          color:'#3777f0'
      });
      return
    }
    
    //console.log(formProduct);
    //1. Crear el phat o direccionar a la base de datos
    const dbRef=ref(dbRealTime,'autos');
    //2. crear una coleccion que agrege los datos a en la REF
    const saveAutos=push(dbRef)
    //3. Almacenar los datos en la base de datos
    try {     
    await set(saveAutos,formProduct);    
    //Cerrar modal
    setShowModalProduct(false) 
    } catch (error) {
      console.log(error);      
      setshowMessage({
        visible:true,
        message:"No se completo el registro, intentalo mas tarde",
        color:'#3777f0'
    });
    }
  }
  return (
    <>
    <Portal>
        <Modal visible={ShowModalProduct} contentContainerStyle={styles.modal}>
        <View style={styles.header}>
          <Text variant="headlineSmall">Nuvo Producto</Text>          
            <View style={styles.icon}>
            <IconButton
              icon="close-circle-outline"
              size={20}
              onPress={() => setShowModalProduct(false)}
            />
            </View>
        </View>        
        <Divider/>
        <TextInput
          mode='outlined'
          label='Codigo'
          onChangeText={(value)=>handleSetValues('codigo',value)}
        />
        <TextInput
          mode='outlined'
          label='Modelo'          
          onChangeText={(value)=>handleSetValues('modeloAuto',value)}
        />
        <View style={styles.rootImputsProduct}>
        <TextInput
          mode='outlined'
          label='Placa'
          style={{width:'48%'}}          
          onChangeText={(value)=>handleSetValues('placa',value)}
        />        
        <TextInput
          mode='outlined'
          label='Kilometraje'
          keyboardType='numeric'          
          style={{width:'48%'}}          
          onChangeText={(value)=>handleSetValues('kilometraje',value)}
        />                
        </View>        
        <TextInput
          mode='outlined'
          label='Descripción'
          multiline
          numberOfLines={3}        
          onChangeText={(value)=>handleSetValues('descripcion',value)}
        />
        <TextInput
          mode='outlined'
          label='Precio'
          keyboardType='numeric'
          onChangeText={(value)=>handleSetValues('precio',value)}
          
        />
        <Button mode='contained' onPress={handleSetProduct}>Agregar</Button>
        </Modal>
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
      </Portal>
      
    </>
  )
}
