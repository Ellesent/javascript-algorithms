import LinkedListNode from './LinkedListNode';
import Comparator from '../../utils/comparator/Comparator';

export default class LinkedList {
  head = null;
  tail = null;
  constructor() {}

  toArray() {
    const nodes = [];

    let currentNode = this.head;
    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }

    return nodes;
  }

  toString() {
    return this.toArray()
      .map((node) => node.toString())
      .toString(); // Array.toString automatically puts a comma between each item. Nifty!
  }

  /**
   * Append a node to the end of the linked list
   * @param {number} value
   * @returns
   */
  append(value) {
    // create the new node
    const newNode = new LinkedListNode(value, null);

    // first check if head = null. If so we know the list is empty, and the new node will be the only node in the list
    if (this.head == null) {
      this.head = newNode;
      this.tail = newNode;
      return;
    }

    // else set the tail's next to the new node
    this.tail.next = newNode;
    this.tail = newNode;
  }

  /**
   * Prepend a node to the beginning of the linked list
   * @param {*} value
   * @returns
   */
  prepend(value) {
    // create the new node
    const newNode = new LinkedListNode(value, null);

    // first check if head = null. If so we know the list is empty, and the new node will be the only node in the list
    if (this.head == null) {
      this.head = newNode;
      this.tail = newNode;
      return;
    }

    // else set the new node as head, and the new node's next as the prev head
    const prevHead = this.head;
    this.head = newNode;
    newNode.next = prevHead;
  }

  /**
   * Insert a node into the linked list at a specified index
   * @param {*} value
   * @param {number} index
   */
  insert(value, rawIndex) {
    // accounting for negative numbers, if negative default to 0
    const index = rawIndex < 0 ? 0 : rawIndex;

    // if index is 0, then call prepend
    if (index == 0 || this.head == null) {
      this.prepend(value);
      return;
    }

    let currIndex = 0;

    // else find the spot in the list to add
    let curr = this.head;

    // need to get the node before the requested index
    while (curr && currIndex != index - 1) {
      curr = curr.next;
      currIndex++;
    }

    // check that we actually reached the index we were expecting
    //   if (currIndex != index) {
    //       throw new Error(`requested index is out of bounds of the linked list. Current max index is ${currIndex}`);
    //   }

    // if the new node would be the new tail, do an append operation
    if (curr == null || curr.next == null) {
      this.append(value);
      return;
    }

    // otherwise insert the node into the middle of the list
    const temp = curr.next;

    // create the new node
    const newNode = new LinkedListNode(value, temp);

    curr.next = newNode;
  }

  /**
   * Delete all nodes with the specified value, and return the last deleted node
   * @param {*} value
   * @return {LinkedListNode}
   */
  delete(value) {
    // can't delete anything if no nodes are in the list
    if (!this.head) {
      return null;
    }

    let deletedNode = null;

    // case where the head's value matches
    while (this.head && this.head.value == value) {
      deletedNode = this.head;
      this.head = this.head.next;
    }

    let curr = this.head;

    while (curr && curr.next) {
      while (curr.next.value == value) {
        deletedNode = curr.next;
        curr.next = curr.next.next;

        // check if we just deleted the tail, if so make the prev one the tail
        if (curr.next == null) {
          this.tail = curr;
          break;
        }
      }

      curr = curr.next;
    }

    return deletedNode;
  }

  deleteTail() {
    // can't delete anything if no nodes are in the list
    if (!this.head) {
      return null;
    }

    let deleteNode = this.tail;

    // if only one node in the list
    if (this.head == this.tail) {
      this.head = null;
      this.tail = null;

      return deleteNode;
    }

    // delete the tail - need to find the node before the tail
    let curr = this.head;

    while (curr.next != this.tail) {
      curr = curr.next;
    }

    curr.next = null;
    this.tail = curr;

    return deleteNode;
  }

  deleteHead() {
      
  }
}
