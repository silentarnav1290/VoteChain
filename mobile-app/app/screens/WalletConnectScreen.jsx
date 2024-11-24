import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Title, Text, ActivityIndicator } from 'react-native-paper';

export default function WalletConnectScreen({ navigation }) {
    const [connecting, setConnecting] = useState(false);

    const handleWalletConnect = async () => {
        setConnecting(true);
        // TODO: Implement actual wallet connection
        // This would integrate with Web3 wallet providers
        setTimeout(() => {
            setConnecting(false);
            navigation.navigate('Voting');
        }, 2000);
    };

    return (
        <View style={styles.container}>
            <Title style={styles.title}>Connect Wallet</Title>
            <Text style={styles.subtitle}>
                Connect your wallet to proceed with voting
            </Text>
            {connecting ? (
                <ActivityIndicator size="large" />
            ) : (
                <Button
                    textColor='white'
                    mode="contained"
                    onPress={handleWalletConnect}
                    style={styles.button}
                >
                    Connect Wallet
                </Button>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    subtitle: {
        marginBottom: 30,
        textAlign: 'center',
    },
    button: {
        marginTop: 20,
    },
});