# 💸 React Native Expense Tracker App

A simple and modern **React Native** expense tracker app (no Expo) that allows users to record, categorize, and visualize their expenses using a pie chart. Data is saved locally on the device using AsyncStorage.

---

## ✨ Features

- Add expenses with amount, category, note, and timestamp
- View a list of all saved expenses
- Pie chart visualization that summarizes spending by category with percentages
- Reset/delete all stored expenses with one tap
- All data is stored locally using `@react-native-async-storage/async-storage`

---

## 🗂 Folder Structure

```
.
├── App.js                         # Entry point and navigation stack
├── components/
│   └── ExpenseItem.js            # Displays individual expense items
├── screens/
│   ├── HomeScreen.js             # Expense list + Pie chart + buttons
│   └── AddExpenseScreen.js       # Form to add new expenses
└── utils/
    └── storage.js                # AsyncStorage helper functions
```

---

## 📦 Dependencies

- `react-native`
- `@react-navigation/native`
- `@react-navigation/native-stack`
- `@react-native-async-storage/async-storage`
- `react-native-chart-kit`
- `react-native-svg`

---

## 🚀 Setup Instructions

> Make sure you’ve already set up **React Native CLI** (not Expo)

```bash
# Clone the repository
git clone https://github.com/your-username/expense-tracker-app.git
cd expense-tracker-app

# Install dependencies
npm install

# iOS users only (on macOS)
cd ios && pod install && cd ..

# Start Metro bundler
npx react-native start

# Run the app on Android
npx react-native run-android

# Or run on iOS
npx react-native run-ios
```

---

## 📊 Pie Chart Functionality

- Expenses are grouped by category
- Each category is shown as a slice with a unique color
- Percentages are calculated and displayed in the chart labels

---

## 💾 Data Persistence

All expenses are stored on the device using `AsyncStorage`. The data is loaded each time the app starts or when returning to the Home screen.

---

## 🧼 Clear All Data

Tap the **"Reset Expenses"** button on the Home screen to clear all stored expenses.

---

## 📄 License

MIT License © 2025 [Jordan Besterwitch]
