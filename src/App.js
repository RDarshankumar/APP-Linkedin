import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AccountSelection from './AccountSelection';
import SignUp from './Components/SignUp';
import RegistrationForm from './Agency/RegistrationForm';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AccountSelection />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/asignup" element={<RegistrationForm />} />
      </Routes>
   
    </Router>
  
  );
}

export default App;
