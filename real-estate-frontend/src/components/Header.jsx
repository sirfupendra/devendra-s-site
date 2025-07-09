import React from 'react'

function Header() {
  return (
    <div>
        <h2>Rental Ease</h2>
        <div>
            <nav>
                <ul style={{ display: 'flex', listStyle: 'none', gap: '20px' }}>
                    <li><a href="/">Home</a></li>
                    <li><a href="/properties">Properties</a></li>
                    <li><a href="/contact">Contact Us</a></li>
                    <li><a href="/admin/login">Admin Login</a></li>
                </ul>
            </nav>
        </div>
    </div>
  )
}

export default Header