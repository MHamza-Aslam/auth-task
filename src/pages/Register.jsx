import React,{useState,useEffect} from "react";
import {useNavigate} from "react-router-dom"

import {useFirebase} from "../context/Firebase"
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
const RegisterPage = () => {
const firebase=useFirebase();
const navigate=useNavigate()


const [email,setEmail]=useState("");
const [passwrd,setPassword]=useState("");

useEffect(()=>{
    // if(firebase.isLoggedin){
    // navigate("/")
    // }
    },[])

    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log("sign up a user....");
    
      try {
        const result = await firebase.signupUserWithEmailAndPassword(email, passwrd);
        console.log("Successful", result);
        navigate("/bookme/list");
      } catch (error) {
        if (error.code === "auth/email-already-in-use") {
          alert("This email address is already in use. Please use a different email.");
        } else {
          console.error("Error signing up:", error);
          alert("An error occurred while signing up. Please try again later.");
        }
      }
    }
    

console.log(firebase,"oo");


    return(
    <div>
    <Container style={{background:"#FDC636"}}>
      <Row className="vh-100 d-flex justify-content-center align-items-center">
        <Col md={8} lg={6} xs={12}>
          <Card className="px-4">
            <Card.Body>
              <div className="mb-3 mt-md-4">
                <h2 className="fw-bold mb-2 text-center text-uppercase ">
               Register your Account!
                </h2>
                <div className="mb-3">
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="Name">
                     
                      
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label className="text-center">
                        Email address
                      </Form.Label>
                      <Form.Control
                        onChange={e=>setEmail(e.target.value)}
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
                       onChange={e=>setPassword(e.target.value)}
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
                        Create Account
                      </Button>
                    </div>
                  </Form>
                  <div className="mt-3">
                    <p className="mb-0  text-center">
                      Already have an account??{' '}
                      <a href="/login" className="text-primary fw-bold">
                        Sign In
                      </a>
                    </p>
                  </div>
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

export default RegisterPage