# 🗂️ Task Management App(TaskFlow)

A simple yet powerful task management application built using **React Native (Expo)** with **Firebase Realtime Database** for cloud sync and **AsyncStorage** for offline access.  
Users can create, edit, delete, and view tasks — with due dates, completion status, and automatic overdue detection.

---

## 🚀 Features Implemented

- ✅ Add, update, delete, and view tasks  
- ✅ Filter tasks by **All / Pending / Completed / Overdue**  
- ✅ Search tasks by title  
- ✅ Automatic overdue detection based on due date  
- ✅ Offline data access (AsyncStorage caching)  
- ✅ Firebase Realtime Database integration  
- ✅ Zustand-based global state management  
- ✅ Smooth navigation with React Navigation  
- ✅ Clean and modern UI design  

---

## 🧰 Tech Stack Used

| Category | Technology 
|-----------|-------------|
| Framework | **React Native (Expo)** |
| State Management | **Zustand** |
| Database | **Firebase Realtime Database** |
| Offline Storage | **AsyncStorage** |
| Navigation | **React Navigation** |
| UI Components | **React Native Paper / Custom Components** |
| Icons | **Ionicons** |
| Date Picker | **@react-native-community/datetimepicker** |
| Network Check | **@react-native-community/netinfo** |

---

## ⚙️ How to Run the App

```bash
# 1️⃣ Clone the repository
git clone https://github.com/yourusername/task-manager.git
cd taskflow

# 2️⃣ Install dependencies
npm install

# 3️⃣ Start the app
npx expo start
```

## 🧭 State Management Approach

This app uses **Zustand** for global state management.

- 🗂️ Centralized store: `/store/taskStore.js`
- ⚙️ Handles: `addTask`, `fetchTasks`, `updateTask`, `deleteTask`
- 🔁 Automatically updates UI on state changes
- 🧩 Easy to maintain and extend compared to Redux or Context API

---

## 🔄 Offline Sync Strategy

- 💾 Uses **AsyncStorage** to store the latest fetched task list.
- 🔍 On app focus:
  - ✅ **If internet is available** → Fetch from Firebase → Update AsyncStorage.
  - 🚫 **If offline** → Load tasks from AsyncStorage.
- 🧠 Prevents user disruption during no-network conditions.
- 🔧 Future-ready for background sync implementation.

---

## 🤖 AI Usage Disclosure

> Used **ChatGPT (OpenAI GPT-5)** to generate and refine:
> - Initial Firebase CRUD logic  
> - Zustand store structure  
> - Offline caching and NetInfo integration  
> - README and documentation formatting  

All generated code was **reviewed and customized** manually before integration.

---

## ⚠️ Known Issues or Limitations

- ❗ Offline edits are **not yet synced** back to Firebase when the internet returns.
-   Authentication is on progress - Firebase google Auth
- 🚫 No **authentication or user-specific task filtering** implemented.  
- 📱 UI may need **optimization for larger datasets**.  
- 🗓️ **DateTimePicker** may behave differently on **iOS vs Android**.  

---

