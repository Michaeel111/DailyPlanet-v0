'use client'

import { CloudSun, Check, Crown, ArrowLeft } from 'lucide-react'

export default function PremiumPage() {
  return (
    <main className="auth-page premium-page">
      <div className="premium-card">
        <a href="/" className="auth-brand">
          <span className="auth-brand-icon">
            <CloudSun size={24} />
          </span>
          <span>Daily Planet</span>
        </a>

        <div className="premium-icon">
          <Crown size={30} />
        </div>

        <div className="auth-heading premium-heading">
          <p className="eyebrow">Daily Planet Premium</p>
          <h1>Go beyond the forecast.</h1>
          <p>
            Unlock more detailed weather information and extended forecasts
            with Daily Planet Premium.
          </p>
        </div>

        <div className="premium-price">
          <span>₦5,000</span>
          <small>one-time upgrade</small>
        </div>

        <div className="premium-features">
          <div>
            <span className="premium-check">
              <Check size={17} />
            </span>
            <span>Extended weather forecasts</span>
          </div>

          <div>
            <span className="premium-check">
              <Check size={17} />
            </span>
            <span>Premium weather features</span>
          </div>

          <div>
            <span className="premium-check">
              <Check size={17} />
            </span>
            <span>More detailed weather information</span>
          </div>
        </div>

        <button
          className="premium-submit"
          onClick={async () => {
            try {
              const token = localStorage.getItem('token')

              const response = await fetch(
                'https://dailyplanet-production.up.railway.app/api/payment/initialize',
                {
                  method: 'POST',
                  headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                  },
                }
              )

              const result = await response.json()

              if (response.ok && result.authorization_url) {
                window.location.href = result.authorization_url
              } else {
                alert(result.error || 'Could not start payment')
              }
            } catch (error) {
              alert('Could not connect to the payment server')
            }
          }}
        >
          Upgrade to Premium
        </button>

        <p className="premium-note">
          Already Premium? Your account will automatically have access to
          Premium features after successful payment.
        </p>

        <a href="/" className="premium-back">
          <ArrowLeft size={16} />
          Back to Weather
        </a>
      </div>
    </main>
  )
}