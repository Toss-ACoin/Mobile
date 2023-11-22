import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createContext,
  useContext,
  useMemo
} from "react";

export const urlBase = "https://toss-a-coin.azurewebsites.net";

export const AuthContext = createContext({
  status: "loading",
});

export const useAuthService = () => {
  const context = useContext(AuthContext);

  if (context.status !== "auth") {
    throw new Error("AuthService not defined");
  }

  return context.value;
};

export const useAnonService = () => {
  const context = useContext(AuthContext);

  if (context.status !== "anon") {
    throw new Error("AnonService not defined");
  }

  return context.value;
};

export const useSessionStatus = () => {
  const context = useContext(AuthContext);

  return context.status;
};

export const getSessionQueryKey = () => {
  return ["session"];
};

export const SessionServiceProvider = ({ children }) => {
  const client = useQueryClient();
  const { data } = useQuery({
    queryKey: getSessionQueryKey(),
    queryFn: async () => {
      const authorization = localStorage.getItem("authorization");
      const role = localStorage.getItem("role");

      return authorization && role
        ? {
            status: "auth",
            authorization,
            role,
          }
        : { status: "anon" };
    },    
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    
  });

  const value = useMemo(() => {
    switch (data?.status) {
      case "anon":
        return {
          status: "anon",
          value: {
            signIn: async (value) => {
              const str =
                "Basic " +
                window.btoa(
                  unescape(
                    encodeURIComponent(value.email + ":" + value.password)
                  )
                );
              const response = await fetch(`${urlBase}/loginBasic`, {
                method: "GET",
                headers: {
                  accept: "*/*",
                  Authorization: str,
                },
              });
              const result = await response.json();
              if (!response.ok || !result) {
                throw new Error(result.error);
              }
              localStorage.setItem("authorization", str);
              localStorage.setItem("role", result.user_role[0].authority);
              client.setQueryData(getSessionQueryKey(), {
                status: "auth",
                authorization: str,
                role: result.user_role[0].authority,
              });
              return Promise.resolve();
            },
            signUp: async (values) => {
              const response = await fetch(`${urlBase}/register`, {
                method: "POST",
                headers: {
                  accept: "*/*",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
              });
              const result = await response.json();
              if (!response.ok || !result.User) {
                throw new Error(result.error);
              }
              const str =
                "Basic " +
                window.btoa(
                  unescape(
                    encodeURIComponent(values.email + ":" + values.password)
                  )
                );
              localStorage.setItem("authorization", str);
              localStorage.setItem("role", result.user_role[0].authority);
              client.setQueryData(getSessionQueryKey(), {
                status: "auth",
                authorization: str,
                role: result.user_role[0].authority,
              });
              return Promise.resolve();
            },
          },
        };
      case "auth":
        return {
          status: "auth",
          value: {
            signOut: () => {
              localStorage.removeItem("authorization");
              client.setQueryData(getSessionQueryKey(), {
                status: "anon",
              });
              return Promise.resolve();
            },
            fetcher: async (input, init) => {
              const authorizationToken = data?.authorization;
              if (!authorizationToken) {
                throw new Error("No authorization token");
              }

              const response = await window.fetch(input, {
                ...init,
                headers: {
                  ...init?.headers,
                  Authorization: authorizationToken,
                },
              });

              if (response.status === 401) {
                localStorage.removeItem("authorization");
                client.setQueryData(getSessionQueryKey(), {
                  status: "anon",
                });

                throw new Error("Token timeout");
              }

              return response;
            },
          },
        };
      default:
        return { status: "loading" };
    }
  }, [data, client]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

