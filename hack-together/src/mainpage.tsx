import Mpc from './Mpc.tsx'
import './mainpage.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function Mainpage() {
    return (
      <div 
        className="min-h-screen flex flex-col items-center justify-center p-4 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://modelteaching.com/wp-content/uploads/2019/04/Classroom-Procedures-min.jpg')"
        }}
      >
        <main className='mainBox'>
          <h1 className='title'>
            School
            <br />
            Together
          </h1>
          <div className="space-y-4 flex flex-col justify-center">
            <button className='join-btn'>
              Join
            </button>
             <Router>
                <Mpc />
            </Router>
             
          </div>
        </main>
      </div>
    )
  }

  export default Mainpage;
  