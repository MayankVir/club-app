import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ClubContext } from "../context/ClubContext";

const HomeScreen = ({ navigation }) => {
  const {
    clubName,
    setClubName,
    address,
    setAddress,
    subscriptionType,
    setSubscriptionType,
    image,
    setImage,
  } = useContext(ClubContext);

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

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={pickImage}
        style={styles.profilePictureContainer}
      >
        {image ? (
          <Image source={{ uri: image }} style={styles.profilePicture} />
        ) : (
          <View style={styles.profilePicture}>
            <Text style={styles.profilePictureText}>Club Profile Picture</Text>
          </View>
        )}
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Club Name"
        value={clubName}
        onChangeText={(text) => setClubName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={(text) => setAddress(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Subscription Type"
        value={subscriptionType}
        onChangeText={(text) => setSubscriptionType(text)}
      />

      <View style={styles.submitButton}>
        <Button title="Submit" onPress={handleSubmit} />
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
});

export default HomeScreen;
