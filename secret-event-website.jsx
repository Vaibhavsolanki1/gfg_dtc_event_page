import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, Share2, Instagram, Linkedin, MessageCircle, Copy, Check } from 'lucide-react';

export default function SecretEventWebsite() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isRevealed: false
  });
  const [rsvpData, setRsvpData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    source: '',
    notify: true
  });
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeClues, setActiveClues] = useState([]);
  const particlesRef = useRef(null);

  // Calculate countdown
  useEffect(() => {
    const calculateCountdown = () => {
      const eventDate = new Date('2026-03-16T10:00:00+05:30').getTime();
      const now = new Date().getTime();
      const difference = eventDate - now;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isRevealed: true
        });
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
          isRevealed: false
        });
      }
    };

    calculateCountdown();
    const timer = setInterval(calculateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  // Load clues based on time
  useEffect(() => {
    const now = new Date();
    const eventDate = new Date('2026-03-16T10:00:00+05:30');
    const daysUntilEvent = Math.ceil((eventDate - now) / (1000 * 60 * 60 * 24));

    const clues = [
      { day: 3, text: '01001110 01101111 01110100 01101000 01101001 01101110 01100111 | is | impossible', icon: '💻' },
      { day: 2, text: '🔐 HINT: Three words—think beyond code. Compete. Create. Connect.', icon: '🎯' },
      { day: 1, text: '⚡ Final Clue: Innovation doesn\'t wait. Neither should you.', icon: '🚀' }
    ];

    const revealed = clues.filter(clue => clue.day >= (3 - daysUntilEvent));
    setActiveClues(revealed);
  }, []);

  // Particle background effect
  useEffect(() => {
    const canvas = particlesRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 50;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 1.5;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }

      draw() {
        ctx.fillStyle = `rgba(46, 125, 50, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleRsvpChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRsvpData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRsvpSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    console.log('Form submitted:', rsvpData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const shareText = "Something massive is happening at DTU on March 16. I'm in. Are you?";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + window.location.href)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`,
    instagram: 'https://instagram.com'
  };

  if (timeLeft.isRevealed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black text-white overflow-hidden">
        <canvas ref={particlesRef} className="fixed inset-0 opacity-30" />

        {/* Reveal Animation */}
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center animate-pulse">
            <div className="text-8xl font-black text-green-500 mb-4 animate-bounce">✨</div>
          </div>
        </div>

        <div className="relative z-10">
          {/* Header */}
          <header className="sticky top-0 backdrop-blur-md bg-black/40 border-b border-green-500/20 py-4">
            <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
              <div className="text-2xl font-black text-green-500">GFG DTC</div>
              <div className="text-sm text-green-400">EVENT LIVE</div>
            </div>
          </header>

          {/* Reveal Content */}
          <section className="max-w-6xl mx-auto px-4 py-20">
            <div className="text-center mb-16 animate-fade-in">
              <h1 className="text-7xl font-black mb-6 text-white drop-shadow-lg">
                THE MOMENT HAS ARRIVED
              </h1>
              <p className="text-2xl text-green-400 mb-8">
                Join us for an extraordinary celebration of innovation, competition, and community
              </p>
            </div>

            {/* Event Details */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                { icon: '📅', title: 'Date & Time', details: 'March 16, 2026\n10:00 AM IST' },
                { icon: '📍', title: 'Venue', details: 'Delhi Technological University\nCampus Ground' },
                { icon: '👥', title: 'Who Should Come', details: 'All B.Tech, M.Tech students\nTech enthusiasts & coders' }
              ].map((item, idx) => (
                <div key={idx} className="bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/30 rounded-xl p-8 backdrop-blur-sm hover:border-green-500/60 transition-all">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-lg font-bold text-green-400 mb-3">{item.title}</h3>
                  <p className="text-gray-300 whitespace-pre-line">{item.details}</p>
                </div>
              ))}
            </div>

            {/* Event Highlights */}
            <div className="bg-gradient-to-r from-green-500/5 via-transparent to-green-500/5 border border-green-500/20 rounded-2xl p-12 mb-12">
              <h2 className="text-3xl font-black mb-8 text-white">What to Expect</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {[
                  '⚡ High-Energy Competitions',
                  '🎤 Industry Expert Talks',
                  '🏆 Prizes & Recognition',
                  '🤝 Networking Opportunities'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 text-lg">
                    <span className="text-green-400 text-2xl">•</span>
                    <span className="text-gray-200">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center mb-12">
              <a href="#" className="inline-block px-10 py-4 bg-green-500 text-black font-black text-lg rounded-lg hover:bg-green-400 transition-all transform hover:scale-105 shadow-lg shadow-green-500/50">
                REGISTER NOW
              </a>
            </div>

            {/* Social Share */}
            <div className="text-center">
              <p className="text-gray-400 mb-6">Spread the word</p>
              <div className="flex justify-center gap-4 flex-wrap">
                <a href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="p-3 bg-green-500/20 border border-green-500/30 rounded-lg hover:bg-green-500/40 transition-all">
                  <MessageCircle className="w-6 h-6 text-green-400" />
                </a>
                <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 bg-green-500/20 border border-green-500/30 rounded-lg hover:bg-green-500/40 transition-all">
                  <Linkedin className="w-6 h-6 text-green-400" />
                </a>
                <a href={shareLinks.instagram} target="_blank" rel="noopener noreferrer" className="p-3 bg-green-500/20 border border-green-500/30 rounded-lg hover:bg-green-500/40 transition-all">
                  <Instagram className="w-6 h-6 text-green-400" />
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black text-white overflow-hidden">
      <canvas ref={particlesRef} className="fixed inset-0 opacity-30" />

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20 relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 -left-64 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>

          {/* Content */}
          <div className="text-center animate-fade-in">
            {/* Logo */}
            <div className="mb-12 animate-bounce">
              <div className="text-6xl font-black text-green-500 drop-shadow-lg filter drop-shadow-[0_0_20px_rgba(46,125,50,0.5)]">
                {'< GFG DTC />'}
              </div>
            </div>

            {/* Mystery Headline */}
            <h1 className="text-6xl md:text-7xl font-black mb-6 text-white animate-slide-down">
              Something <span className="text-green-500 drop-shadow-lg filter drop-shadow-[0_0_10px_rgba(46,125,50,0.8)]">BIG</span> is Coming
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-gray-400 mb-12 animate-slide-up">
              March 16, 2026 — You won't want to miss this
            </p>

            {/* Countdown Timer */}
            <div className="mb-16 animate-scale-in">
              <p className="text-gray-500 uppercase text-sm tracking-widest mb-6 font-bold">Until the secret drops</p>
              <div className="flex justify-center gap-4 md:gap-8 flex-wrap">
                {[
                  { value: timeLeft.days, label: 'Days' },
                  { value: timeLeft.hours, label: 'Hours' },
                  { value: timeLeft.minutes, label: 'Minutes' },
                  { value: timeLeft.seconds, label: 'Seconds' }
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <div className="bg-gradient-to-br from-green-500/20 to-green-500/5 border-2 border-green-500/50 rounded-lg p-4 md:p-6 min-w-20 md:min-w-28 backdrop-blur-sm hover:border-green-500 transition-all">
                      <div className="text-4xl md:text-5xl font-black text-green-400 font-mono">
                        {String(item.value).padStart(2, '0')}
                      </div>
                    </div>
                    <span className="text-xs md:text-sm text-gray-500 mt-3 uppercase tracking-wider font-bold">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-delayed">
              <a href="#rsvp" className="px-8 py-4 bg-green-500 text-black font-black text-lg rounded-lg hover:bg-green-400 transition-all transform hover:scale-105 shadow-lg shadow-green-500/50">
                I WANT IN
              </a>
              <a href="#share" className="px-8 py-4 bg-green-500/20 border-2 border-green-500/50 text-green-400 font-black text-lg rounded-lg hover:bg-green-500/30 transition-all">
                DARE YOUR FRIENDS
              </a>
            </div>

            {/* Mystery tagline */}
            <p className="text-gray-500 italic">
              "The best events leave you no choice but to show up."
            </p>
          </div>
        </section>

        {/* Mystery Clues Section */}
        {activeClues.length > 0 && (
          <section className="max-w-6xl mx-auto px-4 py-20">
            <h2 className="text-4xl font-black text-center mb-12 text-white">Mystery Clues</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {activeClues.map((clue, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/30 rounded-xl p-6 backdrop-blur-sm hover:border-green-500/60 transition-all animate-fade-in"
                  style={{ animationDelay: `${idx * 200}ms` }}
                >
                  <div className="text-4xl mb-4">{clue.icon}</div>
                  <p className="text-gray-300 font-mono text-sm leading-relaxed">{clue.text}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* RSVP Section */}
        <section id="rsvp" className="max-w-2xl mx-auto px-4 py-20">
          <h2 className="text-4xl font-black text-center mb-4 text-white">Reserve Your Spot</h2>
          <p className="text-center text-gray-400 mb-12">
            Join the exclusive list of people who'll witness something unforgettable
          </p>

          <form onSubmit={handleRsvpSubmit} className="bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/30 rounded-xl p-8 backdrop-blur-sm">
            <div className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-bold text-green-400 mb-2">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={rsvpData.name}
                  onChange={handleRsvpChange}
                  required
                  className="w-full bg-black/50 border border-green-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-green-500 transition-all"
                  placeholder="Your name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-bold text-green-400 mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={rsvpData.email}
                  onChange={handleRsvpChange}
                  required
                  className="w-full bg-black/50 border border-green-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-green-500 transition-all"
                  placeholder="you@example.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-bold text-green-400 mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={rsvpData.phone}
                  onChange={handleRsvpChange}
                  className="w-full bg-black/50 border border-green-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-green-500 transition-all"
                  placeholder="+91"
                />
              </div>

              {/* Department */}
              <div>
                <label className="block text-sm font-bold text-green-400 mb-2">Department / Year *</label>
                <select
                  name="department"
                  value={rsvpData.department}
                  onChange={handleRsvpChange}
                  required
                  className="w-full bg-black/50 border border-green-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-all"
                >
                  <option value="">Select your department</option>
                  <option value="BTech-1st">B.Tech - 1st Year</option>
                  <option value="BTech-2nd">B.Tech - 2nd Year</option>
                  <option value="BTech-3rd">B.Tech - 3rd Year</option>
                  <option value="BTech-4th">B.Tech - 4th Year</option>
                  <option value="MTech-1st">M.Tech - 1st Year</option>
                  <option value="MTech-2nd">M.Tech - 2nd Year</option>
                </select>
              </div>

              {/* How did you hear */}
              <div>
                <label className="block text-sm font-bold text-green-400 mb-2">How did you hear about this?</label>
                <select
                  name="source"
                  value={rsvpData.source}
                  onChange={handleRsvpChange}
                  className="w-full bg-black/50 border border-green-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-all"
                >
                  <option value="">Select an option</option>
                  <option value="Instagram">Instagram</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="Friend">Friend</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Notification checkbox */}
              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  name="notify"
                  checked={rsvpData.notify}
                  onChange={handleRsvpChange}
                  id="notify"
                  className="w-4 h-4 accent-green-500 rounded"
                />
                <label htmlFor="notify" className="text-sm text-gray-300">
                  Notify me when the event details drop
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-8 px-8 py-4 bg-green-500 text-black font-black text-lg rounded-lg hover:bg-green-400 transition-all transform hover:scale-105 shadow-lg shadow-green-500/50"
            >
              {submitted ? '✓ YOU\'RE ON THE LIST!' : 'COUNT ME IN'}
            </button>

            {submitted && (
              <p className="text-center text-green-400 text-sm mt-4 font-bold animate-pulse">
                Check your email for confirmation details
              
