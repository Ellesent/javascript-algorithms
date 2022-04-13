import DoublyLinkedListNode from './DoublyLinkedListNode';

export default class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  /**
   * Convert the doubly linked list to an array
   * @returns
   */
  toArray() {
    let curr = this.head;

    const arr = [];

    while (curr) {
      arr.push(curr);
      curr = curr.next;
    }

    return arr;
  }

  /**
   * Convert an array to a doubly linked list
   * @param {Array<*>} arr
   * @returns
   */
  fromArray(arr) {
    arr.forEach((value) => this.append(value));

    return this;
  }

  /**
   * Convert the doubly linked list to a string
   * @returns
   */
  toString(callback) {
    return this.toArray()
      .map((x) => x.toString(callback))
      .toString(); // Array.toString automatically puts a comma between each item. Nifty!
  }

  /**
   * prepend a node to the beginning of the list
   * @param {*} value
   */
  prepend(value) {
    const newNode = new DoublyLinkedListNode(value);
    // first check if the list is empty, if so make the new node the head and tail of the list
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;

      return this;
    }

    // otherwise we need to make the new node the new head that points to the old node
    const tmp = this.head;
    newNode.next = tmp;
    tmp.previous = newNode;

    this.head = newNode;

    return this;
  }

  /**
   * append a node to the end of the list
   * @param {*} value
   */
  append(value) {
    const newNode = new DoublyLinkedListNode(value);

    // first check if the list is empty, if so make the new node the head and tail of the list
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;

      return this;
    }

    // otherwise we need to make the new node the new tail and connect it to the old tail
    const tmp = this.tail;
    newNode.previous = tmp;
    tmp.next = newNode;

    this.tail = newNode;

    return this;
  }

  /**
   * Delete a node by value
   * @param {*} value
   */
  delete(value) {
    let nodeToDelete = null;
    // can't delete if list is empty
    if (!this.head) {
      return null;
    }

    // case where head is the node to delete
    while (this.head && this.head.value === value) {
      nodeToDelete = this.head;
      this.head = this.head.next;

      // check for case where we've deleted everything in the list. If so, then head is null and we can't set prev or next
      if (this.head) {
        this.head.previous = null;
      }
      // nothing in the list, return
      else {
        return nodeToDelete;
      }
    }

    // delete all nodes with the value we are looking for

    let curr = this.head.next;

    while (curr && curr.next) {
      while (curr && curr.value === value) {
        curr.previous.next = curr.next;
        curr.next.previous = curr.previous;

        nodeToDelete = curr;

        curr = curr.next;
      }

      curr = curr.next;
    }

    // case where tail is the node to delete
    if (curr.value === value) {
      nodeToDelete = this.tail;
      this.tail = curr.previous;
      this.tail.next = null;
    }

    return nodeToDelete;
  }

  deleteTail() {
    // can't delete if list is empty
    if (!this.head) {
      return null;
    }

    let nodeToDelete = this.tail;

    // case where only one node is in the list
    if (this.head == this.tail) {
      this.head = null;
      this.tail = null;

      return nodeToDelete;
    }

    this.tail = this.tail.previous;
    this.tail.next = null;

    return nodeToDelete;
  }

  deleteHead() {
    // can't delete if list is empty
    if (!this.head) {
      return null;
    }

    let nodeToDelete = this.head;

    // case where only one node is in the list
    if (this.head == this.tail) {
      this.head = null;
      this.tail = null;

      return nodeToDelete;
    }

    this.head = this.head.next;
    this.head.previous = null;

    return nodeToDelete;
  }
}
