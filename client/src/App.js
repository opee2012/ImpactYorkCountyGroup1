/**
 * Main application component that sets up routing for different pages.
 * @returns {React.Component} The App component with routing configured.
 */
function App() {
  // Use the AuthContext to determine if a user is authenticated
  const { state } = useAuthContext();
  const { email } = state || {};

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Route for the dashboard page */}
          <Route path="/" element={<Dashboard />} />
          {/* Route for the upload page */}
          <Route path="/upload" element={<Upload />} />
          {/* Route for the edit page */}
          <Route path="/edit/:subcategory" Component={Edit} />
          {/* Route for the password change page */}
          <Route path="/password" element={!email ? <Login /> : <ChangePasswordForm />} />
          {/* Route for the login page */}
          <Route path="/login" element={!email ? <Login /> : <Navigate to="/" />} />
          {/* Route for the user management page */}
          <Route path="/user-management" element={!email ? <Login /> : <UserManagement />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
