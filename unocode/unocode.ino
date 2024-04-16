const int buttonPin1 = 2;  // Pin for button 1 (Candidate 1)
const int buttonPin2 = 3;  // Pin for button 2 (Candidate 2)
const int buttonPin3 = 4;  // Pin for button 3 (Candidate 3)
const int ledPin1 = 5;     // Pin for LED 1 (Candidate 1)
const int ledPin2 = 6;     // Pin for LED 2 (Candidate 2)
const int ledPin3 = 7;     // Pin for LED 3 (Candidate 3)
const int buzzerPin = 8;   // Pin for buzzer
const int redLedPin = 11;  // Pin for red LED (Vote Limit Exceeded)

int voteCount = 0;
unsigned long lastVoteTime = 0;

void setup() {
  pinMode(buttonPin1, INPUT_PULLUP);
  pinMode(buttonPin2, INPUT_PULLUP);
  pinMode(buttonPin3, INPUT_PULLUP);
  pinMode(ledPin1, OUTPUT);
  pinMode(ledPin2, OUTPUT);
  pinMode(ledPin3, OUTPUT);
  pinMode(buzzerPin, OUTPUT);
  pinMode(redLedPin, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  // Read button states
  int buttonState1 = digitalRead(buttonPin1);
  int buttonState2 = digitalRead(buttonPin2);
  int buttonState3 = digitalRead(buttonPin3);

  unsigned long currentTime = millis();

  // Check if any button is pressed and voting limit is not exceeded
  if ((buttonState1 == LOW || buttonState2 == LOW || buttonState3 == LOW) && (currentTime - lastVoteTime > 10000) && voteCount < 6) {
    // Increment vote count
    voteCount++;

    // Update last vote time
    lastVoteTime = currentTime;

    // Turn off all LEDs
    digitalWrite(ledPin1, LOW);
    digitalWrite(ledPin2, LOW);
    digitalWrite(ledPin3, LOW);

    // Turn on LED and sound buzzer for the voted candidate
    if (buttonState1 == LOW) {
      digitalWrite(ledPin1, HIGH);
    } else if (buttonState2 == LOW) {
      digitalWrite(ledPin2, HIGH);
    } else if (buttonState3 == LOW) {
      digitalWrite(ledPin3, HIGH);
    }

    // Sound buzzer once
    tone(buzzerPin, 1000);
    delay(100);
    noTone(buzzerPin);

    // Print voting details on Serial Monitor
    Serial.print("Vote Casted: ");
    if (buttonState1 == LOW) {
      Serial.println("Candidate 1");
    } else if (buttonState2 == LOW) {
      Serial.println("Candidate 2");
    } else if (buttonState3 == LOW) {
      Serial.println("Candidate 3");
    }
  }

  // Check if voting limit is exceeded
  if (voteCount >= 6 && (currentTime - lastVoteTime > 10000)) {
    digitalWrite(redLedPin, HIGH);  // Turn on red LED
  } else {
    digitalWrite(redLedPin, LOW);   // Turn off red LED
  }
}
