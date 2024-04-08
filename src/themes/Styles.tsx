import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap:10
  },
    cont: {
      borderRadius:10,
      alignItems: 'center',
      width:'90%',
      height:'30%',
      backgroundColor: '#56505089', 
      
    },
    inputContainer: {
      marginTop: 10,
      borderRadius:10,
      alignItems: 'center',
      width:'90%',
      
   
    },

  buttons: {
    width: "90%",
  },
  btn: {
    marginTop: 100
  },
  inputs: {
    width: '80%',
    height: 40,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 10,
   

  },
  Texts: {
    alignItems: 'center',
    fontSize: 24,
    color: '#f5f2f2',

  },
  text1: {
    marginTop: 500,
    color: '#f5f2f2',
    fontSize: 24,
  },
  text2: {
    color: '#f5f2f2',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  card: {
    margin: 10,
    width: '90%',
  },
  iconb:{
    marginLeft: 'auto'
  },
  iconButton: {
    marginHorizontal: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  button: {
    width: '20%', // Ajusta el ancho de cada botón según sea necesario
  },
}
)