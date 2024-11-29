import { Character, Weapon } from "@/types";
import React, { createContext, useEffect, useState } from "react";
import * as Font from "expo-font";


export interface DataContext {
  characters: Character[];
  weapons: Weapon[];
  loadCharacters: () => void;
  loadWeapons: () => void;
}

export const DataContext = createContext<DataContext>({
  characters: [],
  weapons: [],
  loadCharacters: () => {},
  loadWeapons: () => {},
});

const DataProvider = ({children}: {children: React.ReactNode}) => {
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
      const response = await fetch("https://valorant-api.com/v1/agents");
      const data = await response.json();
      setCharacters(data.data);
    } catch (err) {
      console.error(err);
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
    <DataContext.Provider value={{characters, weapons, loadCharacters, loadWeapons}}>
        {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
