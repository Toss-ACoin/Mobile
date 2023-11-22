import { useQuery } from "@tanstack/react-query";
import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import SearchOffOutlinedIcon from "react-native-vector-icons/MaterialIcons"; // You need to install this library
import { useUserService } from "../../services/UserService";
import { UserTable } from "./UserTable/UserTable";

const UsersList = () => {
  const userService = useUserService();
  const { data, status } = useQuery(
    userService.userListKey(),
    userService.getUserList,
    {
      refetchInterval: 10000,
    }
  );

  return (
    <View
      style={{
        alignItems: "center",
        flexDirection: "column",
        paddingBottom: 16,
      }}
    >
      {status === "loading" ? (
        <ActivityIndicator size="large" />
      ) : status === "error" || !data ? (
        <View>
          <Text>Error</Text>
        </View>
      ) : data.length <= 0 ? (
        <View
          style={{
            alignItems: "center",
            height: "100%",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <View
            style={{
              borderRadius: 8,
              borderWidth: 1,
              borderColor: "#ddd",
              flexDirection: "column",
              padding: 16,
              width: "35%",
            }}
          >
            <SearchOffOutlinedIcon name="search-off" color="red" size={20} />

            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
             
              
               Sorry, there are no users
              
            </Text>
          </View>
        </View>
      ) : (
        <UserTable usersData={data} />
      )}
    </View>
  );
};

export default UsersList;
