import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import { Character } from "@/types";

interface CharacterCardProps {
  item: Character;
}

const CharacterCard = ({ item }: CharacterCardProps) => {
  return (
    <View style={styles.card}>
      <Text style={styles.characterName}>{item.displayName}</Text>

      <Image
        source={{ uri: item.displayIcon }}
        style={styles.characterImage}
        resizeMode="cover"
      />
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
      <Text style={styles.title}>SELECT AGENT</Text>

      <FlatList
        data={characters}
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
    backgroundColor: "#5A002C",
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
    margin: 8,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    alignItems: "center",
    padding: 16,
    elevation: 4,
  },
  characterImage: {
    width: 75,
    height: 75,
    borderRadius: 8,
  },
  characterName: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 8,
    textAlign: "center",
  },
});

export default Characters;
