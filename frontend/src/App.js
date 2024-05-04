import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';
import Login from './auth/Login';
import Register from './auth/Register';

import Facture from './components/Facture';
import CreateFacture from './components/CreateFacture';
import UpdateFacture from './components/UpdateFacture';
import DetailsFacture from './components/DetailsFacture';

import Article from './components/Article';
import CreateArticle from './components/CreateArticle';
import UpdateArticle from './components/UpdateArticle';
import DetailsArticle from './components/DetailsArticle';

import Client from './components/Client';
import CreateClient from './components/CreateClient';
import UpdateClient from './components/UpdateClient';
import DetailsClient from './components/DetailsClient';


function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const isAuth = localStorage.getItem('isAuth') === 'true'; 
        setIsAuthenticated(isAuth);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('isAuth');
        setIsAuthenticated(false);
    };

    return (
        <div className="App">
            <BrowserRouter>
                <nav className="Nav">
  
                    <div className="NavRight">
                        <ul className="NavList">
                            {isAuthenticated ? (
                                <>

                                    <li className="NavItem">
                                        <NavLink to="/facture" className="NavLink" activeClassName="active">Gestion des factures</NavLink>
                                    </li>
                                    <li className="NavItem">
                                        <NavLink to="/article" className="NavLink" activeClassName="active">Gestion des articles</NavLink>
                                    </li>
                                    <li className="NavItem">
                                        <NavLink to="/client" className="NavLink" activeClassName="active">Gestion des clients</NavLink>
                                    </li>
                                    <li className="NavItem">
                                        <NavLink
                                            to="/logout"
                                            className="NavLink"
                                            activeClassName="active"
                                            onClick={handleLogout}
                                            style={{ backgroundColor: 'red', border: '2px solid red' }}
                                        >
                                            Log out
                                        </NavLink>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="NavItem">
                                        <NavLink to='/login' className="NavLink" activeClassName="active">Se connecter</NavLink>
                                    </li>
                                    <li className="NavItem">
                                        <NavLink to='/register' className="NavLink" activeClassName="active">S'inscrire</NavLink>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </nav>
                <Routes>
                    {isAuthenticated ? (
                        <>
                            <Route path="/facture" element={<Facture />} />
                            <Route path="/facture/create" element={<CreateFacture />} />
                            <Route path="/facture/update/:id" element={<UpdateFacture />} />
                            <Route path="/facture/details/:id" element={<DetailsFacture />} />
                            <Route path="/article" element={<Article />} />
                            <Route path="/article/create" element={<CreateArticle />} />
                            <Route path="/article/update/:id" element={<UpdateArticle />} />
                            <Route path="/article/details/:id" element={<DetailsArticle />} />
                            <Route path="/client" element={<Client />} />
                            <Route path="/client/create" element={<CreateClient />} />
                            <Route path="/client/update/:id" element={<UpdateClient />} />
                            <Route path="/client/details/:id" element={<DetailsClient />} />
                        </>
                    ) : (
                        <>
                            <Route path='/login' element={<Login onLogin={() => setIsAuthenticated(true)} />} />
                            <Route path='/register' element={<Register />} />
                        </>
                    )}
                </Routes>
                <footer className="Footer">
                    
                <p>Ce site a été créé par <a href="https://www.linkedin.com/in/mohamedouni/">Mohamed Ouni</a></p>
                </footer>
            </BrowserRouter>
        </div>
    );
}

export default App;
