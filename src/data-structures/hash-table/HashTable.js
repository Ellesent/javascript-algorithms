import LinkedList from '../linked-list/LinkedList';

// Hash table size directly affects on the number of collisions.
// The bigger the hash table size the less collisions you'll get.
// For demonstrating purposes hash table size is small to show how collisions
// are being handled.
const defaultHashTableSize = 32;

export default class HashTable {
  /**
   * @param {number} hashTableSize
   */
  constructor(hashTableSize = defaultHashTableSize) {
    // Create hash table of certain size and fill each bucket with empty linked list.
    // Note that fill will fill the array with a static value, meaning that if an object is passed it will reference that same object for all indices. This is why map is needed.
    this.buckets = Array(hashTableSize).fill(new LinkedList()).map(() => new LinkedList());

    // Just to keep track of all actual keys in a fast way.
    this.keys = {};
  }

  /**
   * Converts key string to hash number.
   *
   * @param {string} key
   * @return {number}
   */
  hash(key) {
    // For simplicity reasons we will just use character codes sum of all characters of the key
    // to calculate the hash.
    //
    // But you may also use more sophisticated approaches like polynomial string hash to reduce the
    // number of collisions:
    //
    // hash = charCodeAt(0) * PRIME^(n-1) + charCodeAt(1) * PRIME^(n-2) + ... + charCodeAt(n-1)
    //
    // where charCodeAt(i) is the i-th character code of the key, n is the length of the key and
    // PRIME is just any prime number like 31.
    const hash = Array.from(key).reduce(
      (hashAccumulator, char) => (hashAccumulator + char.charCodeAt(0)),
      0,
    );

    // Reduce hash number so it would fit hash table size.
    return hash % this.buckets.length;
  }

  /**
   * @param {string} key
   * @param {*} value
   */
  set(key, value) {
   // get the index
   const index = this.hash(key);

   const linkedList = this.buckets[index];

   // see if the key already exists
   const element = linkedList.find({callback: (value) => value.key === key});

   // if an element with the specified key couldn't be found, then add a new one. Otherwise modify the current element's value
   if (!element) {
     linkedList.append({key: key, value: value});
   }
   else {
     element.value.value = value;
   }

   this.keys[key] = value;
  }

  /**
   * @param {string} key
   * @return {*}
   */
  delete(key) {
    // get the index
    const index = this.hash(key);
   
    // get the linked list 
    const linkedList = this.buckets[index];

    // get the element connected to the passed in key
    const element = linkedList.find({callback: (value) => value.key === key});

    if (element) {
      linkedList.delete(element.value);

      // removed from the keys object
      delete this.keys[key];
    }
    else {
      return null;
    }

  }

  /**
   * @param {string} key
   * @return {*}
   */
  get(key) {
   // get the index
   const index = this.hash(key);
   
   // get the linked list 
   const linkedList = this.buckets[index];

   const element = linkedList.find({callback: (value) => value.key === key});

   return element? element.value.value : undefined;

  }

  /**
   * @param {string} key
   * @return {boolean}
   */
  has(key) {
    return Object.hasOwnProperty.call(this.keys, key);
  }

  /**
   * @return {string[]}
   */
  getKeys() {
    return Object.keys(this.keys);
  }

  /**
   * Gets the list of all the stored values in the hash table.
   *
   * @return {*[]}
   */
  getValues() {
    return this.buckets.reduce((values, bucket) => {
      const bucketValues = bucket.toArray()
        .map((linkedListNode) => linkedListNode.value.value);
      return values.concat(bucketValues);
    }, []);
  }
}
