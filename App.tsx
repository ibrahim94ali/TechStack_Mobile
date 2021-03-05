import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
  useQuery,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import TechsProvider, { useTechsStore } from "./hooks/TechsContext";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { GET_TECHS } from "./graphQL/Queries";
import { Alert } from "react-native";

export default function App() {
  const isLoadingComplete = useCachedResources();

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      Alert.alert("API ERROR", graphQLErrors[0].message);
    }
    if (networkError) {
      Alert.alert("NETWORK ERROR", networkError.message);
    }
  });
  const link = from([
    errorLink,
    new HttpLink({
      uri: "https://techstack-api.herokuapp.com/graphql",
    }),
  ]);

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: link,
  });

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <ApolloProvider client={client}>
        <ActionSheetProvider>
          <TechsProvider>
            <SafeAreaProvider>
              <Navigation />
              <StatusBar />
              <GetData />
            </SafeAreaProvider>
          </TechsProvider>
        </ActionSheetProvider>
      </ApolloProvider>
    );
  }
}

const GetData = () => {
  const techsStore = useTechsStore();

  //getting techs
  const { data: techs } = useQuery(GET_TECHS);

  useEffect(() => {
    if (techs) {
      techsStore.setTechs(techs.technologies);
    }
  }, [techs]);
  return null;
};
