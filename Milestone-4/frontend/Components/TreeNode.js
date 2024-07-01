import { useState } from 'react';

const TreeNode = ({ node, onNodeClick }) => {
  const [value, setValue] = useState(node.value);

  const handleClick = () => {
    const newValue = value + 1;
    setValue(newValue);
    onNodeClick(node.id, newValue);
  };

  return (
    <div style={{ marginLeft: '20px' }}>
      <span onClick={handleClick}>{value}</span>
      {node.children && node.children.map(child => (
        <TreeNode key={child.id} node={child} onNodeClick={onNodeClick} />
      ))}
    </div>
  );
};

export default TreeNode;
