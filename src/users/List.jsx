import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
//import 'react-tabulator/lib/styles.css';
import { ReactTabulator } from 'react-tabulator';

import { userService } from '@/_services';



function List({ match }) {
    const { path } = match;
    const [users, setUsers] = useState(0);
    const [userss, setUserss] = useState(0);

    useEffect(() => {
        userService.getAll().then(x => setUsers(x));
        userService.getAll().then(x => setUserss(x));
   
    }, []);

    function deleteUser(id) {
        setUsers(users.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        userService.delete(id).then(() => {
            setUsers(users => users.filter(x => x.employerID !== id));
        });
    }

    function mitady(tab = [], motcle = "") {
        var motcle = motcle
        var bac = tab
        var result = []
        for (let emp in bac) {
            var employer = bac[emp]
            var champs = Object.values(employer)
            var verif = false
            for (var i in champs) {
                var mot = String(champs[i])
                if (mot.indexOf(motcle) >= 0) {
                    verif = true;
                }
            }
            if (verif) {
                result = result.concat(employer)
            }
           
        } return (result)
    }
    function mitadyMaro(tab = [], mot = '') {
        var mots = mot.split(' ')
        var tab = tab
        for (var i in mots) {
            console.log(mots[i])
            tab = mitady(tab, mots[i])
        }
        return tab
    }

    var input = React.createRef()
    function recherche() {
        var tab = mitadyMaro(userss, input.current.value)
        setUsers(tab)
    }


    return (
        <div>

            <h1>Employers</h1>

            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">AJOUTER</Link>

            <form className="form-inline my-2 my-lg-0 py-3">
                <input ref={input} className="form-control mr-sm-4" onChange={recherche} type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Recherche</button>
            </form>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Poste</th>
                        <th>date</th>
                        <th>salaire</th>
                        <th>email</th>
                        <th>ostie</th>
                        <th>cnaps</th>
                        <th>cantine</th>
                        <th>transport</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map(user =>
                        <tr key={user.employerID}>
                            <td>{user.nom}</td>
                            <td>{user.prenom}</td>
                            <td>{user.poste}</td>
                            <td>{user.date}</td>
                            <td>{user.salaire}</td>
                            <td>{user.email}</td>
                            <td>{user.ostie ? "oui" : "non"}</td>
                            <td>{user.caps ? "oui" : "non"}</td>
                            <td>{user.cantine ? "oui" : "nom"}</td>
                            <td>{user.transport ? "oui" : "non"}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`${path}/edit/${user.employerID}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteUser(user.employerID)

                                } className="btn btn-sm btn-danger btn-delete-user" disabled={user.isDeleting}>
                                    {user.isDeleting
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!users &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="spinner-border spinner-border-lg align-center"></div>
                            </td>
                        </tr>
                    }
                    {users && !users.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">No Users To Display</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export { List };