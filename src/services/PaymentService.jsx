import { createContext, useContext, useMemo } from "react";
import { AuthContext, urlBase } from "./SessionService";

export const PaymentServiceContext = createContext({
  isInitialized: false,
});

export const usePaymentService = () => {
  const context = useContext(PaymentServiceContext);

  if (!context.isInitialized) {
    throw new Error("PaymentService not defined");
  }

  return context.value;
};

const getToken = async () => {
  const response = await fetch(`${urlBase}/accessToken`, {
    method: "GET",
    headers: {
      accept: "*/*",
    },
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error("error");
  }
  return Promise.resolve(result.token);
};

const getIp = async () => {
  const response = await fetch(`https://geolocation-db.com/json/`, {
    method: "GET",
    headers: {
      accept: "*/*",
    },
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error("error");
  }
  return Promise.resolve(result.IPv4);
};

export const PaymentServiceProvider = ({ children }) => {
  const context = useContext(AuthContext);
  const value = useMemo(() => {
    if (context.status !== "auth") {
      return { isInitialized: false };
    }
    return {
      isInitialized: true,
      value: {
        sendPayment: async () => {
          const ip = await getIp();
          const bodyValue = {
            customerIp: ip,
            merchantPosId: "467060",
            description: "RTV market",
            currencyCode: "PLN",
            totalAmount: "21000",
            products: [
              {
                name: "Wireless Mouse for Laptop",
                unitPrice: "21000",
                quantity: "1",
              },
            ],
          };
          const token = await getToken();
          if (!token) {
            throw new Error("error");
          }
          const response = await fetch(`https://secure.snd.payu.com/api/v2_1/orders`, {
            method: "POST",
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Accept-Encoding": "gzip, deflate, br",
              Connection: "keep-alive",
              Accept: "*/*",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(bodyValue),
          });
          const result = await response.json();
          console.log(result);
          if (!response.ok) {
            throw new Error("error");
          }
          return Promise.resolve();
        },
      },
    };
  }, [context]);

  return (
    <PaymentServiceContext.Provider value={value}>
      {children}
    </PaymentServiceContext.Provider>
  );
};
