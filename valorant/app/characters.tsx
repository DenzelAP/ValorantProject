import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, StyleSheet, Dimensions } from "react-native";
import { Datum } from "@/types";

const Characters = () => {
    const [characters, setCharacters] = useState<Datum[]>([]);
    const [error, setError] = useState<string | null>(null);

    const loadCharacters = async () => {
        try {
            const response = await fetch("https://valorant-api.com/v1/agents");
            const data = await response.json();
            setCharacters(data.data);
        } catch (err) {
            console.log(err);
            setError("Failed to load characters.");
        }
    };

    useEffect(() => {
        loadCharacters();
    }, []);

    const renderCharacter = ({ item }: { item: Datum }) => (
        <View style={styles.card}>
            <Image
                source={{ uri: item.displayIcon }}
                style={styles.characterImage}
                resizeMode="cover"
            />
            <Text style={styles.characterName}>{item.displayName}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Characters</Text>
            {error ? (
                <Text style={styles.error}>{error}</Text>
            ) : (
                <FlatList
                    data={characters}
                    renderItem={renderCharacter}
                    keyExtractor={(item) => item.uuid}
                    numColumns={2} // Two columns for a grid layout
                    contentContainerStyle={styles.listContainer}
                />
            )}
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
        width: 100, // Dynamically adjust size
        height: 100,
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
