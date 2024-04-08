import { ImageBackground, StyleSheet, View } from 'react-native'
import React from 'react'
import { styles } from '../themes/Styles'
import { Button, Text } from 'react-native-paper'

export default function IndexScreen({ navigation }: any) {
    return (

        <ImageBackground
            source={{ uri: 'https://asset.kompas.com/crops/ZN6RjLHn0rPRX7mM_P6cfGcOndQ=/312x108:1608x972/750x500/data/photo/2021/03/01/603c43a54d887.jpg' }}
            style={styles.backgroundImage}>
            <View style={styles.container}>

                <Text style={styles.text1} variant="displaySmall">Tedamos la Bienvenida  </Text>
                <Text style={styles.text2}  variant="headlineMedium">a nuestra aplicacación</Text>

                <Button 
                style={styles.btn}
                buttonColor='#fff'
                textColor='#141414' mode="contained" onPress={() => navigation.navigate('Login')}>
                    Iniciar Sesion
                </Button>
            </View>

        </ImageBackground>
    )
}
