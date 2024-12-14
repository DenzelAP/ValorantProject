import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Vibration,
  Modal,
  TextInput,
} from "react-native";
import { DataContext } from "@/components/DataProvider";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Card {
  id: number;
  name: string;
  image: string;
  flipped: boolean;
  matched: boolean;
}

const MatchingGame: React.FC = () => {
  const { weapons } = useContext(DataContext);
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [playerName, setPlayerName] = useState("");

  const navigation = useNavigation();

  // Prepare the game deck
  useEffect(() => {
    // Ensure weapons are available before proceeding
    if (!weapons || weapons.length === 0) {
      Alert.alert("No weapons available");
      return;
    }

    // Prepare the game deck using weapon from context
    const weaponCards = weapons
      .map((weapon, index) => ({
        id: index,
        name: weapon.displayName, // Use weapon's name
        image: weapon.displayIcon || "", // Use weapon's image
        flipped: false,
        matched: false,
      }))
      .slice(0, 6); // Limit the number of cards to 6

    const deck = [...weaponCards, ...weaponCards] // Duplicate the cards to create pairs
      .map((card) => ({ ...card, flipped: false, matched: false })) // Reset flipped and matched status
      .sort(() => Math.random() - 0.5); // Shuffle the deck

    setCards(deck);
  }, [weapons]);

  // Timer logic
  useEffect(() => {
    if (timeLeft > 0 && !gameCompleted) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
        setTimeElapsed((prev) => prev + 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft, gameCompleted]);

  // Check if game is completed
  useEffect(() => {
    if (score > 0 && score === cards.length / 2) {
      setGameCompleted(true);
      setModalVisible(true);
    }
  }, [score, cards.length, timeElapsed]);

  const handleCardPress = (index: number) => {
    if (
      cards[index].flipped ||
      cards[index].matched ||
      flippedCards.length === 2
    )
      return; // Ignore if card is already flipped, matched or two cards are already flipped

    const updatedCards = [...cards];
    updatedCards[index].flipped = true;
    setCards(updatedCards);
    setFlippedCards((prev) => [...prev, index]); // Add the flipped card to the list of flipped cards

    if (flippedCards.length === 1) {
      const firstIndex = flippedCards[0]; // Get the index of the first flipped card
      const secondIndex = index; // Get the index of the second flipped card

      if (cards[firstIndex].id === cards[secondIndex].id) {
        // Check if the two flipped cards match
        updatedCards[firstIndex].matched = true;
        updatedCards[secondIndex].matched = true;
        setScore((prev) => prev + 1);
        setFlippedCards([]);
      } else {
        // If the two flipped cards do not match
        setTimeout(() => {
          Vibration.vibrate(100);
          setTimeout(() => {
            Vibration.vibrate(200);
          }, 100);
          updatedCards[firstIndex].flipped = false;
          updatedCards[secondIndex].flipped = false;
          setCards([...updatedCards]);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const resetGame = () => {
    setGameCompleted(false);
    setTimeLeft(60);
    setTimeElapsed(0);
    setScore(0);

    const weaponCards = weapons
      .map((weapon, index) => ({
        id: index,
        name: weapon.displayName,
        image: weapon.displayIcon || "",
        flipped: false,
        matched: false,
      }))
      .slice(0, 6);

    const deck = [...weaponCards, ...weaponCards]
      .map((card) => ({ ...card, flipped: false, matched: false }))
      .sort(() => Math.random() - 0.5);

    setCards(deck);
    setFlippedCards([]);
  };

  const handleSaveName = async () => {
    if (playerName.trim()) {
      try {
        const existingScores = await AsyncStorage.getItem("highscores");
        const highscores = existingScores ? JSON.parse(existingScores) : [];

        // Check if the name already exists
        const nameExists = highscores.some(
          (score: { name: string; score: number }) =>
            score.name === playerName.trim()
        ); // .some returns true if at least one element satisfies the condition
        if (nameExists) {
          Alert.alert(
            "Name Taken",
            "This name has already been used. Please choose another name."
          );
          return;
        }

        const bonusPoints = Math.ceil(timeLeft * 2);
        const finalScore = score + bonusPoints;
        const updatedScores = [
          ...highscores,
          { name: playerName.trim(), score: finalScore },
        ];
        await AsyncStorage.setItem("highscores", JSON.stringify(updatedScores));
        setModalVisible(false);
        navigation.goBack();
        Alert.alert(
          "Score Saved!",
          `Your score of ${finalScore} has been saved!`
        );
      } catch (error) {
        console.error("Failed to save score", error);
      }
    } else {
      Alert.alert("Invalid Name", "Name cannot be empty.");
    }
  };

  const handleBack = () => {
    setModalVisible(false);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Enter name to save</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Your Name"
              placeholderTextColor="#aaa"
              value={playerName}
              onChangeText={setPlayerName}
            />
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSaveName}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.playAgainButton}
                onPress={handleBack}
              >
                <Text style={styles.playAgainButtonText}>Go back</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.header}>Weapon Matcher</Text>
      <Text style={styles.timer}>Time Left: {timeLeft}</Text>
      <View style={styles.grid}>
        {cards.map((card, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.card,
              card.flipped || card.matched ? styles.flippedCard : {},
            ]}
            onPress={() => handleCardPress(index)}
            activeOpacity={0.7} // Adds a slight fade effect on press
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
      {gameCompleted && (
        <Text style={styles.finalScore}>
          Final Score: {score + Math.ceil(timeLeft * 2)}
        </Text>
      )}
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
    paddingTop: 50,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    marginTop: 15,
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  textInput: {
    width: "100%",
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  saveButton: {
    backgroundColor: "#ff4655",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    height: 40,
    justifyContent: "center",
    alignContent: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  playAgainButton: {
    backgroundColor: "#ff4655",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  playAgainButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  backButton: {
    position: "absolute",
    zIndex: 10,
    top: 50,
    left: 20,
    backgroundColor: "#ff4655",
    padding: 10,
    borderRadius: 8,
  },
  backButtonText: {
    color: "white",
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
    marginTop: 20,
  },
  timer: {
    fontSize: 14,
    color: "#ddd",
    textAlign: "center",
    marginTop: 20,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 20,
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
    width: 75,
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
  finalScore: {
    fontSize: 18,
    color: "#ddd",
    textAlign: "center",
    marginTop: 20,
  },
});

export default MatchingGame;
