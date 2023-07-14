import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

import Colors from "../../constants/Colors";
import { useThemeColor } from "../Themed";

type Props = {
  label: string;
  borderBottom?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  onLocationInput?: (e: string) => void;
  value: string;
  textInputRef?: React.RefObject<TextInput>;
};

const SearchLocation = ({
  label,
  onBlur,
  onFocus,
  onLocationInput,
  borderBottom = false,
  value,
  textInputRef,
}: Props) => {
  const searchStationForeground = useThemeColor(
    { light: Colors.searchView.light.text, dark: Colors.searchView.dark.text },
    "text",
  );

  return (
    <View>
      <TextInput
        style={[
          styles.customInput,
          borderBottom && styles.border,
          { borderBottomColor: searchStationForeground },
          { color: searchStationForeground },
        ]}
        onChangeText={onLocationInput}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={label}
        placeholderTextColor={searchStationForeground}
        value={value}
        ref={textInputRef}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  customInput: {
    height: 50,
    width: "90%",
    paddingVertical: 15,
  },
  stations: {
    height: 50,
  },
  border: {
    borderBottomWidth: 1,
  },
});

export default SearchLocation;
