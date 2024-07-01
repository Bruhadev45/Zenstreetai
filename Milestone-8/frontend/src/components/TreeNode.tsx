// src/components/TreeNode.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateNode } from '../store/treeSlice';

interface TreeNodeProps {
  node: any;
  path: string[];
}

const TreeNode: React.FC<TreeNodeProps> = ({ node, path }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(node.value);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    dispatch(updateNode({ path, value: parseInt(editValue) }));
    setIsEditing(false);
  };

  if (typeof node === 'number') {
    return (
      <div>
        {isEditing ? (
          <>
            <input
              type="number"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
            />
            <button onClick={handleSave}>Save</button>
          </>
        ) : (
          <>
            <span>{node}</span>
            <button onClick={handleEdit}>Edit</button>
          </>
        )}
      </div>
    );
  }

  return (
    <div>
      {Object.entries(node).map(([key, value]) => (
        <TreeNode key={key} node={value} path={[...path, key]} />
      ))}
    </div>
  );
};

export default TreeNode;