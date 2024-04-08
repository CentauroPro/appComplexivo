import React, { useEffect, useState } from 'react';
import { FlatList, ImageBackground, View } from 'react-native';
import { styles } from '../themes/Styles';



import { onValue, ref, remove, set, update } from "firebase/database";
import { Button, Card, FAB, IconButton, Modal, Paragraph, Portal, Text, TextInput, Title, } from 'react-native-paper';
import { auth, db } from '../config/Configs';
import { onAuthStateChanged } from 'firebase/auth';



export default function WelcomeScreen() {

 

  const [codigo, setCodigo] = useState('')
  const [nombre, setNombre] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [descripcion, setDescripcion] = useState('')

  const [modalVisible, setModalVisible] = useState(false);

  const [lista, setLista] = useState([])






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
  }
  //------eliminar----//
  function eliminar() {
    remove(ref(db, 'juego/' + codigo))

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

                <View >
                  <Button

                    mode="contained" onPress={() => (guardar(codigo, nombre, imageUrl, descripcion))} > Guardar</Button>

                  <Button mode="contained" onPress={() => leer()} > Leer</Button>
                </View>
              </View>
            </View>
          </Modal>
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
              <View >
              <IconButton icon="lead-pencil"  onPress={() => console.log('Pressed')} size={20}  style={styles.iconButton} />
                <IconButton icon="delete" size={20} onPress={() => console.log('Pressed')} style={styles.iconButton} />
            
              </View>
            </Card>
          )}
        />
        <FAB
          icon="plus"
          style={styles.fab}
          onPress={() => setModalVisible(true)}
        />

      </View>
    </ImageBackground>
  )
}


