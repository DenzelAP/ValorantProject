import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { DataContext } from "@/components/DataProvider";

interface Card {
  id: number;
  name: string;
  image: string;
  flipped: boolean;
  matched: boolean;
}

const MatchingGame: React.FC = () => {
  const { weapons } = useContext(DataContext); // Use context inside the component
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Ensure weapons are available before proceeding
    if (!weapons || weapons.length === 0) {
      Alert.alert("No skins available");
      return;
    }

    // Prepare the game deck using weapon skins from context
    const skins = weapons
      .flatMap((weapon) => weapon.skins)
      .slice(76, 82)
      .map((skin, index) => ({
        id: index,
        name: skin.displayName,
        image: skin.displayIcon || "", // Ensure valid URI or fallback to empty string
        flipped: false,
        matched: false,
      }));

    const deck = [...skins, ...skins]
      .map((card) => ({ ...card, flipped: false, matched: false }))
      .sort(() => Math.random() - 0.5);
    setCards(deck);
  }, [weapons]);

  const handleCardPress = (index: number) => {
    if (
      cards[index].flipped ||
      cards[index].matched ||
      flippedCards.length === 2
    )
      return;

    const updatedCards = [...cards];
    updatedCards[index].flipped = true;
    setCards(updatedCards);
    setFlippedCards((prev) => [...prev, index]);

    if (flippedCards.length === 1) {
      const firstIndex = flippedCards[0];
      const secondIndex = index;

      if (cards[firstIndex].id === cards[secondIndex].id) {
        updatedCards[firstIndex].matched = true;
        updatedCards[secondIndex].matched = true;
        setScore((prev) => prev + 1);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          updatedCards[firstIndex].flipped = false;
          updatedCards[secondIndex].flipped = false;
          setCards([...updatedCards]);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const resetGame = () => {
    const skins = weapons
      .flatMap((weapon) => weapon.skins)
      .slice(76, 82)
      .map((skin, index) => ({
        id: index,
        name: skin.displayName,
        image: skin.displayIcon || "",
        flipped: false,
        matched: false,
      }));

    const deck = [...skins, ...skins]
      .map((card) => ({ ...card, flipped: false, matched: false }))
      .sort(() => Math.random() - 0.5);
    setCards(deck);
    setFlippedCards([]);
    setScore(0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Skin Collector</Text>
      <Text style={styles.score}>Score: {score}</Text>
      <View style={styles.grid}>
        {cards.map((card, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.card,
              card.flipped || card.matched ? styles.flippedCard : {},
            ]}
            onPress={() => handleCardPress(index)}
          >
            {card.flipped || card.matched ? (
              card.image ? (
                <Image source={{ uri: card.image }} style={styles.image} />
              ) : (
                <Text style={styles.cardBack}>{card.name}</Text>
              )
            ) : (
              <Text style={styles.cardBack}>?</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity onPress={resetGame} style={styles.resetButton}>
        <Text style={styles.resetText}>Reset Game</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#1e1e2f",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
  },
  score: {
    fontSize: 18,
    color: "#ddd",
    textAlign: "center",
    marginBottom: 20,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  card: {
    width: 80,
    height: 100,
    margin: 8,
    borderRadius: 10,
    backgroundColor: "#444",
    justifyContent: "center",
    alignItems: "center",
  },
  flippedCard: {
    backgroundColor: "#222",
  },
  cardBack: {
    fontSize: 24,
    color: "#fff",
  },
  image: {
    width: 60,
    height: 80,
    resizeMode: "contain",
  },
  resetButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#ff4655",
    borderRadius: 5,
    alignItems: "center",
  },
  resetText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default MatchingGame;
