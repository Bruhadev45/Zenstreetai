import { useEffect, useState } from 'react';
import { getTree, saveTree } from '../api/tree';

const TreeComponent = ({ username }) => {
  const [treeData, setTreeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTree = async () => {
      try {
        const data = await getTree(username);
        setTreeData(data.tree);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTree();
  }, [username]);

  const handleSave = async () => {
    try {
      await saveTree(username, treeData);
      alert('Tree saved successfully');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Tree for {username}</h1>
      {/* Render tree data here */}
      <button onClick={handleSave}>Save Tree</button>
    </div>
  );
};

export default TreeComponent;
