import { useState } from 'react';

const Home = () => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle authentication
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
        placeholder="Enter username" 
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Home;
