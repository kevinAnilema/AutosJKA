import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { HomeScreen } from '../screens/HomeScreens/HomeScreen';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { styles } from '../theme/styles';
import { DetailAutoScreen } from '../screens/DetailAutoScreen';

//Interface rutas (Stack screen)
interface Routes{
    name:string
    screen:()=>JSX.Element //Componente React  
    headerShow?:boolean  //Propiedad opcional
    titulo?:string
}
const Stack = createStackNavigator();
//Arreglo con rutas de la app
const routes:Routes[]=[
    {name:'Login', screen:LoginScreen},
    {name:'Register', screen:RegisterScreen},
    {name:'Home', screen:HomeScreen},
    {name:'Detail',screen:DetailAutoScreen, headerShow:true, titulo:'Especificaciones'}    
];

export const StakNavigator=()=>{
    // Hook useState: Verificar si esta autenticado o no
    const [isAuth, setisAuth] = useState<boolean>(false)

    //Hook controlar carga inicial
    const [isLoading, setisLoading] = useState<boolean>(false)

    //Hook use efecte: validar el estado de autenticacion
    useEffect(()=>{
        setisLoading(true);
        onAuthStateChanged(auth,(user)=>{
        if(user)            
            {
                //console.log(user);                
                setisAuth(true)
            }
            //ocultar el activiti indicator
            setisLoading(false)
        })
    },[]);
  return (
    <>
    {isLoading?(
    <View style={styles.rootActivity}>
        <ActivityIndicator animating={true} size={'large'} />
    </View>
    ):(

    <Stack.Navigator initialRouteName={isAuth?'Home':'Login'}>
        {
            routes.map((item,index)=>(
                <Stack.Screen key={index} 
                name={item.name} 
                options={{headerShown:false}} 
                component={item.screen}></Stack.Screen>
            ))           
        }
    </Stack.Navigator>
    )
    }
    </>
  );
}