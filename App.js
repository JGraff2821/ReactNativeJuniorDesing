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
  FlatList,
} from "react-native";
import axios from "axios";
import { Modal } from "react-bootstrap";
import Icon from "react-native-vector-icons/FontAwesome";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { BackgroundImage } from "react-native-elements/dist/config";

const localStorage = window.localStorage;

const baseUrl = "https://4d644b47131a.ngrok.io";
const url = "/User/ReadAccount";
global.logged_in = false;
global.user_data = [
  { keyWorkA: 0, name: "Cholesterol (Crestor 10mg)", nickname: "Cholesterol" },
  {
    keyWorkA: 1,
    name: "Presentation Day (Xanax 0.5mg)",
    nickname: "Presentation Day",
  },
  {
    keyWorkA: 2,
    name: "Blood Thinner (Warfarin 50mg)",
    nickname: "Blood Thinner",
  },
  { keyWorkA: 3, name: "Blood Sugar(Metformin 15mg)", nickname: "Blood Sugar" },
];
global.nextDateID = 9;
global.bottleOneTimes = [
  {
    id: "0",
    Date: new Date("May 09, 2021 10:34:23").toString(),
  },
  {
    id: "1",
    Date: new Date("May 7, 2021 15:07:51").toString(),
  },
  {
    id: "2",
    Date: new Date("May 4, 2021 08:01:03").toString(),
  },
  {
    id: "3",
    Date: new Date("April 27, 2021 11:42:03").toString(),
  },
  {
    id: "4",
    Date: new Date("April 22, 2021 10:41:57").toString(),
  },
  {
    id: "5",
    Date: new Date("April 20, 2021 17:12:21").toString(),
  },
  {
    id: "6",
    Date: new Date("April 16, 2021 15:37:41").toString(),
  },
  {
    id: "7",
    Date: new Date("April 15, 2021 9:21:09").toString(),
  },
  {
    id: "8",
    Date: new Date("April 13, 2021 11:45:03").toString(),
  },
];

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
      global.medicine_names = [];
      for (
        let i = 0;
        i < global.user_dictionary["medicine_bottles"].length;
        i++
      ) {
        console.log(
          global.user_dictionary["medicine_bottles"][i]["bottle_name"]
        );
        global.medicine_names.push(
          global.user_dictionary["medicine_bottles"][i]["bottle_name"]
        );
      }
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
        <Stack.Screen name="BottleInfo" component={bottleScreen} />
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
        source={require("./assets/LogoDesignCropped.png")}
        resizeMode={"contain"}
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
  if (global.logged_in) {
    navigation.navigate("Home");
  }
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

        <TouchableOpacity
          style={styles.loginBtn}
          onPress={async () => {
            const data = await postDataUsingSimplePostCall(email, password);
            navigation.navigate("Start");
            navigation.navigate("Home");
          }}
        >
          <Text style={styles.TextInput}>Login</Text>
        </TouchableOpacity>
        <View style={{ backgroundColor: white }}>
          <TouchableOpacity
            style={{
              width: "23%",
              left: "70%",
              bottom: "1%",
              borderRadius: 25,
              height: 30,
              marginTop: 40,
              backgroundColor: white,
              borderColor: dark_blue,
              borderWidth: 0,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => {}}
          >
            <Text style={styles.TextInput_Home}> New User? </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
// comment
function Item({ item }, { navigation }) {
  return (
    <View style={styles.listItem}>
      <View style={{ alignItems: "flex-start", flex: 1 }}>
        <Text style={styles.small_black_scrollist_text}>{item.name}</Text>
      </View>
      <View style={{ alignItems: "flex-end" }}>
        <TouchableOpacity
          onPress={() => {
            global.selectedItem = item.keyWorkA;
            global.navigation.navigate("BottleInfo");
            console.log("New Bottle Key:" + item.keyWorkA);
          }}
        >
          <Image
            source={require("./assets/RightArrow.png")}
            style={{ width: 30, height: 30, flex: 1 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

function Dates({ item }) {
  console.log(item.date);
  return (
    <View style={styles.listItem}>
      <View style={{ alignItems: "flex-start", flex: 1, paddingBottom: "10%" }}>
        <Text style={styles.small_black_scrollist_text}>
          {item.Date.substring(0, 24)}
        </Text>
      </View>
    </View>
  );
}

function homeScreen({ navigation }) {
  const [medicines, setMeds] = useState(global.user_data);
  global.navigation = navigation;
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 2,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: cream,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Start");
            global.logged_in = false;
          }}
        >
          <Text
            style={{
              fontSize: 15,
              textAlign: "left",
              color: black,
              left: "35%",
              top: "300%",
              fontWeight: "bold",
            }}
          >
            LOGOUT
          </Text>
        </TouchableOpacity>
        <ImageBackground
          source={require("./assets/LogoDesignCropped.png")}
          resizeMode={"contain"}
          style={styles.cream_third}
        >
          <Text style={styles.small_black_text_home}>OVERVIEW</Text>
          <Text style={styles.large_black_text_home}>Medications</Text>
          <Text style={styles.small_grey_text_home}>
            {new Date().toDateString()}
            {/*Today's Date: 5/12/2021*/}
          </Text>
        </ImageBackground>
      </View>

      <View style={styles.container_no_direction}>
        <FlatList
          style={{ flex: 1 }}
          data={medicines}
          renderItem={({ item }) => (
            <Item item={item} navigation={navigation} />
          )}
          keyExtractor={(item) => item.name}
        />
      </View>
      <View style={{ backgroundColor: white }}>
        <TouchableOpacity style={styles.HomeBtn} onPress={() => {}}>
          <Text style={styles.TextInput_Home}>New Bottle</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function bottleScreen({ navigation }) {
  const [bottleOne, setBottleOne] = useState(global.bottleOneTimes);
  const [medicines, setMeds] = useState(global.user_data);
  return (
    <View style={{ flexDirection: "column", flex: 1, backgroundColor: cream }}>
      <View
        style={{ flex: 1, backgroundColor: cream, flexDirection: "column" }}
      ></View>
      <BackgroundImage
        source={require("./assets/LightBlueLogo-03.png")}
        resizeMode={"contain"}
        style={{ flex: 2, backgroundColor: cream, left: "30%" }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <Text
            style={{
              fontSize: 14,
              textAlign: "left",
              color: black,
              right: "27%",
              top: "100%",
              fontWeight: "bold",
            }}
          >
            BACK HOME
          </Text>
        </TouchableOpacity>
      </BackgroundImage>
      <View
        style={{
          flex: 1,
          backgroundColor: cream,
          justifyContent: "flex-end",
          padding: "2%",
        }}
      >
        <Text style={styles.large_blue_text_bottle}>Meds Taken:</Text>
        <Text style={styles.large_blue_text_bottle}>
          {" "}
          ({global.user_data[global.selectedItem].nickname})
        </Text>
      </View>

      <View style={{ flex: 8, backgroundColor: white }}>
        <FlatList
          style={{ flex: 1 }}
          data={global.bottleOneTimes}
          renderItem={({ item }) => <Dates item={item} />}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={{ flex: 2, backgroundColor: white }}>
        <TouchableOpacity
          style={{
            width: "23%",
            left: "40%",
            bottom: "10%",
            borderRadius: 25,
            height: 30,
            marginTop: 40,
            backgroundColor: light_blue,
            borderColor: dark_blue,
            borderWidth: 3,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => {
            let new_object = {
              id: global.nextDateID.toString(),
              Date: new Date().toString(),
            };
            global.nextDateID += 1;
            global.bottleOneTimes.unshift(new_object);
          }}
        >
          <Text style={styles.TextInput_Home}>Pill Taken</Text>
        </TouchableOpacity>
      </View>
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
  canvas_top_right: {
    backgroundColor: dark_blue,
    height: 20,
    width: 20,
    position: "absolute",
    left: 10,
    top: 10,
  },
  container_flex_two: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  button_container: {},
  canvas: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    height: undefined,
    width: undefined,
  },
  container_horizontal: {
    flexDirection: "row",
    flex: 1,
  },
  container_no_direction: {
    flex: 2,
    backgroundColor: white,
  },
  container_flex_end: {
    justifyContent: "flex-end",
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
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    width: 250,
    height: 250,
    top: "20%",
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
  arrow_bottles: {
    width: 150,
    height: 200,
    position: "absolute",
    left: 0,
    top: 0,
  },

  arrow_scroll: {
    flex: 1,
    height: undefined,
    width: undefined,
    justifyContent: "flex-end",
    alignSelf: "stretch",
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
  large_black_text_home: {
    fontSize: 40,
    textAlign: "left",
    color: black,
    right: "10%",
    bottom: "16%",
    fontWeight: "bold",
  },
  large_blue_text_bottle: {
    fontSize: 30,
    textAlign: "left",
    color: dark_blue,
    fontWeight: "bold",
    bottom: "3%",
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
  small_black_text_home: {
    fontSize: 15,
    textAlign: "left",
    color: black,
    right: "13%",
    bottom: "13%",
    padding: "4%",
    fontWeight: "bold",
  },
  small_grey_text_home: {
    fontSize: 15,
    textAlign: "left",
    color: "#7E7E7E",
    right: "13%",
    bottom: "19%",
    padding: "4%",
    fontWeight: "bold",
  },
  small_black_scrollist_text: {
    fontSize: 15,
    textAlign: "left",
    color: black,
    left: "2%",
    fontWeight: "bold",
  },
  small_black_bottle_text: {
    fontSize: 1,
    textAlign: "left",
    color: black,
    left: "2%",
    fontWeight: "bold",
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: white,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  homeButtonContainer: {
    elevation: 8,
    backgroundColor: white,
    borderColor: dark_blue,
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
  TextInput_Home: {
    flex: 1,
    textAlign: "center",
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
  HomeBtn: {
    width: "23%",
    left: "40%",
    bottom: "100%",
    borderRadius: 25,
    height: 30,
    marginTop: 40,
    backgroundColor: light_blue,
    borderColor: dark_blue,
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  listItem: {
    margin: 10,
    padding: 10,
    backgroundColor: white,
    width: "96%",
    flex: 1,
    left: "2%",
    flexDirection: "row",
    borderRadius: 5,
    borderBottomColor: "#D4D4D4",
    borderBottomWidth: 2,
  },
});
