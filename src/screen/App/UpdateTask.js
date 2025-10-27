import AntDesign from "@expo/vector-icons/AntDesign";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { RButton, RText, TextBox } from "../../components";
import { useTaskStore } from "../../store/taskStore";
import { color } from "../../theme/color";

const getChangedFields = (oldData, newData) => {
  const changed = {};
  Object.keys(newData).forEach((key) => {
    if (newData[key] !== oldData[key]) changed[key] = newData[key];
  });
  return changed;
};

const UpdateTask = ({ navigation, route }) => {
  const data = route?.params?.data; 
  const { updateTask, deleteTask } = useTaskStore();

  const [taskTitle, setTaskTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data) {
      setTaskTitle(data.title || "");
      setDescription(data.description || "");
      setIsCompleted(data.status === "completed");
      setDate(data.due_date ? new Date(data.due_date) : new Date());
      setLoading(false);
    }
  }, [data]);

  if (!data)
    return (
      <View style={styles.centered}>
        <RText content="No task data found." style={{ fontSize: 16 }} />
      </View>
    );

  if (loading)
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={color.secendary} />
      </View>
    );

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showDatepicker = () => setShowDatePicker(true);

  const handleSave = async () => {
    const updatedData = {
      title: taskTitle,
      description,
      status: isCompleted ? "completed" : "pending",
      due_date: date.toISOString(),
    };

    const changedData = getChangedFields(data, updatedData);
    if (Object.keys(changedData).length === 0) {
          navigation.goBack();
      return;
    }
    console.log(changedData)

    await updateTask(data.id, changedData);
    Alert.alert("Success", "Task updated successfully!");
    navigation.goBack();
  };

  const handleDelete = async () => {
    Alert.alert("Confirm Delete", "Are you sure you want to delete this task?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await deleteTask(data.id);
          Alert.alert("Deleted", "Task deleted successfully!");
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <View style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.formSection}>
          <RText content="Task Title" style={styles.label} />
          <TextBox
            label="Task Title"
            value={taskTitle}
            onChangeText={setTaskTitle}
            style={styles.textArea}
          />

          <RText content="Description" style={styles.label} />
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Enter description"
            multiline
          />

          <RText content="Due Date" style={styles.label} />
          <TouchableOpacity
            onPress={showDatepicker}
            style={styles.datePickerInput}
          >
            <AntDesign name="calendar" size={20} color="#666" style={styles.icon} />
            <RText
              content={date.toISOString().split("T")[0]}
              style={styles.dateText}
            />
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onChangeDate}
            />
          )}

          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setIsCompleted(!isCompleted)}
          >
            <View style={[styles.checkbox, isCompleted && styles.checkedBox]}>
              {isCompleted && <AntDesign name="check" size={16} color="#fff" />}
            </View>
            <RText content="Mark as Completed" style={styles.checkboxLabel} />
          </TouchableOpacity>
        </View>

        <View style={styles.infoSection}>
          <RText
            content={`Created on: ${
              new Date(data.created_date).toISOString().split("T")[0]
            }`}
            style={styles.metaText}
          />
        </View>

        <View style={styles.buttonGroup}>
          <RButton
            onPress={handleSave}
            buttonText={"Save Changes"}
            textStyle={styles.saveButtonText}
            buttonStyle={[styles.button, styles.saveButton]}
          />

          <RButton
            onPress={handleDelete}
            buttonText={"Delete Task"}
            textStyle={styles.deleteButtonText}
            buttonStyle={[styles.button, styles.deleteButton]}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    flexGrow: 1,
    padding: 20,
  },
  formSection: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
  },
  textArea: {
    textAlignVertical: "top",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: color.border,
    height: 80,
  },
  datePickerInput: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: "#f9f9f9",
  },
  icon: { marginRight: 10 },
  dateText: { fontSize: 16, color: "#333" },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  checkedBox: {
    backgroundColor: "#007aff",
    borderColor: "#007aff",
  },
  checkboxLabel: {
    fontSize: 16,
    color: "#333",
  },
  infoSection: { padding: 16 },
  metaText: { fontSize: 14, color: "#666", marginBottom: 8 },
  buttonGroup: { marginTop: "auto", gap: 12 },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButton: { backgroundColor: "#007aff" },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  deleteButton: { backgroundColor: "#ff3b30" },
  deleteButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default UpdateTask;
