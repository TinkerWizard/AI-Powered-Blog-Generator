import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './Layouts/Home/HomePage';
import { GenerateBlogPage } from './Layouts/Generate Blog/GenerateBlogPage';
import { SignUpPage } from './Layouts/Authentication/SignUpPage';
import { SignInPage } from './Layouts/Authentication/SignInPage';
import { UserProfile } from './Layouts/Profile/UserProfile';
import { Provider } from 'react-redux';
import store, { persistor } from './store/store'
import { PersistGate } from 'redux-persist/integration/react';
function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            {/* Authentication */}
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/signin" element={<SignInPage />} />

            {/* Home */}
            <Route path="/home/:username" element={<HomePage />} />
            <Route path="/home/user/:author_username" element={<UserProfile />} />
            <Route path="/blogs/generate" element={<GenerateBlogPage />} />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
