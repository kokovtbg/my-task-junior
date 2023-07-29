import logo from './logo.svg';
import './App.css';

import logoPet from './images/logo.png';
import style from './styles/style.css';
import { Link, Route, Routes } from 'react-router-dom';
import ShoesList from './components/ShoesList';

function App() {

    return (
        // <div className="App">
        //     <header className="App-header">
        //         <img src={logo} className="App-logo" alt="logo" />
        //         <p>
        //             Edit <code>src/App.js</code> and save to reload.
        //         </p>
        //         <a
        //             className="App-link"
        //             href="https://reactjs.org"
        //             target="_blank"
        //             rel="noopener noreferrer"
        //         >
        //             Learn React
        //         </a>
        //     </header>
        // </div>
        <div>
            <header className='header-app'>
                <div className='logo-div'>
                    <img src={logoPet} alt="img" />
                </div>
                <ul className='header-category'>
                    <li><Link to='/bags'>Bags</Link></li>
                    <li><Link to='/shoes'>Shoes</Link></li>
                </ul>
            </header>

            <Routes>
                <Route path='/' element={<ShoesList />} />
                <Route path="/shoes" element={<ShoesList />} />
            </Routes>

        </div>
    );
}

export default App;
