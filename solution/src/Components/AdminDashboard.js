import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

function Home() {
    const [NGOs, setNGOs] = useState([]);
    const [problems, setProblems] = useState([]);
    const truncateDescription = (description) => {
        const words = description.split(' ');
        if (words.length > 20) {
            return words.slice(0, 20).join(' ') + '...';
        }
        return description;
    };
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

    useEffect(() => {
        async function fetchproblem() {
            try {
                const response = await axios.get('http://localhost:6005/api/allproblems');
                setProblems(response.data);
            } catch (error) {
                console.error('Error fetching problem:', error);
            }
        }

        fetchproblem();
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

            <div style={{ textAlign: "center", display: "flex" }}>
                {/* <h1>Dashboard</h1> */}
                <div className='NGO-profile'>
                    <Card className='cardd_dashboard' style={{ height: '44vh' }} >
                        <Card.Img variant="top" src="https://picsum.photos/2000/2000" className='card-img' />
                        <Card.Body className='card_body'>
                            <Card.Title className='card_title'>Admin</Card.Title>
                            <NavLink to={'/createProblem'}>
                                <button className="addLocation">Create Problem</button>
                            </NavLink>
                        </Card.Body>
                    </Card>

                </div>
                <div className='orderDetails' style={{
                    width: '71%',
                    marginLeft: ' 30px', marginBottom: ' 30px',
                }}>
                    <Tabs
                        defaultActiveKey="ngo"
                        id="fill-tab-example"
                        className="mb-3"
                        fill
                    >
                        <Tab eventKey="ngo" title="Registered NGOs">
                            <h1>NGOs</h1>
                            <div className='demo' style={{ display: 'flex', flexWrap: 'wrap' }}>
                                {NGOs.map(NGO => (
                                    <Card key={NGO._id} className='cardd_alter' style={{ flexBasis: '30%' }}>
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
                        </Tab>

                        <Tab eventKey="problem" title="Problems">
                            <h1>Problems Enlisted</h1>
                            <div className='demo' style={{ display: 'flex', flexWrap: 'wrap' }}>
                                {problems.map(problem => (
                                    <Card key={problem._id} className='cardd_alter' style={{ flexBasis: '30%', height: '54vh', }}>
                                        <Card.Img variant="top" src={`http://localhost:6005/files/${problem.filename}`} className='card-img' />
                                        <Card.Body>
                                            <Card.Title className='card_title'>{problem.headline}</Card.Title>
                                            <Card.Text className='card_description'>{truncateDescription(problem.description)}</Card.Text>

                                        </Card.Body>
                                    </Card>
                                ))}
                            </div>
                        </Tab>

                    </Tabs>
                </div>




            </div>
        </div>

    );
}

export default Home;
