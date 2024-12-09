import { useContext, useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
} from "react-native";
import { Weapon } from "@/types";
import { DataContext } from "@/components/DataProvider";
import { useRouter } from "expo-router";

interface WeaponCardProps {
  item: Weapon;
}

const WeaponCard = ({ item }: WeaponCardProps) => {
  const router = useRouter();
  return (
    <Pressable
      onPress={() => {
        router.push(`/weapon/${item.displayName}`);
      }}
    >
      {({ pressed }) => (
        <View style={[styles.card, { opacity: pressed ? 0.5 : 1 }]}>
          <Image
            source={{ uri: item.displayIcon }}
            style={styles.weaponImage}
          />
          <Text style={styles.weaponName}>{item.displayName}</Text>
        </View>
      )}
    </Pressable>
  );
};

const Weapons = () => {
  const [filter, setFilter] = useState("");

  const { weapons } = useContext(DataContext);

  const filteredWeapons = weapons.filter((weapon) =>
    weapon.displayName.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SELECT A WEAPON</Text>

      <View>
        <TextInput
          onChangeText={(text) => setFilter(text)}
          value={filter}
          placeholder="Search for a weapon..."
          style={styles.input}
        />
        <Text style={styles.amount}>
            {filteredWeapons.length} Weapons found
          </Text>
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
    backgroundColor: "lightgrey",
    borderWidth: 1,
    borderColor: "#ff4655",
    borderRadius: 8,
    marginHorizontal: 3,
    marginVertical: 10,
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
    color: "#ff4655",
  },
  input: {
    backgroundColor: "#fff",
    borderColor: "#ff4655",
    height: 50,
    width: 325,
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    elevation: 10,
  },
  amount: {
    color: "white",
    textAlign: "center",
    marginBottom: 16,
  }
});

export default Weapons;
