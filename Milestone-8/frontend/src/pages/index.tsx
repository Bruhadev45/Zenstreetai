import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tree from '../components/Tree';

export default function Home() {
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const treeStructure = useSelector((state: any) => state.tree);
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      await axios.post('http://localhost:3001/user/register', { username });
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  const handleSave = async () => {
    try {
      await axios.post('http://localhost:3001/user/save-tree', { username, treeStructure });
      alert('Tree structure saved successfully!');
    } catch (error) {
      console.error('Error saving tree structure:', error);
    }
  };

  return (
    <div>
      <h1>Tree Project</h1>
      {!isLoggedIn ? (
        <div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <div>
          <p>Welcome, {username}!</p>
          <Tree />
          <button onClick={handleSave}>Save Tree</button>
        </div>
      )}
    </div>
  );
}