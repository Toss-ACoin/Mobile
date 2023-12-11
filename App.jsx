import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import Router from "./src/routes/Router";
import { CollectionServiceProvider } from "./src/services/CollectionService";
import { PaymentServiceProvider } from "./src/services/PaymentService";
import { SessionServiceProvider } from "./src/services/SessionService";
import { UserServiceProvider } from "./src/services/UserService";

const queryClient = new QueryClient();

const App = () => {
  return (
    <React.Fragment>
      <QueryClientProvider client={queryClient}>
        <SessionServiceProvider>
          <UserServiceProvider>
            <CollectionServiceProvider>
              <PaymentServiceProvider>
                <Router />
              </PaymentServiceProvider>
            </CollectionServiceProvider>
          </UserServiceProvider>
        </SessionServiceProvider>
      </QueryClientProvider>
    </React.Fragment>
  );
};

export default App;
