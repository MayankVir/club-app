import React, { useContext, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { ClubContext } from "../context/ClubContext";

const ScoreScreen = ({ navigation }) => {
  const {
    image,
    player1Score,
    setPlayer1Score,
    player2Score,
    setPlayer2Score,
  } = useContext(ClubContext);

  const incrementPlayer1Score = () => setPlayer1Score(player1Score + 1);
  const decrementPlayer1Score = () =>
    setPlayer1Score(player1Score > 0 ? player1Score - 1 : 0);

  const incrementPlayer2Score = () => setPlayer2Score(player2Score + 1);
  const decrementPlayer2Score = () =>
    setPlayer2Score(player2Score > 0 ? player2Score - 1 : 0);

  const handleEndMatch = () => {
    navigation.navigate("MatchDetails");
  };
  return (
    <View style={styles.container}>
      {image && <Image source={{ uri: image }} style={styles.clubImage} />}
      <View style={styles.scoreContainer}>
        <View style={styles.playerContainer}>
          <Text style={styles.score}>{player1Score}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={incrementPlayer1Score}
            >
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={decrementPlayer1Score}
            >
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.playerContainer}>
          <Text style={styles.score}>{player2Score}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={incrementPlayer2Score}
            >
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={decrementPlayer2Score}
            >
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.endButton} onPress={handleEndMatch}>
        <Text style={styles.endButtonText}>End Match</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e3b63",
    alignItems: "center",
    justifyContent: "space-between",
  },
  clubImage: {
    position: "absolute",
    top: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  scoreContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 200,
  },
  playerContainer: {
    alignItems: "center",
  },
  score: {
    fontSize: 75,
    color: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#fff",
    fontSize: 20,
    paddingVertical: 10,
    paddingHorizontal: 25,
    margin: 5,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#1e3b63",
  },
  endButton: {
    backgroundColor: "#fff",
    padding: 20,
    paddingHorizontal: 30,
    marginBottom: 20,
    borderRadius: 5,
  },
  endButtonText: {
    fontSize: 30,
    color: "#1e3b63",
    fontWeight: "bold",
  },
});

export default ScoreScreen;
