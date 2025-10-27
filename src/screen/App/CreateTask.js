import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Switch,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { RButton, RText } from "../../components";
import { useTaskStore } from "../../store/taskStore";

const CreateTaskScreen = ({navigation}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  
  

  const { addTask, loading } = useTaskStore();



  const [due_date, setDue_date] = useState(new Date());
const [completed, setCompleted] = useState(false);
const [showDatePicker, setShowDatePicker] = useState(false);

const onChangeDate = (event, selectedDate) => {
  if (event.type === "set") { 
    const currentDate = selectedDate || due_date;
    setDue_date(currentDate);
  }
  setShowDatePicker(false); 
};

const formattedDate = due_date.toISOString().split("T")[0];


  const handleSave = async () => {
    if (!title || !description || !due_date) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }
    await addTask({
      title,
      description,
      due_date,
      status: completed ? "completed" : "pending",
    });
    await 
    Alert.alert("Success", "Task created successfully!");
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Card Section */}
      <View style={styles.card}>
        <RText content="Task Details" style={styles.sectionTitle} />

        {/* Task Title */}
        <RText content="Task Title" style={styles.label} />
        <TextInput
          style={styles.input}
          placeholder="e.g., Reply to important emails"
          value={title}
          onChangeText={setTitle}
        />

        {/* Description */}
        <RText content="Description" style={styles.label} />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Provide details about the task..."
          value={description}
          onChangeText={setDescription}
          multiline
        />

        {/* Due Date */}
        <RText content="Due Date" style={styles.label} />
        <TouchableOpacity
  style={styles.dateInput}
  onPress={() => setShowDatePicker(true)}
>
  <Ionicons name="calendar-outline" size={18} color="#666" />
  <RText content={formattedDate} style={styles.dateText} />
</TouchableOpacity>

{showDatePicker && (
  <DateTimePicker
    value={due_date}
    mode="date"
    display="default"
    onChange={onChangeDate}
  />
)}


        {/* Mark as Completed */}
        <View style={styles.switchRow}>
          <RText content="Mark as Completed" style={styles.switchLabel} />
          <Switch
            value={completed}
            onValueChange={setCompleted}
            trackColor={{ false: "#ddd", true: "#4F8000" }}
          />
        </View>
      </View>

      {/* Buttons */}
      <RButton
        buttonText="Save Task"
        buttonStyle={styles.saveButton}
        textStyle={styles.saveText}
        onPress={handleSave}
      />
      <RButton
        buttonText="Cancel"
        buttonStyle={styles.cancelButton}
        textStyle={styles.cancelText}
        onPress={() => console.log("Cancelled")}
      />
    </View>
  );
};

export default CreateTaskScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 15,
    backgroundColor: "#fff",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 15,
    textAlign: "center",
  },
  label: {
    fontSize: 14,
    color: "#333",
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    backgroundColor: "#fff",
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  dateInput: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
  },
  dateText: {
    fontSize: 14,
    marginLeft: 8,
    flex: 1,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
  },
  switchLabel: {
    fontSize: 14,
  },
  saveButton: {
    backgroundColor: "#007BFF",
    borderRadius: 8,
    paddingVertical: 12,
    marginTop: 25,
  },
  saveText: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 12,
    marginTop: 10,
  },
  cancelText: {
    color: "#333",
    fontWeight: "600",
    textAlign: "center",
  },
});
