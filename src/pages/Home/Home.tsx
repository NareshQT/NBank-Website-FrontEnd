import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null)

  // Helper functions for dropdown control
  const handleMouseEnter = (menu: string) => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout)
      setHoverTimeout(null)
    }
    setActiveMenu(menu)
  }

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setActiveMenu(null)
    }, 150) // Small delay to prevent flickering
    setHoverTimeout(timeout)
  }

  const slides = [
    {
      id: 1,
      title: "Secure Digital Banking",
      subtitle: "Experience the future of banking with our cutting-edge digital platform",
      description: "Advanced encryption, biometric security, and 24/7 fraud monitoring keep your finances safe",
      image: "🏦",
      bgColor: "linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)"
    },
    {
      id: 2,
      title: "Smart Investment Solutions",
      subtitle: "Grow your wealth with AI-powered investment strategies",
      description: "Professional portfolio management and real-time market insights to maximize your returns",
      image: "📈",
      bgColor: "linear-gradient(135deg, #059669 0%, #047857 100%)"
    },
    {
      id: 3,
      title: "Instant Money Transfers",
      subtitle: "Send money anywhere in the world in seconds",
      description: "Zero fees, real-time transfers, and support for 150+ currencies worldwide",
      image: "⚡",
      bgColor: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)"
    },
    {
      id: 4,
      title: "Personalized Banking",
      subtitle: "Your financial goals, our priority",
      description: "Customized financial plans and dedicated relationship managers for your success",
      image: "🎯",
      bgColor: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)"
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout)
      }
    }
  }, [hoverTimeout])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)' }}>
      {/* Header */}
      <header style={{ backgroundColor: 'white', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', padding: '24px 0', position: 'relative' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1e3a8a', margin: 0 }}>
                🏦 nBank
              </h1>
            </div>
            
            {/* Main Navigation */}
            <nav style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
              {/* Personal Menu with Dropdown */}
              <div 
                style={{ position: 'relative' }}
                onMouseEnter={() => handleMouseEnter('personal')}
                onMouseLeave={handleMouseLeave}
              >
                <a 
                  href="#personal" 
                  className="main-menu-item"
                  style={{ 
                    color: '#374151', 
                    textDecoration: 'none', 
                    fontWeight: '600',
                    fontSize: '16px',
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    borderRadius: '8px',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                >
                  Personal
                  <span style={{ 
                    fontSize: '12px',
                    transition: 'transform 0.3s ease',
                    transform: activeMenu === 'personal' ? 'rotate(180deg)' : 'rotate(0deg)'
                  }}>▼</span>
                </a>
                
                {/* Personal Dropdown */}
                {activeMenu === 'personal' && (
                  <div 
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: '0',
                      backgroundColor: 'white',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                      borderRadius: '12px',
                      padding: '8px 0',
                      minWidth: '220px',
                      zIndex: 1000,
                      border: '1px solid #e5e7eb',
                      animation: 'slideDown 0.3s ease-out',
                      marginTop: '8px'
                    }}
                    onMouseEnter={() => handleMouseEnter('personal')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <a href="#accounts" 
                      className="dropdown-item"
                      style={{
                        display: 'block',
                        padding: '12px 20px',
                        color: '#374151',
                        textDecoration: 'none',
                        fontWeight: '500',
                        transition: 'all 0.2s ease',
                        borderRadius: '6px',
                        margin: '2px 8px',
                        cursor: 'pointer',
                        position: 'relative'
                      }}
                    >
                      <span style={{ marginRight: '8px' }}>💳</span>
                      Accounts
                    </a>
                    <a href="#cards" 
                      className="dropdown-item"
                      style={{
                        display: 'block',
                        padding: '12px 20px',
                        color: '#374151',
                        textDecoration: 'none',
                        fontWeight: '500',
                        transition: 'all 0.2s ease',
                        borderRadius: '6px',
                        margin: '2px 8px',
                        cursor: 'pointer',
                        position: 'relative'
                      }}
                    >
                      <span style={{ marginRight: '8px' }}>💳</span>
                      Cards
                    </a>
                    <a href="#loans" 
                      className="dropdown-item"
                      style={{
                        display: 'block',
                        padding: '12px 20px',
                        color: '#374151',
                        textDecoration: 'none',
                        fontWeight: '500',
                        transition: 'all 0.2s ease',
                        borderRadius: '6px',
                        margin: '2px 8px',
                        cursor: 'pointer',
                        position: 'relative'
                      }}
                    >
                      <span style={{ marginRight: '8px' }}>🏠</span>
                      Loans
                    </a>
                  </div>
                )}
              </div>

              {/* Priority Menu */}
              <a href="#priority" 
                className="main-menu-item"
                style={{ 
                  color: '#374151', 
                  textDecoration: 'none', 
                  fontWeight: '600',
                  fontSize: '16px',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}>
                Priority
              </a>

              {/* Private Menu */}
              <a href="#private" 
                className="main-menu-item"
                style={{ 
                  color: '#374151', 
                  textDecoration: 'none', 
                  fontWeight: '600',
                  fontSize: '16px',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}>
                Private
              </a>

              {/* Business Menu */}
              <a href="#business" 
                className="main-menu-item"
                style={{ 
                  color: '#374151', 
                  textDecoration: 'none', 
                  fontWeight: '600',
                  fontSize: '16px',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}>
                Business
              </a>
            </nav>

            {/* Additional Menu Items */}
            <nav style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
              <a href="#about" 
                className="secondary-menu-item"
                style={{ 
                  color: '#6b7280', 
                  textDecoration: 'none', 
                  fontWeight: '500',
                  fontSize: '14px',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}>
                About Us
              </a>
              <a href="#contact" 
                className="secondary-menu-item"
                style={{ 
                  color: '#6b7280', 
                  textDecoration: 'none', 
                  fontWeight: '500',
                  fontSize: '14px',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}>
                Contact Us
              </a>
              <a href="#support" 
                className="secondary-menu-item"
                style={{ 
                  color: '#6b7280', 
                  textDecoration: 'none', 
                  fontWeight: '500',
                  fontSize: '14px',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}>
                Customer Care
              </a>
            </nav>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <Link 
                to="/login"
                style={{ 
                  color: '#374151', 
                  background: 'none', 
                  border: '2px solid #e5e7eb', 
                  fontWeight: '600',
                  cursor: 'pointer',
                  padding: '12px 20px',
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                  textDecoration: 'none',
                  display: 'inline-block'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#1e3a8a'
                  e.target.style.color = 'white'
                  e.target.style.borderColor = '#1e3a8a'
                  e.target.style.transform = 'translateY(-2px)'
                  e.target.style.boxShadow = '0 4px 12px rgba(30, 58, 138, 0.3)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent'
                  e.target.style.color = '#374151'
                  e.target.style.borderColor = '#e5e7eb'
                  e.target.style.transform = 'translateY(0px)'
                  e.target.style.boxShadow = 'none'
                }}
              >
                Login
              </Link>
              <button style={{ 
                backgroundColor: '#1e3a8a', 
                color: 'white', 
                padding: '12px 24px', 
                borderRadius: '8px', 
                border: '2px solid #1e3a8a',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#1e40af'
                e.target.style.borderColor = '#1e40af'
                e.target.style.transform = 'translateY(-2px)'
                e.target.style.boxShadow = '0 4px 12px rgba(30, 58, 138, 0.4)'
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#1e3a8a'
                e.target.style.borderColor = '#1e3a8a'
                e.target.style.transform = 'translateY(0px)'
                e.target.style.boxShadow = 'none'
              }}>
                Open Account
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Professional Banner Slider */}
      <section style={{ position: 'relative', height: '600px', overflow: 'hidden' }}>
        {/* Slides Container */}
        <div style={{ 
          display: 'flex', 
          height: '100%', 
          transition: 'transform 0.5s ease-in-out',
          transform: `translateX(-${currentSlide * 100}%)`
        }}>
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              style={{
                minWidth: '100%',
                height: '100%',
                background: slide.bgColor,
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Background Pattern */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `
                  radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
                  radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)
                `,
                zIndex: 1
              }} />
              
              {/* Content */}
              <div style={{ 
                maxWidth: '1280px', 
                margin: '0 auto', 
                padding: '0 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                zIndex: 2,
                position: 'relative'
              }}>
                {/* Text Content */}
                <div style={{ flex: '1', maxWidth: '600px', color: 'white' }}>
                  <h1 style={{ 
                    fontSize: '56px', 
                    fontWeight: 'bold', 
                    marginBottom: '16px',
                    lineHeight: '1.1',
                    textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                  }}>
                    {slide.title}
                  </h1>
                  <h2 style={{ 
                    fontSize: '24px', 
                    fontWeight: '500',
                    marginBottom: '20px',
                    opacity: 0.9,
                    lineHeight: '1.3'
                  }}>
                    {slide.subtitle}
                  </h2>
                  <p style={{ 
                    fontSize: '18px', 
                    marginBottom: '32px',
                    opacity: 0.8,
                    lineHeight: '1.5'
                  }}>
                    {slide.description}
                  </p>
                  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                    <button style={{ 
                      backgroundColor: 'white', 
                      color: slide.bgColor.includes('#1e3a8a') ? '#1e3a8a' : slide.bgColor.includes('#059669') ? '#059669' : slide.bgColor.includes('#7c3aed') ? '#7c3aed' : '#dc2626', 
                      padding: '16px 32px', 
                      borderRadius: '8px', 
                      fontWeight: '600',
                      border: 'none',
                      fontSize: '16px',
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                    }}>
                      Get Started
                    </button>
                    <button style={{ 
                      border: '2px solid white', 
                      color: 'white', 
                      padding: '16px 32px', 
                      borderRadius: '8px', 
                      fontWeight: '600',
                      background: 'transparent',
                      fontSize: '16px',
                      cursor: 'pointer'
                    }}>
                      Learn More
                    </button>
                  </div>
                </div>

                {/* Image/Icon */}
                <div style={{ 
                  flex: '0 0 300px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <div style={{
                    fontSize: '200px',
                    opacity: 0.8,
                    textShadow: '0 4px 8px rgba(0,0,0,0.3)',
                    animation: 'float 3s ease-in-out infinite'
                  }}>
                    {slide.image}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          style={{
            position: 'absolute',
            left: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(255,255,255,0.2)',
            border: 'none',
            color: 'white',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            cursor: 'pointer',
            fontSize: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 3,
            backdropFilter: 'blur(10px)'
          }}
        >
          ‹
        </button>
        <button
          onClick={goToNext}
          style={{
            position: 'absolute',
            right: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(255,255,255,0.2)',
            border: 'none',
            color: 'white',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            cursor: 'pointer',
            fontSize: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 3,
            backdropFilter: 'blur(10px)'
          }}
        >
          ›
        </button>

        {/* Dots Indicator */}
        <div style={{
          position: 'absolute',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '12px',
          zIndex: 3
        }}>
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                border: 'none',
                backgroundColor: index === currentSlide ? 'white' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div style={{
          position: 'absolute',
          bottom: '0',
          left: '0',
          height: '4px',
          backgroundColor: 'rgba(255,255,255,0.3)',
          width: '100%',
          zIndex: 3
        }}>
          <div style={{
            height: '100%',
            backgroundColor: 'white',
            width: `${((currentSlide + 1) / slides.length) * 100}%`,
            transition: 'width 0.3s ease'
          }} />
        </div>
      </section>

      {/* Features Section */}
      <section id="services" style={{ padding: '80px 0', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>
              Why Choose nBank?
            </h2>
            <p style={{ fontSize: '20px', color: '#6b7280', maxWidth: '768px', margin: '0 auto' }}>
              We provide comprehensive financial solutions designed to help you achieve your goals
            </p>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '32px' 
          }}>
            {[
              { icon: '💰', title: 'Smart Banking', desc: 'AI-powered insights and automated savings to help you make smarter financial decisions.' },
              { icon: '🔒', title: 'Bank-Level Security', desc: 'Advanced encryption and fraud protection to keep your money and data safe.' },
              { icon: '⚡', title: 'Instant Transfers', desc: 'Send and receive money instantly with our lightning-fast payment network.' },
              { icon: '📈', title: 'Investment Tools', desc: 'Professional-grade investment tools and portfolio management at your fingertips.' },
              { icon: '🛡️', title: '24/7 Support', desc: 'Round-the-clock customer support from our dedicated team of banking experts.' },
              { icon: '📱', title: 'Mobile Banking', desc: 'Full-featured mobile app with biometric authentication and real-time notifications.' }
            ].map((feature, index) => (
              <div key={index} style={{ 
                backgroundColor: '#f9fafb', 
                borderRadius: '12px', 
                padding: '32px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                transition: 'box-shadow 0.3s ease'
              }}>
                <div style={{ 
                  width: '64px', 
                  height: '64px', 
                  backgroundColor: '#dbeafe', 
                  borderRadius: '8px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  marginBottom: '24px',
                  fontSize: '24px'
                }}>
                  {feature.icon}
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>
                  {feature.title}
                </h3>
                <p style={{ color: '#6b7280' }}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ padding: '80px 0', backgroundColor: '#1e3a8a', color: 'white' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '32px', 
            textAlign: 'center' 
          }}>
            {[
              { number: '500K+', label: 'Active Customers' },
              { number: '$2.5B', label: 'Assets Under Management' },
              { number: '99.9%', label: 'Uptime Guarantee' },
              { number: '24/7', label: 'Customer Support' }
            ].map((stat, index) => (
              <div key={index}>
                <div style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '8px' }}>
                  {stat.number}
                </div>
                <div style={{ color: '#dbeafe' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '80px 0', backgroundColor: '#f9fafb' }}>
        <div style={{ maxWidth: '896px', margin: '0 auto', textAlign: 'center', padding: '0 16px' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: '#111827', marginBottom: '24px' }}>
            Ready to Transform Your Banking Experience?
          </h2>
          <p style={{ fontSize: '20px', color: '#6b7280', marginBottom: '32px' }}>
            Join thousands of satisfied customers and experience the future of banking today.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button style={{ 
              backgroundColor: '#1e3a8a', 
              color: 'white', 
              padding: '16px 32px', 
              borderRadius: '8px', 
              fontWeight: '600',
              border: 'none',
              cursor: 'pointer'
            }}>
              Open Your Account
            </button>
            <button style={{ 
              border: '2px solid #1e3a8a', 
              color: '#1e3a8a', 
              padding: '16px 32px', 
              borderRadius: '8px', 
              fontWeight: '600',
              background: 'transparent',
              cursor: 'pointer'
            }}>
              Schedule Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#111827', color: 'white', padding: '48px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '32px' 
          }}>
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>nBank</h3>
              <p style={{ color: '#9ca3af' }}>
                Your trusted partner in financial growth and security.
              </p>
            </div>
            <div>
              <h4 style={{ fontWeight: '600', marginBottom: '16px' }}>Services</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#9ca3af' }}>
                <li style={{ marginBottom: '8px' }}><a href="#" style={{ color: '#9ca3af', textDecoration: 'none' }}>Personal Banking</a></li>
                <li style={{ marginBottom: '8px' }}><a href="#" style={{ color: '#9ca3af', textDecoration: 'none' }}>Business Banking</a></li>
                <li style={{ marginBottom: '8px' }}><a href="#" style={{ color: '#9ca3af', textDecoration: 'none' }}>Investment</a></li>
                <li style={{ marginBottom: '8px' }}><a href="#" style={{ color: '#9ca3af', textDecoration: 'none' }}>Loans</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ fontWeight: '600', marginBottom: '16px' }}>Support</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#9ca3af' }}>
                <li style={{ marginBottom: '8px' }}><a href="#" style={{ color: '#9ca3af', textDecoration: 'none' }}>Help Center</a></li>
                <li style={{ marginBottom: '8px' }}><a href="#" style={{ color: '#9ca3af', textDecoration: 'none' }}>Contact Us</a></li>
                <li style={{ marginBottom: '8px' }}><a href="#" style={{ color: '#9ca3af', textDecoration: 'none' }}>Security</a></li>
                <li style={{ marginBottom: '8px' }}><a href="#" style={{ color: '#9ca3af', textDecoration: 'none' }}>Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ fontWeight: '600', marginBottom: '16px' }}>Connect</h4>
              <div style={{ display: 'flex', gap: '16px' }}>
                <span style={{ color: '#9ca3af', fontSize: '20px' }}>📱</span>
                <span style={{ color: '#9ca3af', fontSize: '20px' }}>🐦</span>
                <span style={{ color: '#9ca3af', fontSize: '20px' }}>💼</span>
              </div>
            </div>
          </div>
          <div style={{ 
            borderTop: '1px solid #374151', 
            marginTop: '32px', 
            paddingTop: '32px', 
            textAlign: 'center', 
            color: '#9ca3af' 
          }}>
            <p>&copy; 2024 nBank. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home