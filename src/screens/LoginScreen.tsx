import { Alert, ImageBackground, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'


import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/Configs';
import { Button, TextInput,Text } from 'react-native-paper';
import { styles } from '../themes/Styles';



export default function LoginScreen({navigation}: any) {

  const [correo, setCorreo] = useState('')
  const [contrasenia, setContrasenia] = useState('')

    //para mostrar ka contraseña del imput 
    const [mostarPassword,setMostarPassword] = useState(true)

  function login(){
    signInWithEmailAndPassword(auth, correo, contrasenia)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log('Acceso correcto')
        setCorreo('');
        setContrasenia('');
        navigation.navigate('Lista de Juegos')

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode)
        console.log(errorMessage)
        if (errorCode === 'auth/invalid-credential') {
          Alert.alert('ERROR', 'El correo o contraseña no son válidos')
        } else if (errorCode === 'auth/missing-password') {
          Alert.alert('ERROR', 'No se admiten contraseñas en blanco')
        } else {
          Alert.alert('ERROR', 'Verifique las credenciales')
        }

      });
    }


    return (
      <ImageBackground  source={{ uri: 'https://media.istockphoto.com/id/1828786159/es/foto/joystick-para-juegos-sobre-fondo-negro-con-luz-de-ne%C3%B3n.webp?b=1&s=170667a&w=0&k=20&c=9CwdXlYWawTD7VoHZDVE8ZaNeyNl9kESCEqUFNIxPck=' }}
      style={styles.backgroundImage}>

      <View style={styles.container}>
        <Text style={styles.text2} variant="displaySmall">Iniciar Sesión en PlayStation</Text>

      <View style={styles.cont} >
      <TextInput
          style={styles.inputs}
          placeholder='Ingrese un correo'
          onChangeText={(texto) => (setCorreo(texto))}

        />

        <TextInput
          style={styles.inputs}
          placeholder='Ingrese la contraseña'
          onChangeText={(texto) => (setContrasenia(texto))}
          secureTextEntry={mostarPassword}
          right={<TextInput.Icon icon="eye" onPress={() =>setMostarPassword(!mostarPassword)} />}
        />
          <Button 
        style={styles.buttons}
        mode="contained" onPress={() => login()}>
          Aceptar
        </Button>



        <Text style={styles.Texts}onPress={() => navigation.navigate('Registro')}> 🎮 Crea tu Cuenta aquí 🎮</Text>
      </View>
      </View>

      
      </ImageBackground>
    )
  }



