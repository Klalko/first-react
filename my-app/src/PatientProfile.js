import React, { useState, useEffect } from 'react';
import FlexibleLogo from './FlexibleLogo';
import { useParams, useNavigate } from 'react-router-dom';
import DynamicTable from './DynamicTable';
import './searchpage.css'; // Make sure this has .back-button style

// Parse functions (keep as they are)
function parseAnyFormat(rawText) {
    const lines = rawText.trim().split('\n').filter(line => line.trim() !== '');
    if (lines.length === 0) return [];
    const isKeyValueFormat = lines[0].includes(':');
    return isKeyValueFormat
        ? parseKeyValueFormat(lines)
        : parseColumnAlignedFormat(lines);
}
function parseKeyValueFormat(lines) {
    return lines.map(line => {
        const obj = {};
        line.split(',').forEach(pair => {
            const [key, value] = pair.split(':').map(s => s.trim());
            if (key && value) obj[key] = value;
        });
        return obj;
    });
}
function parseColumnAlignedFormat(lines) {
    const headers = lines[0].trim().split(/\s+/);
    return lines.slice(1).map(line => {
        const values = line.trim().split(/\s+/);
        const obj = {};
        headers.forEach((key, index) => {
            obj[key] = values[index] || '';
        });
        return obj;
    });
}

// Sample data for dummy tables (keep as they are)
const dummyDataSets = {
    labResults: `
Test Result ReferenceRange Unit
WBC 7.8 4.5-11.0 10^3/μL
RBC 5.2 4.5-5.9 10^6/μL
Hemoglobin 14.1 13.5-17.5 g/dL
Hematocrit 42 41-50 %
Platelets 250 150-450 10^3/μL
    `,
    vitals: `
Date Time Temp BP HeartRate RespiratoryRate
2023-04-10 08:30 98.6 120/80 72 16
2023-04-05 09:15 98.8 118/78 68 14
2023-04-01 10:00 99.1 125/82 75 18
    `,
    medications: `
Medication Dosage Frequency StartDate EndDate
Lisinopril 10mg Daily 2023-01-15 Ongoing
Metformin 500mg Twice 2022-11-01 Ongoing
Atorvastatin 20mg Nightly 2023-02-10 Ongoing
    `,
    allergies: `
Allergen Reaction Severity ReportedDate
Penicillin Rash Moderate 2020-05-12
Shellfish Anaphylaxis Severe 2018-07-23
Peanuts Hives Mild 2015-03-04
    `
};

// --- MOCK PATIENT DATA (ensure IDs match SearchPage mockPatients) ---
const patientDatabase = {
    // Use matching structure from SearchPage.js if possible
    1: { id: 1, name: "John", lastName: "Doe", age: 45, condition: "Hypertension" },
    2: { id: 2, name: "Jane", lastName: "Smith", age: 38, condition: "Type 2 Diabetes" },
    3: { id: 3, name: "Ali", lastName: "Hassan", age: 52, condition: "Asthma" }
};
// --- END MOCK DATA ---

