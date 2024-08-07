Ticketing System React Client
This project is a frontend application for a ticketing system built with React and Vite. It provides a user interface for managing tickets, comments, and user authentication.

Table of Contents
Features
Setup Instructions
Available Scripts
Project Structure
Features
User authentication (login and registration)
Viewing, creating, updating, and deleting tickets
Adding comments to tickets
User profile management, including avatar upload
Pagination for ticket comments
Setup Instructions
To set up and run the React client locally, follow these steps:

Clone the repository:

bash
 
git clone https://github.com/manuel-tsvetanski/softuni-ticketing-system-client/tree/master/ticketing-system-client.git
cd ticketing-system-client
Install dependencies:

Make sure you have Node.js and npm installed. Then run:

bash
 
npm install
Set up environment variables:

Create a .env file in the root of the project and add the following environment variable:

plaintext
 
VITE_BACKEND_URL=http://localhost:8000
Replace http://localhost:8000 with the URL of your backend server if it's different.

Run the development server:

bash
 
npm run dev
This will start the development server and open the application in your default browser. The app will automatically reload if you make changes to the code.

Available Scripts
In the project directory, you can run the following scripts:

npm run dev: Starts the development server with hot module replacement.
npm run build: Builds the app for production to the dist folder.
npm run preview: Serves the production build from the dist folder.
npm run lint: Runs ESLint to lint the codebase.
Project Structure
The project's structure is as follows:

arduino
 
ticketing-system-client/
├── public/
│   └── index.html
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── AccountMenu.jsx
│   │   ├── AccountPopup.jsx
│   │   ├── Avatar.jsx
│   │   ├── Logout.jsx
│   │   ├── TicketCommentList.jsx
│   │   ├── TicketCommentPopup.jsx
│   │   └── ConfirmationDialogPopup.jsx
│   ├── hooks/
│   │   └── useAuth.jsx
│   ├── utils/
│   │   ├── statusUtils.jsx
│   ├── api.js
│   ├── App.jsx
    └── index.css
    └── main.jsx
├── .env
├── .eslintrc.js
├── vite.config.js
└── package.json
public/: Contains the HTML template.
src/: Contains the React components, hooks, pages, and API configuration.
.env: Environment variables configuration.
.eslintrc.js: ESLint configuration.
vite.config.js: Vite configuration.
package.json: Project metadata and dependencies.
Contributing
If you would like to contribute to this project, please fork the repository and create a pull request with your changes. Ensure your code follows the existing style and passes all linting checks.