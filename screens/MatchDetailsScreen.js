import React, { useContext } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { ClubContext } from "../context/ClubContext";

const MatchDetailsScreen = ({ navigation }) => {
  const {
    clubName,
    address,
    subscriptionType,
    image,
    saveMatchDetails,
    playerName1,
    player1Score,
    playerName2,
    player2Score,
    resetState,
  } = useContext(ClubContext);

  const handleLogout = () => {
    const matchDetails = {
      clubName,
      address,
      subscriptionType,
      player1Name: playerName1,
      player2Name: playerName2,
      player1Score: player1Score,
      player2Score: player2Score,
      date: new Date().toISOString(),
    };

    saveMatchDetails(matchDetails);
    resetState();
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      {image && <Image source={{ uri: image }} style={styles.clubImage} />}

      <View style={styles.detailContainer}>
        <View style={styles.detailBox}>
          <Text style={styles.detailText}>Club Name: </Text>
          <Text style={styles.detailTextValue}>{clubName}</Text>
        </View>
        <View style={styles.detailBoxPlayer}>
          <Text style={styles.detailText}>Player 1: </Text>
          <Text style={styles.detailTextValue}>
            {playerName1} - {player1Score}
          </Text>
        </View>
      </View>

      <View style={styles.detailContainer}>
        <View style={styles.detailBox}>
          <Text style={styles.detailText}>Address: </Text>
          <Text style={styles.detailTextValue}>{address}</Text>
        </View>
        <View style={styles.detailBoxPlayer}>
          <Text style={styles.detailText}>Player 2: </Text>
          <Text style={styles.detailTextValue}>
            {playerName2} - {player2Score}
          </Text>
        </View>
      </View>

      <View style={styles.detailBox}>
        <Text style={styles.detailText}>Subscription Type: </Text>
        <Text style={styles.detailTextValue}>{subscriptionType}</Text>
      </View>

      <View style={styles.detailBox}>
        <Text
          style={styles.detailText}
          onPress={() => navigation.navigate("MatchesHistoryScreen")}
        >
          Show Matches History
        </Text>
      </View>

      <View style={styles.detailBox}>
        <Text style={styles.detailText}>Show Notifications</Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e3b63",
    padding: 20,
    justifyContent: "space-between",
    paddingTop: 100,
  },
  detailContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    gap: 32,
  },
  header: {
    fontSize: 24,
    color: "#000",
    fontWeight: "bold",
    marginBottom: 10,
  },
  clubImage: {
    position: "absolute",
    top: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  detailBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "start",
    justifyContent: "start",
    gap: 5,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    width: "50%",
  },
  detailBoxPlayer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "start",
    justifyContent: "start",
    gap: 5,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    width: "40%",
  },
  detailText: {
    fontSize: 18,
    color: "#1e3b63",
  },
  detailTextValue: {
    fontSize: 18,
    color: "#1e3b63",
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#fff",
    padding: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignSelf: "flex-end",
  },
  logoutButtonText: {
    fontSize: 30,
    color: "#1e3b63",
    fontWeight: "bold",
  },
});

export default MatchDetailsScreen;