function PatientProfile() {
    const { id } = useParams();
    const navigate = useNavigate(); 

    const [tables, setTables] = useState([]);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [fileText, setFileText] = useState('');
    const [patientInfo, setPatientInfo] = useState(null);

    useEffect(() => {
        const patientId = parseInt(id, 10); // Convert URL param string to number
        const currentPatient = patientDatabase[patientId]; // Find patient in mock data

        if (currentPatient) {
            setPatientInfo(currentPatient);
            // Load dummy tables (or fetch real data using patientId)
            const newTables = [
                { title: 'Lab Results', data: parseColumnAlignedFormat(dummyDataSets.labResults.trim().split('\n')) },
                { title: 'Vital Signs', data: parseColumnAlignedFormat(dummyDataSets.vitals.trim().split('\n')) },
                { title: 'Current Medications', data: parseColumnAlignedFormat(dummyDataSets.medications.trim().split('\n')) },
                { title: 'Allergies', data: parseColumnAlignedFormat(dummyDataSets.allergies.trim().split('\n')) }
            ];
            setTables(newTables);
        } else {
            setPatientInfo({ id: patientId, name: "Unknown Patient", lastName: "", age: "--", condition: "Not found" });
            setTables([]);
        }
    }, [id]); // Re-run when the 'id' from the URL changes

    const handleFileUpload = (e) => {
        // Keep existing file upload logic
        const file = e.target.files[0];
        if (!file) return;
        if (file.type === 'text/plain') {
            const reader = new FileReader();
            reader.onload = () => {
                setFileText(reader.result);
                const parsed = parseAnyFormat(reader.result);
                setTables(prev => [...prev, { title: 'Uploaded Table', data: parsed }]);
            };
            reader.readAsText(file);
        } else if (file.type.startsWith('image/')) {
            alert('Image uploading is not supported yet.');
        }
    };

    const deleteTable = (index) => {
        setTables(prev => prev.filter((_, i) => i !== index));
    };

    // --- MODIFIED: Navigate to main.html with patient ID ---
    const goToMainHTML = () => {
        if (patientInfo && patientInfo.id) {
            // Pass the current patient's ID as a query parameter
            window.location.href = `/main.html?id=${patientInfo.id}`;
        } else {
            window.location.href = '/main.html'; // Fallback if ID is missing
        }
    };
    // --- END MODIFICATION ---

    // --- ADDED: Navigate back to search page ---
    const goToSearch = () => {
        navigate('/'); // Navigate to the root route which is SearchPage
    };
    // --- END ADDITION ---

    if (!patientInfo) {
        return <div style={{ padding: '20px', textAlign: 'center' }}>Loading...</div>;
    }
    if (patientInfo.condition === "Not found") {
        return (
            <div style={{ padding: '20px', textAlign: 'center' }}>
                Patient with ID {patientInfo.id} not found.
                {/* ADDED: Back Button on Not Found */}
                <button onClick={goToSearch} className="back-button" style={{ marginLeft: '15px' }}>
                    Go Back to Search
                </button>
            </div>
        );
    }

    return (
       <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px' }}>
<div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <FlexibleLogo width="200" height="100" />
            </div>
    <button onClick={goToSearch} className="back-button" style={{ marginBottom: '15px' }}>
      ← Go Back to Search
    </button>
            


    {/* Header section */}
    <div style={{ backgroundColor: '#002B36', padding: '20px', borderRadius: '10px', marginBottom: '20px', boxShadow: '0 0 10px rgba(0, 255, 255, 0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
       
        <h1 style={{ color: '#00FFFF' }}>{patientInfo.name} {patientInfo.lastName} (ID: {patientInfo.id})</h1>
        <p>Age: {patientInfo.age} | Condition: {patientInfo.condition}</p>
      </div>
      <button onClick={goToMainHTML} className="btn-primary" style={{ marginLeft: '20px' }}>
        View/Edit Main Profile
      </button>
    </div>

            {/* Medical Records Section */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', backgroundColor: '#002B36', padding: '15px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 255, 255, 0.2)' }}>
                <h2 style={{ color: '#39FF14', margin: '0' }}>Medical Records</h2>
                <div>
                    <button onClick={() => alert('Feature coming soon!')} className="btn-primary" style={{ marginRight: '10px' }}>Fetch Records</button>
                    <label className="btn-primary" style={{ cursor: 'pointer' }}> Upload File <input type="file" accept=".txt,image/*" onChange={handleFileUpload} style={{ display: 'none' }} /> </label>
                </div>
            </div>

            {/* Dynamic Tables Section */}
            {tables.map((table, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', justifyContent: 'space-between', backgroundColor: '#002B36', padding: '15px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 255, 255, 0.2)' }}>
                    {/* Removed redundant h3 title here as DynamicTable has its own */}
                    <div style={{ width: '100%' }}>
                        <DynamicTable data={table.data} title={table.title} />
                    </div>
                    <button onClick={() => deleteTable(index)} style={{ border: '2px solid red', color: 'red', backgroundColor: 'transparent', fontWeight: 'bold', fontSize: '16px', padding: '8px 10px', cursor: 'pointer', borderRadius: '8px', marginLeft: '15px', height: 'fit-content' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3" style={{ color: 'red' }}> <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" fill='red' /> </svg>
                    </button>
                </div>
            ))}
        </div>
    );
}

export default PatientProfile;