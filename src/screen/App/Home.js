import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { RText } from "../../components";
import { useTaskStore } from "../../store/taskStore";
import { color } from "../../theme/color";

export default function Home({ navigation }) {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
const [offlineTasks, setOfflineTasks] = useState([]);

  const { fetchTasks, tasks } = useTaskStore();

 useFocusEffect(
  useCallback(() => {
    const loadTasks = async () => {
      const netInfo = await NetInfo.fetch();

      if (netInfo.isConnected) {
        await fetchTasks();
        await AsyncStorage.setItem("cachedTasks", JSON.stringify(get().tasks || []));
      } else {
        const cached = await AsyncStorage.getItem("tasks_data");
        if (cached) {
          const offlineTasks = JSON.parse(cached);
          setOfflineTasks(offlineTasks);
        }
      }
    };

    loadTasks();
  }, [])
);


  const activeTasks = tasks.length > 0 ? tasks : offlineTasks;

// const processedTasks = activeTasks.map((task) => {

//     const due = task.due_date ? new Date(task.due_date) : null;
//     const now = new Date();

//     let updatedStatus = task.status;
//     if (due && due < now && task.status !== "completed") {
//       updatedStatus = "overdue";
//     }

//     return {
//       ...task,
//       due_date: due ? due.toISOString() : null,
//       status: updatedStatus,
//     };
//   });

const processedTasks = activeTasks.map((task) => {
  const due = task.due_date ? new Date(task.due_date) : null;
  const now = new Date();

  let updatedStatus = task.status;

  if (due && task.status !== "completed") {
    // 🔹 Normalize both dates to midnight (remove time)
    const dueDateOnly = new Date(
      due.getFullYear(),
      due.getMonth(),
      due.getDate()
    );
    const today = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );

    if (dueDateOnly < today) {
      updatedStatus = "overdue";
    } else if (dueDateOnly.getTime() === today.getTime()) {
      updatedStatus = "pending"; // due today but not overdue yet
    }
  }

  return {
    ...task,
    due_date: due ? due.toISOString() : null,
    status: updatedStatus,
  };
});

const filteredTasks = processedTasks.filter((task) => {
    const matchesFilter =
      filter === "All" || task.status?.toLowerCase() === filter.toLowerCase();
    const matchesSearch =
      task.title?.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const renderTask = ({ item }) => {
    const dueDate =
      item.due_date && !isNaN(new Date(item.due_date))
        ? new Date(item.due_date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
        : "No due date";

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("UpdateTask", { data: item })}
        style={[styles.taskCard, selectedTask === item.id && styles.selectedCard]}
      >
        <View style={styles.taskRow}>
          <Ionicons
            name={selectedTask === item.id ? "checkbox" : "square-outline"}
            size={22}
            onPress={() => setSelectedTask(item.id)}
            color={selectedTask === item.id ? color.secendary : "#bbb"}
          />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.taskTitle}>{item.title}</Text>
            <Text style={[styles.dueDate, getDueStyle(item.status)]}>
              {statusText(item.status)}: {dueDate}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Search */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={18} color="#666" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search tasks..."
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Tabs */}
      <View style={styles.tabRow}>
        {["All", "Pending", "Completed", "Overdue"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, filter === tab && styles.activeTab]}
            onPress={() => setFilter(tab)}
          >
            <Text
              style={[styles.tabText, filter === tab && styles.activeTabText]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Task List */}
      {filteredTasks.length == 0 ?(
        
        <RText content={'No Data'} style={[styles.tabText,{textAlign: "center",marginTop:80}]} />
      ) : (<FlatList
        data={filteredTasks}
        renderItem={renderTask}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />)}

      {/* Floating Add Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("Create_Task")}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const statusText = (status) => {
  switch (status) {
    case "overdue":
      return "Overdue";
    case "completed":
      return "Completed";
    default:
      return "Due";
  }
};

const getDueStyle = (status) => {
  switch (status) {
    case "overdue":
      return { color: "#E74C3C" };
    case "completed":
      return { color: color.secendary };
    default:
      return { color: "#999" };
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 13,
  },
  searchInput: {
    flex: 1,
    marginLeft: 6,
    paddingVertical: 8,
    fontSize: 14,
  },
  tabRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  tab: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
    backgroundColor: "#f3f4f6",
  },
  activeTab: {
    backgroundColor: "#0D6EFD20",
  },
  tabText: {
    fontSize: 14,
    color: "#444",
  },
  activeTabText: {
    color: color.secendary,
    fontWeight: "600",
  },
  taskCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#eee",
  },
  selectedCard: {
    borderColor: color.secendary,
  },
  taskRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  taskTitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
    marginBottom: 4,
  },
  dueDate: {
    fontSize: 12,
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 30,
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: color.secendary,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});
