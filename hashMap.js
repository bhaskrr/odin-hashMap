class HashMap {
    //initialization
    constructor() {
        this.capacity = 16;
        this.LOAD_FACTOR = this.capacity * 0.75; // 75% is the load factor
        this.currentLoad = 0;
        this.arr = new Array(this.capacity);
    }

    //checks the bucket load and changes the properties if necessary
    checkLoad() {
        if (this.currentLoad >= this.LOAD_FACTOR) {
            const newArr = new Array(this.capacity);
            this.arr.push(...newArr);
            this.capacity *= 2;
            this.LOAD_FACTOR = this.capacity * 0.75;
        }
    }

    //the hash function
    hash(string) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < string.length; i++) {
            hashCode = primeNumber * hashCode + string.charCodeAt(i);
        }

        return hashCode;
    }

    set(key, value) {
        this.checkLoad();
        const hashCode = this.hash(key);
        const index = hashCode % this.capacity;
        // console.log(hashCode);
        // console.log(index);
        if (this.arr[index] === null) {
            const linkedList = new LinkedList;
            linkedList.update(key, value);
            this.arr[index] = linkedList;
            this.currentLoad++;
        }
        else {
            //code to handle entries if there are existing entries in the bucket
            this.arr[index].update(key, value);
        }
    }

    get(key) {
        const hashCode = this.hash(key);
        const index = hashCode % this.capacity;
        if (this.arr[index] != null) {
            this.arr[index].find(key);
            return this.arr[index];
        }
        else {
            //code to handle if there are multiple entries
        }
        return null;
    }

    has(key) {
        const hashCode = this.hash(key);
        const index = hashCode % this.capacity;
        if (this.arr[index] != null) {
            return this.arr[index].check(key);
        }
    }

    remove(key) {
        const hashCode = this.hash(key);
        const index = hashCode % this.capacity;
        if (this.arr[index] != null) {
            //remove the entry from the linked list
            this.arr[index].delete(key);
            this.currentLoad--;
            return true;
        }
        return false;
    }

    length() {
        let length = 0;
        for(const element in this.arr){
            length += this.arr[index].getSize();
        }
        return length;
    }

    clear() {
        this.arr.fill(null);
        this.currentLoad = 0;
    }

    keys() {
        const keys = [];
        for (const list of this.arr) {
            const listKeys = list.getKeys();
            keys.push(...listKeys);
        }
        return keys;
    }

    //returns an array containing all the values
    values() {
        const values = [];
        for(const list of this.arr){
            const listValues = list.getValues();
            values.push(...listValues);
        }
    }

    //returns an array that contains each key, value pair
    //eg. [[firstKey, firstValue], [secondKey, secondValue]]

    entries() {
        const entries = [];
        for(const list of this.arr){
            entries.push(list.getKeyValuePairs());
        }
        return entries;
    }
}

//extra credit
//behaves the same as a HashMap but only contains keys with no values
class HashSet {
    constructor() {
        this.keys = [];
    }
    //code to store keys only
}

//linked list
class node {
    constructor(key,value) {
        this.key = key;
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
    //adds a new key to the end of the list
    append(key,value) {
        const newNode = new node(key,value);
        if (this.head == null) {
            this.head = newNode;
            this.tail = newNode;
        }
        else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.size++;
    }

    //update a value
    update(key,value) {
        if(this.head == null){
            const newNode = new node(key, value);
            this.head = newNode;
            this.tail = newNode;
            this.size++;
        }
        else if (this.head != null) {
            let currentNode = this.head;
            while (currentNode != null) {
                if(currentNode.key == key){
                    currentNode.value = value;
                }
                else{
                    currentNode = currentNode.next;
                }
            }
        }
        else{
            return null;
        }
    }

    //finds a value
    find(key){
        if(this.head != null){
            let currentNode = this.head;
            while(currentNode != null){
                if(currentNode.key == key){
                    return currentNode.value;
                }
                currentNode = currentNode.next;
            }
        }
        return null;
    }

    //returns true or false for a key is found or not
    check(key){
        if(this.head != null){
            let currentNode = this.head;
            while(currentNode != null){
                if(currentNode.key == key){
                    return true;
                }
                currentNode = currentNode.next;
            }
        }
        return false;
    }

    //removes a node
    delete(key){
        if(this.head != null){
            let currentNode = this.head;
            let previousNode;
            while(currentNode != null){
                previousNode = currentNode;
                if(currentNode.key == key){
                    previousNode.next = currentNode.next;
                    currentNode.next = null;
                }
            }
        }
        else{
            return null;
        }
    }

    //returns the size
    getSize(){
        return this.size;
    }

    //gets the keys
    getKeys(){
        if(this.head != null){
            const keys = [];
            let currentNode = this.head;
            while(currentNode != null){
                keys.push(currentNode.key);
                currentNode = currentNode.next;
            }
            return keys;
        }
        else{
            return null;
        }
    }

    //gets all the values
    getValues(){
        if(this.head != null){
            const values = [];
            let currentNode = this.head;
            while(currentNode != null){
                values.push(currentNode.value);
                currentNode = currentNode.next;
            }
            return values;
        }
        else{
            return null;
        }
    }

    //gets key - value pairs as arrays
    getKeyValuePairs(){
        const pairs = [];
        if(this.head != null){
            let currentNode = this.head;
            while(currentNode != null){
                const pair = [];
                pair.push(currentNode.key,currentNode.value);
                pairs.push(pair);
            }
        }
        else{
            return null;
        }
    }
}