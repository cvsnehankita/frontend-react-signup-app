import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const SignUpComponent = () => {
const [formData, setFormData] = useState({email: "", username: "", password: "" });
let [uname, setUname] = useState("");
const [agreeToTerms, setAgreeToTerms] = useState(false);
const [isCheckboxDisabled, setIsCheckboxDisabled] = useState(true);
const [error, setError] = useState(null);
const navigate = useNavigate();

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
  const updatedData = { ...formData, [name]: value };
  const allFieldsFilled = Object.values(updatedData).every((field) => field.trim() !== "");
  setIsCheckboxDisabled(!allFieldsFilled);
  return updatedData;
};

const handleCheckboxChange = (e) => {
  setAgreeToTerms(e.target.checked);
};

const handleSubmit = async (e) => {
  e.preventDefault();
    if (!agreeToTerms) {
      setError("You must agree to the Terms of Service.");
      alert("You must agree to the Terms of Service.");
      return;
    }
  try {
    const response = await axios.post("https://secure-refuge-95775-26d553877570.herokuapp.com/api/auth/v1/signup", formData);
    if (response.status === 200) {
      alert("Sign-up successful!");
      navigate("/signin");
    }
  } catch (error) {
    alert("Error during sign-up.");
  }
};
const handleGoogleLogin = (myresponse) =>{
  const decodedToken = jwtDecode(myresponse.credential);
  console.log("res: ", myresponse);
  uname = decodedToken.name;
  navigate("/dashboard", { state: { uname }});
}
const handleFailure = (error) => {
  console.error("Google Login Error: ", error);
  alert("Google Login failed.");
};
return (
  <div className="container">
    <h2>Sign Up</h2>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />
       <div className="terms">
          <input
            type="checkbox"
            id="agreeToTerms"
            checked={agreeToTerms}
            onChange={handleCheckboxChange}
            disabled={isCheckboxDisabled}
          />
          <label htmlFor="{agreeToTerms}">
            I agree to all statements in Terms of Service
          </label>
        </div>
      <button type="submit" disabled={isCheckboxDisabled}>Sign Up</button>
      <div><br></br>
            <GoogleLogin
                buttonText="Login with Google"
                onSuccess={handleGoogleLogin}
                onFailure={handleFailure}
                cookiePolicy={"single_host_origin"}
                auto_select={true}
            />
        </div>
    </form>
  </div>
);
};
export default SignUpComponent;