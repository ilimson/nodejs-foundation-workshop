## Getting Started

To get started with this API, follow these steps:

1. Clone the repository to your local environment.
2. Install the required dependencies using `npm install`.
3. Configure your environment variables by creating a `.env` file in the project root and setting the following variables:

   - `APP_PORT=8000`
   - `ENVIRONMENT=development`
   - `MONGO_URI=mongodb://root:password@localhost:27017/express-database?authSource=admin`
   - `SENDGRID_API_KEY=<your-api-key>`
   - `SENDGRID_EMAIL_SENDER=<sender-email>`
   - `SENDGRID_EMAIL_RECEIVER=<receiver-email>`

4. Start the API with `npm start`.

## Environment Variables

The following environment variables are used by the application:

- `APP_PORT`: The port on which the API server will run.
- `ENVIRONMENT`: The environment in which the application is running (e.g., "development", "production").
- `MONGO_URI`: The MongoDB connection URI, including authentication details.
- `SENDGRID_API_KEY`: Your SendGrid API key for sending email notifications.
- `SENDGRID_EMAIL_SENDER`: The email address from which notifications will be sent.
- `SENDGRID_EMAIL_RECEIVER`: The email address to which notifications will be sent.

Ensure you set these environment variables according to your development or production environment requirements.

## API Endpoints

### GET /sensors

- **Summary:** Get all sensor data
- **Description:** Retrieves all sensor data.

### GET /sensor/{sensorId}

- **Summary:** Get Sensor Data by ID
- **Description:** Retrieve sensor data by providing a sensorId.
- **Parameters:**
  - `sensorId` (path, required): The ID of the sensor data to retrieve (must be a valid MongoDB ObjectId).

### POST /sensor

- **Summary:** Create Sensor Data
- **Description:** Create sensor data by providing input for its fields.
- **Request Body:**
  - `temperature` (number, required): The temperature data.
  - `humidity` (number, required): The humidity data.
  - `pressure` (number): The pressure data.
  - `airQuality` (string, enum: "Good", "Moderate", "Poor"): The air quality data.
  - `location` (array of numbers): The location data.

### PUT /sensor/{sensorId}

- **Summary:** Update Sensor Data
- **Description:** Update sensor data by providing input for its fields.
- **Parameters:**
  - `sensorId` (path, required): The ID of the sensor data to update.
- **Request Body:**
  - `temperature` (number): The updated temperature data.
  - `humidity` (number): The updated humidity data.
  - `pressure` (number): The updated pressure data.
  - `airQuality` (string, enum: "Good", "Moderate", "Poor"): The updated air quality data.
  - `location` (array of numbers): The updated location data.

### DELETE /sensor/{sensorId}

- **Summary:** Delete Sensor Data
- **Description:** Delete sensor data by providing the sensorId.
- **Parameters:**
  - `sensorId` (path, required): The ID of the sensor data to delete.

## SocketIo Event

The front-end application should listen to the `sensor:cron` event via socketIo client. This event can be used to periodically retrieve sensor data from the server. Here's an example of how to listen to the `sensor:cron` event and handle it on the front-end:

```javascript
import socketIoClient from "socket.io-client";

const endpoint = "<your-api-endpoint>";

const socket = socketIoClient(ENDPOINT);
socket.on("sensor:cron", ({ data }) => {
  console.log(data);
});
```
