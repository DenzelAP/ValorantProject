import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import { Character } from "@/types";

interface CharacterCardProps {
  item: Character;
}

const CharacterCard = ({ item }: CharacterCardProps) => {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: item.displayIcon }}
        style={styles.characterImage}
        resizeMode="cover"
      />
      <Text style={styles.characterName}>{item.displayName}</Text>
    </View>
  );
};

const Characters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);

  const loadCharacters = async () => {
    try {
      const response = await fetch("https://valorant-api.com/v1/agents");
      const data = await response.json();
      setCharacters(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadCharacters();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Characters</Text>

      <FlatList
        data={characters}
        renderItem={({ item }) => <CharacterCard item={item} />}
        keyExtractor={(item) => item.uuid}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  listContainer: {
    paddingBottom: 16,
  },
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    alignItems: "center",
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  characterImage: {
    width: 150,
    height: 150,
    borderRadius: 8,
  },
  characterName: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 8,
    textAlign: "center",
  },
  error: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
});

export default Characters;
