import LinkedList from '../linked-list/LinkedList';

export default class Queue {
  constructor(){
    this.LinkedList = new LinkedList();
  }

  isEmpty() {
    return this.LinkedList.head === null;
  }

  enqueue(value) {
    this.LinkedList.append(value);

    return this;
  }

  dequeue() {
    const node = this.LinkedList.deleteHead();
    return node ? node.value : null;
  }

  peek() {
    return this.LinkedList.head ? this.LinkedList.head.value : null;
  }

  toString(callback) {
    return this.LinkedList.toString(callback);
  }
}
