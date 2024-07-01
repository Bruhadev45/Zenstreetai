import React, { createContext, useCallback, useState } from 'react';

const initialTree = {
  id: 0,
  value: 1,
  children: [],
};

interface TreeContextProps {
  tree: any;
  updateNodeValue: (id: number, value: number) => void;
}

export const TreeContext = createContext<TreeContextProps>({
  tree: initialTree,
  updateNodeValue: () => {},
});

const generateTree = (depth: number, id = 0) => {
  if (depth === 0) {
    return { id, value: 1, children: [] };
  }
  const children = Array.from({ length: 10 }, (_, index) => generateTree(depth - 1, id * 10 + index + 1));
  return { id, value: 1, children };
};

export const TreeProvider: React.FC = ({ children }) => {
  const [tree, setTree] = useState(generateTree(4));

  const updateNodeValue = useCallback((id: number, value: number) => {
    const updateNode = (node: any): any => {
      if (node.id === id) {
        return { ...node, value };
      }
      return {
        ...node,
        children: node.children.map((child: any) => updateNode(child)),
      };
    };
    setTree((prevTree) => updateNode(prevTree));
  }, []);

  return (
    <TreeContext.Provider value={{ tree, updateNodeValue }}>
      {children}
    </TreeContext.Provider>
  );
};
