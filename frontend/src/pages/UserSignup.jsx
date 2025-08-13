import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'

const UserSignup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const navigate = useNavigate()
  const { setUser } = useContext(UserDataContext)

  const submitHandler = async (e) => {
    e.preventDefault();
    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email,
      password
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)
      const data = response.data;
      if (response.status === 201) {
        setUser(data.user)
        localStorage.setItem('token', data.token)
        navigate('/home')
      } else {
        alert('Signup failed.')
      }
    } catch {
      alert('Signup failed. Please try again.')
    }
    setEmail('')
    setFirstName('')
    setLastName('')
    setPassword('')
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#fff4f4] to-white flex items-center justify-center px-2">
      <div className="w-full max-w-md mx-auto bg-white/95 rounded-3xl shadow-2xl py-10 px-6 flex flex-col gap-8">
        {/* Logo and headline */}
        <div className="flex flex-col items-center">
          <img
            className="w-28 mb-3 drop-shadow rounded-full bg-white"
            src="https://i.postimg.cc/5NNkncWz/20250715-1840-Rabbit-Logo-Design-remix-01k0737xvbfp6v3n98xt4sjn2y.png"
            alt="PPGo rabbit logo"
          />
          <span className="text-3xl font-extrabold text-[#d84e55] tracking-tight mb-2">PPGo</span>
          <span className="text-base text-[#d84e55] font-medium mb-1">Create your rider account</span>
        </div>

        {/* Signup Form */}
        <form onSubmit={submitHandler} className="flex flex-col gap-3">
          <label className="text-base font-semibold text-[#d84e55]">What's your name</label>
          <div className="flex gap-3 mb-2">
            <input
              required
              className="bg-[#fff0f0] border border-[#ffd6d6] text-[#d84e55] rounded-xl px-4 py-3 w-1/2 text-lg placeholder:text-[#d84e55]/60 focus:outline-none focus:ring-2 focus:ring-[#d84e55] transition"
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            />
            <input
              required
              className="bg-[#fff0f0] border border-[#ffd6d6] text-[#d84e55] rounded-xl px-4 py-3 w-1/2 text-lg placeholder:text-[#d84e55]/60 focus:outline-none focus:ring-2 focus:ring-[#d84e55] transition"
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />
          </div>

          <label className="text-base font-semibold text-[#d84e55]">What's your email</label>
          <input
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="bg-[#fff0f0] border border-[#ffd6d6] text-[#d84e55] rounded-xl px-4 py-3 w-full text-lg placeholder:text-[#d84e55]/60 focus:outline-none focus:ring-2 focus:ring-[#d84e55] transition mb-2"
            type="email"
            placeholder="email@example.com"
          />

          <label className="text-base font-semibold text-[#d84e55]">Enter Password</label>
          <input
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="bg-[#fff0f0] border border-[#ffd6d6] text-[#d84e55] rounded-xl px-4 py-3 w-full text-lg placeholder:text-[#d84e55]/60 focus:outline-none focus:ring-2 focus:ring-[#d84e55] transition mb-4"
            type="password"
            placeholder="password"
          />

          <button
            className="bg-[#d84e55] hover:bg-[#be3441] transition-colors duration-200 text-white font-bold rounded-xl px-4 py-3 w-full text-lg shadow-lg"
            type="submit"
          >
            Create account
          </button>
        </form>

        <p className="text-center text-[#6b2737] mt-2 text-base font-medium">
          Already have an account?
          <Link to="/login" className="text-[#d84e55] hover:underline transition pl-1">Login here</Link>
        </p>
        <div>
          <p className="text-xs leading-tight text-center text-gray-400 mt-3">
            This site is protected by reCAPTCHA and the{' '}
            <span className="underline">Google Privacy Policy</span> and{' '}
            <span className="underline">Terms of Service apply</span>.
          </p>
        </div>
      </div>
    </div>
  )
}

export default UserSignup
