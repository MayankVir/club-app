import React, { useContext, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { ClubContext } from "../context/ClubContext";
import { updateScore } from "../services/api";

const ScoreScreen = ({ navigation }) => {
  const {
    image,
    player1Score,
    setPlayer1Score,
    player2Score,
    setPlayer2Score,
    matchId,
  } = useContext(ClubContext);

  const updateScoreAPI = async (p1Score, p2Score) => {
    try {
      await updateScore({
        match_id: matchId,
        player1Score:
          player1Score === p1Score
            ? 0
            : player1Score < p1Score
            ? 1
            : player1Score > p1Score
            ? -1
            : 0,
        player2Score:
          player2Score === p2Score
            ? 0
            : player2Score < p2Score
            ? 1
            : player2Score > p2Score
            ? -1
            : 0,
      });
      setPlayer1Score(p1Score);
      setPlayer2Score(p2Score);
    } catch (error) {
      Alert.alert("Error", "Failed to update score");
    }
  };

  const incrementPlayer1Score = async () => {
    await updateScoreAPI(player1Score + 1, player2Score);
  };

  const decrementPlayer1Score = async () => {
    if (player1Score > 0) {
      await updateScoreAPI(player1Score - 1, player2Score);
    }
  };

  const incrementPlayer2Score = async () => {
    await updateScoreAPI(player1Score, player2Score + 1);
  };

  const decrementPlayer2Score = async () => {
    if (player2Score > 0) {
      await updateScoreAPI(player1Score, player2Score - 1);
    }
  };

  const handleEndMatch = () => {
    navigation.navigate("MatchDetails");
  };
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
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
                disabled={player1Score === 0}
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
                disabled={player2Score === 0}
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
    </ScrollView>
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
  scrollContainer: {
    flexGrow: 1,
  },
});

export default ScoreScreen;
