import { useContext, useState } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import { DataContext } from "@/components/DataProvider";
import FilterInput from "@/components/FilterInput";
import WeaponCard from "@/components/WeaponCard";

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
        <FilterInput
          filter={filter}
          onChangeText={setFilter}
          placeholder="Search for a weapon..."
        />
        <Text style={styles.amount}>
          {filteredWeapons.length} Weapons found
        </Text>
      </View>

      <View style={{ flex: 1 }}>
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
    fontFamily: "valorant-font",
    textAlign: "center",
    color: "white",
    marginBottom: 16,
  },
  amount: {
    color: "white",
    textAlign: "center",
    marginBottom: 5,
  },
});

export default Weapons;
