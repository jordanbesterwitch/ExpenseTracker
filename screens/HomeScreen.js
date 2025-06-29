import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Dimensions, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ExpenseItem from '../components/ExpenseItem';

import { PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export default function HomeScreen({ navigation }) {
  const [expenses, setExpenses] = useState([]);
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    const loadExpenses = async () => {
      const json = await AsyncStorage.getItem('expenses');
      if (json) {
        const data = JSON.parse(json);
        setExpenses(data);
        buildPieData(data);
      } else {
        setExpenses([]);
        setPieData([]);
      }
    };

    const unsubscribe = navigation.addListener('focus', loadExpenses);
    return unsubscribe;
  }, [navigation]);

  const buildPieData = (data) => {
    const grouped = data.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {});

    const total = Object.values(grouped).reduce((sum, val) => sum + val, 0);

    const colors = [
      '#600080', '#9900cc', '#c61aff', '#d966ff', '#ecb3ff',
      '#007aff', '#34c759', '#ff9500', '#ff3b30', '#5856d6',
    ];

    const chartData = Object.keys(grouped).map((key, index) => {
      const percent = ((grouped[key] / total) * 100).toFixed(1);
      return {
        name: `${key || 'Uncategorized'} (${percent}%)`,
        amount: grouped[key],
        color: colors[index % colors.length],
        legendFontColor: '#7F7F7F',
        legendFontSize: 14,
      };
    });

    setPieData(chartData);
  };

  const resetExpenses = () => {
    Alert.alert(
      'Reset Expenses',
      'Are you sure you want to delete all expenses?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes, Delete All',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('expenses');
              setExpenses([]);
              setPieData([]);
            } catch (error) {
              Alert.alert('Error', 'Failed to reset expenses');
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>💸 Expense Tracker</Text>

      {pieData.length > 0 && (
        <PieChart
          data={pieData}
          width={screenWidth - 32}
          height={220}
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="amount"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      )}

      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ExpenseItem item={item} />}
        ListEmptyComponent={<Text style={styles.empty}>No expenses yet</Text>}
        style={{ flex: 1, marginTop: 16 }}
      />

      <View style={styles.footer}>
        <Button title="Add Expense" onPress={() => navigation.navigate('Add Expense')} />
        <View style={{ height: 10 }} />
        <Button title="Reset Expenses" color="#ff3b30" onPress={resetExpenses} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12, textAlign: 'center' },
  empty: { textAlign: 'center', marginTop: 20, fontStyle: 'italic' },
  footer: {
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
});
