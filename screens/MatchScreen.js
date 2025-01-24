import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { ClubContext } from "../context/ClubContext";
import { saveMatchDetails } from "../services/api";

const MatchScreen = ({ navigation }) => {
  const {
    image,
    playerName1,
    setPlayerName1,
    playerName2,
    setPlayerName2,
    selectedClub,
    address,
    subscriptionType,
    setMatchId,
  } = useContext(ClubContext);

  const handleStartMatch = async () => {
    const matchDetails = {
      club_id: selectedClub.id,
      address,
      subscriptionType: subscriptionType.value,
      player1Name: playerName1,
      player2Name: playerName2,
      player1Score: 0,
      player2Score: 0,
      date: new Date().toISOString(),
    };

    try {
      const response = await saveMatchDetails(matchDetails);
      if (response.matchId) {
        setMatchId(response.matchId);
        navigation.navigate("Score");
      } else {
        Alert.alert("Error", "Failed to start match");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to start match");
    }
  };

  return (
    <View style={styles.container}>
      {image && <Image source={{ uri: image }} style={styles.clubImage} />}

      <Text style={styles.title}>Match 1</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Player Name 1"
          value={playerName1}
          onChangeText={(text) => setPlayerName1(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Player Name 2"
          value={playerName2}
          onChangeText={(text) => setPlayerName2(text)}
        />
      </View>

      <View style={styles.startButton}>
        <Button
          title="Start Now"
          onPress={handleStartMatch}
          disabled={playerName1.length === 0 || playerName2.length === 0}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e3b63",
    alignItems: "center",
    justifyContent: "center",
  },
  clubImage: {
    position: "absolute",
    top: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  input: {
    width: "45%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
    fontSize: 18,
  },
  startButton: {
    marginTop: 20,
    width: "50%",
  },
});

export default MatchScreen;
