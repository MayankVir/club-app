import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { ClubContext } from "../context/ClubContext";
import { getClubList } from "../services/api";
import DropDownPicker from "react-native-dropdown-picker";
import { subscriptionTypes } from "../constants/subscriptions";

const HomeScreen = ({ navigation }) => {
  const {
    clubs,
    address,
    setAddress,
    setClubs,
    selectedClub,
    setSelectedClub,
    subscriptionType,
    setSubscriptionType,
    image,
    setImage,
  } = useContext(ClubContext);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [openSubscriptionType, setOpenSubscriptionType] = useState(false);
  const [items, setItems] = useState([]);

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
          clubObj: club,
        }));
        setItems(formattedClubs);
        setClubs(response.data);
      } catch (err) {
        setError("Error fetching clubs");
      } finally {
        setIsLoading(false);
      }
    };

    fetchClubs();
  }, []);

  if (isLoading) return <ActivityIndicator size="large" color="#0000ff" />;

  return (
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

      <DropDownPicker
        open={open}
        value={selectedClub}
        items={items}
        setOpen={setOpen}
        setValue={setSelectedClub}
        setItems={setItems}
        placeholder="Select a club"
        onChangeValue={(value) => {
          const foundClub = clubs.find((item) => item.id === value);

          console.log({ foundClub });

          if (foundClub) {
            const obj = {
              ...foundClub,
              label: foundClub.club_name,
              value: foundClub.id,
            };

            console.log({ obj });

            setSelectedClub(obj);
          }
        }}
        style={styles.dropdown}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={(text) => setAddress(text)}
      />
      <DropDownPicker
        open={openSubscriptionType}
        value={subscriptionType}
        items={subscriptionTypes}
        setOpen={setOpenSubscriptionType}
        setValue={setSubscriptionType}
        placeholder="Select a subscription"
        onChangeValue={(value) => {
          const foundSubscrpition = subscriptionTypes.find(
            (item) => item.value === value,
          );

          console.log({ foundSubscrpition });

          setSubscriptionType(foundSubscrpition);
        }}
        style={{ ...styles.dropdown, zIndex: -1 }}
      />

      <View style={styles.submitButton}>
        <Button
          title="Submit"
          onPress={handleSubmit}
          disabled={
            !!subscriptionType || address.length === 0 || selectedClub === null
          }
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
  profilePictureContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  profilePictureText: {
    textAlign: "center",
    color: "#000",
  },
  input: {
    width: "70%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
    fontSize: 18,
  },
  submitButton: {
    marginTop: 20,
    width: "30%",
  },
  dropdown: {
    marginBottom: 20,
    marginLeft: 190,
    width: "70%",
    backgroundColor: "#fafafa",
    borderColor: "#ccc",
  },
  dropdownContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    width: 70,
  },
});

export default HomeScreen;
