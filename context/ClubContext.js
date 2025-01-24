import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ClubContext = createContext();

export const ClubProvider = ({ children }) => {
  const [clubs, setClubs] = useState([]);
  const [address, setAddress] = useState("");
  const [subscriptionType, setSubscriptionType] = useState(null);
  const [image, setImage] = useState(null);
  const [matchesHistory, setMatchesHistory] = useState([]);
  const [playerName1, setPlayerName1] = useState("");
  const [playerName2, setPlayerName2] = useState("");
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [selectedClub, setSelectedClub] = useState(null);
  const [matchId, setMatchId] = useState(null);

  const resetState = () => {
    setClubs([]);
    setSelectedClub(null);
    setAddress("");
    setSubscriptionType("");
    setImage(null);
    setMatchesHistory([]);
    setPlayerName1("");
    setPlayerName2("");
    setPlayer1Score(0);
    setPlayer2Score(0);
    setNotifications([]);
    setMatchId(null);
  };

  return (
    <ClubContext.Provider
      value={{
        clubs,
        setClubs,
        selectedClub,
        setSelectedClub,
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
        resetState,
        matchId,
        setMatchId,
      }}
    >
      {children}
    </ClubContext.Provider>
  );
};
