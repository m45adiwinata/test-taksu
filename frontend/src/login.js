import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Login extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.login = this.login.bind(this)
    }

    onChange (e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit (e) {
        e.preventDefault()

        const user = {
            email: this.state.email,
            password: this.state.password
        }

        this.login(user).then(res => {
            if (res.payload) {
                this.props.history.push('/login_profile');
            }
            else {
                alert("error: " + res.error);
            }
        })
    }

    login (user) {
        return axios
            .post('http://127.0.0.1:5000/users/login', {
                email: user.email,
                password: user.password
            })
            .then(res => {
                localStorage.setItem('usertoken', res.data.token);
                return res.data;
            })
            .catch(err => {
                // console.log(err);
            })
    }
    render() {
        return(
            <div className="container mt-5" style={{width: "500px"}}>
                <div className="card">
                    <div className="caard-header">
                        <h1>Login</h1>
                    </div>
                    <div className="card-body">
                        <input className="form-control mt-3" placeholder="email" value={this.state.email} name="email" onChange={ this.onChange } />
                        <input type="password" className="form-control mt-3" placeholder="password" value={this.state.password} name="password" onChange={ this.onChange } onSubmit={ this.onSubmit } />
                        <button className="btn btn-primary mt-3" style={{width: "100%"}} onClick={this.onSubmit}>Login</button>
                        <Link to="/register" className="btn btn-warning mt-3" style={{width: "100%"}}>Register</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;