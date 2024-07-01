// src/store/treeSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UpdateNodePayload {
  path: string[];
  value: number;
}

const initialState = {
  // Initialize tree structure with 10,000 nodes
  // This is a simplified version, you might want to create a more efficient structure
  ...Array.from({ length: 10000 }, (_, i) => ({ [`node${i}`]: 1 })).reduce((acc, curr) => ({ ...acc, ...curr }), {}),
};

const treeSlice = createSlice({
  name: 'tree',
  initialState,
  reducers: {
    updateNode: (state, action: PayloadAction<UpdateNodePayload>) => {
      const { path, value } = action.payload;
      let current = state;
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]] as any;
      }
      current[path[path.length - 1]] = value;

      // Propagate the change up the tree
      for (let i = path.length - 2; i >= 0; i--) {
        const parentNode = path.slice(0, i + 1).reduce((acc: any, key) => acc[key], state);
        parentNode[path[i + 1]] = Object.values(current).reduce((sum: number, val: any) => sum + (typeof val === 'number' ? val : 0), 0);
        current = parentNode;
      }
    },
  },
});

export const { updateNode } = treeSlice.actions;
export default treeSlice.reducer;