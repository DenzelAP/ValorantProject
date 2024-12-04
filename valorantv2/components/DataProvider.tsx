import { Character, Weapon } from "@/types";
import React, { createContext, useEffect, useState } from "react";
import * as Font from "expo-font";

export interface DataContext {
  characters: Character[];
  weapons: Weapon[];
  loadCharacters: () => void;
  loadWeapons: () => void;
  createCharacter?: (character: Character) => void;
  deleteCharacter?: (uuid: string) => void;
}

export const DataContext = createContext<DataContext>({
  characters: [],
  weapons: [],
  loadCharacters: () => {},
  loadWeapons: () => {},
  createCharacter: (character: Character) => {},
  deleteCharacter: (uuid: string) => {},
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
      const tokenResponse = await fetch(
        "https://sampleapis.assimilate.be/token?email=s150986@ap.be"
      );
      const token = await tokenResponse.json();

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
      const newCharacter = await response.json();
      setCharacters((prevCharacters) => [...prevCharacters, newCharacter.data]);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteCharacter = async (uuid: string) => {
    try {
      const tokenResponse = await fetch(
        "https://sampleapis.assimilate.be/token?email=s150986@ap.be"
      );
      const token = await tokenResponse.json();

      await fetch(
        `https://sampleapis.assimilate.be/data/generic_endpoint_5/${uuid}`,
        {
          method: "DELETE",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            authorization: `Bearer ${token.token}`,
          },
        }
      );
    } catch (err) {
      console.error(err);
    }
  }

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
        deleteCharacter,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
