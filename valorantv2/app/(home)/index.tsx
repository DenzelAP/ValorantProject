import { View, Image, StyleSheet } from "react-native";

const Home = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/valorant-logo.jpg")}
        style={{ width: 200, height: 200 }}
      />
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
});

export default Home;
