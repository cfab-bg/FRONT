import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { userService, alertService } from '@/_services';

function AddEdit({ history, match }) {
    const { id } = match.params;
    const isAddMode = !id;

    // form validation rules 
    const validationSchema = Yup.object().shape({
        nom: Yup.string()
            .required('nom is required'),
        prenom: Yup.string()
            .required('First Name is required'),
        date: Yup.string()
            .required('Last Name is required'),
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
        poste: Yup.string()
            .required('poste is required'),
        salaire: Yup.string()
            .required('poste is required')
    });

    // functions to build form returned by useForm() hook
    const { register, handleSubmit, reset, setValue, errors, formState } = useForm({
        resolver: yupResolver(validationSchema)
    });

    function onSubmit(data) {
        return isAddMode
            ? createUser(data)
            : updateUser(id, data);
    }

    function createUser(data) {
        return userService.create(data)
            .then(() => {
                alertService.success('Employer ajouter avec succes', { keepAfterRouteChange: true });
                history.push('.');
            })
            .catch(alertService.error);
    }

    function updateUser(id, data) {
        return userService.update(id, data)
            .then(() => {
                alertService.success('Employer modifier', { keepAfterRouteChange: true });
                history.push('..');
            })
            .catch(alertService.error);
    }

    useEffect(() => {
        if (!isAddMode) {
            // get user and set form fields
            userService.getById(id).then(user => {
                const fields = ['nom', 'prenom', 'date', 'email', 'poste', 'salaire', 'transport','caps','cantine','ostie'];
                fields.forEach(field => setValue(field, user[field]));
            });
        }
    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <h1>{isAddMode ? 'Ajouter un employer' : 'Modifier un employer'}</h1>
            <div className="form-row">
                <div className="form-group col-5">
                    <label>nom</label>
                    <input type="text" name="nom" ref={register} className={`form-control ${errors.nom ? 'is-invalid' : ''}`} />

                    <div className="invalid-feedback">{errors.nom?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>Prénom</label>
                    <input name="prenom" type="text" ref={register} className={`form-control ${errors.prenom ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.prenom?.message}</div>
                </div>
                <div className="form-group col">
                    <label>Date d'ambauche</label>
                    <input name="date" type="date" ref={register} className={`form-control ${errors.date ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.date?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-5">
                    <label>Email</label>
                    <input name="email" type="text" ref={register} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>Salaire</label>
                    <input name="salaire" type="text" ref={register} className={`form-control ${errors.salaire ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.salaire?.message}</div>
                </div>
                <div className="form-group col">
                    <label>poste</label>
                    <select name="poste" ref={register} className={`form-control ${errors.poste ? 'is-invalid' : ''}`}>
                        <option value="développeur">Développeur</option>
                        <option value="comptabe">comptable</option>
                        <option value="secrétaire">Sécretaire</option>
                        <option value="directeur">directeur</option>
                    </select>
                    <div className="invalid-feedback">{errors.poste?.message}</div>
                </div>


            </div>
            <div className="form-row">
                <div className="form-group col">
                    <div class="form-check">
                        <input name='transport' ref={register} className="form-check-input" type="checkbox" value="" />
                        <label class="form-check-label" for="flexCheckDisabled">
                            transport
                        </label>
                    </div>
                </div>

                <div className="form-group col">
                    <div class="form-check">
                        <input name='ostie' ref={register} className="form-check-input" type="checkbox" value="" />
                        <label class="form-check-label" for="flexCheckDisabled">
                            ostie
                        </label>
                    </div>
                </div>

                
                <div className="form-group col">
                    <div class="form-check">
                        <input name='caps' ref={register} className="form-check-input" type="checkbox" value="" />
                        <label class="form-check-label" for="flexCheckDisabled">
                            cnaps
                        </label>
                    </div>
                </div>

                
                <div className="form-group col">
                    <div class="form-check">
                        <input name='cantine' ref={register} className="form-check-input" type="checkbox" value="" />
                        <label class="form-check-label" for="flexCheckDisabled">
                            cantine
                        </label>
                    </div>
                </div>
                
            </div>
            <div className="form-group">
                <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary">
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Save
                </button>
                <Link to={isAddMode ? '.' : '..'} className="btn btn-link">Cancel</Link>
            </div>
        </form>
    );
}

export { AddEdit };