import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { addUser } from '../app/userSlice'; 
import client from '../client';

function Register({ setIsRegistered, setCurrentUser }){
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const password = useRef({});
    password.current = watch("password", "");
    const dispatch = useDispatch();
    const users = useSelector(state => state.user.listUser); // access the user state
    const [topTags, setTopTags] = useState([]); // state to store the top tags

    useEffect(() => {
        // fetch the top tags when the component mounts
        client.get('', {
            params: {
                method: 'tag.getTopTags'
            }
        })
        .then(response => {
            setTopTags(response.data.toptags.tag);
        })
        .catch(error => {
            console.error(error);
        });
    }, []);

    const onSubmit = data => {
        const userExists = users.some(user => user.email === data.email);
        if (userExists) {
            alert('Email already exists');
        } else {
            dispatch(addUser(data)); // dispatch the addUser action
            setIsRegistered(true); // set isRegistered to true after successful registration
            setCurrentUser(data); // set currentUser to the data of the registered user
        }
    };
    

    return(
        <>
            <div className="container bg-dark-subtle p-3 rounded position-absolute top-50 start-50 translate-middle">
                <h1 className='text-center'>Register</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div class="mb-3">
                        <label for="usernameInput" class="form-label">Username</label>
                        <input {...register("name")} type="text" class="form-control" id="usernameInput" aria-describedby="usernameInput" />
                    </div>
                    <div class="mb-3">
                        <label for="emailInput" class="form-label">Email address</label>
                        <input {...register("email")} type="email" class="form-control" id="emailInput" aria-describedby="emailHelp" />
                    </div>
                    <div class="mb-3">
                        <label for="passwordInput" class="form-label">Password</label>
                        <input {...register("password")} type="password" class="form-control" id="passwordInput" />
                    </div>
                    <div class="mb-3">
                        <label for="confirmPasswordInput" class="form-label">Confirm Password</label>
                        <input {...register("confirmPassword", {
                            validate: value =>
                            value === password.current || "The passwords do not match"
                        })} type="password" class="form-control" id="confirmPasswordInput" />
                        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
                    </div>
                    <div class="mb-3">
                        <label for="genreInput" class="form-label">Genre</label>
                        <select {...register("favoriteGenre")} class="form-select" id="genreInput">
                            {topTags.map((tag, index) => (
                                <option value={tag.name} key={tag.name}>{tag.name}</option>
                            ))}
                        </select>

                    </div>
                    <br />
                    <button type="submit" class="btn btn-success me-3">Submit</button>
                    <button type="button" class="btn btn-primary" onClick={() => setIsRegistered(true)}>Login</button>
                </form>
            </div>
        </>
    )
}

export default Register;
