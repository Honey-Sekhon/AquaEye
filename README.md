# AquaEye

AquaEye is an intelligent water monitoring system designed to provide real-time analytics and insights for aquatic environments. The project leverages Raspberry Pi, camera sensors, and advanced machine learning techniques to detect, analyze, and track aquatic metrics, ensuring better environmental monitoring and data-driven decisions.

## Features

- **Real-Time Monitoring**: Tracks aquatic metrics with Raspberry Pi and camera modules.
- **Machine Learning**: Implements object detection and tracking using OpenCV and YOLO.
- **Web Interface**: Provides a user-friendly web interface for data visualization and monitoring.
- **Cloud Integration**: Stores historical data for long-term analysis and insights.
- **Notifications**: Sends alerts for unusual activities or threshold violations.

## Technologies Used

- **Hardware**: Raspberry Pi, HQ Camera, Laser Diodes, Photocells
- **Frontend**: React, Bootstrap
- **Backend**: Node.js, Python, Flask
- **Machine Learning**: OpenCV, YOLO
- **Database**: MongoDB
- **Others**: WebSocket Protocol, REST APIs, Git

## Setup and Installation

### Prerequisites

Ensure you have the following installed:

- Raspberry Pi with Raspbian OS
- Python 3.6 or higher
- Node.js and npm
- Required hardware components (camera modules, laser diodes, photocells, etc.)

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Honey-Sekhon/AquaEye.git
   cd AquaEye/backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```
3. Install the required Python packages:
   ```bash
   pip install -r requirements.txt
   ```
4. Start the Flask server:
   ```bash
   python app.py
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd AquaEye/frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the application:
   ```bash
   npm start
   ```

### Hardware Setup

1. Connect the Raspberry Pi to the camera module, laser diodes, and photocells.
2. Configure GPIO pin mappings in the backend (`config.py`) to match your hardware setup.
3. Ensure all hardware components are powered and functioning as expected.

## Usage

1. Launch the backend server and the frontend interface.
2. Use the web interface to:
   - View real-time aquatic metrics.
   - Analyze historical data.
   - Set thresholds and receive alerts.
3. Monitor aquatic environments and take action based on the insights provided.

## Testing

Run frontend tests using Jest:
```bash
npm test
```

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes and push to your fork.
4. Submit a pull request.

---

For any questions or feedback, please contact [Honeypal Sekhon](mailto:sekhonhoneypal@gmail.com).
