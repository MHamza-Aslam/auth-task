import React from "react";
import Table from 'react-bootstrap/Table';

const BookmeTable = ({ name, age, gender }) => {
  
  return (
    <Table striped bordered hover variant="dark" style={{ background: "#8FD0D5" }}>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Age</th>
          <th>Gender</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>{name}</td>
          <td>{age}</td>
          <td>{gender}</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default BookmeTable;
