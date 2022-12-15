import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import AnimatedLottieView from "lottie-react-native";

function TaskAction({ onPress, play, icon, style, color = colors.danger }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.container, style]}>
        {!play ? <MaterialCommunityIcons
          name={icon}
          size={35}
          color={color}
        /> :
          <AnimatedLottieView autoPlay loop source={require("../assets/animations/logo_loader.json")} />
        }
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "20%",
    borderRadius: 20,
    marginVertical: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TaskAction;