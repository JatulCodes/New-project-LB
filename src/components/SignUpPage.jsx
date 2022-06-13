import React, { useEffect, useState, navigator } from "react";
import getCaptcha from "../utils/getCaptcha";
import { useNavigate } from 'react-router-dom';


const SignUpPage = () => {


  const navigate = useNavigate()


  const [user, setUser] = useState({
    name: '', email: '', contact: '', location: '', password: '', cPassword: '', profilePicture: '', checkbox: ''
  });

  let name, value;
  const handelInput = (e) => {
    // console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });

  }
  const Postdata = async (e) => {
    e.preventDefault();

    const { name, email, contact, location, password, cPassword, profilePicture, checkbox } = user;

    const res = await fetch('/register', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name, email, contact, location, password, cPassword, profilePicture, checkbox
      })
    });
    const data = await res.json
    if (data.status === 422 || !data) {
      window.alert("Invalid data resgistration")
      console.log("Invalid data resgistration")
    } else {
      window.alert("Registration succesfull")
      console.log("Registration succesfull");
      navigate("/SignInPage")
    }
  }

  // ADD geo location
  useEffect(() => {
    getCaptcha();
  }, []);
  let x = document.getElementById("demo");
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      x.innerText = "Geolocation is not supported by this browser.";
    }
  }

  function showPosition(position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    x.value = position.coords.latitude + "," + position.coords.longitude;
    console.log(lat, long);
    console.log(position);
  }


  //validate captcha code
  // const cap = document.getElementById("captcha-box").innerText;
  // console.log(cap);

  return (
    <>
      <form method="POST" className="signup">
        <div className="form-heading">Create an Account</div>
        <div className="form-control">
          <div className="form-label">
            Name<span>*</span>
          </div>
          <input name="name" value={user.name} onChange={handelInput} type="text" required />
        </div>
        <div className="form-control">
          <div className="form-label">
            Email<span>*</span>
          </div>
          <input name="email" value={user.email} onChange={handelInput} type="email" required />
        </div>
        <div className="form-control">
          <div className="form-label">Contact Number</div>
          <input value={user.contact} onChange={handelInput} type="number" name="contact" />
        </div>
        <div className="form-control" onClick={getLocation}>
          <div className="form-label">Location</div>
          <input type="text" name="location" id="demo" />
        </div>
        <div className="form-control">
          <div className="form-label">Password</div>
          <input name="password" value={user.password} onChange={handelInput} type="password" />
        </div>
        <div className="form-control">
          <div className="form-label">Confirm Password</div>
          <input value={user.cPassword} onChange={handelInput} type="password" name="cPassword" />
        </div>
        <div className="form-control">
          <div className="form-label">Profile Picture</div>
          <input name="profilePicture" value={user.profilePicture} onChange={handelInput} type="file" accept="image/*" />
        </div>
        <div className="form-control ">
          <div className="form-control-captcha">
            <div className="captcha" id="captcha-box"></div>
            <input type="button" className="button-captcha" value="Refresh" onClick={getCaptcha}></input>
          </div>
          <div className="form-label">
            Captcha<span>*</span>
          </div>
          <input type="text" name="captchaCode" placeholder="Enter captcha below" className="inputCaptcha" />
        </div>
        <div className="form-control">
          <label className="container-check-box">
            <input type="checkbox" value={user.checkbox} name="checkbox" required />
            Accept Terms and Conditions.<span>*</span>
            <span className="checkmark"></span>
          </label>
        </div>
        <div className="form-control form-submit-button">
          <input type="submit" onClick={Postdata} value="register" className="button" />
        </div>
        <div className="form-control">
          <div className="form-label link">
            Already have an account?
            <a href="./" className="form-label">
              Sign in.
            </a>
          </div>
        </div>
      </form>
    </>
  );
};

export default SignUpPage;
