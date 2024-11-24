import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Title, Text, Card, Button } from 'react-native-paper';

export default function VoteStatusScreen({ route, navigation }) {
  const timestamp = route?.params?.timestamp || '2024-11-24T10:30:00Z';
  const candidate = route?.params?.candidate || { name: 'John Doe', party: 'Party A' };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Vote Successfully Cast!</Title>
          <Text style={styles.text}>
            Your vote has been recorded on the blockchain.
          </Text>
          <Text style={styles.detail}>
            Time of Vote: {new Date(timestamp).toLocaleString()}
          </Text>
          <Text style={styles.detail}>
            Candidate: {candidate.name}
          </Text>
          <Text style={styles.detail}>
            Party: {candidate.party}
          </Text>
        </Card.Content>
      </Card>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('Login')}
        style={styles.button}
        textColor='white'
      >
        Back to Home
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
  },
  card: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  text: {
    textAlign: 'center',
    marginBottom: 20,
  },
  detail: {
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
  },
});