import React, { useEffect, useState } from 'react';
import { Alert, FlatList, ImageBackground, View } from 'react-native';
import { styles } from '../themes/Styles';



import { onValue, ref, remove, set, update } from "firebase/database";
import { Button, Card, FAB, IconButton, MD3Colors, Modal, Paragraph, Portal, Text, TextInput, Title, } from 'react-native-paper';
import {  auth, db } from '../config/Configs';

import { useNavigation } from '@react-navigation/native';
import { getAuth, signOut } from 'firebase/auth';





export default function WelcomeScreen({ navigation }: any) {

  function cerrarSesion() {
    Alert.alert('Advertencia', '¿Deseas cerrar la sesión?',
      [{ text: 'Cancelar', style: 'cancel' },
      {
        text: 'Aceptar', onPress: () => {
          const auth = getAuth();
          signOut(auth).then(() => {
            
              Alert.alert('Sesión Terminada');
              navigation.navigate('Login');
            })
            .catch((error) => {
              console.log(error)
            });
        },
      },],
      { cancelable: false }
    );
  }

  const [codigo, setCodigo] = useState('')
  const [nombre, setNombre] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [descripcion, setDescripcion] = useState('')

  const [modalVisible, setModalVisible] = useState(false);

  const [lista, setLista] = useState([])

  const [modoEdicion, setModoEdicion] = useState(false);
  const [modalType, setModalType] = useState('');





//mostar la lista objetos de base de datos
  useEffect(() => {
    leer();
  }, []);


  //--------------guardar----------//
  function guardar(codigo: string, nombre: string, imageUrl: string, descripcion: string,) {
    //const db = getDatabase();
    set(ref(db, 'juego/' + codigo), {
      name: nombre,
      picture: imageUrl,
      description: descripcion

    })
// limpiar los campos
    setCodigo('')
    setNombre('')
    setImageUrl('')
    setDescripcion('')
    setModalVisible(false);

  }


  //----------leer---------//

  function leer() {
    const starCountRef = ref(db, 'juego/');//aqui se puede tarer tod los compas o un solo campo espefisifo
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();

      let arreglo: any = Object.keys(data).map(key => ({
        key, ...data[key]
      }))
      //updateStarCount(postElement, data);
      setLista(arreglo)
      console.log(arreglo);
    });
    console.log(lista)

  }

  ///--------actualizar--///
  function actualizar() {
    update(ref(db, 'juego/' + codigo), {
      name: nombre,
      description: descripcion
    })
    //limpia la lista para actulizar 
    setModoEdicion(false);
    setCodigo('');
    setNombre('');
    setImageUrl('');
    setDescripcion('');
    setModalVisible(false);
  }
  //------eliminar----//
  function eliminar() {
    remove(ref(db, 'juego/' + codigo))
    setCodigo('');
    setModalVisible(false);

  }
  type juego = {
    codigo: string,
    name: string,
    picture: string,
    description: string,
    key: string
  }


  return (
    <ImageBackground source={{ uri: 'https://images.unsplash.com/photo-1664092815283-19c6196f5319?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
      style={styles.backgroundImage}>
      <View style={styles.container}>
        <Portal>
          <Modal visible={modalVisible} onDismiss={() => setModalVisible(false)}>
            <View style={styles.modalContent}>
              <Text variant="headlineSmall">Ingresa un Nuevo Juego</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder='Numero de juego'
                  onChangeText={(text) => (setCodigo(text))}
                  value={codigo}
                  style={styles.inputs}
                />
                <TextInput
                  placeholder='Nombre '
                  onChangeText={(text) => (setNombre(text))}
                  value={nombre}
                  style={styles.inputs}
                />

                <TextInput
                  placeholder='url'
                  onChangeText={(text) => setImageUrl(text)}
                  value={imageUrl}
                  style={styles.inputs}

                />
                <TextInput
                  placeholder='Descripcion'
                  onChangeText={(text) => (setDescripcion(text))}
                  value={descripcion}
                  style={styles.inputs}
                  multiline={true}
                  numberOfLines={8}
                />

                <View style={styles.buttonContainer}>
                <Button icon="content-save" mode="contained" onPress={modoEdicion ? actualizar : () => guardar(codigo, nombre, imageUrl, descripcion)} style={styles.button}>Guardar</Button>
                  <Button icon="book-open" mode="contained" onPress={leer} style={styles.button} > </Button>
                  <Button icon="close" mode="contained" onPress={() => setModalVisible(false)} style={styles.button}>Cancelar</Button>
                  {/*<Button icon="pencil" mode="contained" onPress={actualizar} style={styles.button}> </Button>
                  <Button icon="trash-can" mode="contained" onPress={eliminar}style={styles.button}> </Button>*/}
                </View>

              </View>
            </View>
          </Modal>
          {modalType === 'eliminar' && (
            <Modal visible={modalVisible} onDismiss={() => setModalVisible(false)}>
              <View style={styles.modalContent}>
                <Text variant="headlineSmall">Eliminar Juego</Text>
                <View style={styles.inputContainer}>
                  <TextInput placeholder='Codigo' onChangeText={text => setCodigo(text)} value={codigo} style={styles.inputs} />
                  <View style={styles.buttonContainer}>
                    <Button icon="trash-can" mode="contained" onPress={eliminar} style={styles.button}>Eliminar</Button>
                    <Button icon="close" mode="contained" onPress={() => setModalVisible(false)} style={styles.button}>Cancelar</Button>
                  </View>
                </View>
              </View>
            </Modal>
          )}
        </Portal>

        <FlatList
          data={lista}
          renderItem={({ item }: { item: juego }) => (
            <Card style={styles.card}>
              <Card.Cover source={{ uri: item.picture }} />
              <Card.Content>
                <Title>{item.name}</Title>
                <Paragraph>{item.description}</Paragraph>
              </Card.Content>
              <View style={{flexDirection:'row'}}>
              <IconButton
                
                icon="pencil"
                iconColor={MD3Colors.tertiary50}
                onPress={() => {
                  setCodigo(item.key);
                  setNombre(item.name);
                  setImageUrl(item.picture);
                  setDescripcion(item.description);
                  setModalVisible(true);
                  setModoEdicion(true);
                }}
              />
             <IconButton
              iconColor={MD3Colors.error50}
                icon="trash-can"
                onPress={() => {
                  setModalType('eliminar');
                  setModalVisible(true);
                  setCodigo(item.key);
                }}
              />
              </View>
              
            </Card>
          )}
        />
        <FAB
          icon="plus"
          style={styles.fab}
          onPress={() => setModalVisible(true)}/>

      </View>
      <IconButton  icon="logout" iconColor={MD3Colors.tertiary50} size={20} onPress={cerrarSesion}/>
   
      
    </ImageBackground>
  )
}


