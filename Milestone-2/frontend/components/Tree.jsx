import TreeNode from './TreeNode';

const Tree = ({ nodes, onClick }) => {
  return nodes.map((node) => (
    <TreeNode key={node.id} node={node} onClick={onClick} />
  ));
};

export default Tree;
