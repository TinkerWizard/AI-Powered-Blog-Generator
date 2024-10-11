import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './Layouts/Home/HomePage';
import { GenerateBlogPage } from './Layouts/Generate Blog/GenerateBlogPage';
import { SignUpPage } from './Layouts/Authentication/SignUpPage';
import { SignInPage } from './Layouts/Authentication/SignInPage';
function App() {
  const [content, setContent] = useState<string>();
  const [topic, setTopic] = useState<string>();
  const handleTopicChange = (event: any) => {
    event.preventDefault();
    setTopic(event.target.value);
  }
  const handleSubmit = async (event: any) => {
    // event.preventDefault();
    // alert(topic);
    try {
      const response = await fetch("http://127.0.0.1:5000/generate", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ topic })
      });

      const data = await response.json();
      if (response.ok) {
        setContent(data.content);
        alert(data.content);
      }
      else {
        alert("Error in generating or someting");
      }

    } catch (error: any) {
      console.log("Error:", error);
    }
  }
  return (
    <Router>
      <Routes>
        {/* Authentication */}
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />

        {/* Home */}
        <Route path="/home/:username" element={<HomePage />} />
        <Route path="/blogs/generate" element={<GenerateBlogPage />}/>
      </Routes>
    </Router>
  );
}

export default App;
