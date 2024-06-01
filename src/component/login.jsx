import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";

function Login({ setIsLoggedIn, setCurrentUser }){
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const users = useSelector(state => state.user.listUser); // access the user state

    const onSubmit = data => {
        const user = users.find(user => user.email === data.email);
        if (!user) {
            alert('Email not found');
        } else if (user.password !== data.password) {
            alert('Incorrect password');
        } else {
            alert('Login successful');
            setIsLoggedIn(true); // set isLoggedIn to true after successful login
            setCurrentUser(user); // set currentUser to the user object of the logged in user
        }
    };

    return(
        <>
            <div className="container bg-dark-subtle p-3 rounded position-absolute top-50 start-50 translate-middle">
                <h1 className='text-center'>Login</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div class="mb-3">
                        <label for="emailInput" class="form-label">Email address</label>
                        <input {...register("email")} type="email" class="form-control" id="emailInput" aria-describedby="emailHelp" />
                    </div>
                    <div class="mb-3">
                        <label for="passwordInput" class="form-label">Password</label>
                        <input {...register("password")} type="password" class="form-control" id="passwordInput" />
                    </div>
                    <br />
                    <button type="submit" class="btn btn-success me-3">Login</button>
                </form>
            </div>
        </>
    )
}

export default Login;
