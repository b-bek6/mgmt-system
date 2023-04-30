import React from 'react'
import '../App.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';

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
  const editData = async (id) => {
    try {
      await axios.put(`http://localhost:8000/api/${id}`)
    }catch (e){
      console.error('Error while editing the data',e);
    }
  }


  return (
    <div className='main'>
      <button type="button" class="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-sm">Small modal</button>

      <div class="modal fade bd-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-sm">
          <div class="modal-content">
            Your text here
          </div>
        </div>
    </div>
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
            {value.map(user => (
              <tr key={user.email}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.gender}</td>
                <td><button onClick={()=>deleteData(user._id)}>Del</button></td>
                <td><button onClick={()=>editData(user._id)} data-toggle="modal" data-target=".bd-example-modal-sm">Edit</button></td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  )
}

export default Main
