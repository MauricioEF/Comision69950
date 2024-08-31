import { useEffect, useState } from 'react'
import './App.css'
import { usersService } from './services/services'

function App() {
  const [users, setUsers] = useState([])

  useEffect(()=>{
    const fetchUsers = async() =>{
      const result = await usersService.getUsers();
      console.log(result);
      const users = result.data.payload.users;
      setUsers(users);
    }
    users.length===0&&fetchUsers();
  },[])

  return (
    <>
    {users&&users.map(user=><div key={user._id}>
      <p>{user.firstName} {user.lastName}</p>
      <p>{user.email}</p>
    </div>)}
    </>
  )
}

export default App
