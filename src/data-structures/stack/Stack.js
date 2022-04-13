import LinkedList from '../linked-list/LinkedList';

export default class Stack {
  constructor() {
    // We're going to implement Stack based on LinkedList since these
    // structures are quite similar. Compare push/pop operations of the Stack
    // with prepend/deleteHead operations of LinkedList.
    this.linkedList = new LinkedList();
  }

  isEmpty() {
    return this.linkedList.head === null;
  }

  toString(callback) {
    return this.linkedList.toString(callback);
  }

  push(value) {
    this.linkedList.prepend(value);
  }

  peek() {
    return this.linkedList.head ? this.linkedList.head.value : null;
  }

  pop() {
    const node = this.linkedList.deleteHead();

    return node ? node.value : null;
  }

  toArray() {
    return this.linkedList.toArray().map((node) => node.value);
  }
}
