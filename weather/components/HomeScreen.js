import React from 'react';
import { StyleSheet, Text, View,ScrollView,ImageBackground,Alert,Image,AsyncStorage } from 'react-native';
import { TextInput,Card,List, DataTable } from 'react-native-paper';
import MyHeader from './MyHeader.js';

//import { Appbar } from 'react-native-paper';
//import { Button } from 'react-native-paper';
export default class HomeScreen extends React.Component {
  state={
      info:{
          name:"loading !!",
          temp:"loading !!",
          humidity:"loading !!",
          desc:"loading !!",
          icon:"loading !!"
      }
  }

   async getWeather(){
        Mycity=await AsyncStorage.getItem("myCity");
        if(!Mycity){
            Mycity=this.props.route.params?.city ?? 'dhanbad';
        }
        
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${Mycity}&units=metric&APPID=f7b8a5c7f1b7cc38891ae9f15a265148`)
        .then(res=>res.json())
        .then(data=>{
            //console.log(data)
            this.setState({
                info:{
                    name:data.name,
                    temp:data.main.temp,
                    humidity:data.main.humidity,
                    desc:data.weather[0].description,
                    icon:data.weather[0].icon
                }
          

            })
            
          }) .catch(err=>{
            Alert.alert("Error"+err.message+"please connect to internet",[{text:"ok"}])
          })
    }
   
  componentDidMount(){
      this.getWeather()
  }

  render(){

    if(this.props.route.params?.city){
        this.getWeather()
     }
  return (
    <View style={styles.container}>
      <ImageBackground style={{width: '100%', height: '100%'}} source={require('./w2.jpg')}>
        <MyHeader title="CURRENT WEATHER"/>
       <Card style={{margin:40 }}>
       <ImageBackground style={{width: '100%', height: '0%'}} source={require('./w4.jpg')}>
        <View style={{padding:20 , alignItems: "center"}}> 
            <Text style={{color:"black",fontSize: 30, fontWeight: "bold", textAlign:`center`,}}>CITY : {this.state.info.name}</Text>
            <Image style={{width:120,height:120}}
            source={{ uri:'http://openweathermap.org/img/w/'+this.state.info.icon+".png"}}
            />
            <Text style={styles.text}>TEMPERATURE: {this.state.info.temp} C</Text>
            <Text  style={styles.text}>HUMIDITY  :  {this.state.info.humidity}</Text>
            <Text style={styles.text}>DESCRIPTION  :  {this.state.info.desc}</Text>
            
        </View>
        </ImageBackground>
       </Card>
      
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
  },
   text:{
    textAlign:`center`,
    fontSize: 20,
    fontWeight: "bold",
    color:"white",
    padding:2,
    
   
  }
});
