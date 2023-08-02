import logo from './logo.svg';
import './App.css';

import logoPet from './images/logo.png';
import style from './styles/style.css';
import { Link, Route, Routes } from 'react-router-dom';
import ShoesList from './components/ShoesList';
import { useState } from 'react';
import BagsList from './components/BagsList';

function App() {

    // const [count, setCount] = useState(20);
    // const [total, setTotal] = useState(0);
    // const [displayShoes, setDisplayShoes] = useState(true);

    // const incrementCount = () => count + 20 > total ? setCount(total) : setCount(count + 20);
    // const totalFunc = (total) => setTotal(total);
    // const changeDisplay = () => setDisplayShoes();

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
                <Route path="/bags" element={<BagsList />} />
            </Routes>

            {/* <div className='filter-div'>

            </div>

            <div className='product-grid'>
                <h2 className='heading-count'>Loading {Number(count)} out of {Number(total)}</h2>

                <button className='btn-load' onClick={incrementCount} disabled={count === total}>Load More</button>
            </div> */}

            <footer>
                <ul>
                    <li><Link href="#"><span className="bold">About Us</span></Link></li>
                    <li><Link href="#">Locations</Link></li>
                    <li><Link href="#">Return Policy</Link></li>
                    <li><Link href="#">Complaints</Link></li>
                    <li><Link href="#">Gift Cards</Link></li>
                </ul>
                <Link href="#"><span className="bold">Contact Us</span></Link>
                <button>Call</button>
                <time>Mon-Fri: 8AM - 10PM</time>
                <i className="fa-brands fa-square-facebook"></i>
                <i className="fa-brands fa-instagram"></i>
                <i className="fa-brands fa-twitter"></i>
                <i className="fa-brands fa-pinterest"></i>
            </footer>
        </div>
    );
}

export default App;
