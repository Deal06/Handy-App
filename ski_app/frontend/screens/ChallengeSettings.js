import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Checkbox from 'expo-checkbox';

export default function ChallengeSettings({ close, onApply }) {

  const [minRotation, setMinRotation] = useState('');
  const [maxRotation, setMaxRotation] = useState('');
  const [withUnnaty, setWithUnnaty] = useState(false);
  const [withInverted, setWithInverted] = useState(false);

  const applySettings = () => {
    onApply({
      minRotation: minRotation ? parseInt(minRotation) : 0,
      maxRotation: maxRotation ? parseInt(maxRotation) : 10,
      withUnnaty,
      withInverted
    });
    close();
  };

  return (
    <View style={styles.container}>

      <TouchableOpacity onPress={close} style={styles.close}>
        <Text style={styles.closeText}>X</Text>
      </TouchableOpacity>

      <View style={styles.contentContainer}>

        {/* Linke Seite: TextInput Boxen */}
        <View style={styles.leftColumn}>
          <TextInput
            placeholder='Min. rotations'
            style={styles.inputBox}
            placeholderTextColor='black'
            maxLength={10}
            value={minRotation}
            onChangeText={setMinRotation}
          />
          <TextInput
            placeholder='Max. rotations'
            style={styles.inputBox}
            placeholderTextColor='black'
            maxLength={10}
            value={maxRotation}
            onChangeText={setMaxRotation}
          />
        </View>

        {/* Rechte Seite: Checkboxen */}
        <View style={styles.rightColumn}>
          <View style={styles.checkboxContainer}>
            <Checkbox
              value={withUnnaty}
              onValueChange={setWithUnnaty}
              color={withUnnaty ? 'blue' : 'black'}
            />
            <Text style={styles.checkboxLabel}>Mit Unnaty-Tricks spielen?</Text>
          </View>

          <View style={styles.checkboxContainer}>
            <Checkbox
              value={withInverted}
              onValueChange={setWithInverted}
              color={withInverted ? 'blue' : 'black'}
            />
            <Text style={styles.checkboxLabel}>Mit Inverted-Tricks spielen?</Text>
          </View>
        </View>

      </View>

      <TouchableOpacity style={styles.applyButton} onPress={applySettings}>
        <Text style={styles.applyText}>Apply</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {

    flex: 1,

    backgroundColor: 'gray',

    padding: 20,

  },

  close: {

    position: 'absolute',

    right: 10,

    top: 10,

  },

  closeText: {

    fontSize: 20,

    fontWeight: 'bold',

  },

  contentContainer: {

    flex: 1,

    flexDirection: 'row',

    marginTop: 50,

    justifyContent: 'space-between',

  },

  leftColumn: {

    flex: 1,

    marginRight: 10,

  },

  rightColumn: {

    flex: 1,

    marginLeft: 10,

    justifyContent: 'flex-start',

  },

  inputBox: {

    backgroundColor: 'white',

    borderWidth: 1,

    borderColor: 'black',

    borderRadius: 5,

    padding: 10,

    marginBottom: 20,

  },

  checkboxContainer: {

    flexDirection: 'row',

    alignItems: 'center',

    marginBottom: 20,

  },

  checkboxLabel: {

    marginLeft: 8,

    fontSize: 16,

    color: 'black',

  },

  applyButton: {

    backgroundColor: 'blue',

    borderRadius: 5,

    padding: 12,

    marginTop: 20,

    alignItems: 'center',

  },

  applyText: {

    color: 'white',

    fontSize: 16,

    fontWeight: 'bold',

  },

});
