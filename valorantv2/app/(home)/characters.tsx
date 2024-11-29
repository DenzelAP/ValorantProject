import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TextInput,
  Pressable,
} from "react-native";
import { Character } from "@/types";
import { useContext } from "react";
import { DataContext } from "@/components/DataProvider";
import { useRouter } from "expo-router";

interface CharacterCardProps {
  item: Character;
}

const CharacterCard = ({ item }: CharacterCardProps) => {
  const router = useRouter();
  return (
    <Pressable onPress={() => { router.push(`/${item.uuid}`) }}>
      {({ pressed }) => (
        <View style={[styles.card, { opacity: pressed ? 0.5 : 1 }]}>
          <Text style={styles.characterName}>{item.displayName}</Text>
          <Image
            source={{ uri: item.displayIcon }}
            style={styles.characterImage}
            resizeMode="cover"
          />
        </View>
      )}
    </Pressable>
  );
};

const Characters = () => {
  const [filter, setFilter] = useState("");

  const { characters } = useContext(DataContext);

  const filteredCharacters = characters.filter((character) =>
    character.displayName.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SELECT AN AGENT</Text>

      <View>
        <TextInput
          onChangeText={(text) => setFilter(text)}
          value={filter}
          placeholder="Search for an agent..."
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

      <FlatList
        data={filteredCharacters}
        renderItem={({ item }) => <CharacterCard item={item} />}
        keyExtractor={(item) => item.uuid}
      />
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
    marginBottom: 16,
    textAlign: "center",
    color: "white",
  },
  listContainer: {
    paddingBottom: 16,
  },
  card: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: "#5A002C",
    borderWidth: 1,
    borderColor: "red",
    alignItems: "center",
    padding: 16,
    elevation: 4,
  },
  characterImage: {
    width: 150,
    height: 150,
    borderRadius: 8,
  },
  characterName: {
    fontFamily: "valorant",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 8,
    textAlign: "center",
    color: "white",
  },
});

export default Characters;
