import { TextInput, StyleSheet } from "react-native";

interface FilterInputProps {
  filter: string;
  onChangeText: (text: string) => void;
  placeholder: string;
}

const FilterInput = ({
  filter,
  onChangeText,
  placeholder,
}: FilterInputProps) => {
  return (
    <TextInput
      value={filter}
      onChangeText={onChangeText}
      placeholder={placeholder}
      style={styles.input}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#fff",
    borderColor: "#ff4655",
    height: 50,
    width: 325,
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    elevation: 10,
  },
});

export default FilterInput;
