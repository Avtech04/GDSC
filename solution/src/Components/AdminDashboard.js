import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import { NavLink } from 'react-router-dom';

function Home() {
    const [NGOs, setNGOs] = useState([]);

    useEffect(() => {
        async function fetchNGO() {
            try {
                const response = await axios.get('http://localhost:6005/api/NGO');
                setNGOs(response.data);
            } catch (error) {
                console.error('Error fetching NGO:', error);
            }
        }

        fetchNGO();
    }, []);

 // Function to handle status change
// Function to handle status change
const handleStatusChange = async (id) => {
    try {
        console.log('ID:', id);
        // Find the NGO with the given id
        const NGOToUpdate = NGOs.find(ngo => ngo._id === id);
        console.log('NGOToUpdate:', NGOToUpdate);
        // If the NGO is found and its status is "not verified", update it to "verified"
        if (NGOToUpdate && NGOToUpdate.status === 'Not- Verified') {
            console.log('Updating status...');
            // Update the status in the database
            await axios.put(`http://localhost:6005/api/NGO/${id}`, { status: 'verified' });

            // Update the status locally
            const updatedNGOs = NGOs.map(ngo => {
                if (ngo._id === id) {
                    return { ...ngo, status: 'verified' };
                }
                return ngo;
            });

            // Update the local state
            setNGOs(updatedNGOs);
        }
    } catch (error) {
        console.error('Error updating status:', error);
    }
};


    return (
        <div className="homepage">
            <h1>Hello and welcome to the home</h1>
            <NavLink to={'/createProblem'}>
                <button className="donate">Create Problem</button>
            </NavLink>

            {NGOs.map(NGO => (
                <Card key={NGO._id} className='cardd'>
                    <Card.Img variant="top" src={NGO.image} className='card-img' />
                    <Card.Body>
                        <Card.Title className='card_title'>{NGO.displayName}</Card.Title>
                        <Card.Text className='card_description'>{NGO.email}</Card.Text>
                        <Card.Text className='card_description' onClick={() => handleStatusChange(NGO._id)}>
                            {NGO.status === 'Not- Verified' ? (
                                <span style={{ cursor: 'pointer', color: 'blue' }}>Not Verified</span>
                            ) : (
                                <span style={{ color: 'green' }}>Verified</span>
                            )}
                        </Card.Text>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
}

export default Home;
