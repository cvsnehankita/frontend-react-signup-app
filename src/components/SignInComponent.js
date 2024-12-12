import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignInComponent = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://secure-refuge-95775-26d553877570.herokuapp.com/api/auth/v1/signin", formData);
      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
        const uname = formData.username;
        alert("Sign-in successful!");
        navigate("/dashboard", { state:{uname}});
      }
    } catch (error) {
      setError("Invalid credentials.");
    }
  };

  return (
  <div className="container">
    <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
      <input
          type="username"
          name="username"
          placeholder="Username or Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign In</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default SignInComponent;