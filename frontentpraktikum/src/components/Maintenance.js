import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';



const Maintenance = () => {
    const [maintenances, setMaintenances] = useState([]);
    const [newMaintenance, setNewMaintenance] = useState({date: new Date(), type: '', personnel: '', lastChanged: new Date()});
    const [currentMaintenance, setCurrentMaintenance] = useState(null);
    

    const fetchData = useCallback(async () => {
        const response = await axios.get('http://localhost:8080/api/maintenance');
        const sortedMaintenances = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setMaintenances(sortedMaintenances);
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const checkMaintenanceDue = useCallback(() => {
        maintenances.forEach((maintenance) => {
            if (isMaintenanceDue(maintenance)) {
                sendNotification(maintenance);
            }
        });
    }, [maintenances]);

    const checkSuctionTiresDue = useCallback(() => {
        const today = new Date();
        maintenances.forEach((maintenance) => {
            const lastChanged = new Date(maintenance.lastChanged);
            const monthsSinceLastChange = Math.round((today - lastChanged) / (1000*60*60*24*30.44));
            if (monthsSinceLastChange >= 4 && monthsSinceLastChange <= 6) {
                console.log('Change suction tires');
            }
        });
    }, [maintenances]);

    useEffect(() => {
        checkMaintenanceDue();
        checkSuctionTiresDue();

        const checkInterval = setInterval(() => {
            checkMaintenanceDue();
            checkSuctionTiresDue();
        }, 60 * 1000);

        return () => clearInterval(checkInterval);
    }, [checkMaintenanceDue, checkSuctionTiresDue]);

    const addMaintenance = async () => {
        await axios.post('http://localhost:8080/api/maintenance', newMaintenance);
        setNewMaintenance({date: '', type: '', personnel: '', lastChanged: ''});
        fetchData();
    };

    const updateMaintenance = async (id, updatedMaintenance) => {
        await axios.put(`http://localhost:8080/api/maintenance/${id}`, updatedMaintenance);
        fetchData();
    };
    
    const deleteMaintenance = async (id) => {
        await axios.delete(`http://localhost:8080/api/maintenance/${id}`);
        fetchData();
    };

    const isMaintenanceDue = (maintenance) => {
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
        return new Date(maintenance.date) < oneYearAgo;
    };

    const sendNotification = (maintenance) => {
        console.log(`Maintenance for ${maintenance.type} is due.`);
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-5">Maintenance</h1>
            <form className="mb-5 d-flex flex-column align-items-start" onSubmit={(e) => {
                e.preventDefault();
                if (currentMaintenance) {
                    updateMaintenance(currentMaintenance.id, newMaintenance);
                } else {
                    addMaintenance();
                }
            }}>
                <div className="mb-3 w-25">
                    <input type="date" className="form-control"
                        value={newMaintenance.date instanceof Date ? newMaintenance.date.toISOString().substr(0,10) : ""} 
                        onChange={(e) => setNewMaintenance({...newMaintenance, date: new Date(e.target.value)})} 
                        placeholder="Date" required />
                </div>
                <div className="mb-3 w-25">
                    <input type="text" className="form-control"
                        value={newMaintenance.type} 
                        onChange={(e) => setNewMaintenance({...newMaintenance, type: e.target.value})} 
                        placeholder="Type" required />
                </div>
                <div className="mb-3 w-25">
                    <input type="text" className="form-control"
                        value={newMaintenance.personnel} 
                        onChange={(e) => setNewMaintenance({...newMaintenance, personnel: e.target.value})} 
                        placeholder="Personnel" required />
                </div>
                <div className="mb-3 w-25">
                    <input type="date" className="form-control"
                        value={newMaintenance.lastChanged instanceof Date ? newMaintenance.lastChanged.toISOString().substr(0,10) : ""} 
                        onChange={(e) => setNewMaintenance({...newMaintenance, lastChanged: new Date(e.target.value)})} 
                        placeholder="Last Changed" required />
                </div>
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
            <div className="row">
              {maintenances.map((maintenance) => (
                  <div key={maintenance.id} className="col-md-4">
                    <div className="card mb-3">
                        <div className="card-body">
                            <p className="card-text">{new Date(maintenance.date).toLocaleDateString()}</p>
                            <p className="card-text">{maintenance.type}</p>
                            <p className="card-text">{maintenance.personnel}</p>
                            <p className="card-text">{new Date(maintenance.lastChanged).toLocaleDateString()}</p>
                            <button onClick={() => deleteMaintenance(maintenance.id)} className="btn btn-danger mr-2">Delete</button>
                            <button onClick={() => {
                                setCurrentMaintenance(maintenance);
                                setNewMaintenance({...maintenance, date: new Date(maintenance.date), lastChanged: new Date(maintenance.lastChanged)});
                            }} className="btn btn-warning">Edit</button>
                        </div>
                    </div>
                  </div>
              ))}
            </div>
        </div>
    );
};

export default Maintenance;
