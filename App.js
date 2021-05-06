import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import axios from "axios";
import { Modal } from "react-bootstrap";
import Icon from "react-native-vector-icons/FontAwesome";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const localStorage = window.localStorage;

const baseUrl = "https://4d644b47131a.ngrok.io";
const url = "/User/ReadAccount";
global.logged_in = false;

const postDataUsingSimplePostCall = (email, password) => {
  const query_params = { email: email, password: password };
  axios
    .post(
      `${baseUrl}${url}`,
      {},
      {
        params: query_params,
      }
    )
    .then(function (response) {
      // handle success
      global.user_dictionary = response.data;
      global.logged_in = true;
      // console.log(JSON.stringify(user_object));
      // console.log(user_object["name"]);

      // console.log(global.user_dictionary["name"]);
      alert(JSON.stringify(response.data));
    })
    .catch(function (error) {
      // handle error
      // alert(error.message);
      alert("Please enter a valid Email and Password OR Create an Account.");
    });
};

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Start" component={StartScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={homeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function StartScreen({ navigation }) {
  return (
    <View style={styles.base}>
      <Text style={styles.company_name_text}>MEDICAP</Text>
      <Text style={styles.text_under_company_name}>
        We keep your medications safe, while making remembering your medications
        easy.
      </Text>
      <ImageBackground
        // style={styles.logo}
        style={{
          flex: 5,
          alignSelf: "stretch",
          width: undefined,
          height: undefined,
        }}
        source={require("./assets/MedicapLogoDesignIcon-09.png")}
      />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Login");
          // alert(postDataUsingSimplePostCall());
        }}
        style={styles.appButtonContainer}
      >
        <Text style={styles.appButtonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View style={styles.container}>
      <View style={styles.blue_third}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Start");
          }}
        >
          <ImageBackground
            style={styles.arrow}
            source={require("./assets/Arrow-01.png")}
            // source={require("./assets/ProfileIcon.png")}
          />
        </TouchableOpacity>

        <ImageBackground
          style={styles.profile}
          source={require("./assets/ProfileIcon.png")}
        />
      </View>
      <View style={styles.blue_third_column}>
        <Text style={styles.small_black_text}>LET'S GET STARTED</Text>
        <Text style={styles.large_black_text}>Sign in</Text>
        <Text style={styles.large_black_text}>with your Email</Text>
      </View>
      <View style={styles.white_two_thirds}>
        <Text style={styles.small_black_text}>EMAIL ADDRESS</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder={"Type Email"}
            placeholderTextColor={"#003f5c"}
            onChangeText={(email) => setEmail(email)}
          ></TextInput>
        </View>
        <Text style={styles.small_black_text}>PASSWORD</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder={"Type Password"}
            placeholderTextColor={"#003f5c"}
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          ></TextInput>
        </View>
        {/*<TouchableOpacity>*/}
        {/*  <Text style={styles.forgot_button}>Forgot Password?</Text>*/}
        {/*</TouchableOpacity>*/}
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => {
            const data = postDataUsingSimplePostCall(email, password);
            if (global.logged_in) {
              navigation.navigate("Home");
            }
          }}
        >
          <Text style={styles.TextInput}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function homeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.cream_third}></View>
      <View style={styles.cream_third}></View>
      <View style={styles.white_two_thirds}></View>
    </View>
  );
}
const left_to_center = "15%";
const dark_blue = "#2f6483";
const medium_blue = "#6f9aac";
const light_blue = "#a3bfc6";
const cream = "#fff6dc";
const white = "#ffffff";
const black = "#000000";
const styles = StyleSheet.create({
  container: {
    // Try setting `flexDirection` to `"row"`.
    flexDirection: "column",
    flex: 1,
  },
  base: {
    padding: 50,
    backgroundColor: light_blue,
    flex: 1,
    // flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  blue_third: {
    backgroundColor: light_blue,
    flex: 1,
    flexDirection: "row",
  },
  blue_third_column: {
    backgroundColor: light_blue,
    flex: 1,
    flexDirection: "column",
  },
  cream_third: {
    backgroundColor: cream,
    flex: 1,
  },
  white_two_thirds: {
    // padding: 50,
    backgroundColor: white,
    flex: 3,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  base_three: {
    // padding: 50,
    backgroundColor: light_blue,
    flex: 2,
    alignItems: "baseline",
    // justifyContent: "center",
    // alignItems: "center",
  },

  logo: {
    alignContent: "center",
    width: 400,
    height: 400,
  },
  arrow: {
    width: 100,
    height: 200,
    justifyContent: "flex-start",
    flex: 1,
  },
  profile: {
    resizeMode: "contain",
    position: "absolute",
    width: 50,
    height: 50,
    justifyContent: "flex-end",
    flex: 1,
    right: 40,
    top: 80,
  },
  company_name_text: {
    fontSize: 58,
    paddingTop: 20,
    paddingBottom: 20,
    textAlign: "center",
    color: white,
  },
  large_black_text: {
    fontSize: 40,
    textAlign: "left",
    color: black,
    left: "6%",
    fontWeight: "bold",
  },
  text_under_company_name: {
    fontSize: 15,
    textAlign: "center",
    color: white,
  },
  small_black_text: {
    fontSize: 12,
    textAlign: "left",
    color: black,
    left: "2%",
    padding: "4%",
    fontWeight: "bold",
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: white,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  appButtonText: {
    fontSize: 18,
    color: black,
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  lets_get_started_box: {
    color: medium_blue,
    flex: 1,
  },
  login_box: {
    color: dark_blue,
    flex: 2,
  },

  inputView: {
    backgroundColor: white,
    borderRadius: 30,
    borderColor: light_blue,
    borderWidth: 2,
    width: "70%",
    height: 45,
    marginBottom: 20,
    left: left_to_center,
    alignItems: "center",
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    textAlign: "left",
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
  },

  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: light_blue,
    left: "10%",
  },
});
