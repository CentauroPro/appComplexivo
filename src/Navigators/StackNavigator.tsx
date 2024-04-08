import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Screen
import RegistroScreen from '../screens/RegistroScreen';
import LoginScreen from '../screens/LoginScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import IndexScreen from '../screens/IndexScreen';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/Configs';



const Stack = createStackNavigator();

//hook useEfeect validar cual es tesatdo de autentificacion
/*useEffect(() => {
   onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("Usuario autenticado:", user.email);
      // Aquí puedes realizar acciones adicionales cuando haya un usuario autenticado
    } else {
      console.log("No hay usuario autenticado");
      // Aquí puedes realizar acciones adicionales cuando no haya usuario autenticado
    }
  });



}, [auth]);*/


function MyStack() {
  return (
    <Stack.Navigator>
      
      <Stack.Screen name="Index" component={IndexScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Registro" component={RegistroScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Lista de Juegos" component={WelcomeScreen}initialParams={{ isAuthenticated: false }} />
      

    </Stack.Navigator>
  );
}

export default function StackNavigator() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>

  )
}
