import React, { useState } from "react";
import { 
  View, Text, Image, TouchableOpacity, StyleSheet, Alert, ScrollView 
} from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";
import { Platform } from "react-native";

export default function ImagePickerScreen() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [recognitionResult, setRecognitionResult] = useState(null);

  // Request camera permission
  const requestCameraPermission = async () => {
    const permission =
      Platform.OS === "android"
        ? PERMISSIONS.ANDROID.CAMERA
        : PERMISSIONS.IOS.CAMERA;

    const result = await check(permission);
    if (result === RESULTS.GRANTED) {
      openCamera();
    } else {
      const requestResult = await request(permission);
      if (requestResult === RESULTS.GRANTED) {
        openCamera();
      } else {
        Alert.alert("Permission Required", "Camera access is required to use this feature.");
      }
    }
  };

  // Open camera
  const openCamera = () => {
    launchCamera({ mediaType: "photo", saveToPhotos: true }, handleImageResponse);
  };

  // Open gallery
  const openGallery = () => {
    launchImageLibrary({ mediaType: "photo" }, handleImageResponse);
  };

  // Handle image selection response
  const handleImageResponse = (response) => {
    if (response.didCancel) {
      console.log("User cancelled image picker");
    } else if (response.errorCode) {
      console.error("Image Picker Error:", response.errorMessage);
    } else {
      const imageUri = response.assets[0]?.uri;
      setSelectedImage(imageUri);
    }
  };

  // Upload image to API
  const uploadImage = async () => {
    if (!selectedImage) {
      Alert.alert("No Image Selected", "Please select or capture an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("image", {
      uri: selectedImage,
      type: "image/jpeg",
      name: "photo.jpg",
    });

    try {
      console.log("🚀 Uploading image to API...");
      const response = await fetch("http://15.207.16.228:8000/identify_faces/", {
        method: "POST",
        body: formData,
        headers: {
          "Accept": "application/json",
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("📡 Response Status:", response.status);

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      const data = await response.json();
      console.log("✅ API Response:", data);
      setRecognitionResult(data);
    } catch (error) {
      console.error("🚨 Upload Error:", error);
      Alert.alert("Upload Failed", "There was an error uploading the image.");
    }
  };

  return (
    <ScrollView style={styles.containerh1}>
      <View style={styles.container}>
        <Text style={styles.title}>Capture or Pick an Image</Text>

        {selectedImage ? (
          <Image source={{ uri: selectedImage }} style={styles.imagePreview} />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>No Image Selected</Text>
          </View>
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={requestCameraPermission}>
            <Text style={styles.buttonText}>Open Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={openGallery}>
            <Text style={styles.buttonText}>Pick from Gallery</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
          <Text style={styles.uploadButtonText}>Upload Image</Text>
        </TouchableOpacity>

        {recognitionResult && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>{recognitionResult.message}</Text>
            {recognitionResult.recognized_students.map((student, index) => (
              <Text key={index} style={styles.resultText}>
                {student.name} ({student.student_id})
              </Text>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  containerh1: { flex: 1, padding: 10, backgroundColor: "#fff", color: 'black' },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20, color: 'black'
  },
  imagePreview: {
    width: 400,
    height: 600,
    borderRadius: 10,
    marginBottom: 20,
  },
  placeholder: {
    width: 400,
    height: 600,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  placeholderText: {
    color: "#999",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20, color: 'black'
  },
  button: {
    backgroundColor: "#9747FF",
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center", color: 'black'
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  uploadButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  uploadButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  resultContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    width: "100%",
  },
  resultText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5, color: 'black'
  },
});