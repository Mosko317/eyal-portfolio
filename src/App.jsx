import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, X, Mail, Linkedin, Youtube, Download, ChevronRight, 
  CheckCircle2, Plus, Minus, Phone, MapPin, Menu, 
  Palette, Box, Cpu, Laptop, Layers, Zap
} from 'lucide-react';

/* --- UTILITIES & ANIMATION COMPONENTS --- */

const useElementOnScreen = (options) => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, options);

    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, [containerRef, options]);

  return [containerRef, isVisible];
};

const RevealOnScroll = ({ children, delay = 0, className = "" }) => {
  const [ref, isVisible] = useElementOnScreen({ threshold: 0.1 });
  
  return (
    <div 
      ref={ref} 
      className={`transition-all duration-1000 ease-out transform ${className} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

/* --- MAIN APP COMPONENT --- */

export default function App() {
  const [activeTab, setActiveTab] = useState('Gaming');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [openExperience, setOpenExperience] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Path logic for local vs GitHub Pages
  const cvFileName = "Eyal Moskovitch CV MotionGraphics.pdf";
  const isGitHubPages = window.location.hostname.includes('github.io');
  const repoName = 'eyal-portfolio'; 
  const cvPath = isGitHubPages ? `/${repoName}/${cvFileName}` : `/${cvFileName}`;

  useEffect(() => {
    const handleScroll = () => {
        setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when overlays are active
  useEffect(() => {
    if (selectedVideo || mobileMenuOpen) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'unset';
    }
  }, [selectedVideo, mobileMenuOpen]);

  const portfolioData = [
    { title: "Boinkers Ad Penguins", id: "diovI-ORqiw", categories: ['Gaming', 'Ads'] },
    { title: "Snoop Dogg Collab", id: "96f2ju7AgYI", categories: ['Gaming'] },
    { title: "Acid ID Intro", id: "jEyfVev77ZQ", categories: ['Gaming', 'Motion Design'] },
    { title: "Year in Review Gaming", id: "Gwbw04VOJj4", categories: ['Gaming', 'Motion Design'] },
    { title: "Playtika Caesar Slots VIP", id: "UJyx16sYjE0", categories: ['Gaming'] },
    { title: "Energy Telegram (Vertical)", id: "soFt0szMeKQ", vertical: true, categories: ['Gaming'] },
    { title: "Pokergram Ad", id: "X171leFBmmk", categories: ['Ads'] },
    { title: "Rocket Dark Ad", id: "93HHduMJugE", categories: ['Ads'] },
    { title: "Boinkers Ad 05", id: "0lICmdEi0EQ", categories: ['Ads', 'Gaming'] },
    { title: "Boinkers Ad 08", id: "AiygNIIG2js", categories: ['Ads', 'Gaming'] },
    { title: "Boinkers Ad 03 (Vertical)", id: "Pa5XedOcaAk", vertical: true, categories: ['Ads', 'Gaming'] },
    { title: "OnBoarding New Employee", id: "hhtEXyHC8zE", categories: ['Explainer'] },
    { title: "Discord Bot Explained", id: "xrHBchglzPA", categories: ['Explainer'] },
    { title: "HR Explainer", id: "bgFMl3OgBf4", categories: ['Explainer'] },
    { title: "Hachsharot", id: "_B3VRQox9Z8", categories: ['Explainer'] },
    { title: "Citi Bank", id: "9TfUKmPfVTI", categories: ['Explainer', 'Motion Design'] },
    { title: "PHH Mortgage", id: "SyvoJ0y7ZiQ", categories: ['Explainer'] },
    { title: "NGLS", id: "bGW4P1-f-uo", categories: ['Explainer'] },
    { title: "Text Animation Feature", id: "AGBy67vAYO4", categories: ['Motion Design'] },
    { title: "Personal Logo Animation", id: "YvuoW_yKzQo", categories: ['Motion Design'] },
    { title: "DGM Race", id: "7yn260QbkLo", categories: ['Motion Design'] },
  ];

  const categories = ['All', 'Gaming', 'Motion Design', 'Ads', 'Explainer'];

  const filteredVideos = activeTab === 'All' 
    ? portfolioData 
    : portfolioData.filter(v => v.categories.includes(activeTab));

  const experiences = [
    {
      company: "Acid Labs",
      role: "Animator & Motion Graphics Designer",
      period: "2024 - 2025",
      location: "Tel-Aviv, Israel",
      bullets: [
        "Produced promotional videos, social media ads, and in-game marketing assets.",
        "Created animated Telegram stickers and loot boxes to drive user engagement.",
        "Mastered Spine2D for high-quality character and UI animations integrated into game engines."
      ]
    },
    {
      company: "Idomoo",
      role: "Animator, Motion Graphics & Graphic Designer",
      period: "2019 - 2024",
      location: "Ra'anana, Israel",
      bullets: [
        "Led the creative production of personalized video campaigns for global brands.",
        "Crafted cinematic 'Year in Review' videos for Blizzard, Playtika, and Huuuge Games.",
        "Collaborated with developers to optimize motion templates for real-time video generation."
      ]
    },
    {
      company: "Self-Employed",
      role: "Motion Designer & Video Editor",
      period: "2012 - 2019",
      location: "San Diego, CA, USA",
      bullets: [
        "Delivered end-to-end video solutions for a diverse range of clients and industries.",
        "Specialized in explainer videos, logo animations, and corporate storytelling.",
        "Managed multiple projects simultaneously from concept and storyboard to final delivery."
      ]
    },
    {
      company: "Shnaiderman Advertising",
      role: "Graphic Designer & Art Director",
      period: "2010 - 2012",
      location: "Tel-Aviv, Israel",
      bullets: [
        "Designed branding materials, print ads, and comprehensive advertising campaigns.",
        "Provided art direction for cohesive visual languages across multiple media platforms.",
        "Managed client relationships and project timelines in a fast-paced agency environment."
      ]
    }
  ];

  const skillCategories = [
    {
      title: "Core Motion & Design",
      icon: <Palette size={20} className="text-purple-400" />,
      skills: [
        { name: "After Effects", percent: "100%" },
        { name: "Premiere Pro", percent: "100%" },
        { name: "Photoshop", percent: "100%" },
        { name: "Illustrator", percent: "100%" },
        { name: "InDesign", percent: "100%" },
      ]
    },
    {
      title: "Animation & Rigging",
      icon: <Layers size={20} className="text-pink-400" />,
      skills: [
        { name: "Spine2D", percent: "85%" },
      ]
    },
    {
      title: "Enhancement, 3D & Technical",
      icon: <Zap size={20} className="text-blue-400" />,
      skills: [
        { name: "AI-Assisted Workflows", percent: "65%" },
        { name: "3D Modeling", percent: "60%" },
        { name: "HTML", percent: "65%" }
      ]
    }
  ];

  const companiesList = [
    "Blizzard", "Playtika", "Playdemic", "Huuuge games", "Citi Bank", "SDG&E", 
    "T-Mobile", "Epic games", "Acid Labs", "Microsoft", "Chase bank", 
    "Israeli Police Department", "Israel Railways", "Mey Eden", 
    "Israel Aerospace Industries", "Bezeq International"
  ];

  const handleNavLinkClick = (e, id) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
  };

  const NavLinks = () => (
    <>
      <a href="#about" onClick={(e) => handleNavLinkClick(e, 'about')} className="hover:text-purple-400 transition-colors py-4 md:py-0">About</a>
      <a href="#portfolio" onClick={(e) => handleNavLinkClick(e, 'portfolio')} className="hover:text-purple-400 transition-colors py-4 md:py-0">Portfolio</a>
      <a href="#experience" onClick={(e) => handleNavLinkClick(e, 'experience')} className="hover:text-purple-400 transition-colors py-4 md:py-0">Experience</a>
    </>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-purple-500 selection:text-white overflow-x-hidden">
      
      <style>
        {`
          html { scroll-behavior: smooth; }
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 40s linear infinite;
          }
        `}
      </style>

      {/* Navigation */}
      <nav className={`fixed w-full z-[100] transition-all duration-300 ${scrolled ? 'bg-slate-950/95 backdrop-blur-md border-b border-white/10 py-4' : 'bg-slate-950/50 md:bg-transparent py-5 md:py-8'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="text-xl md:text-2xl font-black tracking-tighter bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
            EYAL MOSKOVITCH.
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-10 text-sm font-semibold tracking-wide uppercase">
            <NavLinks />
          </div>

          <div className="hidden md:block">
            <a href="#contact" onClick={(e) => handleNavLinkClick(e, 'contact')} className="px-6 py-2.5 rounded-full bg-white text-slate-950 hover:bg-purple-400 hover:text-white transition-all font-bold text-sm tracking-wide uppercase">
              LET'S TALK
            </a>
          </div>

          {/* Mobile Toggle Button */}
          <button 
            className="md:hidden relative z-[120] p-2 text-white bg-white/10 rounded-lg backdrop-blur-md"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Full Screen Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-slate-950 z-[110] transition-all duration-300 md:hidden flex flex-col items-center justify-center ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <div className={`flex flex-col items-center space-y-8 text-2xl font-bold uppercase tracking-widest transition-transform duration-500 ${mobileMenuOpen ? 'translate-y-0' : 'translate-y-10'}`}>
            <NavLinks />
            <a 
              href="#contact" 
              onClick={(e) => handleNavLinkClick(e, 'contact')}
              className="mt-4 px-10 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black text-lg shadow-xl shadow-purple-500/20"
            >
              LET'S TALK
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="about" className="relative min-h-screen flex items-center pt-24 md:pt-20 overflow-hidden bg-slate-950">
        <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-purple-600/10 blur-[120px] rounded-full animate-pulse -z-10"></div>
        <div className="absolute bottom-0 left-0 w-[40vw] h-[40vh] bg-blue-600/5 blur-[100px] rounded-full -z-10"></div>

        <div className="container mx-auto px-6">
          <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-8">
            <div className="flex-1 space-y-6 md:space-y-8 z-10 text-center md:text-left">
              <RevealOnScroll delay={100}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-purple-400 text-xs font-bold tracking-widest uppercase mx-auto md:mx-0">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                  Available for work
                </div>
              </RevealOnScroll>
              
              <RevealOnScroll delay={200}>
                <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-[1.1] md:leading-[0.9] tracking-tight text-white uppercase">
                  BRINGING <br className="hidden md:block"/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">STORIES</span> <br className="hidden md:block"/>
                  TO LIFE THROUGH <br className="hidden md:block"/>
                  MOTION
                </h1>
              </RevealOnScroll>

              <RevealOnScroll delay={300}>
                <p className="text-lg md:text-xl text-slate-400 max-w-lg leading-relaxed font-light mx-auto md:mx-0">
                  I'm Eyal Moskovitch. An animator & designer crafting high-impact visual experiences for gaming, tech, and global brands.
                </p>
              </RevealOnScroll>
              
              <RevealOnScroll delay={400}>
                <div className="flex flex-col sm:flex-row flex-wrap gap-4 pt-4 justify-center md:justify-start">
                  <a href="#portfolio" onClick={(e) => handleNavLinkClick(e, 'portfolio')} className="px-8 py-4 bg-purple-600 text-white rounded-lg font-bold text-sm uppercase tracking-wider hover:bg-purple-700 transition-all shadow-lg shadow-purple-900/30 flex items-center justify-center gap-3">
                    View Projects <ChevronRight size={18} />
                  </a>
                  <a 
                    href={cvPath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 bg-transparent border border-slate-600 text-white rounded-lg font-bold text-sm uppercase tracking-wider hover:bg-white hover:text-slate-900 transition-all flex items-center justify-center gap-3"
                  >
                    Download CV <Download size={18} />
                  </a>
                </div>
              </RevealOnScroll>
            </div>

            <div className="flex-1 flex justify-center md:justify-end relative mb-8 md:mb-0">
              <RevealOnScroll delay={300} className="relative z-10">
                 <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-[450px] md:h-[450px] group">
                    <div className="absolute -inset-2 bg-gradient-to-tr from-purple-600 via-pink-600 to-blue-600 rounded-full opacity-75 blur-md group-hover:opacity-100 transition-all duration-700"></div>
                    <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/20 shadow-2xl bg-slate-900 flex items-center justify-center">
                      <img 
                        src="image_e39e8d.png" 
                        alt="Eyal Moskovitch" 
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    </div>
                 </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24 md:py-32 bg-slate-900/50 border-y border-white/5 relative">
        <div className="container mx-auto px-6">
          <RevealOnScroll>
            <div className="text-center mb-16 md:mb-20">
              <h2 className="text-3xl md:text-6xl font-black mb-8 tracking-tight uppercase text-white">SELECTED <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">WORKS</span></h2>
              <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                {categories.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-5 md:px-8 py-2 md:py-3 rounded-full text-xs md:text-sm font-bold tracking-wide uppercase transition-all duration-300 ${
                      activeTab === tab 
                        ? 'bg-white text-slate-950 scale-105 shadow-xl' 
                        : 'bg-slate-950 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredVideos.map((video, index) => (
              <RevealOnScroll key={index} delay={index * 50}>
                <div 
                  onClick={() => setSelectedVideo(video)}
                  className="group cursor-pointer relative rounded-2xl overflow-hidden bg-slate-950 border border-white/5 shadow-2xl transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="relative aspect-video w-full overflow-hidden">
                    <img 
                      src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`} 
                      alt={video.title}
                      className={`relative z-10 w-full h-full transition-transform duration-700 group-hover:scale-105 ${video.vertical ? 'object-contain bg-black' : 'object-cover'}`}
                    />
                    
                    <div className="absolute top-4 left-4 z-20 flex gap-2">
                      {video.categories.map(cat => (
                         <span key={cat} className="text-[9px] font-black uppercase tracking-widest px-2 py-1 bg-black/60 backdrop-blur-md text-white rounded border border-white/10">
                           {cat}
                         </span>
                      ))}
                    </div>

                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-30">
                        <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-full flex items-center justify-center shadow-lg shadow-purple-500/30">
                          <Play fill="black" className="ml-1 text-black" size={18} />
                        </div>
                    </div>
                  </div>

                  <div className="p-5 md:p-6 bg-slate-950/80 border-t border-white/5">
                    <h3 className="text-base md:text-lg font-bold text-white group-hover:text-purple-400 transition-colors leading-tight truncate">{video.title}</h3>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Skills & Tools */}
      <section className="py-24 bg-slate-950 relative z-10">
        <div className="container mx-auto px-6 max-w-6xl">
          <RevealOnScroll>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-center text-white mb-20">Skills & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Tools</span></h2>
          </RevealOnScroll>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {skillCategories.map((cat, catIdx) => (
              <RevealOnScroll key={catIdx} delay={catIdx * 100}>
                <div className="bg-white/5 p-8 rounded-[2rem] border border-white/5 h-full transition-all hover:bg-white/10 hover:border-white/10 group">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-slate-900 rounded-2xl border border-white/10 group-hover:scale-110 transition-transform">
                      {cat.icon}
                    </div>
                    <h3 className="text-lg font-bold text-white uppercase tracking-tight leading-tight">{cat.title}</h3>
                  </div>
                  
                  <div className="space-y-8">
                    {cat.skills.map((skill, i) => (
                      <div key={i} className="group/item">
                        <div className="flex justify-between items-end mb-2">
                          <h4 className="text-sm font-bold text-slate-200 group-hover/item:text-purple-400 transition-colors uppercase tracking-widest">{skill.name}</h4>
                        </div>
                        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: skill.percent }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Career Journey */}
      <section id="experience" className="py-24 md:py-32 bg-slate-950 border-t border-white/5 relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-5xl">
          <RevealOnScroll>
            <div className="mb-16 text-center md:text-left">
              <h2 className="text-3xl md:text-6xl font-black mb-4 text-white tracking-tight uppercase">CAREER <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">JOURNEY</span></h2>
              <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto md:mx-0">A professional timeline of my experience in motion graphics and creative production.</p>
            </div>
          </RevealOnScroll>

          <div className="space-y-0">
            {experiences.map((exp, index) => (
              <RevealOnScroll key={index} delay={index * 100}>
                <div className={`group relative py-8 ${index !== experiences.length - 1 ? 'border-b border-white/5' : ''}`}>
                  <button 
                    onClick={() => setOpenExperience(openExperience === index ? null : index)}
                    className="w-full flex flex-row items-start text-left gap-4 md:gap-6 group"
                  >
                    <div className="p-2 mt-1 rounded-full border border-white/10 group-hover:border-purple-500 group-hover:bg-purple-500/10 transition-all shrink-0">
                       {openExperience === index ? <Minus size={18} className="text-purple-400" /> : <Plus size={18} className="text-slate-500" />}
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-x-4 mb-1">
                        <h3 className="text-xl md:text-3xl font-bold text-white group-hover:text-purple-400 transition-colors uppercase tracking-tight">{exp.role}</h3>
                        <span className="text-sm md:text-lg font-black text-purple-400 whitespace-nowrap">
                          {exp.period}
                        </span>
                      </div>
                      <h4 className="text-sm md:text-md text-slate-400 font-medium flex items-center gap-2 opacity-80 uppercase tracking-widest">
                        {exp.company} <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-slate-700"></span> <span className="text-xs">{exp.location}</span>
                      </h4>
                    </div>
                  </button>
                  
                  <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openExperience === index ? 'max-h-[800px] mt-8 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="pl-[42px] md:pl-[52px]">
                      <ul className="space-y-4">
                        {exp.bullets.map((bullet, i) => (
                          <li key={i} className="flex gap-4 text-slate-400 text-sm md:text-base leading-relaxed max-w-4xl group-hover:text-slate-200 transition-colors">
                            <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-purple-600 flex items-center justify-center shrink-0 mt-1">
                               <CheckCircle2 size={10} className="text-white" strokeWidth={3} />
                            </div>
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Companies Marquee */}
      <section className="py-20 bg-slate-950 overflow-hidden relative border-t border-white/5">
        <div className="relative flex overflow-x-hidden py-10">
          <div className="animate-marquee whitespace-nowrap flex gap-12 md:gap-24 items-center">
            {companiesList.map((company, i) => (
              <div key={`c1-${i}`} className="text-lg md:text-2xl font-black text-white/30 hover:text-purple-500 transition-colors cursor-default uppercase tracking-tighter">
                {company}
              </div>
            ))}
            {companiesList.map((company, i) => (
              <div key={`c2-${i}`} className="text-lg md:text-2xl font-black text-white/30 hover:text-purple-500 transition-colors cursor-default uppercase tracking-tighter">
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <footer id="contact" className="py-24 md:py-32 bg-slate-950 relative border-t border-white/5">
        <div className="container mx-auto px-6 max-w-5xl">
          <RevealOnScroll>
            <div className="bg-white/5 rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 border border-white/5 text-center relative overflow-hidden">
               <h2 className="text-3xl md:text-6xl font-black mb-6 uppercase tracking-tight text-white">READY TO <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">CREATE?</span></h2>
               
               <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-12 text-slate-300">
                  <div className="flex items-center gap-2">
                    <Phone size={18} className="text-purple-400" />
                    <span className="font-bold">+972 54-206-6511</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={18} className="text-purple-400" />
                    <span className="font-bold">Tel Aviv, Israel</span>
                  </div>
               </div>

               <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-6">
                  <a href="mailto:eyalm317@gmail.com" className="px-8 py-4 bg-white text-slate-950 rounded-xl font-bold uppercase tracking-wider hover:bg-purple-500 hover:text-white transition-all flex items-center justify-center gap-2">
                    <Mail size={18}/> Send Email
                  </a>
                  <a href="https://linkedin.com/in/eyalmosko" target="_blank" rel="noreferrer" className="px-8 py-4 bg-slate-800 text-white rounded-xl font-bold uppercase tracking-wider hover:bg-blue-600 transition-all flex items-center justify-center gap-2">
                    <Linkedin size={18} /> LinkedIn
                  </a>
               </div>
            </div>
          </RevealOnScroll>
          <div className="mt-16 text-center">
            <p className="text-slate-600 text-[10px] font-bold tracking-[0.3em] uppercase">
              © {new Date().getFullYear()} Eyal Moskovitch • Made in Tel Aviv
            </p>
          </div>
        </div>
      </footer>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-10">
          <div className="relative w-full max-w-6xl flex flex-col items-center">
            <button 
              onClick={() => setSelectedVideo(null)}
              className="absolute -top-12 right-0 p-3 text-white hover:text-purple-400 transition-colors"
            >
              <X size={32} />
            </button>
            <div className={`w-full bg-black shadow-2xl rounded-2xl overflow-hidden ${selectedVideo.vertical ? 'aspect-[9/16] max-w-[45vh]' : 'aspect-video'}`}>
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1`}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
          <div className="absolute inset-0 -z-10" onClick={() => setSelectedVideo(null)}></div>
        </div>
      )}
    </div>
  );
}