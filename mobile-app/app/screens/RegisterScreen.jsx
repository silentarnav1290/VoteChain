// screens/RegisterScreen.js
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Title, Snackbar, HelperText } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

export default function RegisterScreen({ navigation }) {
  const [formData, setFormData] = useState({
    fullName: '',
    voterId: '',
    aadharNumber: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    district: '',
  });
  const [idProof, setIdProof] = useState(null);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setIdProof(result.assets[0].uri);
    }
  };

  const validateForm = () => {
    if (!formData.fullName || !formData.voterId || !formData.aadharNumber || 
        !formData.phoneNumber || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all required fields');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    if (formData.aadharNumber.length !== 12) {
      setError('Invalid Aadhar number');
      return false;
    }

    if (!/^\d{10}$/.test(formData.phoneNumber)) {
      setError('Invalid phone number');
      return false;
    }

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Invalid email format');
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      setVisible(true);
      return;
    }

    setLoading(true);
    try {
      // TODO: Implement registration API call
      // const response = await registerUser(formData);
      setLoading(false);
      navigation.replace('Login');
    } catch (err) {
      setError('Registration failed. Please try again.');
      setVisible(true);
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Title style={styles.title}>Voter Registration</Title>

        <TextInput
          label="Full Name *"
          value={formData.fullName}
          onChangeText={(text) => handleInputChange('fullName', text)}
          mode="outlined"
          style={styles.input}
        />

        <TextInput
          label="Voter ID *"
          value={formData.voterId}
          onChangeText={(text) => handleInputChange('voterId', text)}
          mode="outlined"
          style={styles.input}
        />

        <TextInput
          label="Aadhar Number *"
          value={formData.aadharNumber}
          onChangeText={(text) => handleInputChange('aadharNumber', text)}
          keyboardType="numeric"
          mode="outlined"
          style={styles.input}
          maxLength={12}
        />

        <TextInput
          label="Phone Number *"
          value={formData.phoneNumber}
          onChangeText={(text) => handleInputChange('phoneNumber', text)}
          keyboardType="phone-pad"
          mode="outlined"
          style={styles.input}
          maxLength={10}
        />

        <TextInput
          label="Email"
          value={formData.email}
          onChangeText={(text) => handleInputChange('email', text)}
          keyboardType="email-address"
          mode="outlined"
          style={styles.input}
        />

        <TextInput
          label="District *"
          value={formData.district}
          onChangeText={(text) => handleInputChange('district', text)}
          mode="outlined"
          style={styles.input}
        />

        <TextInput
          label="Address"
          value={formData.address}
          onChangeText={(text) => handleInputChange('address', text)}
          mode="outlined"
          style={styles.input}
          multiline
          numberOfLines={3}
        />

        <TextInput
          label="Password *"
          value={formData.password}
          onChangeText={(text) => handleInputChange('password', text)}
          secureTextEntry
          mode="outlined"
          style={styles.input}
        />

        <TextInput
          label="Confirm Password *"
          value={formData.confirmPassword}
          onChangeText={(text) => handleInputChange('confirmPassword', text)}
          secureTextEntry
          mode="outlined"
          style={styles.input}
        />

        <Button
          mode="outlined"
          onPress={pickImage}
          style={styles.uploadButton}
        >
          Upload ID Proof
        </Button>
        
        {idProof && (
          <HelperText type="info">ID proof uploaded successfully</HelperText>
        )}

        <Button
          mode="contained"
          onPress={handleRegister}
          style={styles.button}
          loading={loading}
          disabled={loading}
          textColor='white'
        >
          Register
        </Button>

        <Button
          mode="text"
          onPress={() => navigation.navigate('Login')}
          style={styles.linkButton}
        >
          Already have an account? Login
        </Button>

        <Snackbar
          visible={visible}
          onDismiss={() => setVisible(false)}
          duration={3000}
          action={{
            label: 'Close',
            onPress: () => setVisible(false),
          }}
        >
          {error}
        </Snackbar>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
  },
  uploadButton: {
    marginBottom: 15,
  },
  linkButton: {
    marginTop: 10,
  },
});