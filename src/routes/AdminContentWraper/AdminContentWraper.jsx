import React from 'react';
import { Box } from 'react-native';

const AdminContentWrapper = ({ navigation }) => {
  // You may need to replace this with your authentication and role-checking logic in a real-world scenario
  const isAuthenticated = true; // Example: replace with your logic to check if the user is authenticated
  const isAdmin = true; // Example: replace with your logic to check if the user is an admin

  if (!isAuthenticated || !isAdmin) {
    // Redirect to the sign-in page or handle unauthorized access
    navigation.replace('SignIn'); // Replace 'SignIn' with the name of your sign-in screen
    return null; // Return null to avoid rendering the component content
  }

  return (
    <Box>
      {/* Render your admin content here */}
      {/* You can use the 'Outlet' component to render nested screens */}
      <Outlet />
    </Box>
  );
};

export default AdminContentWrapper;
