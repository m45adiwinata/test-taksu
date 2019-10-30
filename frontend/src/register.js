import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
class Register extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            email: '',
            password: '',
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.register = this.register.bind(this)
    }

    onChange (e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit (e) {
        e.preventDefault()
        const user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }

        this.register(user).then(res => {
            if (!res.error) {
                this.props.history.push('/')
            }
            else {
                alert(res.error);
            }
        })
    }

    register (user) {
        return axios
            .post('http://127.0.0.1:5000/users/register', {
                name: user.name,
                email: user.email,
                password: user.password
            })
            .then(res => {
                return res.data;
            })
            .catch(err => {
                return err
            })
    }
    render() {
        return(
            <div className="container mt-5" style={{width: "500px"}}>
                <div className="card">
                    <div className="caard-header">
                        <h1>Register</h1>
                    </div>
                    <div className="card-body">
                        <input className="form-control mt-3" placeholder="name" value={this.state.name} name="name" onChange={this.onChange} />
                        <input className="form-control mt-3" placeholder="email" value={this.state.email} name="email" onChange={this.onChange} />
                        <input type="password" className="form-control mt-3" placeholder="password"  value={this.state.password} name="password" onChange={this.onChange} />
                        <button className="btn btn-primary mt-3" style={{width: "100%"}} onClick={this.onSubmit}>Register</button>
                        <Link to="/" className="btn btn-warning mt-3" style={{width: "100%"}}>Login</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;