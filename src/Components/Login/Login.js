import React, { useContext, useState } from 'react';
import './Login.css';
import logo from '../../Resorces/logo_RLAB.png'
import { userContext } from '../../App';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

firebase.initializeApp(firebaseConfig);

const Login = () => {

    const [click, setClick] = useState({
        login: true,
        signUp: false
    })
    const handleSignUp = () => {
        const newClick = {...click}
        newClick.login = false;
        newClick.signUp  = true;
        setClick(newClick)
    }
    
    const handleLogin = () => {
        const newClick = {...click}
        newClick.login = true;
        newClick.signUp  = false;
        setClick(newClick)
    };
    const [user, setUser] = useContext(userContext);
    const handleOnChange = (e) => {
        const newUserInfo = {...user}
        newUserInfo[e.target.name] = e.target.value;
        setUser(newUserInfo);
        console.log(user.ConfirmPassword);
    }
    const handleCreateAccount = (e) => {
        firebase.auth().createUserWithEmailAndPassword(user.email, user.ConfirmPassword)
        .then(res => {
            const newUserInfo = {...user};
            newUserInfo.error = "";
            newUserInfo.success = true;
            setUser(newUserInfo);
            updateUserInfo(user.name)
        }
        )
        .catch(error => {
            const newUserInfo = {
                ...user
            };
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            setUser(newUserInfo)

        });
        e.preventDefault()
    }
   const handleSubmitLogin = (e) => {
    firebase.auth().signInWithEmailAndPassword(user.email, user.ConfirmPassword)
    .then(res => {

        const newUserInfo = {
            ...user
        };
        newUserInfo.email = user.email;
        newUserInfo.error = "";
        newUserInfo.success = true;
        setUser(newUserInfo);
        console.log(res.user);
    })
    .catch(function (error) {
        const newUserInfo = {
            ...user
        };
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        setUser(newUserInfo);
        console.log(error);
    })
    e.preventDefault()
   }
   const updateUserInfo = name => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
    displayName: name,
    }).then(function() {
    console.log("User name Updated SuccessFully")
    }).catch(function(error) {
     console.log(error)
    });
}
    return (
        <div className='background d-flex justify-content-center p-5'>

            {click.login && <div className="loginBox">
                <div className="text-center">
                    <img
                        src={logo}
                        alt=""
                        style={{
                            width: '30%'
                        }}/>
                </div>
                <div className="loginText mt-5 text-center">
                    <h2
                        style={{
                            fontFamily: "'Raleway', sans-serif"
                        }}>Log In</h2>
                </div>
                <p className="text-danger">{user.error}</p>
                {user.success && <p className='text-success'>Log in successfull</p>}
                <form action="" onSubmit={handleSubmitLogin}>
                <div className="">
                    <div class="mb-3 row">

                        <div class="col-sm-10 input-box">
                            <input
                                type="text"
                                class="form-control"
                                id="staticEmail"
                                name="email"
                                placeholder="User email"/>
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <div class="col-sm-10 input-box">
                            <input
                                type="password"
                                class="form-control"
                                id="inputPassword"
                                name="ConfirmPassword"
                                placeholder="Password"/>
                        </div>
                    </div>
                </div>

                <div className="remember">
                    <input className="rememberCheckbox" type="checkbox"/>
                    <label htmlFor="">Remember Me</label>
                </div>
                <div className="forgotPass">
                    <a href="#" className="forgotTxt">Forgot Password</a>
                </div>
                <div>
                    <button className="form-control bg-primary text-light" type='submit'>Log In</button>
                </div>
                <div className="creatTxt">
                    <p>Don't have an account?<span onClick={handleSignUp} className="creatAccount">Create an account</span>
                    </p>
                </div>
                
                </form>
            </div>}

            {click.signUp && <div className="loginBox signup">
                <div className="text-center">
                    <img
                        src={logo}
                        alt=""
                        style={{
                            width: '30%'
                        }}/>
                </div>
                <div className="loginText mt-5 text-center">
                    <h2
                        style={{
                            fontFamily: "'Raleway', sans-serif"
                        }}>Sign Up</h2>
                </div>
                <p className='text-danger'>{user.error}</p>
                {user.success && <p className='text-success'>SignUp SuccessFull</p>}
                <form action="" onSubmit={handleCreateAccount}>
                <div className="">
                    <div class="mb-3 row">

                        <div class="col-sm-10 input-box">
                            <input
                                onChange={handleOnChange}
                                type="text"
                                class="form-control"
                                id="staticEmail"
                                placeholder="First Name"
                                name="name"/>
                        </div>
                    </div>
                    <div class="mb-3 row">

                        <div class="col-sm-10 input-box">
                            <input
                            onChange={handleOnChange}
                                type="text"
                                class="form-control"
                                id="staticEmail"
                                placeholder="Last Name"
                                name="name"/>
                        </div>
                    </div>
                    <div class="mb-3 row">

                        <div class="col-sm-10 input-box">
                            <input
                            onChange={handleOnChange}
                                type="email"
                                class="form-control"
                                id="staticEmail"
                                placeholder="Email"
                                name="email"/>
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <div class="col-sm-10 input-box">
                            <input
                            onChange={handleOnChange}
                                type="password"
                                class="form-control"
                                id="inputPassword"
                                name="ConfirmPassword"
                                placeholder="Password"/>
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <div class="col-sm-10 input-box">
                            <input
                            onChange={handleOnChange}
                                type="password"
                                class="form-control"
                                id="inputPassword"
                                name="ConfirmPassword"
                                placeholder="Confirm Password"/>
                        </div>
                    </div>
                </div>

                <div>
                    <button className="form-control bg-primary text-light" type='submit'>Log In</button>
                </div>
                <div className="creatTxt">
                    <p>Already have an account?<span onClick={handleLogin} className="creatAccount">Log In</span>
                    </p>
                </div>
                
                </form>
            </div>}
        </div>
    );
};

export default Login;