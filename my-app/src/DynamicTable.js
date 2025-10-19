import React, { useState } from 'react';
import './App.css';

const DynamicTable = ({ data, title = 'Untitled Table' }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [tableTitle, setTableTitle] = useState(title);

    if (!data || data.length === 0) return null;

    
    const allKeys = new Set();
    data.forEach(item => {
        Object.keys(item).forEach(key => allKeys.add(key));
    });
    const columns = Array.from(allKeys);

    return (
        <div
            className='table-container'
            style={{
                marginBottom: '20px',
                border: '1px solid #00FFFF',
                borderRadius: '8px',
                padding: '10px',
                fontWeight: 'bold',
                width: '100%',
                maxWidth: '1200px',
                margin: '0 auto'
            }}
        >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div
                    className='table-header'
                    onClick={() => setIsVisible(!isVisible)}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer',
                        marginBottom: '10px',
                        fontSize: '30px'
                    }}
                >
                    <span>{tableTitle}</span>
                    <span>{isVisible ? '🔼' : '🔽'}</span>
                </div>

                {isVisible && (
                    <>
                        <input
                            type="text"
                            value={tableTitle}
                            onChange={(e) => setTableTitle(e.target.value)}
                            placeholder="Enter table title"
                            style={{
                                fontWeight: 'bold',
                                fontSize: '20px',
                                width: '200px',
                                marginBottom: '20px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                                padding: '8px',
                                textAlign: 'center',
                                display:'flex',
                                justifyContent:'space-between'
                            }}
                        />

                        <table
                            className='tablestyle'
                            style={{
                                width: '100%',
                                minWidth: '800px'
                            }}
                        >
                            <thead>
                                <tr>
                                    {columns.map(col => (
                                        <th
                                            key={col}
                                            style={{
                                                padding: '8px',
                                                borderBottom: '2px solid #00FFFF',
                                                textAlign: 'center'
                                            }}
                                        >
                                            {col}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((row, i) => (
                                    <tr key={i}>
                                        {columns.map(col => (
                                            <td
                                                key={col}
                                                style={{
                                                    padding: '8px',
                                                    borderBottom: '1px solid #00FFFF',
                                                    textAlign: 'center'
                                                }}
                                            >
                                                {row[col] || ''}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                )}
            </div>
        </div>
    );
};

export default DynamicTable;
