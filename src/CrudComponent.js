// src/CrudComponent.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CrudComponent.css';

const CrudComponent = () => {
    const [items, setItems] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [editId, setEditId] = useState(null);
 
    const fetchItems = async () => {zz
        const response = await axios.get('http://127.0.0.1:8000/api/items/');
        setItems(response.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editId) {
            await axios.put(`http://127.0.0.1:8000/api/items/${editId}/`, { name, description });
        } else {
            await axios.post('http://127.0.0.1:8000/api/items/', { name, description });
        }
        setName('');
        setDescription('');
        setEditId(null);
        fetchItems();
    };

    const handleEdit = (item) => {
        setName(item.name);
        setDescription(item.description);
        setEditId(item.id);
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://127.0.0.1:8000/api/items/${id}/`);
        fetchItems();
    };

    useEffect(() => {
        fetchItems();
    }, []);

    return (
        <div>
            <h1>CRUD Operations</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    required
                />
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    required
                />
                <button type="submit">{editId ? 'Update' : 'Add'}</button>
            </form>
            <ul>
                {items.map(item => (
                    <li key={item.id}>
                        {item.name} - {item.description}
                        <button onClick={() => handleEdit(item)}>Edit</button>
                        <button onClick={() => handleDelete(item.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CrudComponent;
