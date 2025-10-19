import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importing useNavigate hook
import './searchpage.css';
import PatientProfile from './PatientProfile';
import FlexibleLogo from './FlexibleLogo';


const mockPatients = [
    { id: 1, name: 'John', lastName: 'Doe', email: 'john@example.com', phone: '123456789' },
    { id: 2, name: 'Jane', lastName: 'Smith', email: 'jane@example.com', phone: '987654321' },
    { id: 3, name: 'Ali', lastName: 'Hassan', email: 'ali@example.com', phone: '555123456' }
];

function SearchPage() {
    const [search, setSearch] = useState('');
    const [searchType, setSearchType] = useState('name');
    const [results, setResults] = useState(mockPatients);
    const [selectedPatientId, setSelectedPatientId] = useState(null);
    const navigate = useNavigate();

    const handleSearch = () => {
        const query = search.toLowerCase();
        let filtered = [];
        if (!query) {
            filtered = mockPatients;
        } else if (searchType === 'name') {
            filtered = mockPatients.filter(p =>
                p.name.toLowerCase().includes(query) ||
                p.lastName.toLowerCase().includes(query)
            );
        } else if (searchType === 'email') {
            filtered = mockPatients.filter(p =>
                p.email.toLowerCase().includes(query)
            );
        }
        setResults(filtered);
    };

    React.useEffect(() => {
        if (!search) {
            setResults(mockPatients);
        }
    }, [search, searchType]);

    const handleClick = (id) => {
        // Navigate to the PatientProfile page for the selected patient
        navigate(`/profile/${id}`);
    };

    return (
        <div>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <FlexibleLogo width="200" height="100" />
            </div>
            <h2>Search Patients</h2>
            <div className="search-bar-container">
                <input
                    type="text"
                    placeholder={`Search by ${searchType}`}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
                <div style={{ marginLeft: '30px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <label style={{ color: '#00CED1', fontWeight: 'bold' }}>
                        <input
                            type="radio"
                            name="searchType"
                            value="name"
                            checked={searchType === 'name'}
                            onChange={() => setSearchType('name')}
                        /> Name
                    </label>
                    <label style={{ color: '#00CED1', fontWeight: 'bold' }}>
                        <input
                            type="radio"
                            name="searchType"
                            value="email"
                            checked={searchType === 'email'}
                            onChange={() => setSearchType('email')}
                        /> Email
                    </label>
                </div>
            </div>
            <div style={{ marginTop: '20px' }}>
                <div className="search-header-row">
                    <span className="search-header-col" style={{ minWidth: '160px' }}>Name</span>
                    <span className="search-header-col" style={{ minWidth: '220px' }}>Email</span>
                    <span className="search-header-col" style={{ minWidth: '140px' }}>Phone</span>
                    <span className="search-header-col" style={{ minWidth: '120px' }}>Actions</span>
                </div>
                {results.map(patient => (
                    <div
                        key={patient.id}
                        className="search-result search-result-horizontal"
                    >
                        <span className="result-field result-name"><strong>{patient.name} {patient.lastName}</strong></span>
                        <span className="result-field result-email">{patient.email}</span>
                        <span className="result-field result-phone">{patient.phone}</span>
                        <button
                            onClick={() => handleClick(patient.id)}  // Navigate to the PatientProfile page
                            className="view-profile-btn"
                        >
                            View Profile
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SearchPage;
