import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import { useFirebase } from "../context/Firebase";
import MyNavBar from "../components/Navbar";
import { ToastContainer, toast } from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css';
import {firebaseAuth,googleProvider} from "../context/Firebase"
import {signInWithPopup} from "firebase/auth"

const LoginPage = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [passwrd, setPassword] = useState("");
const [user,setUser]=useState(null)
  useEffect(() => {
    // if (firebase.isLoggedin) {
    //   navigate("/");
    // }
  }, [firebase.isLoggedin, navigate]);  

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("sign in a user....");
    try {
      await firebase.signinUserWithEmailAndPassword(email, passwrd);
      navigate("/");
      toast.success('Success Notification !', {
        position: toast.POSITION.TOP_RIGHT
      });
    } catch (error) {
      console.error("Error signing in:", error);
      alert("Please enter valid information or register an account.");
    }
    setEmail("");
    setPassword("");
  }

  console.log(firebase, "oo");
  const handleNavigate = () => {
    navigate("/register")
  }

const handleSigninWithGoogle= () => {
  signInWithPopup(firebaseAuth,googleProvider).then((result)=>{
    const user=result.user;
    setUser(user);
    navigate("/bookme/list")
  }).catch((err)=>{
    console.log(err);
  })
}
const hangleLogout=()=>{
  setUser(null)
}

  return (
    <div>
      <Container style={{ background: "#8FD0D5" }}>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <Card className="px-4">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-center text-uppercase ">
                    Sign in
                  </h2>
                  <div className="mb-3">
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control
                          onChange={e => setEmail(e.target.value)}
                          value={email}
                          type="email"
                          placeholder="Enter email"
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          onChange={e => setPassword(e.target.value)}
                          value={passwrd}
                          type="password"
                          placeholder="Password"
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      ></Form.Group>
                      <div className="d-grid">
                        <Button variant="primary" type="submit">
                          Log in
                        </Button>
                        <Button variant="" onClick={handleNavigate} type="submit">
                          Sign Up
                        </Button>
                        <ToastContainer />  
                        <h5 className="mt-5 mb-5 text-center">OR</h5>
                        {user?(
                          <>
                          

                          </>
                        ):(
 <Button
 onClick={handleSigninWithGoogle}
 variant="danger">Signin with Google</Button>
                        )}
                       
                      </div>
                    </Form>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default LoginPage;
