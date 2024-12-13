import { Character, Weapon } from "@/types";
import React, { createContext, useEffect, useState } from "react";

export interface DataContext {
  characters: Character[];
  weapons: Weapon[];
  loading: boolean;
  loadCharacters: () => void;
  loadWeapons: () => void;
  createCharacter: (character: Character) => void;
}

export const DataContext = createContext<DataContext>({
  characters: [],
  weapons: [],
  loading: false,
  loadCharacters: () => {},
  loadWeapons: () => {},
  createCharacter: (character: Character) => {},
});

const fetchToken = async () => {
  try {
    const tokenResponse = await fetch(
      "https://sampleapis.assimilate.be/token?email=s150986@ap.be"
    );
    const token = await tokenResponse.json();
    if (!token.token) throw new Error("Failed to fetch token");
    return token;
  } catch (error) {
    console.error(error);
  }
};

const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [weapons, setWeapons] = useState<Weapon[]>([]);
  const [loading, setLoading] = useState(false);

  const loadWeapons = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://valorant-api.com/v1/weapons");
      const data = await response.json();
      setWeapons(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadCharacters = async () => {
    setLoading(true);
    try {
      const token = await fetchToken();

      const charactersResponse = await fetch(
        "https://valorant-api.com/v1/agents"
      );
      const createdCharactersResponse = await fetch(
        "https://sampleapis.assimilate.be/data/generic_endpoint_1",
        {
          method: "GET",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            authorization: `Bearer ${token.token}`,
          },
        }
      );

      const characterData = await charactersResponse.json(); // This is the data from the Valorant API
      const createdCharactersData = await createdCharactersResponse.json(); // This is the data from the generic endpoint

      setCharacters([
        ...characterData.data,
        ...(createdCharactersData ? createdCharactersData : []),
      ]); // Merge the two arrays of characters together
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createCharacter = async (character: Character) => {
    try {
      console.log("Creating character:", character);

      const token = await fetchToken();

      const response = await fetch(
        "https://sampleapis.assimilate.be/data/generic_endpoint_1",
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

  useEffect(() => {
    loadCharacters();
    loadWeapons();
  }, []);

  return (
    <DataContext.Provider
      value={{
        characters,
        weapons,
        loading,
        loadCharacters,
        loadWeapons,
        createCharacter,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
