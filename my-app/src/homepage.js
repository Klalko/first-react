import React, { useState } from 'react';
import DynamicTable from './DynamicTable';



// 🔁 Parse any format
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

// 👇 SIMULATED API data
const fakeApiResponses = [
    `name: Alice, age: 25, country: USA
   name: Bob, age: 30, country: UK`,

    `ID  Name            Age  Email
1   John Doe       28   johndoe@example.com
2   Jane Smith     34   janesmith@example.com`,

    `product: Laptop, price: 1000, stock: 5
   product: Phone, price: 600, stock: 10`,
];

function HomePage() {
    const [tables, setTables] = useState([]); // 🧠 hold all tables
    const [responseIndex, setResponseIndex] = useState(0); // track which fake response to use next

    const fetchDataAndAddTable = () => {
        // Simulate getting text from API
        if (responseIndex >= fakeApiResponses.length) {
            alert("No more data to fetch!");
            return;
        }

        const rawText = fakeApiResponses[responseIndex];
        const parsed = parseAnyFormat(rawText);

        setTables(prev => [
            ...prev,
            {
                title: `Table ${prev.length + 1}`,
                data: parsed
            }
        ]);

        setResponseIndex(prev => prev + 1);
    };
    const deleteTable = (index) => {
        setTables(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <div>
            <h1>Dynamic Medical Tables</h1>
            <button onClick={fetchDataAndAddTable}>
                Fetch and Add Table
            </button>

            {tables.map((table, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', justifyContent: 'space-evenly', width: '1400px' }}>
                    <DynamicTable
                        data={table.data}
                        title={table.title}
                    />
                    <button
                        onClick={() => deleteTable(index)}
                        style={{
                            border: '2px solid red',
                            color: 'red',
                            backgroundColor: 'transparent',
                            fontWeight: 'bold',
                            fontSize: '16px',
                            padding: '8px 10px',
                            cursor: 'pointer',
                            borderRadius: '8px',

                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3" style={{ color: 'red ' }}><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" fill='red' /></svg>
                    </button>
                </div>
            ))}
        </div>
    );
}

export default HomePage;