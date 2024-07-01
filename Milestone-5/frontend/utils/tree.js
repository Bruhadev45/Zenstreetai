export const createTree = (depth) => {
    const createNode = (level) => {
      if (level > depth) return null;
      const children = [];
      for (let i = 0; i < 2; i++) {
        const child = createNode(level + 1);
        if (child) children.push(child);
      }
      return { id: Math.random().toString(36).substr(2, 9), value: 1, children };
    };
  
    return createNode(1);
  };
  