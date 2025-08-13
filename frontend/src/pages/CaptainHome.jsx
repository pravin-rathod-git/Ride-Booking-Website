import React, { useRef, useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SocketContext } from '../context/SocketContext'
import { CaptainDataContext } from '../context/CapatainContext'
import axios from 'axios'

const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false)
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false)
  const ridePopupPanelRef = useRef(null)
  const confirmRidePopupPanelRef = useRef(null)
  const [ride, setRide] = useState(null)

  const { socket } = useContext(SocketContext)
  const { captain } = useContext(CaptainDataContext)

  useEffect(() => {
    socket.emit('join', {
      userId: captain._id,
      userType: 'captain'
    })
    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          socket.emit('update-location-captain', {
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude
            }
          })
        })
      }
    }

    const locationInterval = setInterval(updateLocation, 10000)
    updateLocation()
    return () => clearInterval(locationInterval)
  }, [captain, socket])

  useEffect(() => {
    const newRideHandler = (data) => {
      setRide(data)
      setRidePopupPanel(true)
    }
    socket.on('new-ride', newRideHandler)
    return () => socket.off('new-ride', newRideHandler)
  }, [socket])

  async function confirmRide() {
    await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`,
      {
        rideId: ride._id,
        captainId: captain._id,
      },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      }
    )
    setRidePopupPanel(false)
    setConfirmRidePopupPanel(true)
  }

  // GSAP Animations for popups
  useGSAP(() => {
    if (ridePopupPanel) {
      gsap.to(ridePopupPanelRef.current, { y: 0, duration: 0.5, ease: "power3.out" })
    } else {
      gsap.to(ridePopupPanelRef.current, { y: "100%", duration: 0.5, ease: "power3.in" })
    }
  }, [ridePopupPanel])

  useGSAP(() => {
    if (confirmRidePopupPanel) {
      gsap.to(confirmRidePopupPanelRef.current, { y: 0, duration: 0.5, ease: "power3.out" })
    } else {
      gsap.to(confirmRidePopupPanelRef.current, { y: "100%", duration: 0.5, ease: "power3.in" })
    }
  }, [confirmRidePopupPanel])

  return (
    <div className="h-screen bg-gradient-to-br from-[#fff4f4] via-[#ffeaea] to-[#fff]">
      {/* Top bar with logo and logout */}
      <div className="fixed p-5 top-0 flex items-center justify-between w-screen z-20 bg-white/70 backdrop-blur-lg drop-shadow">
        <div className="flex items-center gap-3">
          <img
            className="w-14 h-14 rounded-full border-2 border-[#d84e55] bg-white shadow"
            src="https://pplx-res.cloudinary.com/image/private/user_uploads/80090741/9c66fc52-176e-4101-acc2-4c98e8ea4b0e/20250715_1840_Rabbit-Logo-Design_remix_01k0737xvbfp6v3n98xt4sjn2y.jpg"
            alt="PPGo logo"
          />
          <span className="ml-1 text-2xl font-bold text-[#d84e55] tracking-tight">Captain Mode</span>
        </div>
        <Link
          to='/'
          className='h-10 w-10 bg-white flex items-center justify-center rounded-full border border-[#d84e55] text-[#d84e55] hover:bg-[#ffeaea]'
        >
          <i className="ri-logout-box-r-line text-xl"></i>
        </Link>
      </div>

      {/* Animated ride GIF */}
      <div className='h-3/5 pt-20 select-none'>
        <img
          className='h-full w-full rounded-xl object-cover shadow-lg'
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="Live ride animation"
        />
      </div>

      {/* Details Section */}
      <div className='h-2/5 p-6 flex flex-col justify-center z-10'>
        <CaptainDetails />
      </div>

      {/* Ride Popup Panel */}
      <div
        ref={ridePopupPanelRef}
        className="fixed w-full z-30 left-0 bottom-0 translate-y-full bg-white/95 rounded-t-3xl px-3 py-8 shadow-2xl backdrop-blur-lg transition-all duration-500"
        style={{ boxShadow: "0 8px 30px -8px #d84e5522" }}
      >
        <RidePopUp
          ride={ride}
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          confirmRide={confirmRide}
        />
      </div>

      {/* Confirm Ride Popup Panel */}
      <div
        ref={confirmRidePopupPanelRef}
        className="fixed w-full h-screen z-40 left-0 bottom-0 translate-y-full bg-white/98 rounded-t-3xl px-3 py-10 shadow-2xl backdrop-blur-lg transition-all duration-500"
      >
        <ConfirmRidePopUp
          ride={ride}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          setRidePopupPanel={setRidePopupPanel}
        />
      </div>
    </div>
  )
}

export default CaptainHome
