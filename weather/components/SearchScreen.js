import React from 'react';
import { StyleSheet, Text, View,ScrollView,ImageBackground,AsyncStorage } from 'react-native';
import { TextInput,Card,List,Button } from 'react-native-paper';
import MyHeader from './MyHeader.js';

//import { Appbar } from 'react-native-paper';
//import { Button } from 'react-native-paper';
export default class SearchScreen extends React.Component {
  state = {
    text: '',
    cities:[]
  }; 
 async  buttonclick(){
   this.props.navigation.navigate(`Current City`,{city:this.state.text}) 
   await AsyncStorage.setItem("myCity",this.state.text)  
  }
  async listclicked(name){
    this.setState({text:name})
   await  AsyncStorage.setItem("myCity",this.state.text) 
    this.props.navigation.navigate(`Current City`,{city:this.state.text}) 
  }
  fetchCities(text){
    this.setState({text})
    fetch(`http://autocomplete.wunderground.com/aq?query=${text}`)
    .then (data=>data.json())
    .then(city=>{
      this.setState({
        cities:city.RESULTS.slice(0,9)
      })
    })
    console.log(this.state.cities)
  }

  render(){
    renderCity=<Card><List.Item title="No Cities checked " /></Card>
    if(this.state.cities.length>0){
      renderCity=this.state.cities.map(city=>{
      return (
        <Card style={{margin:5}} key={city.lon} onPress={()=>this.listclicked(city.name)}>
          <List.Item title={city.name}/>
        </Card>
      )

      })
    }
  return (
    <View style={styles.container}>
      <ImageBackground style={{width: '100%', height: '100%', position: 'absolute',top: 20, bottom: 0}} source={require('./w5.jpg')}>
        <MyHeader  title="SELECT CITY"/>
        <TextInput
        label='Enter City'
        value={this.state.text}
        onChangeText={text => this.fetchCities(text)}
      />
      <Button  mode="contained" style={{margin:20}} onPress={() => this.buttonclick()}>
            Check and save
        </Button>
    <ScrollView>
      {renderCity}
    </ScrollView>
    </ImageBackground>
    </View>
  )
}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  backgroundColor:'orange'
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  }
});
