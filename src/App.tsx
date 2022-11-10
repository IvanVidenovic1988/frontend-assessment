import { BrowserRouter, Route, Routes } from 'react-router-dom'

// styles
import './App.css';

// components & pages
import ProtectedRoute from './components/ProtectedRoute';
import ProtectedLoginRoute from './components/ProtectedLoginRoute'
import Nav from './components/Nav'
import Login from './pages/Login/Login'
import Events from './pages/Events/Events'
import SingleEventPage from './pages/SingleEventPage/SingleEventPage';
import { EventContextProvider } from './context/EventContext';
import { ROUTES } from './config/consts';

function App() {

  return (

    <div className="App">

        <BrowserRouter>

            <Nav />

          <Routes>

            <Route path={ROUTES.login} element={
              <ProtectedLoginRoute>
                <Login />
              </ProtectedLoginRoute>}
            />

            
              <Route path={ROUTES.events} element={
                <ProtectedRoute>
                  <EventContextProvider>
                    <Events />
                  </EventContextProvider>
                </ProtectedRoute>} 
              />
            

            <Route path={`${ROUTES.events}/:id`} element={
              <ProtectedRoute>
                <SingleEventPage />
              </ProtectedRoute>} 
            />
            

          </Routes>

        </BrowserRouter>

    </div>
  );
}

export default App;
