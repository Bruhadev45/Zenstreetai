import { useContext, useState } from 'react';
import Tree from '../components/Tree';
import { createTree } from '../utils/tree';
import { UserContext } from './_app';

const Home = () => {
  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [treeData, setTreeData] = useState(null);

  const handleLogin = () => {
    setUser(username);
    setTreeData(createTree(10));
  };

  const handleNodeClick = (node) => {
    console.log('Node clicked:', node);
  };

  return (
    <div>
      {!user ? (
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
          <h1>Welcome, {user}</h1>
          <Tree treeData={treeData} onNodeClick={handleNodeClick} />
        </div>
      )}
    </div>
  );
};

export default Home;
