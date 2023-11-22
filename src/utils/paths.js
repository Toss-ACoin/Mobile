// Import necessary modules from React Native
import { useNavigation, useRoute } from "@react-navigation/native";

// Create a paths object (similar to React Router paths)
export const paths = {
  landingPage: "Home", // Replace with your actual home screen name
  collections: "Collections",
  collection: (collectionId) => `Collection/${collectionId}`, // Replace with your actual collection screen name
  about: "About", // Replace with your actual about screen name
  profile: "Profile", // Replace with your actual profile screen name
  signIn: "SignIn", // Replace with your actual sign-in screen name
  signUp: "SignUp", // Replace with your actual sign-up screen name
  create: "Create", // Replace with your actual create screen name
  notFound: "NotFound", // Replace with your actual not found screen name
  payment: "Payment", // Replace with your actual payment screen name
  usersList: "UsersList", // Replace with your actual users list screen name
  collectionsList: "CollectionsList", // Replace with your actual collections list screen name
  myCollections: "MyCollections", // Replace with your actual my collections screen name
};

// Create a custom hook for extracting collectionId from the route
export const useCollectionId = () => {
  // Use the necessary navigation and route hooks
  const navigation = useNavigation();
  const route = useRoute();

  // Extract collectionId from the route parameters
  const collectionId = route.params?.collectionId;

  // Check if collectionId is not defined or an empty string
  if (typeof collectionId === "undefined" || collectionId === "") {
    // Navigate to the notFound screen (replace with your actual not found screen name)
    navigation.navigate(paths.notFound);
    return 0;
  }

  // Convert collectionId to a number
  return +collectionId;
};
