import { StyleSheet } from "react-native"

export const styles=StyleSheet.create({
    root:{
        flex:1,
        justifyContent:'center',
        padding:20,
        gap:10
    },
    text:{
        fontSize:25,
        fontWeight:'bold',
        textAlign:'center'    
    },
    message:{
        width:428
    },
    textRedirect:{
        marginTop:20,
        textAlign:'center',
        fontSize:15,
        fontWeight:'bold',
        color:'#21005d'
    },
    rootActivity:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'

    },
    rootHome:{
        flex:1,
        marginHorizontal:20,
        marginVertical:50,
    },
    headerHome:{
        flexDirection:'row',
        gap:15,
        alignItems:'center'

    }
})