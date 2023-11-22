import {
  createContext,
  useContext,
  useMemo
} from "react";
import { AuthContext, urlBase } from "./SessionService";

export const UserContext = createContext({
  isInitialized: false,
});

export const useUserService = () => {
  const context = useContext(UserContext);

  if (!context.isInitialized) {
    throw new Error("UserService not defined");
  }

  return context.value;
};

export const UserServiceProvider = ({ children }) => {
  const context = useContext(AuthContext);
  const value = useMemo(() => {
    if (context.status !== "auth") {
      return { isInitialized: false };
    }
    return {
      isInitialized: true,
      value: {
        getUserDate: async () => {
          const response = await context.value.fetcher(`${urlBase}/myAccount`, {
            method: "GET",
          });
          const result = await response.json();
          if (!response.ok || !result) {
            throw new Error("Something went wrong");
          }
          return result;
        },
        getUserCollections: async () => {
          const response = await context.value.fetcher(
            `${urlBase}/myFundraising`,
            {
              method: "GET",
            }
          );

          const result = await response.json();
          if (!response.ok || !result) {
            throw new Error("Something went wrong");
          }

          return result.array;
        },
        userListKey: (query) => {
          return query ? ["user", query] : ["user"];
        },
        userCollectionKey: (query) => {
          return query ? ["userCollection", query] : ["userCollection"];
        },
        getUserList: async ({ queryKey }) => {
          const [, query] = queryKey;

          const response = await context.value.fetcher(
            `${urlBase}/admin/users`,
            {
              method: "GET",
              headers: {
                accept: "*/*",
                "Access-Control-Allow-Origin": "*",
              },
            }
          );

          const result = await response.json();

          return result.users;
        },
        toggleUserBlock: async (value) => {
          const response = await context.value.fetcher(
            `${urlBase}/admin/user?id=${value}`,
            {
              method: "PATCH",
            }
          );
          if (!response.ok) {
            throw new Error("Error");
          }
          return Promise.resolve();
        },
      },
    };
  }, [context]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

