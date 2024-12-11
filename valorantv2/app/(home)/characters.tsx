import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TextInput,
  Pressable,
  TouchableOpacity,
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
    <Pressable
      onPress={() => {
        router.push(`/character/${item.uuid}`);
      }}
    >
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

  const { characters, loading } = useContext(DataContext);

  const router = useRouter();

  const filteredCharacters = characters.filter((character) =>
    character.displayName.toLowerCase().includes(filter.toLowerCase().trim())
  );

  filteredCharacters.splice(9, 1); // Remove duplicate agent

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SELECT AN AGENT</Text>

      <View>
        <TextInput
          onChangeText={(text) => setFilter(text)}
          value={filter}
          placeholder="Search for an agent..."
          style={styles.input}
        />

        <View>
          <Text style={{ color: "white", textAlign: "center" }}>
            {filteredCharacters.length} agents found
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              router.push("/characterCreate");
            }}
          >
            <Text style={styles.buttonText}>Create new character</Text>
          </TouchableOpacity>
        </View>
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
    marginBottom: 16,
    textAlign: "center",
    color: "white",
    fontFamily: "valorant-font",
  },
  listContainer: {
    paddingBottom: 16,
  },
  card: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 5,
    marginVertical: 10,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "lightgrey",
    borderWidth: 1,
    borderColor: "#ff4655",
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
    fontFamily: "valorant-font",
    fontSize: 18,
    marginTop: 8,
    textAlign: "center",
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
  button: {
    backgroundColor: "#ff4655",
    padding: 10,
    marginBottom: 10,
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

export default Characters;
