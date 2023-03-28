import React from 'react';
import { NavLink } from 'react-router-dom';

function Nav() {
    return (
        
        <nav className="navbar navbar-expand navbar-dark bg-dark ">
            <div className='container'>
            <a class="navbar-brand" href="#">
    <img src="https://www.cosourcing.fr/wp-content/uploads/2020/12/logo-cosourcing-v4-220x49-1.jpg" width="auto" height="auto" alt=""/>
  </a>
            <div className="navbar-nav">
                <NavLink exact to="/" className="nav-item nav-link lien">Acceuil</NavLink>
                <NavLink to="/users" className="nav-item nav-link lien">Employer</NavLink>
            </div>
            </div>
        </nav>
    );
}

export { Nav };