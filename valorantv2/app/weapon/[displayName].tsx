import { DataContext } from "@/components/DataProvider";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useContext } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const WeaponsScreen = () => {
  const { displayName } = useLocalSearchParams<{ displayName: string }>();
  const { weapons } = useContext(DataContext);

  const navigation = useNavigation();

  const weapon = weapons.find((weapon) => weapon.displayName === displayName);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <View style={styles.card}>
        <View style={styles.title}>
          <Text style={styles.weaponName}>{weapon?.displayName}</Text>
        </View>
        <Image
          source={{ uri: weapon!.displayIcon }}
          style={styles.weaponImage}
        />
        <View style={styles.detailsContainer}>
          <View>
            <Text style={styles.detailsHeader}>Category</Text>
            <Text style={styles.details}>
              {weapon?.shopData?.category ?? ""}
            </Text>
          </View>
          <View>
            <Text style={styles.detailsHeader}>Price</Text>
            <Text style={styles.details}>{weapon?.shopData?.cost ?? "0"}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  weaponName: {
    fontSize: 24,
    fontFamily: "valorant-font",
    color: "#ff4655",
  },
  card: {
    padding: 16,
    backgroundColor: "lightgrey",
    borderWidth: 1,
    borderColor: "#ff4655",
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    marginBottom: 20,
  },
  weaponImage: {
    width: 300,
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
    resizeMode: "contain",
  },
  details: {
    fontSize: 16,
    fontWeight: "200",
    color: "black",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    backgroundColor: "#ff4655",
    padding: 10,
    borderRadius: 8,
  },
  backButtonText: {
    color: "white",
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 16,
    marginTop: 16,
  },
  detailsHeader: {
    fontSize: 16,
    color: "#ff4655",
  },
});

export default WeaponsScreen;
