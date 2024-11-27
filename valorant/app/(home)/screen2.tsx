import { useEffect, useState } from "react";
import { View, FlatList, Text, StyleSheet, Image } from "react-native";
import { Weapon } from "@/types";

interface WeaponCardProps {
  item: Weapon;
}

const WeaponCard = ({ item }: WeaponCardProps) => {
    return (
        <View style={styles.card}>
            <Image
                source={{ uri: item.displayIcon }}
                style={styles.weaponImage}
            />
            <Text style={styles.weaponName}>{item.displayName}</Text>
        </View>
    );
};

const Weapons = () => {
  const [weapons, setWeapons] = useState<Weapon[]>([]);

  const loadWeapons = async () => {
    try {
      const response = await fetch("https://valorant-api.com/v1/weapons");
      const data = await response.json();
      setWeapons(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadWeapons();
  }, []);

  return (
    <FlatList
      data={weapons}
      renderItem={({ item }) => <WeaponCard item={item} />}
      keyExtractor={(item) => item.uuid}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: "#fff",
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
  },
});

export default Weapons;
