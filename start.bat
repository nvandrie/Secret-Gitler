:: Frontend
cd frontend
npm i
npm run dev

:: In a seperate terminal
:: Backend
cd backend
npm i
:: Fix this in the future with a proper package.json
tsc server.ts --esModuleInterop
node server.js