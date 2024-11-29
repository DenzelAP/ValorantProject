import { View, Image, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useRouter } from "expo-router";

const Home = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/valorant-logo.jpg")}
        style={{ width: 200, height: 200 }}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          router.push("/matchingGame");
        }}
      >
        <Text style={styles.buttonText}>Start Game</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  button: {
    backgroundColor: "#ff4655",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});

export default Home;
