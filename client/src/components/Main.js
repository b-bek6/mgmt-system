import React from 'react'
import '../App.css';
import axios from 'axios';

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
            {value.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.gender}</td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  )
}

export default Main
