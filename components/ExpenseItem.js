import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ExpenseItem({ item }) {
  return (
    <View style={styles.card}>
      <Text style={styles.amount}>${item.amount.toFixed(2)}</Text>
      <Text style={styles.category}>{item.category}</Text>
      <Text style={styles.note}>{item.note}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 12,
    backgroundColor: '#eee',
    borderRadius: 8,
    marginBottom: 8,
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  category: {
    color: '#333',
  },
  note: {
    fontStyle: 'italic',
  },
});
