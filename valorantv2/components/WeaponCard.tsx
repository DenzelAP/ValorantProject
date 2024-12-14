import { Weapon } from "@/types";
import { useRouter } from "expo-router";
import { Pressable, View, StyleSheet, Image, Text } from "react-native";

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

const styles = StyleSheet.create({
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
    fontFamily: "valorant-font",
    color: "#ff4655",
  },
});

export default WeaponCard;
