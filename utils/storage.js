import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'expenses';

export const loadExpenses = async () => {
  const json = await AsyncStorage.getItem(STORAGE_KEY);
  return json ? JSON.parse(json) : [];
};

export const saveExpense = async (expense) => {
  const expenses = await loadExpenses();
  const updated = [expense, ...expenses];
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const clearAllExpenses = async () => {
  await AsyncStorage.removeItem(STORAGE_KEY);
};
