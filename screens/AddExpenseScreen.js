import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const generateId = () => '_' + Math.random().toString(36).substr(2, 9);

export default function AddExpenseScreen({ navigation }) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [note, setNote] = useState('');

  const saveExpense = async () => {
    if (!amount || isNaN(amount)) {
      Alert.alert('Invalid input', 'Please enter a valid number for amount');
      return;
    }

    const newExpense = {
      id: generateId(),
      amount: parseFloat(amount),
      category,
      note,
      date: new Date().toISOString(),
    };

    try {
      const json = await AsyncStorage.getItem('expenses');
      const expenses = json ? JSON.parse(json) : [];
      const updatedExpenses = [newExpense, ...expenses];

      await AsyncStorage.setItem('expenses', JSON.stringify(updatedExpenses));

      console.log('Saved new expense:', newExpense);

      navigation.goBack();
    } catch (error) {
      console.error('Error saving expense:', error);
      Alert.alert('Error', 'Failed to save expense');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        style={styles.input}
      />
      <TextInput
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
        style={styles.input}
      />
      <TextInput
        placeholder="Note"
        value={note}
        onChangeText={setNote}
        style={styles.input}
      />
      <Button title="Save Expense" onPress={saveExpense} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
});
