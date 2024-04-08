

import { FlatList,StyleSheet, Text, View, useColorScheme } from 'react-native'
import React, { useState } from 'react'
import { Avatar, Button, TextInput } from 'react-native-paper'
import { styles } from '../themes/Styles';


////////////
//IMPORT DE <>
import { getDatabase, ref, set, onValue, update, remove } from "firebase/database";
import { db } from '../config/Configs'




  


export default function CRUD( ) {



const [codigo, setCodigo] = useState('')
const [nombre, setNombre] = useState('')
const [imageUrl, setImageUrl] = useState('')
const [descripcion, setDescripcion] = useState('')

const [lista, setLista] = useState([])


////// GUARDAR  /////

  function guardar(codigo: string, nombre: string, imageUrl: string, descripcion: string,) {
  //const db = getDatabase();
  set(ref(db, 'juego/' + codigo), {
    name: nombre,
    picture: imageUrl,
    description: descripcion

  });

  setCodigo('')
  setNombre('')
  setImageUrl('')
  setDescripcion('')

}


/////LEERR//

  function leer() {
  const starCountRef = ref(db, 'juego/');//aqui se puede tarer tod los compas o un solo campo espefisifo
  onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();

    let arreglo :any = Object.keys(data).map(key =>({
      key, ...data[key]
    }))
    //updateStarCount(postElement, data);
    setLista(arreglo)
  });
  console.log(lista)

}


/////////actulizar--///
function actualizar(){
update(ref(db,'juego/'+ codigo),{
  name:nombre,
  description:descripcion
  
})
}
//eliminar//
function eliminar(){
remove(ref(db,'juego/'+codigo))

}


type juego ={
  codigo: string,
  name: string,
  picture: string,
  descrption: string,
  key: string
}

  return (
 

 /*<Avatar.Image size={24} source={require('../../assets/image/descarga (11).jpeg')}  />
    <Text>Registro de peliculas</Text>*/
    <View style={styles.container}>

      <TextInput
        placeholder='Ingresar el codigo del juego'
        onChangeText={(text) => (setCodigo(text))}
        value={codigo}
      />
      <TextInput
        placeholder='Ingresar el nombre del juego '
        onChangeText={(text) => (setNombre(text))}
        value={nombre}
      />

      <TextInput
        placeholder='Ingresar la URL de la imagen'
        onChangeText={(text) => setImageUrl(text)}
        value={imageUrl}
      />
      <TextInput
        placeholder='ingrese la descripcion'
        onChangeText={(text) => (setDescripcion(text))}
        value={descripcion}
      />



      <View style={{flexDirection:'row'}}>
        <Button
         
          mode="contained" onPress={() => (guardar(codigo, nombre, imageUrl, descripcion))} >
           Guardar
        </Button>
        <Text>----------------------------------------------------</Text>
        <Button
        
          mode="contained" onPress={() => leer()} >
          Leer
        </Button>
      </View>

 {/*update */}

 <View style={styles.container}>
       <View style={{flexDirection:'row'}}>
       <TextInput
        placeholder='Ingresar el codigo del juego'
        onChangeText={(text) => (setCodigo(text))}
        value={codigo}
      />
      <TextInput
        placeholder='Ingresar el nombre del juego '
        onChangeText={(text) => (setNombre(text))}
        value={nombre}
      />

      <TextInput
        placeholder='Ingresar la URL de la imagen'
        onChangeText={(text) => setImageUrl(text)}
        value={imageUrl}
      />
      <TextInput
        placeholder='ingrese la descripcion'
        onChangeText={(text) => (setDescripcion(text))}
        value={descripcion}
      />
         </View>

         <Button mode="contained" onPress={() => (actualizar())} > actualizar</Button>
    
       </View>
       {/*eliminar */}
         
        <View style={{flexDirection:'row'}}>
        <TextInput
        placeholder='Ingresar el codigo del juego'
        onChangeText={(text) => (setCodigo(text))} 
      />
      <Button
        
        mode="contained" onPress={() => (eliminar())} >
        eliminar
      </Button>

        </View>

    {/*leer */}
      <FlatList
       data={lista}
       renderItem={({item}:{item:juego}) => 
        <View style={{flexDirection:'row'}}>
          <Text>{item.key}</Text>
          <Text>{item.name}</Text>
        
        </View>
       }/>

      

    </View>


  )
}

