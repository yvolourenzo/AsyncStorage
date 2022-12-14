import React, { Component } from 'react';
import {
       StyleSheet,
       Text,
       View , 
       TextInput,
       TouchableOpacity,
       Keyboard
       } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

class App extends Component{

constructor(props){
  super(props);
  this.state = { 
      input: '',
      nome: ''
  };

  this.gravaNome = this.gravaNome.bind(this);
}

//ComponentDidMount = executado Quando o componente é montado na tela 

async componentDidMount(){
  //pega no banco // key é nome
  await AsyncStorage.getItem('nome').then((value)=>{
      this.setState({nome: value})
  })
}

//ComponentDidUpdate = Monitora toda vez que um state é atualizdo fazer algo
async componentDidUpdate(_, prevState){
    const nome = this.state.nome;
    // se o estado anterior for diferente do de agora
    if(prevState !== nome){
      // await faz esperar até que tenha um resultado
     await AsyncStorage.setItem('nome',nome)
    }
}

gravaNome(){
  this.setState({
    nome: this.state.input
  });
  alert('Salvo com sucesso!');
  //Fecha o teclado
  Keyboard.dismiss();
}

  render(){
    return(
      <View style={styles.container}>
      
       <View style={styles.viewInput}>
            <TextInput
            style={styles.input}
            value={this.state.input}
            onChangeText={(text)=> this.setState({input: text})}
            underlineColorAndroid="transparent"
            />

      <TouchableOpacity onPress={this.gravaNome}>
        <Text style={styles.botao}>+</Text>
      </TouchableOpacity>
      </View> 

      <Text style={styles.nome}>{this.state.nome}</Text>

      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center'
  },
  viewInput:{
    flexDirection: 'row',
    alignItems: 'center'
  },
  input:{
    width:350,
    height:40,
    borderColor: '#000',
    borderWidth: 1,
    padding: 10,
    
  },
  botao:{
    backgroundColor: '#222',
    color: '#FFF',
    height: 40,
    padding: 10,
    marginLeft: 3,
  },
  nome:{
    marginTop: 15,
    fontSize: 30,
    textAlign: 'center',
  }
});

export default App;
