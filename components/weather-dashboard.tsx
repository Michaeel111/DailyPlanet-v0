
'use client'

import { useEffect, useState } from 'react'
import {
  ArrowDown,
  ArrowUp,
  Bell,
  ChevronDown,
  Cloud,
  CloudRain,
  Droplets,
  Gauge,
  Heart,
  MapPin,
  Menu,
  MoreHorizontal,
  Navigation,
  Plus,
  Search,
  Settings2,
  ShieldCheck,
  Sun,
  Sunrise,
  Sunset,
  Thermometer,
  Umbrella,
  Wind,
  X,
} from 'lucide-react'

const hourly = [
  { time: 'Now', temp: 72, icon: Sun, rain: '0%' },
  { time: '11 AM', temp: 74, icon: Sun, rain: '0%' },
  { time: '12 PM', temp: 76, icon: Sun, rain: '0%' },
  { time: '1 PM', temp: 77, icon: Sun, rain: '2%' },
  { time: '2 PM', temp: 78, icon: Sun, rain: '3%' },
  { time: '3 PM', temp: 78, icon: CloudRain, rain: '8%' },
  { time: '4 PM', temp: 77, icon: CloudRain, rain: '12%' },
  { time: '5 PM', temp: 75, icon: Sun, rain: '9%' },
]

function Metric({
  icon: Icon,
  label,
  value,
  detail,
}: {
  icon: typeof Wind
  label: string
  value: string
  detail: string
}) {
  return (
    <div className="metric-card">
      <div className="metric-icon">
        <Icon aria-hidden="true" />
      </div>

      <div>
        <p className="eyebrow">{label}</p>
        <p className="metric-value">{value}</p>
        <p className="metric-detail">{detail}</p>
      </div>
    </div>
  )
}

