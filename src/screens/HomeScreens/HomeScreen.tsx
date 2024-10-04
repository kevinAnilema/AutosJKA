import React, { useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'
import { Avatar, Button, Divider, FAB, IconButton, Modal, Portal, Text, TextInput } from 'react-native-paper'
import { styles } from '../../theme/styles'
import { onAuthStateChanged, updateProfile } from 'firebase/auth'
import { auth } from '../../config/firebaseConfig'
import  FirebaseApp  from 'firebase/auth'
import { ProductCardComponent } from './components/ProductCardComponent'
import { NewProductComponent } from './NewProductComponent'
//Interfaz formUser
interface FormUser{
  name:string
}
//interfaz para producto
interface Auto{
  id:string;
  codigo:string;
  modeloAuto:string;
  precio:number;
  kilometraje:number
  placa:string;
  descripcion:string;
}
export const HomeScreen = () => {
  //hook usetState:cambiar el estado del formulario
  const [FormUser, setFormUser] = useState<FormUser>({
    name:""
  })
  //Hook useState: Capturar y modificar las data del usuario autenticado
  const [userData, setuserData] = useState<FirebaseApp.User|null>(null)

  //hook useState: gestuonar la lista de productos/autos
  const [autos, setautos] = useState<Auto[]>([
    {id:"1",codigo:"au001",modeloAuto:"Audi RS5",precio:20000,kilometraje:0.000,placa:"AAA-0000",descripcion:"El Audi RS 5 Sportback es más que un vehículo deportivo. En apenas 3.9 segundos conseguirás llegar de 0 a 100 km/h experimentando performance, comodidad y dinamismo superiores."},
    {id:"2",codigo:"au002",modeloAuto:"Audi A7",precio:20000,kilometraje:0.000,placa:"AAA-0000",descripcion:"El Audi A7 Sportback es un embajador en lenguaje de diseño. Cuenta con una motorización de 4 cilindros con la tecnología TFSI Mild Hybrid y el sistema de tracción quattro."}

  ])

  //Hook useSate: permitir que el modela se visualize o no
  const [showModalProfile, setshowModalProfile] = useState<boolean>(true)

  //Hook useState: permitir que el model del producto se visualice o no
  const [showModalProduct, setshowModalProduct] = useState<boolean>(false)
  //hook useEffect:Obtener informacion del usuario autenticado
  useEffect(()=>{
    setuserData(auth.currentUser);
    setFormUser({name:auth.currentUser?.displayName??'NA'})
  },[]);
  
  //Funcion: actualizar el estado del formulario
  const handleSetValues=(key:string, value:string)=>{
    //cambiar de null a la data del usuario autenticado
    setFormUser({...FormUser,[key]:value})
  }

  //Funcion para mostrar actualizar la informacion del usaurio autenticado
  const handleUpdaterUser=async()=>{
    try {      
      await updateProfile(userData!,
      {displayName:FormUser.name}
      )    
    } catch (error) {
      console.log(error);    
    } 
    //Ocultar el modal
    setshowModalProfile(false);
  }

  return (
    <>
    <View style={styles.rootHome}>
      <View style={styles.header}>
        <Avatar.Text size={40} label="JK" />
          <View>
            <Text variant="titleMedium">Bienvenido</Text>
            <Text variant="titleMedium">{userData?.displayName}</Text>
          </View>
          <View style={styles.icon}>
            <IconButton
                icon="account-edit"
                size={20}
                mode='contained'
                onPress={() => setshowModalProfile(true)}
              />
          </View>        
      </View>
      <View>
      <FlatList
        data={autos}
        renderItem={({item}) => <ProductCardComponent/>}
        keyExtractor={item => item.id}
      />
      </View>
    </View>
    <Portal>
      <Modal visible={showModalProfile}contentContainerStyle={styles.modal}>
        <View style={styles.header}>
          <Text variant="headlineSmall">Mi perfil</Text>          
            <View style={styles.icon}>
            <IconButton
              icon="close-circle-outline"
              size={20}
              onPress={() => setshowModalProfile(false)}
            />
            </View>
        </View>        
        <Divider/>
        <TextInput
          mode='outlined'
          label='Nombre'
          value={FormUser.name}  
          onChangeText={(value)=>handleSetValues('name',value)}
        />
        <TextInput
          mode='outlined'
          label='Correo'  
          disabled
          value={userData?.email!}
        />
        <Button mode='contained' onPress={handleUpdaterUser}>Actualizar</Button>
      </Modal>
    </Portal>
    <FAB
    icon="plus"
    style={styles.fabProduct}
    onPress={() => setshowModalProduct(true)}
  />
  <NewProductComponent ShowModalProduct={showModalProduct} setShowModalProduct={setshowModalProduct}/>
  </>
  )
}
