import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ClubProvider } from "./context/ClubContext"; // Import the ClubProvider
import HomeScreen from "./screens/HomeScreen";
import MatchScreen from "./screens/MatchScreen";
import ScoreScreen from "./screens/ScoreScreen";
import MatchDetailsScreen from "./screens/MatchDetailsScreen";
import MatchesHistoryScreen from "./screens/MatchesHistoryScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <ClubProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Match" component={MatchScreen} />
          <Stack.Screen name="Score" component={ScoreScreen} />
          <Stack.Screen name="MatchDetails" component={MatchDetailsScreen} />
          <Stack.Screen
            name="MatchesHistoryScreen"
            component={MatchesHistoryScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ClubProvider>
  );
};

export default App;
