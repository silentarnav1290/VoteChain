import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Title, Snackbar } from 'react-native-paper';

export default function LoginScreen({ navigation }) {
    const [voterId, setVoterId] = useState('');
    const [password, setPassword] = useState('');
    const [visible, setVisible] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async () => {
        // TODO: Implement actual login logic
        // This is where you'd verify voter credentials and check blockchain status
        try {
            // Placeholder for API call
            if (voterId && password) {
                // Check if user has already voted
                const hasVoted = false; // This would come from blockchain

                if (hasVoted) {
                    navigation.replace('VoteStatus');
                } else {
                    navigation.navigate('WalletConnect');
                }
            } else {
                setError('Please fill in all fields');
                setVisible(true);
            }
        } catch (error) {
            setError('Login failed. Please try again.');
            setVisible(true);
        }
    };

    return (
        <View style={styles.container}>
            <Title style={styles.title}>VoteChain</Title>
            <TextInput
                label="Voter ID"
                value={voterId}
                onChangeText={setVoterId}
                mode="outlined"
                style={styles.input}
            />
            <TextInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                mode="outlined"
                style={styles.input}
            />
            <Button
                textColor='white'
                mode="contained"
                onPress={handleLogin}
                style={styles.button}
            >
                Login
            </Button>
            <Button
                mode="text"
                onPress={() => navigation.navigate('Register')}
            >
                New User? Register
            </Button>
            <Snackbar
                visible={visible}
                onDismiss={() => setVisible(false)}
                duration={3000}
            >
                {error}
            </Snackbar>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#F5F5F5',
    },
    title: {
        fontSize: 32,
        textAlign: 'center',
        marginBottom: 30,
    },
    input: {
        marginBottom: 15,
    },
    button: {
        marginTop: 10,
        marginBottom: 10,
        textColor: 'white'
    },
});