export function WeatherDashboard() {
  const [activePlace, setActivePlace] = useState('Lagos')
  const [searchOpen, setSearchOpen] = useState(false)
  const [saved, setSaved] = useState(false)
  const [savedPlaces, setSavedPlaces] = useState<any[]>([])
  const [unit, setUnit] = useState('°C')
  const [weather, setWeather] = useState<any>(null)
  const [forecast, setForecast] = useState<any>(null)
  const [user, setUser] = useState<any>(null)
  useEffect(() => {
  const storedUser = localStorage.getItem('user')

  if (storedUser) {
    setUser(JSON.parse(storedUser))
  }
}, [])
useEffect(() => {
  const isSaved = savedPlaces.some(
    (place: any) =>
      place.city_name.toLowerCase() === activePlace.toLowerCase()
  )

  setSaved(isSaved)
}, [savedPlaces, activePlace])
  const handleSavePlace = async () => {
    console.log('Country code:', weather?.sys?.country)
    console.log('Weather before saving:', weather)
  const token = localStorage.getItem('token')

  const convertTemp = (celsius: number) => {
  if (unit === '°F') {
    return Math.round((celsius * 9) / 5 + 32)
  }

  return Math.round(celsius)
}

  if (!token) {
    window.location.href = '/login'
    return
  }
  if (!weather?.sys?.country) {
  alert('Weather information is still loading. Please try again in a moment.')
  return
}
console.log('API URL:', API_URL)
console.log('Token:', token)
  try {
    console.log('Sending favorite:', {
  cityName: activePlace,
  countryCode: 'TEST',
})
    const response = await fetch(`${API_URL}/api/favorites`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        cityName: activePlace,
        countryCode:
         weather?.sys?.country,
      }),
    })

    const result = await response.json()

    if (response.ok) {
      setSaved(true)
    } else {
      alert(result.error || 'Could not save place')
    }
  } catch (error) {
    console.error('Save favorite failed:', error)
    alert('Could not connect to the server')
  }
}

  const API_URL = 'https://dailyplanet-production.up.railway.app'

  useEffect(() => { 

    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/weather/${encodeURIComponent(activePlace)}`
        )

        const result = await response.json()

        if (response.ok) {
          setWeather(result.data)
        } else {
          console.error(result.error)
        }
      } catch (error) {
        console.error('Weather fetch failed:', error)
      }
    }

    const fetchForecast = async () => {
      try {
        const token = localStorage.getItem('token')

        if (!token) {
          setForecast(null)
          return
        }

        const response = await fetch(
          `${API_URL}/api/weather/${encodeURIComponent(activePlace)}/forecast`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        const result = await response.json()

        if (response.ok) {
          setForecast(result.data)
        } else {
          console.error(result.error)
          setForecast(null)
        }
      } catch (error) {
        console.error('Forecast fetch failed:', error)
        setForecast(null)
      }
    }
    const fetchSavedPlaces = async () => {
  try {
    const token = localStorage.getItem('token')

    if (!token) {
      setSavedPlaces([])
      return
    }

    const response = await fetch(`${API_URL}/api/favorites`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const result = await response.json()

    if (response.ok) {
      setSavedPlaces(result)
    } else {
      console.error(result.error)
    }
  } catch (error) {
    console.error('Saved places fetch failed:', error)
  }
}

    const fetchUser = async () => {
  try {
    const token = localStorage.getItem('token')

    if (!token) {
      setUser(null)
      return
    }

    const response = await fetch(`${API_URL}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const result = await response.json()

    if (response.ok) {
      setUser(result)
    } else {
      setUser(null)
    }
  } catch (error) {
    console.error('User fetch failed:', error)
    setUser(null)
  }
}


    fetchWeather()
    fetchForecast()
    fetchSavedPlaces()
  }, [activePlace])
  const handleDeletePlace = async (id: number) => {
  const token = localStorage.getItem('token')

  if (!token) {
    return
  }

  try {
    const response = await fetch(`${API_URL}/api/favorites/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const result = await response.json()

    if (response.ok) {
      setSavedPlaces(
        savedPlaces.filter((place: any) => place.id !== id)
      )
    } else {
      alert(result.error || 'Could not remove place')
    }
  } catch (error) {
    console.error('Delete favorite failed:', error)
    alert('Could not connect to the server')
  }
}

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand-lockup">
          <div className="brand-mark" aria-hidden="true">
            <Sun />
          </div>

          <div>
            <span className="brand-name">Daily Planet</span>
            <span className="brand-tagline">Weather, made clear.</span>
          </div>
        </div>

        <nav className="main-nav" aria-label="Primary navigation">
          <a className="nav-link active" href="#overview">
            Overview
          </a>

          <a className="nav-link" href="#forecast">
            Forecast
          </a>

          <a className="nav-link" href="#saved">
            Saved places
          </a>
        </nav>

        <div className="top-actions">
          <button
            className="icon-button desktop-only"
            aria-label="Notifications"
          >
            <Bell />
          </button>

          <button
            className="icon-button desktop-only"
            aria-label="Settings"
          >
            <Settings2 />
          </button>

{user?.isPremium ? (
  <span className="premium-button">
    ✓ Premium
  </span>
) : (
  <a href="/premium" className="premium-button">
    Premium
  </a>
)}

         <button
  className="avatar"
  aria-label="Logout"
  onClick={() => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.href = '/login'
  }}
>
  {user?.email?.charAt(0).toUpperCase() || 'U'}
</button>

<button
  className="logout-button"
  onClick={() => {
    localStorage.removeItem('token')
    window.location.href = '/login'
  }}
>
  Logout
</button>

          <button
            className="icon-button mobile-only"
            aria-label="Open menu"
          >
            <Menu />
          </button>
        </div>
      </header>

      <div className="content-wrap">
        <div className="location-bar">
          <div className="location-selector">
            <MapPin aria-hidden="true" />

            <button
              className="location-button"
              onClick={() => setSearchOpen(!searchOpen)}
              aria-expanded={searchOpen}
            >
              {activePlace}
              <ChevronDown aria-hidden="true" />
            </button>

            {searchOpen && (
              <div className="location-popover">
                <div className="search-field">
                  <Search aria-hidden="true" />

                  <input
                    autoFocus
                    placeholder="Search a city..."
                    onKeyDown={(event) => {
                      if (
                        event.key === 'Enter' &&
                        !event.nativeEvent.isComposing &&
                        event.keyCode !== 229 &&
                        event.currentTarget.value
                      ) {
                        setActivePlace(event.currentTarget.value)
                        setSearchOpen(false)
                      }
                    }}
                  />

                  <button
                    onClick={() => setSearchOpen(false)}
                    aria-label="Close search"
                  >
                    <X />
                  </button>
                </div>

                <button
                  onClick={() => {
                    setActivePlace('Brooklyn, NY')
                    setSearchOpen(false)
                  }}
                >
                  <MapPin /> Brooklyn, NY <span>Saved</span>
                </button>

                <button
                  onClick={() => {
                    setActivePlace('San Francisco, CA')
                    setSearchOpen(false)
                  }}
                >
                  <MapPin /> San Francisco, CA
                </button>
              </div>
            )}
          </div>

          <div className="bar-actions">
            <div
              className="unit-toggle"
              role="group"
              aria-label="Temperature unit"
            >
              <button
                className={unit === '°F' ? 'selected' : ''}
                onClick={() => setUnit('°F')}
              >
                °F
              </button>

              <button
                className={unit === '°C' ? 'selected' : ''}
                onClick={() => setUnit('°C')}
              >
                °C
              </button>
            </div>

            <button
  className="save-button"
  onClick={handleSavePlace}
>
  <Heart
    fill={saved ? 'currentColor' : 'none'}
    aria-hidden="true"
  />

  {saved ? 'Saved' : 'Save place'}
</button>
          </div>
        </div>

        <section className="hero-card" id="overview">
  <div className="hero-copy">
    <p className="eyebrow light">
      {new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })}{' '}
      <span className="live-dot">Live</span>
    </p>

            <h1>
  {new Date().getHours() < 12
    ? 'Good morning'
    : new Date().getHours() < 18
      ? 'Good afternoon'
      : 'Good evening'}
  , {activePlace}.
</h1>

            <p className="conditions">
              {weather
                ? `${weather.weather[0].description
                    .charAt(0)
                    .toUpperCase()}${weather.weather[0].description.slice(
                    1
                  )}.`
                : 'Loading weather...'}
            </p>

            <div className="hero-temp">
              <span>
                <span>
                  {weather ? Math.round(weather.main.temp) + '°' : '--'}
                </span>
              </span>

              <div>
                <strong>
                  Feels like{' '}
                  {weather
                    ? `${Math.round(weather.main.feels_like)}°`
                    : '--'}
                </strong>

                <p>
                  High{' '}
                  {weather
                    ? `${Math.round(weather.main.temp_max)}°`
                    : '--'}
                  <span>•</span>
                  Low{' '}
                  {weather
                    ? `${Math.round(weather.main.temp_min)}°`
                    : '--'}
                </p>
              </div>
            </div>
          </div>

          <div className="hero-sun" aria-hidden="true">
            {weather?.weather?.[0]?.main === 'Rain' ? (
              <CloudRain />
            ) : weather?.weather?.[0]?.main === 'Clouds' ? (
              <Cloud />
            ) : (
              <Sun />
            )}
          </div>

          <div className="hero-footer">
            <span>
              <Sunrise />
              Sunrise{' '}
              <b>
                {weather
                  ? new Date(
                      (weather.sys.sunrise + weather.timezone) * 1000
                    )
                      .toISOString()
                      .slice(11, 16)
                  : '--'}
              </b>
            </span>

            <span>
              <Sunset />
              Sunset{' '}
              <b>
                {weather
                  ? new Date(
                      (weather.sys.sunset + weather.timezone) * 1000
                    )
                      .toISOString()
                      .slice(11, 16)
                  : '--'}
              </b>
            </span>

            <span className="updated">Updated just now</span>
          </div>
        </section>

        <section
          className="section-block"
          aria-labelledby="hourly-title"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">The next few hours</p>
              <h2 id="hourly-title">Hourly forecast</h2>
            </div>

            <button className="text-button">
              View details <ArrowUp aria-hidden="true" />
            </button>
          </div>

          <div className="hourly-grid">
  {forecast ? (
    forecast.list.slice(0, 8).map((item: any) => {
      const Icon =
        item.weather[0].main === 'Rain'
          ? CloudRain
          : item.weather[0].main === 'Clouds'
          ? Cloud
          : Sun

      const time = new Date(
        item.dt * 1000
      ).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
      })

      return (
        <div
          className="hour-card"
          key={item.dt}
        >
          <span className="hour-time">
            {time}
          </span>

          <Icon
            className="weather-icon"
            aria-hidden="true"
          />

          <strong>
            {Math.round(item.main.temp)}°
          </strong>

          <span className="rain-chance">
            <Droplets aria-hidden="true" />
            {Math.round(item.pop * 100)}%
          </span>
        </div>
      )
    })
  ) : (
    <p>Hourly forecast unavailable.</p>
  )}
</div>
        </section>

        <div className="dashboard-grid">
          <section
            className="section-block forecast-panel"
            id="forecast"
          >
            <div className="section-heading">
              <div>
                <p className="eyebrow">Plan ahead</p>
                <h2>5-day forecast</h2>
              </div>

              <button
                className="more-button"
                aria-label="More forecast options"
              >
                <MoreHorizontal />
              </button>
            </div>

            <div className="daily-list">
              {forecast ? (
                forecast.list
                  .filter(
                    (_: any, index: number) =>
                      index % 8 === 0
                  )
                  .slice(0, 5)
                  .map((item: any, index: number) => {
                    const Icon =
                      item.weather[0].main === 'Rain'
                        ? CloudRain
                        : item.weather[0].main === 'Clouds'
                        ? Cloud
                        : Sun

                    return (
                      <div
                        className="day-row"
                        key={item.dt}
                      >
                        <div className="day-name">
                          <strong>
                            {index === 0
                              ? 'Today'
                              : new Date(
                                  item.dt * 1000
                                ).toLocaleDateString(
                                  'en-US',
                                  {
                                    weekday: 'short',
                                  }
                                )}
                          </strong>

                          <span>
                            {new Date(
                              item.dt * 1000
                            ).toLocaleDateString(
                              'en-US',
                              {
                                month: 'short',
                                day: 'numeric',
                              }
                            )}
                          </span>
                        </div>

                        <Icon
                          className="weather-icon"
                          aria-hidden="true"
                        />

                        <span className="day-condition">
                          {item.weather[0].description}
                        </span>

                        <div className="day-rain">
                          <Droplets aria-hidden="true" />
                          {Math.round(item.pop * 100)}%
                        </div>

                        <div className="temperatures">
                          <b>
                            {Math.round(
                              item.main.temp_max
                            )}
                            °
                          </b>

                          <span>
                            <span className="temp-bar">
                              <i
                                style={{
                                  width: `${Math.max(
                                    34,
                                    item.main.temp_max -
                                      item.main.temp_min
                                  ) * 3}%`,
                                }}
                              />
                            </span>

                            {Math.round(
                              item.main.temp_min
                            )}
                            °
                          </span>
                        </div>
                      </div>
                    )
                  })
              ) : (
                <p>Premium forecast unavailable. Upgrade to Premium to view the extended forecast.</p>
              )}
            </div>
          </section>
          <section
  className="section-block"
  id="saved"
>
  <div className="section-heading">
    <div>
      <p className="eyebrow">Your locations</p>
      <h2>Saved places</h2>
    </div>
  </div>

  {savedPlaces.length > 0 ? (
    <div className="saved-places-list">
      {savedPlaces.map((place: any) => (
        <div className="saved-place" key={place.id}>
          <div>
            <strong>{place.city_name}</strong>
            <span>{place.country_code}</span>
          </div>

          <button
            type="button"
            onClick={() => setActivePlace(place.city_name)}
          >
            View weather
            </button>

            <button
  type="button"
  onClick={() => handleDeletePlace(place.id)}
>
  Remove
</button>
        </div>
      ))}
    </div>
  ) : (
    <p>No saved places yet.</p>
  )}
</section>

          <aside className="side-stack">
            <section className="insight-card">
              <div className="insight-top">
                <div>
                  <p className="eyebrow">Daily insight</p>
                  <h2>Perfect for a walk</h2>
                </div>

                <div className="insight-icon">
                  <Umbrella />
                </div>
              </div>

              <p>
                Comfortable temperatures and low humidity make
                today ideal for getting outside.
              </p>

              <button className="dark-button">
                Explore outdoor ideas{' '}
                <ArrowUp aria-hidden="true" />
              </button>
            </section>

            <section className="air-card">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">Air quality</p>
                  <h2>Good</h2>
                </div>

                <ShieldCheck
                  className="quality-icon"
                  aria-hidden="true"
                />
              </div>

              <div className="quality-meter">
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>

              <p>
                Air quality is considered satisfactory, and air
                pollution poses little or no risk.
              </p>
            </section>
          </aside>
        </div>

        <section className="section-block details-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">More to know</p>
              <h2>Weather details</h2>
            </div>
          </div>

          <div className="metrics-grid">
            <Metric
              icon={Wind}
              label="Wind"
              value={
                weather
                  ? `${(
                      weather.wind.speed * 3.6
                    ).toFixed(1)} km/h`
                  : '--'
              }
              detail="Current wind speed"
            />

            <Metric
              icon={Droplets}
              label="Humidity"
              value={
                weather
                  ? `${weather.main.humidity}%`
                  : '--'
              }
              detail="Comfortable"
            />

            <Metric
              icon={Gauge}
              label="Pressure"
              value={
                weather
                  ? `${weather.main.pressure} hPa`
                  : '--'
              }
              detail="Current pressure"
            />

            <Metric
              icon={Thermometer}
              label="Visibility"
              value={
                weather
                  ? `${(
                      weather.visibility / 1000
                    ).toFixed(1)} km`
                  : '--'
              }
              detail="Current visibility"
            />
          </div>
        </section>

        <footer className="footer">
          <span>
            Daily Planet{' '}
            <span className="footer-muted">
              · Clear skies ahead.
            </span>
          </span>

          <span className="footer-links">
            <a href="#privacy">Privacy</a>
            <a href="#about">About Daily Planet</a>

            <button aria-label="Add a new location">
              <Plus /> Add location
            </button>
          </span>
        </footer>
      </div>
    </main>
  )
}
