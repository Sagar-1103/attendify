import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  TouchableOpacity, 
  TextInput, 
  ScrollView, 
  Platform, 
  Alert, 
  Modal
} from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';

export default function StudentRegistration({navigation}) {
    const [department, setDepartment] = useState('');
    const [showDeptModal, setShowDeptModal] = useState(false);
    const [photoUri, setPhotoUri] = useState('');
    const [showPhotoOptions, setShowPhotoOptions] = useState(false);

    const departments = [
        'Computer Science Engineering',
        'Electronics & Communication Engineering',
        'Electrical Engineering',
        'Mechanical Engineering',
        'Civil Engineering'
    ];

    const openGallery = () => {
        const options = {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 2000,
            maxWidth: 2000,
            quality: 0.8,
            selectionLimit: 1,
            // This will help handle permission issues more gracefully
            includeExtra: true,
        };

        launchImageLibrary(options, (response) => {
            setShowPhotoOptions(false);
            
            if (response.didCancel) {
                console.log('User cancelled image picker');
                return;
            }
            
            if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorMessage);
                
                // Handle different error types differently
                if (response.errorCode === 'permission') {
                    Alert.alert(
                        'Permission Required',
                        'To select photos, please enable photo permissions in your device settings.',
                        [
                            { text: 'OK', style: 'default' }
                        ]
                    );
                } else if (response.errorCode === 'camera_unavailable') {
                    Alert.alert('Error', 'Camera not available on this device');
                } else if (response.errorCode === 'others') {
                    Alert.alert('Error', response.errorMessage || 'Something went wrong');
                }
                return;
            }
            
            if (response.assets && response.assets.length > 0) {
                console.log('Image selected: ', response.assets[0].uri);
                setPhotoUri(response.assets[0].uri);
            }
        });
    };

    const openCamera = () => {
        const options = {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 2000,
            maxWidth: 2000,
            quality: 0.8,
            saveToPhotos: true,
        };

        launchCamera(options, (response) => {
            setShowPhotoOptions(false);
            
            if (response.didCancel) {
                console.log('User cancelled camera');
                return;
            }
            
            if (response.errorCode) {
                console.log('Camera Error: ', response.errorMessage);
                
                if (response.errorCode === 'permission') {
                    Alert.alert(
                        'Permission Required',
                        'To take photos, please enable camera permissions in your device settings.',
                        [
                            { text: 'OK', style: 'default' }
                        ]
                    );
                } else {
                    Alert.alert('Error', 'Something went wrong with the camera');
                }
                return;
            }
            
            if (response.assets && response.assets.length > 0) {
                console.log('Photo taken: ', response.assets[0].uri);
                setPhotoUri(response.assets[0].uri);
            }
        });
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Text style={styles.title}>Welcome to NITG</Text>
                <Text style={styles.subtitle}>Student Registration</Text>

                <TextInput style={styles.input} placeholder="Name" placeholderTextColor="#666" />
                <TextInput style={styles.input} placeholder="Roll Number" placeholderTextColor="#666" />
                
                <TouchableOpacity 
                    style={styles.input} 
                    onPress={() => setShowDeptModal(true)}
                >
                    <Text style={{color: department ? '#000' : '#666'}}>
                        {department || 'Select Department'}
                    </Text>
                </TouchableOpacity>

                <TextInput 
                    style={styles.input} 
                    placeholder="Email Address" 
                    placeholderTextColor="#666" 
                    keyboardType="email-address"
                />
                <TextInput 
                    style={styles.input} 
                    placeholder="Password" 
                    placeholderTextColor="#666" 
                    secureTextEntry 
                />
                <TextInput 
                    style={styles.input} 
                    placeholder="Confirm Password" 
                    placeholderTextColor="#666" 
                    secureTextEntry 
                />

                <TouchableOpacity 
                    style={styles.photoButton} 
                    onPress={() => setShowPhotoOptions(true)}
                >
                    <Text style={styles.photoButtonText}>
                        {photoUri ? 'Change Photo' : 'Upload Student Photo'}
                    </Text>
                </TouchableOpacity>

                {photoUri && (
                    <View style={styles.photoPreviewContainer}>
                        <Image source={{uri: photoUri}} style={styles.photoPreview} />
                    </View>
                )}

                {/* Department Selection Modal */}
                <Modal
                    visible={showDeptModal}
                    transparent
                    animationType="slide"
                    onRequestClose={() => setShowDeptModal(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Select Department</Text>
                            <ScrollView style={styles.modalScroll}>
                                {departments.map((dept, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={styles.deptItem}
                                        onPress={() => {
                                            setDepartment(dept);
                                            setShowDeptModal(false);
                                        }}
                                    >
                                        <Text style={styles.deptItemText}>{dept}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                            <TouchableOpacity 
                                style={styles.cancelButton} 
                                onPress={() => setShowDeptModal(false)}
                            >
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                {/* Photo Options Modal */}
                <Modal
                    visible={showPhotoOptions}
                    transparent
                    animationType="slide"
                    onRequestClose={() => setShowPhotoOptions(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.photoModalContent}>
                            <Text style={styles.modalTitle}>Choose Photo Source</Text>
                            <TouchableOpacity 
                                style={styles.optionButton} 
                                onPress={openCamera}
                            >
                                <Text style={styles.optionButtonText}>Take Photo</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={styles.optionButton} 
                                onPress={openGallery}
                            >
                                <Text style={styles.optionButtonText}>Choose from Gallery</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={[styles.optionButton, styles.cancelButton]} 
                                onPress={() => setShowPhotoOptions(false)}
                            >
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <TouchableOpacity 
                    style={styles.signupButton} 
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={styles.signupButtonText}>Register</Text>
                </TouchableOpacity>

                <Image 
                    source={require('../assets/signup.png')} 
                    style={styles.bottomImage} 
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 40,
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#2B4EFF',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 30,
    },
    input: {
        backgroundColor: '#EAEAEA',
        width: '85%',
        padding: 15,
        borderRadius: 25,
        marginVertical: 8,
        fontSize: 16,
        color: "#666"
    },
    photoButton: {
        backgroundColor: '#EAEAEA',
        width: '85%',
        padding: 15,
        borderRadius: 25,
        marginVertical: 10,
        alignItems: 'center',
    },
    photoButtonText: {
        color: '#666',
        fontSize: 16,
    },
    photoPreviewContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        overflow: 'hidden',
        marginVertical: 15,
        borderWidth: 2,
        borderColor: '#2B4EFF',
    },
    photoPreview: {
        width: '100%',
        height: '100%',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        maxHeight: '80%',
    },
    photoModalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2B4EFF',
        marginBottom: 15,
        textAlign: 'center',
    },
    modalScroll: {
        width: '100%',
    },
    deptItem: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#EAEAEA',
    },
    deptItemText: {
        fontSize: 16,
        color: '#333',
    },
    optionButton: {
        backgroundColor: '#2B4EFF',
        padding: 15,
        borderRadius: 25,
        marginVertical: 8,
        alignItems: 'center',
    },
    optionButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    cancelButton: {
        backgroundColor: '#EAEAEA',
        marginTop: 10,
    },
    cancelButtonText: {
        color: '#666',
        fontWeight: 'bold',
    },
    signupButton: {
        backgroundColor: '#2B4EFF',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 25,
        marginTop: 20,
        marginBottom: 30,
    },
    signupButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    bottomImage: {
        width: 250,
        height: 220,
        marginTop: 20,
    },
});