import React from 'react';
import TreeNode from './TreeNode';

const Tree = ({ tree, onNodeClick }) => (
  <div>
    <TreeNode node={tree} onNodeClick={onNodeClick} />
  </div>
);

export default Tree;
