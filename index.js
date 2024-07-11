class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(arr) {
    this.root = this.buildTree([...new Set(arr)].sort((a, b) => a - b));
  }

  buildTree(arr) {
    if (arr.length === 0) return null;

    const mid = Math.floor(arr.length / 2);
    const root = new Node(arr[mid]);

    root.left = this.buildTree(arr.slice(0, mid));
    root.right = this.buildTree(arr.slice(mid + 1));

    return root;
  }

  insert(value, arrNode = this.root) {
    if (this.root === null) {
      this.root = new Node(value);
      return;
    }

    if (value < arrNode.data) {
      if (arrNode.left === null) {
        arrNode.left = new Node(value);
        return;
      }
      this.insert(value, arrNode.left);
    } else if (value >= arrNode.data) {
      if (arrNode.right === null) {
        arrNode.right = new Node(value);
        return;
      }
      this.insert(value, arrNode.right);
    }
  }

  deleteItem(value, arrNode = this.root) {
    if (arrNode === null) {
      throw new Error(`Value is not in the tree`);
    }

    if (value < arrNode.data) {
      arrNode.left = this.deleteItem(value, arrNode.left);
    } else if (value > arrNode.data) {
      arrNode.right = this.deleteItem(value, arrNode.right);
    } else {
      // Case 1: Node is a leaf (no children)
      if (arrNode.left === null && arrNode.right === null) {
        return null;
      }

      // Case 2: Node has one child
      if (arrNode.left === null) {
        return arrNode.right;
      }
      if (arrNode.right === null) {
        return arrNode.left;
      }

      // Case 3: Node has two childrern
      const minNode = this.findMin(arrNode.right);
      arrNode.data = minNode.data;
      arrNode.right = this.deleteItem(minNode.data, arrNode.right);
    }
    return arrNode;
  }

  findMin(node) {
    while (node.left !== null) {
      node = node.left;
    }
    return node;
  }

  find(value) {
    let headValue = this.root;

    while (headValue !== null) {
      if (value < headValue.data) {
        headValue = headValue.left;
      } else if (value > headValue.data) {
        headValue = headValue.right;
      } else {
        return headValue; // Value found
      }
    }

    throw new Error("Value not found");
  }

  levelOrder(callback) {
    if (this.root === null) return [];

    const queue = [this.root];
    const results = [];

    while (queue.length) {
      const node = queue.shift();
      results.push(node.data);

      if (callback) callback(node);

      if (node.left !== null) {
        queue.push(node.left);
      }

      if (node.right !== null) {
        queue.push(node.right);
      }
    }

    if (!callback) return results;
  }

  inOrder(callback) {
    const result = [];

    function inOrderTraversal(node) {
      if (node === null) return;

      inOrderTraversal(node.left);
      if (typeof callback === "function") callback(node.data);
      result.push(node.data);
      inOrderTraversal(node.right);
    }

    inOrderTraversal(this.root);
    if (!callback) {
      return result;
    }
  }

  preOrder(callback) {
    const result = [];

    function preTraverse(node) {
      if (node === null) return;

      result.push(node.data);
      if (typeof callback === "function") callback(node.data);
      preTraverse(node.left);
      preTraverse(node.right);
    }

    preTraverse(this.root);
    if (!callback) {
      return result;
    }
  }

  postOrder(callback) {
    const result = [];

    function postTraverse(node) {
      if (node === null) return;

      postTraverse(node.left);
      postTraverse(node.right);
      result.push(node.data);
      if (typeof callback === "function") callback(node.data);
    }

    postTraverse(this.root);
    if (!callback) {
      return result;
    }
  }

  height(node) {
    if (node === null) return 0;

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    if (leftHeight > rightHeight) {
      return leftHeight + 1;
    } else {
      return rightHeight + 1;
    }
  }

  depth(node) {
    let counter = 0;
    if (node === null) return 0;
    let rootNode = this.root;

    while (rootNode.data !== node.data) {
      if (node.data < rootNode.data) {
        counter++;
        rootNode = rootNode.left;
      } else if (node.data > rootNode.data) {
        counter++;
        rootNode = rootNode.right;
      }
    }
    return counter;
  }

  isBalanced() {
    const checkBalance = (node) => {
      if (node === null) return 0;

      const leftHeight = checkBalance(node.left);
      if (leftHeight === -1) return -1;

      const rightHeight = checkBalance(node.right);
      if (rightHeight === -1) return -1;

      if (Math.abs(leftHeight - rightHeight) > 1) {
        return -1;
      }

      return Math.max(leftHeight, rightHeight) + 1;
    };

    return checkBalance(this.root) !== -1;
  }
}

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

tree.deleteItem(8);
tree.find(4);
tree.levelOrder();
tree.deleteItem(324);
tree.inOrder();
tree.preOrder();
tree.postOrder();
tree.height(tree.root);
tree.depth(tree.root);
tree.isBalanced();
