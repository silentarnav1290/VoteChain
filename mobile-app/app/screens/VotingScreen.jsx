import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph, Button, Portal, Modal } from 'react-native-paper';

export default function VotingScreen({ navigation }) {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Mock candidates data - this would come from your API based on district
  const candidates = [
    { id: 1, name: 'John Doe', party: 'Party A' },
    { id: 2, name: 'Jane Smith', party: 'Party B' },
    { id: 3, name: 'Bob Johnson', party: 'Party C' },
  ];

  const handleVote = async () => {
    // TODO: Implement actual voting logic with smart contract
    try {
      // This is where the blockchain transaction would happen
      navigation.replace('VoteStatus', {
        timestamp: new Date().toISOString(),
        candidate: selectedCandidate,
      });
    } catch (error) {
      console.error('Voting failed:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Cast Your Vote</Title>
      <ScrollView>
        {candidates.map((candidate) => (
          <Card
            key={candidate.id}
            style={[
              styles.card,
              selectedCandidate?.id === candidate.id && styles.selectedCard,
            ]}
            onPress={() => setSelectedCandidate(candidate)}
          >
            <Card.Content>
              <Title>{candidate.name}</Title>
              <Paragraph>{candidate.party}</Paragraph>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
      <Button
        mode="contained"
        onPress={() => setShowConfirmation(true)}
        disabled={!selectedCandidate}
        style={styles.button}
      >
        Confirm Vote
      </Button>

      <Portal>
        <Modal
          visible={showConfirmation}
          onDismiss={() => setShowConfirmation(false)}
          contentContainerStyle={styles.modal}
        >
          <Title style={styles.modalTitle}>Confirm Your Vote</Title>
          {selectedCandidate && (
            <Paragraph style={styles.modalText}>
              Are you sure you want to vote for {selectedCandidate.name}?
              This action cannot be undone.
            </Paragraph>
          )}
          <View style={styles.modalButtons}>
            <Button
              mode="outlined"
              onPress={() => setShowConfirmation(false)}
              style={styles.modalButton}
            >
              Cancel
            </Button>
            <Button
              mode="contained"
              onPress={handleVote}
              style={styles.modalButton}
              textColor='white'
            >
              Confirm
            </Button>
          </View>
        </Modal>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    marginBottom: 15,
  },
  selectedCard: {
    backgroundColor: '#E3F2FD',
    borderColor: '#1565C0',
    borderWidth: 2,
  },
  button: {
    marginTop: 20,
    marginBottom: 20,
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
  modalTitle: {
    textAlign: 'center',
    marginBottom: 15,
  },
  modalText: {
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalButton: {
    minWidth: 100,
  },
});