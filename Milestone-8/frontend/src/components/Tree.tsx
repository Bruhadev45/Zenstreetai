// src/components/Tree.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import TreeNode from './TreeNode';

const Tree: React.FC = () => {
  const treeStructure = useSelector((state: any) => state.tree);

  return (
    <div>
      <h2>Tree Structure</h2>
      <TreeNode node={treeStructure} path={[]} />
    </div>
  );
};

export default Tree;