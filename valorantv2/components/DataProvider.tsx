import { Character, Weapon } from "@/types";
import React, { createContext, useEffect, useState } from "react";
import * as Font from "expo-font";

export interface DataContext {
  characters: Character[];
  weapons: Weapon[];
  loadCharacters: () => void;
  loadWeapons: () => void;
  createCharacter: (character: Character) => void;
  updateCharacter: (character: Character) => void;
}

export const DataContext = createContext<DataContext>({
  characters: [],
  weapons: [],
  loadCharacters: () => {},
  loadWeapons: () => {},
  createCharacter: (character: Character) => {},
  updateCharacter: (character: Character) => {},
});

const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [weapons, setWeapons] = useState<Weapon[]>([]);

  const loadWeapons = async () => {
    try {
      const response = await fetch("https://valorant-api.com/v1/weapons");
      const data = await response.json();
      setWeapons(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const loadCharacters = async () => {
    try {
      const tokenResponse = await fetch(
        "https://sampleapis.assimilate.be/token?email=s150986@ap.be"
      );
      const token = await tokenResponse.json();

      const charactersResponse = await fetch(
        "https://valorant-api.com/v1/agents"
      );
      const createdCharactersResponse = await fetch(
        "https://sampleapis.assimilate.be/data/generic_endpoint_5",
        {
          method: "GET",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            authorization: `Bearer ${token.token}`,
          },
        }
      );

      const characterData = await charactersResponse.json();
      const createdCharactersData = await createdCharactersResponse.json();

      setCharacters([
        ...characterData.data,
        ...(createdCharactersData ? createdCharactersData : []),
      ]);
    } catch (err) {
      console.error(err);
    }
  };

  const createCharacter = async (character: Character) => {
    try {
      console.log("Creating character:", character);

      const tokenResponse = await fetch(
        "https://sampleapis.assimilate.be/token?email=s150986@ap.be"
      );
      const token = await tokenResponse.json();
      if (!token.token) throw new Error("Failed to fetch token");

      const response = await fetch(
        "https://sampleapis.assimilate.be/data/generic_endpoint_5",
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            authorization: `Bearer ${token.token}`,
          },
          body: JSON.stringify(character),
        }
      );

      if (!response.ok)
        throw new Error(`Failed to create character: ${response.status}`);

      const newCharacter = await response.json();
      console.log("New character created:", newCharacter);

      setCharacters((prev) => [...prev, newCharacter]);
    } catch (err) {
      console.error("Error in createCharacter:", err);
    }
  };

  const updateCharacter = async (updatedCharacter: Character) => {
    try {
      console.log("Updating character:", updatedCharacter);

      // Fetch the authorization token
      const tokenResponse = await fetch(
        "https://sampleapis.assimilate.be/token?email=s150986@ap.be"
      );
      const token = await tokenResponse.json();
      if (!token.token) throw new Error("Failed to fetch token");

      // Make the PUT request to update the character
      const response = await fetch(
        `https://sampleapis.assimilate.be/data/generic_endpoint_5/${updatedCharacter.uuid}`,
        {
          method: "PUT",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            authorization: `Bearer ${token.token}`,
          },
          body: JSON.stringify(updatedCharacter),
        }
      );

      if (!response.ok)
        throw new Error(`Failed to update character: ${response.status}`);

      const updatedData = await response.json();
      console.log("Character updated successfully:", updatedData);

      // Update the state with the new character data
      setCharacters((prev) =>
        prev.map((char) =>
          char.uuid === updatedCharacter.uuid ? updatedData : char
        )
      );
    } catch (err) {
      console.error("Error in updateCharacter:", err);
    }
  };

  const loadFonts = async () => {
    await Font.loadAsync({
      valorant: require("../assets/fonts/ValorantFont.ttf"),
    });
  };

  useEffect(() => {
    loadCharacters();
    loadWeapons();
    loadFonts();
  }, []);

  return (
    <DataContext.Provider
      value={{
        characters,
        weapons,
        loadCharacters,
        loadWeapons,
        createCharacter,
        updateCharacter,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
