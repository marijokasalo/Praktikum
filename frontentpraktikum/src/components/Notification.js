import React, { useState, useEffect } from 'react';
import axios from 'axios';



const Notification = () => {
    const [notifications, setNotifications] = useState([]);
    const [newNotification, setNewNotification] = useState({message: '', type: ''});
    const [currentNotification, setCurrentNotification] = useState(null);

    const fetchData = async () => {
        const response = await axios.get('http://localhost:8080/api/notifications');
        setNotifications(response.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const addNotification = async (newNotification) => {
        await axios.post('http://localhost:8080/api/notifications', newNotification);
        fetchData();
    };

    const deleteNotification = async (id) => {
        await axios.delete(`http://localhost:8080/api/notifications/${id}`);
        fetchData();
    };
    const updateNotification = async (id, updatedNotification) => {
        await axios.put(`http://localhost:8080/api/notifications/${id}`, updatedNotification);
        fetchData();
    };
    

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-5">Notifications</h1>
            <form className="mb-5" onSubmit={(e) => {
                e.preventDefault();
                if(currentNotification) {
                    updateNotification(currentNotification.id, newNotification);
                } else {
                    addNotification(newNotification);
                }
            }}>
                <div className="mb-3">
                    <input type="text" className="form-control"
                        value={newNotification.message} onChange={(e) => setNewNotification({...newNotification, message: e.target.value})} 
                        placeholder="Notification message" required />
                </div>
                <div className="mb-3">
                    <input type="text" className="form-control"
                        value={newNotification.type} onChange={(e) => setNewNotification({...newNotification, type: e.target.value})} 
                        placeholder="Notification type" required />
                </div>
                <button type="submit" className="btn btn-primary">Save Notification</button>
            </form>
            {notifications.map((notification) => (
                <div key={notification.id} className="card mb-3">
                    <div className="card-body">
                        <h2 className="card-title">{notification.type}</h2>
                        <p className="card-text">Message: {notification.message}</p>
                        <button onClick={() => {
                            setCurrentNotification(notification);
                            setNewNotification(notification);
                        }} className="btn btn-warning mr-2">Edit</button>
                        <button onClick={() => deleteNotification(notification.id)} className="btn btn-danger">Delete</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Notification;
