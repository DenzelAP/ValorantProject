import { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Image,
  TextInput,
} from "react-native";
import { Weapon } from "@/types";

interface WeaponCardProps {
  item: Weapon;
}

const WeaponCard = ({ item }: WeaponCardProps) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.displayIcon }} style={styles.weaponImage} />
      <Text style={styles.weaponName}>{item.displayName}</Text>
    </View>
  );
};

const Weapons = () => {
  const [weapons, setWeapons] = useState<Weapon[]>([]);
  const [filter, setFilter] = useState("");

  const loadWeapons = async () => {
    try {
      const response = await fetch("https://valorant-api.com/v1/weapons");
      const data = await response.json();
      setWeapons(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const filteredWeapons = weapons.filter((weapon) =>
    weapon.displayName.toLowerCase().includes(filter.toLowerCase())
  );

  useEffect(() => {
    loadWeapons();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SELECT A WEAPON</Text>

      <View>
        <TextInput
          onChangeText={(text) => setFilter(text)}
          value={filter}
          placeholder="Search for an weapon..."
          style={{
            backgroundColor: "#fff",
            borderColor: "#ddd",
            height: 50,
            width: 325,
            borderRadius: 8,
            padding: 15,
            marginBottom: 10,
            borderWidth: 1,
            elevation: 10,
          }}
        />
      </View>

      <View>
        <FlatList
          data={filteredWeapons}
          renderItem={({ item }) => <WeaponCard item={item} />}
          keyExtractor={(item) => item.uuid}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "black",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    marginBottom: 16,
  },
  card: {
    padding: 16,
    backgroundColor: "#5A002C",
    borderWidth: 2,
    borderColor: "FF4D4D",
    borderRadius: 8,
    marginBottom: 16,
  },
  weaponImage: {
    width: 300,
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
    resizeMode: "contain",
  },
  weaponName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
});

export default Weapons;
