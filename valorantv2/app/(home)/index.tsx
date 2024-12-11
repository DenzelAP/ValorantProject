import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = () => {
  const router = useRouter();

  const showHighscores = async () => {
    try {
      const existingScores = await AsyncStorage.getItem("highscores");
      const highscores = existingScores ? JSON.parse(existingScores) : [];
      highscores.sort((a: { score: number }, b: { score: number }) => b.score - a.score); // Sort highscores in descending order to show the highest score first
      const scoresMessage = highscores
        .map(
          (score: { name: string; score: number }, index: number) =>
            `${index + 1}. ${score.name}: ${score.score}`
        )
        .join("\n");
      Alert.alert("Highscores", scoresMessage || "No highscores available");
    } catch (error) {
      console.error("Failed to fetch highscores", error);
      Alert.alert("Error", "Failed to fetch highscores");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/valorant-logo.jpg")}
        style={{ width: 200, height: 200 }}
      />
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            router.push("/matchingGame");
          }}
        >
          <Text style={styles.buttonText}>PLAY</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={showHighscores}>
          <Text style={styles.buttonText}>SHOw HIGHSCORES</Text>
        </TouchableOpacity>
      </View>
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
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  button: {
    backgroundColor: "#ff4655",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    fontFamily: "valorant-font",
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});

export default Home;
