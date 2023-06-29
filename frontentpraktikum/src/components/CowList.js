import React, { useEffect, useState } from 'react';
import axios from 'axios';


function CowList() {
  const [cows, setCows] = useState([]);
  const [currentCow, setCurrentCow] = useState({id: null, name: '', age: ''});

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/cows');
      setCows(response.data);
    } catch (error) {
      console.error('Error fetching cow data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addCow = async (newCow) => {
    await axios.post('http://localhost:8080/api/cows', newCow);
    setCurrentCow({id: null, name: '', age: ''});
    fetchData();
  };

  const deleteCow = async (id) => {
    await axios.delete(`http://localhost:8080/api/cows/${id}`);
    fetchData();
  };

  const updateCow = async (id, updatedCow) => {
    await axios.put(`http://localhost:8080/api/cows/${id}`, updatedCow);
    setCurrentCow({id: null, name: '', age: ''});
    fetchData();
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-5">Cow List</h1>
      <form className="mb-5 d-flex flex-column align-items-start" onSubmit={(e) => {
        e.preventDefault();
        if (currentCow.id) {
            updateCow(currentCow.id, currentCow);
        } else {
            addCow(currentCow);
        }
      }}>
        <div className="mb-3 w-25">
          <input type="text" className="form-control" value={currentCow.name} onChange={(e) => setCurrentCow({...currentCow, name: e.target.value})} placeholder="Name" required />
        </div>
        <div className="mb-3 w-25">
          <input type="number" className="form-control" value={currentCow.age} onChange={(e) => setCurrentCow({...currentCow, age: e.target.value})} placeholder="Age" required />
        </div>
        <button type="submit" className="btn btn-primary">{currentCow.id ? 'Update' : 'Save'}</button>
      </form>
      <div className="row">
        {cows.map((cow) => (
          <div key={cow.id} className="col-md-4">
            <div className="card mb-3">
              <div className="card-body">
                <h2 className="card-title">{cow.name}</h2>
                <p className="card-text">Age: {cow.age}</p>
                <button onClick={() => deleteCow(cow.id)} className="btn btn-danger mr-2">Delete</button>
                <button onClick={() => setCurrentCow(cow)} className="btn btn-warning">Edit</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CowList;
