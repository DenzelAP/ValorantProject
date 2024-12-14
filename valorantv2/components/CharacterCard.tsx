import { Character } from "@/types";
import { useRouter } from "expo-router";
import { Pressable, View, Text, Image, StyleSheet } from "react-native";

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

const styles = StyleSheet.create({
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
});

export default CharacterCard;
