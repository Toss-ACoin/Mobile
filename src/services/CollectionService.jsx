import { createContext, useContext, useMemo } from "react";
import { SessionService, urlBase } from "./SessionService";

export const CollectionServiceContext = createContext({
  isInitialized: true,
});

export const useCollectionService = () => {
  const context = useContext(CollectionServiceContext);

  if (!context.isInitialized) {
    throw new Error("CollectionService not defined");
  }

  return context.value;
};

export const CollectionServiceProvider = ({
  children,
}) => {
  const context = useContext(SessionService);
  console.log(context)
  const value = useMemo(() => {

    return {
      isInitialized: true,
      value: {
        collection: async ({ queryKey }) => {
          const [, query] = queryKey;

          if (!query) {
            return undefined;
          }
          const response = await context.value.fetcher(
            `${urlBase}/fundraising?id=${query}`,
            {
              method: "GET",
              headers: {
                accept: "*/*",
                "Access-Control-Allow-Origin": "*",
              },
            }
          );

          const result = await response.json();

          return result;
        },

        collectionKey: (query) => {
          return query ? ["collection", query] : ["collection"];
        },

        collectionList: async ({ queryKey }) => {
          const [, query] = queryKey;

          const response = await fetch(
            `${urlBase}/search?phrase=${query ? query.query : ""}`,
            {
              method: "GET",
              headers: {
                accept: "*/*",
                "Access-Control-Allow-Origin": "*",
              },
            }
          );

          const result = await response.json();
          console.log(result)

          return result;
        },
        collectionListKey: (query) => {
          return query ? ["collections", query] : ["collections"];
        },
        uploadImage: async (value) => {
          const data = new FormData();
          value.forEach((file, i) => {
            data.append(`file-${i}`, file, file.name);
          });
          const response = await context.value.fetcher(
            `${urlBase}/uploadImage`,
            {
              method: "POST",
              headers: {
                accept: "*/*",
                "Access-Control-Allow-Origin": "*",
              },
              body: data,
            }
          );
          const result = await response.json();
          if (!response.ok) {
            throw new Error("Error");
          }
          return result;
        },
        addCollection: async (value) => {
          const { title, category, goal, description, date } = value;
          const response = await context.value.fetcher(
            `${urlBase}/createFundraising`,
            {
              method: "POST",
              headers: {
                accept: "*/*",
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                title,
                category,
                goal,
                description,
                date,
              }),
            }
          );
          if (!response.ok) {
            throw new Error("Something went wrong");
          }
          const result = await response.json();
          value.image.forEach(async (file) => {
            const data = new FormData();
            data.append("image", file, file.name);
            data.append("id", result.id);
            const responseFile = await context.value.fetcher(
              `${urlBase}/uploadImage`,
              {
                method: "POST",
                headers: {
                  accept: "*/*",
                  "Access-Control-Allow-Origin": "*",
                },
                body: data,
              }
            );
            if (!responseFile.ok) {
              throw new Error("Error");
            }
          });

          return Promise.resolve();
        },
        donate: async (value) => {
          const response = await context.value.fetcher(
            `${urlBase}/transaction`,
            {
              method: "POST",
              headers: {
                accept: "*/*",
                "Access-Control-Allow-Origin": "*",
              },
              body: JSON.stringify(value),
            }
          );
          if (!response.ok) {
            throw new Error("Error");
          }

          return Promise.resolve();
        },
        categoryKey: (query) => {
          return query ? ["category", query] : ["category"];
        },
        getCategory: async ({ queryKey }) => {
          const [, query] = queryKey;

          const response = await context.value.fetcher(`${urlBase}/category`, {
            method: "GET",
            headers: {
              accept: "*/*",
              "Access-Control-Allow-Origin": "*",
            },
          });

          const result = await response.json();

          return result.categories_array;
        },
        collectionAdminList: async ({ queryKey }) => {
          const [, query] = queryKey;

          const response = await context.value.fetcher(
            `${urlBase}/admin/funds`,
            {
              method: "GET",
              headers: {
                accept: "*/*",
                "Access-Control-Allow-Origin": "*",
              },
            }
          );

          const result = await response.json();

          return result.funds;
        },
        toggleCollectionAvailable: async (value) => {
          const response = await context.value.fetcher(
            `${urlBase}/admin/fund?id=${value}`,
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

  return (
    <CollectionServiceContext.Provider value={value}>
      {children}
    </CollectionServiceContext.Provider>
  );
};
