import React, { useState } from "react";
import { useFirebase } from "../context/Firebase"
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import {useNavigate} from "react-router-dom"
const ListingsPages = () => {
  const firebase = useFirebase();
  const navigate=useNavigate()
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await firebase.handleCreateNewListing(name, age, gender);
   
    setName("");
    setAge("");
    setGender("");
    navigate("/")
    
  }

  return (
    <Container style={{background:"#E96929"}}>
    <Row className="vh-100 d-flex justify-content-center align-items-center">
      <Col md={8} lg={6} xs={12}>
    <div className="container mt-5">
      <h1 className="text-center">Add Details</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Name</Form.Label>
          <Form.Control
          required
            onChange={e => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Enter Name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Age</Form.Label>
          <Form.Control
          required
            onChange={e => setAge(e.target.value)}
            value={age}
            type="text" 
            placeholder="Enter Age"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Gender</Form.Label>
          <Form.Control
          required
            onChange={e => setGender(e.target.value)}
            value={gender}
            type="text"
            placeholder="Enter Gender"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
    </Col>
      </Row>
    </Container>
  )
}

export default ListingsPages;
