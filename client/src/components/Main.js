import React from 'react'
import '../App.css';
import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Main() {
  const [value, setValue] = React.useState([])


  React.useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api');
      setValue(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const deleteData = async (id) => {
    try{
      await axios.delete(`http://localhost:8000/api/${id}`)
      setValue((prevData) => prevData.filter((data) => data._id !== id))
    }catch(error){
      console.error('Error deleting data:', error);
    }
  }
  // EDIT
  const [editValue, setEditValue] = useState({});

  const handleShow = (index) => {
    setShow(true);
    const currenValue = value[index]
    setEditValue(currenValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(value);
    
    axios.put(`http://localhost:8000/api/${editValue._id}`, editValue)
    .then((response) => {
      console.log(response.data);
      fetchData();
    })
    .catch((error) => {
      console.log("Error while editing data");
    });
    handleClose();
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);


  return (
    <div className='main'>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Gender</th>
            </tr>

          </thead>
          <tbody>
            {value.map((user, index) => (
              <tr key={user.email}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.gender}</td>
                <td><button onClick={()=>deleteData(user._id)}>Del</button></td>
                <td><button onClick={() => handleShow(index)}>Edit</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <form>
            <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Data</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <input type='text' value={editValue.id} onChange={(e)=>{setEditValue({...editValue, id:e.target.value})}}/>Id<br/>
              <input type='text' value={editValue.name} onChange={(e)=>{setEditValue({...editValue, name:e.target.value})}}/>Name<br/>
              <input type='text' value={editValue.email} onChange={(e)=>{setEditValue({...editValue, email:e.target.value})}}/>Email<br/>
              <input type='text' value={editValue.gender} onChange={(e)=>{setEditValue({...editValue, gender:e.target.value})}}/>Gender<br/>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleSubmit}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </form>
      </div>
    </div>
  )
}

export default Main
