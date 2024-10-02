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

//Interface rutas (Stack screen)
interface Routes{
    name:string
    screen:()=>JSX.Element //Componente React    
}
const Stack = createStackNavigator();
//Arreglos - routes cuando el usuario no este autenticado
const routesNoAuth:Routes[]=[
    {name:'Login', screen:LoginScreen},
    {name:'Register', screen:RegisterScreen}
];
//Arreglos - routes cuando el usuario este autenticado
const routesAuth:Routes[]=[
    {name:'Home', screen:HomeScreen} 
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

    <Stack.Navigator>
        {
            !isAuth ?
            routesNoAuth.map((item,index)=>(
                <Stack.Screen key={index} 
                name={item.name} 
                options={{headerShown:false}} 
                component={item.screen}></Stack.Screen>
            ))
            :
            routesAuth.map((item,index)=>(
                <Stack.Screen key={index} 
                name={item.name} 
                options={{headerShown:false}} 
                component={item.screen}></Stack.Screen>
            ))
        }
      {/*<Stack.Screen name="Login" options={{headerShown:false}} component={LoginScreen} />*/}
      {/*<Stack.Screen name="Register" options={{headerShown:false}} component={RegisterScreen} />*/}
    </Stack.Navigator>
    )
    }
    </>
  );
}