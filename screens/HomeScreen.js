import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ClubContext } from "../context/ClubContext";
import { getClubList } from "../services/api";
import DropDownPicker from "react-native-dropdown-picker";
import { subscriptionTypes } from "../constants/subscriptions";

const HomeScreen = ({ navigation }) => {
  const {
    address,
    setAddress,
    selectedClub,
    setSelectedClub,
    subscriptionType,
    setSubscriptionType,
    setImage,
  } = useContext(ClubContext);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [openSubscriptionType, setOpenSubscriptionType] = useState(false);
  const [clubs, setClubs] = useState([]);
  const [clubValue, setClubValue] = useState(null);
  const [subscriptionValue, setSubscriptionValue] = useState(null);
  const [error, setError] = useState("");

  const pickImage = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permission to access camera roll is required!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    navigation.navigate("Match");
  };

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await getClubList();

        const formattedClubs = response.data.map((club) => ({
          label: club.club_name,
          value: club.id,
          ...club,
        }));
        setClubs(formattedClubs);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClubs();
  }, []);

  if (isLoading) return <ActivityIndicator size="large" color="#0000ff" />;

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {selectedClub?.club_image ? (
          <Image
            source={{ uri: selectedClub?.club_image }}
            style={styles.profilePicture}
          />
        ) : (
          <View style={styles.profilePicture}>
            <Text style={styles.profilePictureText}>Club Profile Picture</Text>
          </View>
        )}

        <View style={styles.innerContainer}>
          <DropDownPicker
            open={open}
            value={clubValue}
            items={clubs}
            setOpen={setOpen}
            setValue={setClubValue}
            setItems={setClubs}
            placeholder="Select a club"
            onChangeValue={(value) => {
              const foundClub = clubs.find((item) => item.id === value);
              if (foundClub) {
                setSelectedClub({
                  label: foundClub.club_name,
                  value: foundClub.id,
                  ...foundClub,
                });
              }
            }}
            style={styles.dropdown}
            containerStyle={styles.dropdownContainer}
            zIndex={3000}
          />
          <TextInput
            style={styles.input}
            placeholder="Address"
            value={address}
            onChangeText={(text) => setAddress(text)}
          />
          <DropDownPicker
            open={openSubscriptionType}
            value={subscriptionValue}
            items={subscriptionTypes}
            setOpen={setOpenSubscriptionType}
            setValue={setSubscriptionValue}
            placeholder="Select a subscription"
            onChangeValue={(value) => {
              const foundSubscription = subscriptionTypes.find(
                (item) => item.value === value
              );
              setSubscriptionType(foundSubscription);
            }}
            style={styles.dropdown}
            containerStyle={styles.dropdownContainer}
            zIndex={2000}
          />

          <View style={styles.submitButton}>
            <Button
              title="Submit"
              onPress={handleSubmit}
              disabled={
                subscriptionType === null ||
                address.length === 0 ||
                selectedClub === null
              }
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#1e3b63",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 50,
    gap: 10,
  },
  innerContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    width: "75%",
    maxWidth: 600,
  },
  profilePictureContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  profilePictureText: {
    textAlign: "center",
    color: "#000",
    fontSize: 12,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  submitButton: {
    marginTop: 15,
    width: "50%",
  },
  dropdown: {
    marginBottom: 15,
    width: "100%",
    backgroundColor: "#fafafa",
    borderColor: "#ccc",
    marginLeft: 0,
  },
  dropdownContainer: {
    width: "100%",
    alignItems: "center",
  },
  scrollContainer: {
    flexGrow: 1,
  },
});

export default HomeScreen;
