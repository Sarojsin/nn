import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import authStyles from "../../styles/authStyles";

type Props = {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
};

export default function PasswordInput({
  label,
  placeholder,
  value,
  onChangeText,
}: Props) {
  const [hidden, setHidden] = useState(true);

  return (
    <View style={authStyles.inputContainer}>
        {label ? (
        <Text style={authStyles.label}>
            {label}
        </Text>
        ) : null}

      <View style={authStyles.passwordContainer}>
        <TextInput
          style={authStyles.passwordInput}
          placeholder={placeholder}
          secureTextEntry={hidden}
          value={value}
          onChangeText={onChangeText}
        />

        <Pressable
          onPress={() => setHidden(!hidden)}
        >
          <Ionicons
            name={
              hidden
                ? "eye-outline"
                : "eye-off-outline"
            }
            size={24}
            color="#8B6BAE"
          />
        </Pressable>
      </View>
    </View>
  );
}
