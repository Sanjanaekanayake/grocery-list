import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import SearchItem from "./components/search.component";
import AddItem from "./components/addItem.component";
import Item from "./components/Item.component";
import { useState } from 'react';


function App(){
     
    const [items, setItems] = useState(JSON.parse(localStorage.getItem('shoppinglist')) || [])
    const [newItem, setNewItem] = useState('')
    const [search, setSearch] = useState('')
   

    const handleCheck = (id) => {
      const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item);
      setItems(listItems);
      localStorage.setItem('shoppinglist', JSON.stringify(listItems));
    }

    const handleDelete = (id) => {
        const listItems = items.filter((item) => item.id !== id);
        setItems(listItems);
        localStorage.setItem('shoppinglist', JSON.stringify(listItems));
    }

    const setAndSaveItems = (newItems) => {
      setItems(newItems);
      localStorage.setItem('shoppinglist', JSON.stringify(newItems));
    }

    const addItem = (item) => {
      const id = items.length ? items[items.length - 1].id + 1 : 1;
      const myNewItem = { id, checked: false, item };
      const listItems = [...items, myNewItem];
      setAndSaveItems(listItems);
    }
    
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!newItem) return;
      addItem(newItem);
      setNewItem('');
    }
    const today =new Date();
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/customers" className="navbar-brand">
            Grocery List
          </a>
          <div className="navbar-nav mr-auto">           
          </div>
        </nav>        
        <div>
          <SearchItem
          search = {search}
          setSearch = {setSearch}>
          </SearchItem>
          <AddItem 
            newItem = {newItem}
            setNewItem = {setNewItem}
            handleSubmit = {handleSubmit}>
            </AddItem>
          <Item
          items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
          handleCheck = {handleCheck}
          handleDelete = {handleDelete}>
          </Item>
          <footer>
            <p>Copyright &copy; {today.getFullYear()}</p>
          </footer>
        </div>
      </div>
    );
  }


export default App;
