import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CapatainContext'

const Captainlogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setCaptain } = useContext(CaptainDataContext)
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/login`,
        { email, password }
      );
      if (response.status === 200) {
        const data = response.data
        setCaptain(data.captain)
        localStorage.setItem('token', data.token)
        navigate('/captain-home')
      } else {
        alert('Login failed.')
      }
    } catch (error) {
      alert('Login failed.')
    }
    setEmail('');
    setPassword('');
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#fff4f4] to-white flex items-center justify-center px-2">
      <div className="w-full max-w-md mx-auto bg-white/95 rounded-3xl shadow-2xl py-10 px-6 flex flex-col gap-8">
        {/* PPGo Logo and headline */}
        <div className="flex flex-col items-center">
          <img
            className="w-24 mb-4 drop-shadow rounded-full"
            src="https://i.postimg.cc/5NNkncWz/20250715-1840-Rabbit-Logo-Design-remix-01k0737xvbfp6v3n98xt4sjn2y.png"
            alt="PPGo Rabbit Logo"
          />
          <span className="text-3xl font-extrabold text-[#d84e55] tracking-tight mb-2">PPGo Captain</span>
          <span className="text-base text-[#d84e55] font-medium mb-1">Drive and earn, login below!</span>
        </div>

        {/* Login Form */}
        <form onSubmit={submitHandler} className="flex flex-col gap-3">
          <label className="text-base font-semibold text-[#d84e55] mb-1">What's your email</label>
          <input
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="bg-[#fff0f0] border border-[#ffd6d6] text-[#d84e55] rounded-xl mb-2 px-4 py-3 w-full text-lg placeholder:text-base placeholder:text-[#d84e55]/70 focus:outline-none focus:ring-2 focus:ring-[#d84e55] transition"
            type="email"
            placeholder="email@example.com"
          />
          <label className="text-base font-semibold text-[#d84e55] mb-1 mt-1">Enter Password</label>
          <input
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="bg-[#fff0f0] border border-[#ffd6d6] text-[#d84e55] rounded-xl mb-3 px-4 py-3 w-full text-lg placeholder:text-base placeholder:text-[#d84e55]/70 focus:outline-none focus:ring-2 focus:ring-[#d84e55] transition"
            type="password"
            placeholder="password"
          />
          <button
            type="submit"
            className="bg-[#d84e55] hover:bg-[#be3441] transition-colors duration-200 text-white font-bold rounded-xl px-4 py-3 w-full text-lg shadow-lg"
          >
            Login
          </button>
        </form>

        <p className="text-center text-[#6b2737] mt-2 text-base font-medium">
          Join a fleet?{' '}
          <Link to='/captain-signup' className="text-[#d84e55] hover:underline transition">
            Register as a Captain
          </Link>
        </p>
        <Link
          to='/login'
          className="bg-white text-[#d84e55] border border-[#d84e55] font-bold rounded-xl mt-3 px-4 py-3 w-full text-lg flex items-center justify-center shadow hover:bg-[#fff4f4] transition-colors"
        >
          Sign in as User
        </Link>
      </div>
    </div>
  )
}

export default Captainlogin
