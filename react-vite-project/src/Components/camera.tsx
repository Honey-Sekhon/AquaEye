import React from 'react';

const CameraControl = () => {
    // Define a function to handle the button click
    const handleButtonClick = () => {
        fetch('http://localhost:5000/turn-on-camera', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.text())
        .then(data => {
            alert(data); // Alert with the response data from the server
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <div>
            <h1>Python Script</h1>
            <button onClick={handleButtonClick}>Start Test</button>
        </div>
    );
};

export default CameraControl;
