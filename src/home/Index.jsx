import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className='container'>
            <h1>Gestion Employer :</h1>
            <p>React et .NET Core 7</p>
            <p><Link to="users">&gt;&gt; Employer</Link></p>
        </div>
    );
}

export { Home };