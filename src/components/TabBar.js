import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { icons } from "../assets/index"; 

const TabBar = ({ state, descriptors, navigation }) => {
  const tabs = [
    { route: "Vitrin", label: "VİTRİN", icon: icons.store }, 
    { route: "Wallet", label: "WALLET", icon: icons.purse }, 
    { route: "Profil", label: "PROFİL", icon: icons.user }, 
  ];

  return (
    <View style={styles.tabContainer}>
      {tabs.map((tab, index) => {
        const isFocused = state.index === index;

        return (
          <TouchableOpacity
            key={tab.route}
            onPress={() => navigation.navigate(tab.route)}
            style={[styles.tabButton, isFocused && styles.activeTab]}
          >
            <Image
              source={tab.icon} 
              style={[styles.iconImage, isFocused && styles.activeIcon]}
            />
            <Text style={[styles.tabText, isFocused && styles.activeText]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 60,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    backgroundColor: "white",
  },
  tabButton: {
    alignItems: "center",
    paddingVertical: 8,
  },
  tabText: {
    fontSize: 12,
    color: "#777",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "black",
  },
  activeText: {
    fontWeight: "bold",
    color: "black",
  },
  iconImage: {
    width: 24,
    height: 24,
    tintColor: "#777",
  },
  activeIcon: {
    tintColor: "black",
  },
});

export default TabBar;
