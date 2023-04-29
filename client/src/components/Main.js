import React from 'react'
import '../App.css';

function Main() {
  const [value, setValue] = React.useState([])


  React.useEffect(() => {
    fetch(('/api'))
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setValue(data)
      })
  }, [])

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
