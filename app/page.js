'use client';
import React, {useState, useEffect } from 'react';
import { collection, addDoc, getDoc, querySnapshot, query, onSnapshot, deleteDoc, doc } from "firebase/firestore"; 
import {db} from './firebase'


export default function Home() {
  const [items, setItems] = useState([
    // {name: 'Coffee', quantity: 1},
    // {name: 'Candy', quantity: 10},
    // {name: 'Oats', quantity: 2},
  ]);
  const [newItem, setNewItem] = useState({name: '', quantity: ''});
  const [total, setTotal] = useState(0);

  // Add item to db
  const addItem = async (e) => {
    e.preventDefault();
    if (newItem.name !== '' && newItem.quantity !== '') {
      // setItems([...items, newItem]);
      await addDoc(collection(db, 'items'), {
        name: newItem.name.trim(),
        quantity: newItem.quantity,
      });
      setNewItem({name: '', quantity: ''});
    }
  };

  // Read item from db
  useEffect(() => {
    const q = query(collection(db, 'items'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let itemsArr = []

      querySnapshot.forEach((doc) => {
        itemsArr.push({...doc.data(), id: doc.id})
      });
      setItems(itemsArr);
    });
  },[]);
  // Delete item from db
  const deleteItem = async (id) => {
    await deleteDoc(doc(db, 'items', id))
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <h1 className='text-pink-500 text-4xl p-4 text-center'>Pantry Tracker</h1>   
        <div className="bg-pink-200 p-4 rounded-lg">
          <form className="grid grid-cols-6 items-center text-black">
            <input 
              value={newItem.name} 
              onChange={(e) => setNewItem({...newItem, name: e.target.value})}
              className="col-span-3 p-3 border" 
              type="text" 
              placeholder="Enter Item"/>
            <input 
              value={newItem.quantity} 
              onChange={(e) => setNewItem({...newItem, quantity: e.target.value})}
              className="col-span-2 p-3 border mx-3" 
              type="text" 
              placeholder="Enter Amount" />
            <button 
            onClick={addItem}
            className="text-white bg-pink-500 hover:bg-pink-400 p-3 text-xl" 
            type="submit">
              +
            </button>
          </form>
          <ul>
            {items.map((item, id) => (
              <li key={id} className='my-4 w-full flex justify-between bg-pink-500'>
                <div className='p-4 w-full flex justify-between'>
                  <span className='capitalize text-white'>{item.name}</span>
                  <span className='text-white'>{item.quantity}</span>
                </div>
                <button onClick={() => deleteItem(item.id)} className='text-white ml-8 p-4 border-l-2 border-pink-200 hover:bg-pink-400 w-16'>
                  X
                  </button>
              </li>
              ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
