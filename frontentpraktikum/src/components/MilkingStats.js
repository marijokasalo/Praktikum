import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';



const MilkingStats = () => {
    const [milkingStats, setMilkingStats] = useState([]);
    const [currentStat, setCurrentStat] = useState({id: null, cow: '', milker: '', amountOfMilk: '', date: new Date()});

    const fetchData = useCallback(async () => {
        const response = await axios.get('http://localhost:8080/api/milking-stats');
        const sortedStats = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setMilkingStats(sortedStats);
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const addMilkingStat = async (newMilkingStat) => {
        newMilkingStat.date = new Date();
        await axios.post('http://localhost:8080/api/milking-stats', newMilkingStat);
        setCurrentStat({id: null, cow: '', milker: '', amountOfMilk: '', date: new Date()});
        fetchData();
    };

    const updateMilkingStat = async (id, updatedStat) => {
        updatedStat.date = new Date();
        await axios.put(`http://localhost:8080/api/milking-stats/${id}`, updatedStat);
        setCurrentStat({id: null, cow: '', milker: '', amountOfMilk: '', date: new Date()});
        fetchData();
    };

    const deleteMilkingStat = async (id) => {
        await axios.delete(`http://localhost:8080/api/milking-stats/${id}`);
        fetchData();
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-5">Milking Statistics</h1>
            <form className="mb-5 d-flex flex-column align-items-start" onSubmit={(e) => {
                e.preventDefault();
                if (currentStat.id) {
                    updateMilkingStat(currentStat.id, currentStat);
                } else {
                    addMilkingStat(currentStat);
                }
            }}>
                <div className="mb-3 w-25">
                    <input type="text" className="form-control"
                        value={currentStat.cow} onChange={(e) => setCurrentStat({...currentStat, cow: e.target.value})} 
                        placeholder="Cow Name" required />
                </div>
                <div className="mb-3 w-25">
                    <input type="text" className="form-control"
                        value={currentStat.milker} onChange={(e) => setCurrentStat({...currentStat, milker: e.target.value})} 
                        placeholder="Milker" required />
                </div>
                <div className="mb-3 w-25">
                    <input type="number" className="form-control"
                        value={currentStat.amountOfMilk} onChange={(e) => setCurrentStat({...currentStat, amountOfMilk: e.target.value})} 
                        placeholder="Amount of Milk" required />
                </div>
                <button type="submit" className="btn btn-primary">{currentStat.id ? 'Update' : 'Save'}</button>
            </form>
            <div className="row">
                {milkingStats.map((stat) => (
                    <div key={stat.id} className="col-lg-4 col-md-6 col-sm-12">
                        <div className="card mb-3">
                            <div className="card-body">
                                <p className="card-text">{stat.cow}</p>
                                <p className="card-text">{stat.milker}</p>
                                <p className="card-text">{stat.amountOfMilk}</p>
                                <p className="card-text">{new Date(stat.date).toLocaleDateString()}</p>
                                <button onClick={() => deleteMilkingStat(stat.id)} className="btn btn-danger mr-2">Delete</button>
                                <button onClick={() => setCurrentStat(stat)} className="btn btn-warning">Edit</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MilkingStats;
