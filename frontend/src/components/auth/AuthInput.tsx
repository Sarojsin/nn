import React from "react";
import {
  View,
  Text,
  TextInput,
  KeyboardTypeOptions,
} from "react-native";

import authStyles from "../../styles/authStyles";

type Props = {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
};

export default function AuthInput({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = "default",
}: Props) {
  return (
    <View style={authStyles.inputContainer}>
      <Text style={authStyles.label}>
        {label}
      </Text>

      <TextInput
        style={authStyles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        autoCapitalize="none"
      />
    </View>
  );
}
