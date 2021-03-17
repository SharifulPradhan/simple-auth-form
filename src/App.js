import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGooglePlusSquare, faFacebookSquare, faGithubSquare, faTwitterSquare } from '@fortawesome/free-brands-svg-icons'
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

function App() {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  var facebookProvider = new firebase.auth.FacebookAuthProvider();
  const [user, setUser] = useState({
    isSignin: false,
    name: '',
    email: '',
    photo: ''
  })

  const handleGoogleSignin = () => {
    firebase.auth().signInWithPopup(googleProvider)
      .then((result) => {
        const { displayName, email, photoURL } = result.user;
        const signinUser = {
          isSignin: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(signinUser);
      }).catch((error) => {
        var errorMessage = error.message;
        console.log(errorMessage);
      });
  }

  const handleFacebookLogin = () => {
    firebase.auth().signInWithPopup(facebookProvider)
      .then((result) => {
        const { displayName, email, photoURL } = result.user;
        const signinUser = {
          isSignin: true,
          name: displayName,
          email: email,
          photo: photoURL,
          error: ''
        }
        console.log(signinUser);
        setUser(signinUser);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }
  return (
    <>
          <div className="container">
            <div className="form-section">
              <form action="">
                <input type="text" name="name" placeholder="Your Full Name" />
                <br />
                <input type="email" name="email" placeholder="Email Address" />
                <br />
                <input type="password" name="password" placeholder="Password" />
                <br />
                <input type="submit"  value="Sign Up"/>
              </form>
            </div>
            <div className="divider">
              <h1>Or</h1>
            </div>
            <div className="social-signin-section">
              <button onClick={handleGoogleSignin}><FontAwesomeIcon icon={faGooglePlusSquare}></FontAwesomeIcon> Signin with Google</button>
              <br />
              <button onClick={handleFacebookLogin}><FontAwesomeIcon icon={faFacebookSquare}></FontAwesomeIcon> Signin with Facebook</button>
              <br />
              <button><FontAwesomeIcon icon={faTwitterSquare}></FontAwesomeIcon> Signin with Twitter</button>
              <br />
              <button><FontAwesomeIcon icon={faGithubSquare}></FontAwesomeIcon> Signin with GitHub</button>
            </div>
          </div>
          {/* after signin */}
          {
            user.isSignin && <div className="container">
            <div>
              <p>Name: {user.name}</p>
              <p>Your Email Address: {user.email}</p>
              <img src={user.photo} alt="" />
              <p style={{ color: 'tomato' }}>You are Succesfully Logged in</p>
            </div>
          </div>
          }
    </>
  );
}

export default App;
