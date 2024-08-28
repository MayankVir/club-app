import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ClubContext = createContext();

export const ClubProvider = ({ children }) => {
  const [clubName, setClubName] = useState("");
  const [address, setAddress] = useState("");
  const [subscriptionType, setSubscriptionType] = useState("");
  const [image, setImage] = useState(null);
  const [matchesHistory, setMatchesHistory] = useState([]);
  const [playerName1, setPlayerName1] = useState("");
  const [playerName2, setPlayerName2] = useState("");
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const loadMatchesHistory = async () => {
      try {
        const storedMatches = await AsyncStorage.getItem("matchesHistory");
        if (storedMatches) {
          setMatchesHistory(JSON.parse(storedMatches));
        }
      } catch (error) {
        console.error("Failed to load matches history:", error);
      }
    };

    loadMatchesHistory();
  }, []);

  const saveMatchDetails = async (matchDetails) => {
    try {
      const updatedMatches = [...matchesHistory, matchDetails];
      setMatchesHistory(updatedMatches);
      await AsyncStorage.setItem(
        "matchesHistory",
        JSON.stringify(updatedMatches),
      );
    } catch (error) {
      console.error("Failed to save match details:", error);
    }
  };

  const resetState = () => {
    setClubName("");
    setAddress("");
    setSubscriptionType("");
    setImage(null);
    setMatchesHistory([]);
    setPlayerName1("");
    setPlayerName2("");
    setPlayer1Score(0);
    setPlayer2Score(0);
    setNotifications([]);
  };

  return (
    <ClubContext.Provider
      value={{
        clubName,
        setClubName,
        address,
        setAddress,
        subscriptionType,
        setSubscriptionType,
        image,
        setImage,
        matchesHistory,
        setMatchesHistory,
        playerName1,
        setPlayerName1,
        playerName2,
        setPlayerName2,
        player1Score,
        setPlayer1Score,
        player2Score,
        setPlayer2Score,
        notifications,
        setNotifications,
        saveMatchDetails,
        resetState,
      }}
    >
      {children}
    </ClubContext.Provider>
  );
};
