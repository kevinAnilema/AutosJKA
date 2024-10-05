import React, { useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'
import { Avatar, Button, Divider, FAB, IconButton, Modal, Portal, Text, TextInput } from 'react-native-paper'
import { styles } from '../../theme/styles'
import { onAuthStateChanged, signOut, updateProfile } from 'firebase/auth'
import { auth, dbRealTime } from '../../config/firebaseConfig'
import  FirebaseApp  from 'firebase/auth'
import { ProductCardComponent } from './components/ProductCardComponent'
import { NewProductComponent } from './NewProductComponent'
import { onValue, ref } from 'firebase/database'
import { CommonActions, useNavigation } from '@react-navigation/native'
//Interfaz formUser
interface FormUser{
  name:string
}
//interfaz para producto
export interface Auto{
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
    //Llmar la funcion para la lista de productos
    getAllProducts();
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
  //Funcion para obeter los producto y listarlos
  const getAllProducts=()=>{
    //1. Direccionar a la base de datos
    const dbRef=ref(dbRealTime,'autos'+auth.currentUser?.uid);
    //2.0 Acceder a la data  
    onValue(dbRef,(snapshot)=>{
      //3 Capturar la data
      const data=snapshot.val();//Obtener la data en un formato esperado
      //Verficar que exista data
      if(!data){
        return
      }
      //4. Obtener las key de cada valor
      const getKeys=Object.keys(data);
      //5. Crear un arrelgo para almacenar cada producto que se obtiene
      const listAutos:Auto[]=[]
      //Recorrer las keys para acceder a cada producto
      getKeys.forEach((key)=>{
        const value={...data[key],id:key}
        listAutos.push(value);        
      });
      //7 Actaulizar la data ontenida en el arreglo del hook ustestate
      setautos(listAutos);
    })
  }
  //Navegacion
  const navigation=useNavigation();
  //Funcion apra cerrar sesion
  const handleSingOut=async()=>{
    try {
      
      await signOut(auth);
      navigation.dispatch(CommonActions.reset({
        index:0,
        routes:[{name:'Login'}]
      }))

    } catch (error) {
      console.log(error);      
    }    
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
                icon="account-cog"
                size={20}
                mode='contained'
                onPress={() => setshowModalProfile(true)}
              />
          </View>        
      </View>
      <View>
      <FlatList
        data={autos}
        renderItem={({item}) => <ProductCardComponent auto={item}/>}
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
      <Button icon={'logout'} mode='contained' onPress={handleSingOut}>Cerrar sesion</Button>
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
