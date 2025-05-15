import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {Platform} from 'react-native';

export default function ImagePickerScreen({navigation}) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [recognitionResult, setRecognitionResult] = useState(null);

  // Request camera permission
  const requestCameraPermission = async () => {
    const permission =
      Platform.OS === 'android'
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
        Alert.alert(
          'Permission Required',
          'Camera access is required to use this feature.',
        );
      }
    }
  };

  // Open camera
  const openCamera = () => {
    launchCamera({mediaType: 'photo', saveToPhotos: true}, handleImageResponse);
  };

  // Open gallery
  const openGallery = () => {
    launchImageLibrary({mediaType: 'photo'}, handleImageResponse);
  };

  // Handle image selection response
  const handleImageResponse = response => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.errorCode) {
      console.error('Image Picker Error:', response.errorMessage);
    } else {
      const imageUri = response.assets[0]?.uri;
      setSelectedImage(imageUri);
    }
  };

  // Upload image to API
  const uploadImage = async () => {
    if (!selectedImage) {
      Alert.alert(
        'No Image Selected',
        'Please select or capture an image first.',
      );
      return;
    }

    const formData = new FormData();
    formData.append('image', {
      uri: selectedImage,
      type: 'image/jpeg',
      name: 'photo.jpg',
    });

    try {
      console.log('🚀 Uploading image to API...');
      const response = await fetch(
        'http://15.207.16.228:8000/identify_faces/',
        {
          method: 'POST',
          body: formData,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      console.log('📡 Response Status:', response.status);

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ API Response:', data);
      setRecognitionResult(data);
    } catch (error) {
      console.error('🚨 Upload Error:', error);
      Alert.alert('Upload Failed', 'There was an error uploading the image.');
    }
  };

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.topButtonsContainer}>
          <TouchableOpacity style={styles.topButton}>
            <Text style={styles.topButtonText}>Enroll Student</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigation.navigate("StudentRegistration")} style={styles.topButton}>
            <Text style={styles.topButtonText}>Register Student</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Capture or Pick an Image</Text>
        {selectedImage ? (
          <Image source={{uri: selectedImage}} style={styles.imagePreview} />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>No Image Selected</Text>
          </View>
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={requestCameraPermission}>
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

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  topButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    width: '100%',
  },
  topButton: {
    flex: 1,
    marginHorizontal: 6,
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  topButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    marginVertical: 16,
    textAlign: 'center',
  },
  imagePreview: {
    width: '100%',
    height: 400,
    borderRadius: 12,
    marginBottom: 20,
    resizeMode: 'cover',
  },
  placeholder: {
    width: '100%',
    height: 400,
    borderRadius: 12,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  placeholderText: {
    fontSize: 16,
    color: '#aaa',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 6,
    backgroundColor: '#9747FF',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 15,
    color: '#fff',
    fontWeight: '600',
  },
  uploadButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  resultContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 16,
    width: '100%',
    marginTop: 10,
  },
  resultText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 6,
    fontWeight: '500',
  },
});
