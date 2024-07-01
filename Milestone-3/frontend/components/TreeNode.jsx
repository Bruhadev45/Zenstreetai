const TreeNode = ({ node, onClick }) => {
    return (
      <div onClick={() => onClick(node.id)}>
        {node.value}
      </div>
    );
  };
  
  export default TreeNode;
  