import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  Switch,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

SplashScreen.preventAutoHideAsync();

import firebase from 'firebase';

let customFonts = {
  'Bubblegum-Sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
};

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      isEnabled: false,
      light_theme:true,
      name:"",
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
    this.fetchUser();
  }

async fetchUser({
  let theme, name, image;
  await firebase  
    .database()
    .ref("/users/" + firebase.auth().currentUser.uid)
    .on("value", function (snapshot) { theme = snapshot
    .val().current_theme; 
    name = `${snapshot.val().first_name} ${snapshot
    .val()
    .last_name}`; 
    }); 
    this.setState({ 
      light_theme: theme === "light" 
      ? true : false, 
      isEnabled: theme === "light" ? false : true, 
      name: name });
})

toggleSwitch(){
  const previous_state= this.state.IsEnabled;
  const theme = !this.state.isEnabled ? "dark" : "light";
  var updates = {};
  updates[ "/users/" + firebase.auth().currentUser.uid + "/current_theme" ] = theme;
  firebase .database() .ref() .update(updates); 
  this.setState({ isEnabled: !previous_state, light_theme: previous_state });
}

render (){
  return(
    <View style={styles.container}>
    <SafeAreaView style={styles.droidSafeArea} />
    <View style={styles.appTitle}>
    <Image source{require("../assets/logo.png")}></Image>
    <Text style={styles.appTitleText}>Spectagram</Text>
    </View>
    <View style={styles.buttonContainer}>
    <TouchableOpacity style={styles.button}
    onPress={()=> this.signInWithGoogleAsync()}>
    <Image source={require("../assets/google_icon.png")}
    style={styles.googleIcon}
    ></Image>
    <Text style={styles.googleText}>Sign In with Google</Text>
    </TouchableOpacity>
    ,
    </View>
    <View style={styles.cloudContainer}>
    <Image source={require("../assets/cloud.png")}
    style={styles.cloudImage}
    ></Image>
    </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  droidSafeArea: { marginTop: Platform.OS === "android" ? StatusBar.
  currentHeight : 0 }, 
  
  appTitle: { 
    flex: 0.07, 
    flexDirection: "row" 
    }, 
    
    appIcon: { 
      flex: 0.3, 
      justifyContent: "center", 
      alignItems: "center" 
      }, 
      
      iconImage: { 
        width: "100%", 
        height: "100%", 
        resizeMode: "contain" 
        }, 
        
      appTitleTextContainer: { 
          flex: 0.7, 
          justifyContent: "center" 
          }, 
          
      appTitleText: { 
            color: "white", 
            fontSize: RFValue(28), 
            fontFamily: "Bubblegum-Sans" 
            }, 
      screenContainer: { 
        flex: 0.85 
              }, 

      profileImageContainer: { 
        flex: 0.5, 
        justifyContent: "center", 
        alignItems: "center" 
                }, 
                
      profileImage: { 
        width: RFValue(140), 
        height: RFValue(140), 
        borderRadius: RFValue(70) 
                  }, 
                  
      nameText: { 
        color: "white", 
        fontSize: RFValue(40), 
        fontFamily: "Bubblegum-Sans", 
        marginTop: RFValue(10) 
        }, 

      themeContainer: { 
          flex: 0.2, 
          flexDirection: "row", 
          justifyContent: "center", 
          marginTop: RFValue(20) 
          }, 
          
      themeText: { 
        color: "white", 
        fontSize: RFValue(30), 
        fontFamily: "Bubblegum-Sans", 
        marginRight: RFValue(15) 
        }
});
