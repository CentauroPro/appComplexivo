import { Alert, ImageBackground, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'

//FIREBASE
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/Configs';
import { Button, Text, TextInput } from 'react-native-paper';
import { styles } from '../themes/Styles';

export default function RegistroScreen({ navigation }: any) {

  const [correo, setCorreo] = useState('')
  const [contrasenia, setContrasenia] = useState('')

  //para mostrar ka contraseña del imput 
  const [mostarPassword, setMostarPassword] = useState(true)


  function registro() {
    createUserWithEmailAndPassword(auth, correo, contrasenia)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        console.log('Registro Correcto')
        setCorreo('');
        setContrasenia('')
        navigation.navigate('Login')
        console.log(user)

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorCode)
        console.log(errorMessage)
        Alert.alert('ERROR', 'Registro no valido')
      });
  }



  return (

    <ImageBackground source={{ uri: 'https://media.istockphoto.com/id/1828786159/es/foto/joystick-para-juegos-sobre-fondo-negro-con-luz-de-ne%C3%B3n.webp?b=1&s=170667a&w=0&k=20&c=9CwdXlYWawTD7VoHZDVE8ZaNeyNl9kESCEqUFNIxPck=' }}
      style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.text2} variant="displaySmall" >REGISTRO  DE USUARIOS</Text>
        <View style={styles.cont} >
          <TextInput
            placeholder='Ingresar correo'
            onChangeText={(text) => (setCorreo(text))}
            keyboardType='email-address'
            value={correo}
            style={styles.inputs}
          />

          <TextInput
            placeholder='Ingresar contrasenia'
            onChangeText={(text) => (setContrasenia(text))}
            secureTextEntry={mostarPassword}
            value={contrasenia}
            style={styles.inputs}
            right={<TextInput.Icon icon="eye" onPress={() => setMostarPassword(!mostarPassword)} />}
          />

          <Button
            style={styles.buttons}
            mode="contained" onPress={() => registro()}>
            🎮 Registrar 🎮
          </Button>
        </View>
      </View>
    </ImageBackground>

  )
}

