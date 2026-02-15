import React from 'react'

const Footer = () => {
  return (
    <div>
        <footer className="bg-red-800 text-white py-4 mt-10 z-500">
            <div className="container mx-auto text-right px-4">
                <p className="text-sm">&copy; 2026 QuakeAlert. All rights reserved.</p>
                <p className="text-sm">Built with Next.js, React, Leaflet, and Radix UI.</p>
            </div>
        </footer>
    </div>
  )
}

export default Footer