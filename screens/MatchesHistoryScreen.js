import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  TextInput,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { ClubContext } from "../context/ClubContext";
import { getMatchHistory } from "../services/api";

const MatchesHistoryScreen = () => {
  const { matchesHistory, setMatchesHistory } = useContext(ClubContext);
  const [filterDate, setFilterDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [clubId, setClubId] = useState("");

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || filterDate;
    setShowDatePicker(false);
    setFilterDate(currentDate);
  };

  const fetchMatchHistory = async () => {
    const filters = {
      date: filterDate,
      club_id: clubId,
    };

    try {
      const history = await getMatchHistory(filters);
      const { data = [] } = history;
      console.log({ history });
      setMatchesHistory(data);
    } catch (error) {
      // console.error("Error fetching match history:", error);
    }
  };

  useEffect(() => {
    fetchMatchHistory();
  }, []);

  // const filteredMatches = matchesHistory.filter((match) => {
  //   if (!filterDate) return true;
  //   const matchDate = new Date(match.date);
  //   return matchDate.toDateString() === filterDate.toDateString();
  // });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Matches History</Text>

      <Button title="Select Date" onPress={() => setShowDatePicker(true)} />

      {showDatePicker && (
        <DateTimePicker
          value={filterDate || new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      <FlatList
        data={matchesHistory}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.matchItem}>
            <View style={styles.clubBox}>
              <Text style={styles.matchText}>
                Club: <Text style={styles.matchTextValue}>{item.clubName}</Text>
              </Text>
              <Text style={styles.matchText}>
                Address:{" "}
                <Text style={styles.matchTextValue}>{item.address}</Text>
              </Text>
              <Text style={styles.matchText}>
                Subscription:{" "}
                <Text style={styles.matchTextValue}>
                  {item.subscriptionType}
                </Text>
              </Text>
              {/* <Text style={styles.matchText}>
                Date:{" "}
                <Text style={styles.matchTextValue}>
                  {new Date(item.date).toLocaleDateString()}
                </Text>
              </Text> */}
            </View>
            <View style={styles.playerBox}>
              <Text style={styles.matchText}>
                {item.player1Name} vs {item.player2Name}
              </Text>
              <Text style={styles.matchText}>
                Score: {item.player1Score} - {item.player2Score}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e3b63",
    padding: 20,
  },
  filterContainer: {
    display: "flex",
    alignItems: "center",
    gap: 5,
  },
  header: {
    fontSize: 24,
    color: "#fff",
    marginBottom: 20,
  },
  playerBox: {
    fontWeight: "bold",
  },
  matchItem: {
    padding: 10,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    display: "flex",
    flexDirection: "row",
    gap: 64,
    justifyContent: "start",
    alignItems: "start",
    width: "100%",
  },
  matchText: {
    color: "#fff",
  },
  matchTextValue: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default MatchesHistoryScreen;
