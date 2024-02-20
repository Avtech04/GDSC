# HarmonyHive
<img width="1232" alt="image" src="https://github.com/Avtech04/tempppp/assets/97428742/52b28889-ad3c-4128-bc6b-9a8b61aa0496">


HarmonyHive is a pioneering platform enabling individuals and organizations to donate excess food seamlessly, fostering sustainable consumption and aiding in natural and human disasters worldwide. Through intuitive interfaces, users can contribute via Google Pay, while NGOs facilitate distribution to those in need, ensuring efficient and transparent relief efforts. With real-time tracking and admin authentication, HarmonyHive stands at the forefront of compassionate and effective humanitarian initiatives.

## Technologies and Product Used

- [Google Pay](https://developers.google.com/pay/india/api/web/intro): Used Google Pay to ensure seamless and secure Payment.

- [Google Translate](https://translate.google.co.in/): Used Google Translate to ensure multi lingual facility.

- [Map Box Api](https://www.mapbox.com/): Used Map box api to ensure visual representation of map and routes.

- [Node.js](https://nodejs.org/): A JavaScript runtime built on Chrome's V8 JavaScript engine.

- [Socket.io](https://socket.io/): A library for real-time web applications. It enables real-time, bidirectional, and event-based communication.

- [MongoDB](https://www.mongodb.com/): A NoSQL database for storing and managing data.

## Features

### 1. Disaster Donation Portal:
-  Users receive concise information on ongoing disasters and can donate conveniently via Google Pay.
<img width="943" alt="image" src="https://github.com/Avtech04/tempppp/assets/97428742/5f7c9ed3-33fa-4e6c-990c-cde48e997805">
<img width="943" alt="image" src="https://github.com/Avtech04/tempppp/assets/97428742/a21b4540-0c7b-4f19-a40e-4b77c9d59af2">

### 2. NGO Coordination
- Non-governmental organizations (NGOs) act as intermediaries, adding locations where they can reach those in need and facilitating food distribution.
<img width="937" alt="image" src="https://github.com/Avtech04/tempppp/assets/97428742/9859df12-57f9-4836-bb62-d897802551b4">
<img width="937" alt="image" src="https://github.com/Avtech04/tempppp/assets/97428742/0416af90-c184-491f-aa26-dda82efe967c">


### 4. Order Management and Tracking: 
- Live tracking of donation orders ensures transparency and accountability, from donor selection to distribution by NGOs.
<img width="932" alt="image" src="https://github.com/Avtech04/tempppp/assets/97428742/4ce74292-d370-4743-b39a-2befb014d21f">


### 5. Admin Panel:
- An admin panel authenticates NGOs and provides real-time updates on ongoing natural disasters, ensuring reliable information for users and efficient coordination of relief efforts.

<img width="932" alt="image" src="https://github.com/Avtech04/tempppp/assets/97428742/ec300035-991e-4386-a161-842d7fd02e35">

### 6. Google Translator Integration: 
- The platform integrates Google Translator, allowing seamless communication between donors, NGOs, and recipients of aid who speak different languages.
<img width="938" alt="image" src="https://github.com/Avtech04/tempppp/assets/97428742/91d02466-7a06-4677-9e8e-6e3fed612b69">


## Getting Started

To get started with the Real-Time Drawing and Guessing Web App, follow these steps:

1. Clone the repository.
```bash
  git clone https://github.com/Avtech04/GDSC.git
```


2. Go to the project directory

```bash
  cd GDSC
```

3. Go to the frontend project directory
   
```bash
  cd solution
```

4. Install dependencies

```bash
  npm install
```

5. Creating .env file
```node

REACT_APP_MAP_KEY=  // mapbox api key (link: https://www.mapbox.com/)

```
6. Start the server in development mode

```bash
  npm start
```

7. From main folder GDSC go to backend directory (in another terminal)

```bash
  cd server
```

8. Install dependencies

```bash
  npm install
```

9. Creating .env file
```node

ClientId= //google id for goolge auth
ClientSecret= //google client secret
```

10. Connect to MongoDB By changing the file server/db/conn.js as per convinence

11. Start the backend server
```bash
  nodemon app.js
```

## Live Demonstration

https://github.com/Avtech04/tempppp/assets/97428742/df687472-6e4d-47d8-b4f4-01f387205bd4


