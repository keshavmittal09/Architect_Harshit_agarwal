import React, { useState } from 'react';
import PageTransition from '@/components/PageTransition';
import TextReveal from '@/components/TextReveal';

export default function Contact() {
  const [projectType, setProjectType] = useState<'residential' | 'commercial' | 'hospitality' | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <PageTransition>
      <main className="flex-1 w-full pt-40 pb-32 px-6 md:px-[10vw] max-w-[2000px] mx-auto bg-background min-h-screen">
        <header className="mb-24">
          <TextReveal as="h1" className="font-serif text-[clamp(4rem,10vw,9rem)] text-foreground leading-[0.9]">
            CONTACT
          </TextReveal>
          <div className="mt-8">
            <TextReveal as="p" delay={0.2} className="font-serif italic text-[1.2rem] text-secondary">
              Begin a conversation.
            </TextReveal>
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-24 lg:gap-[10vw]">
          {/* Form */}
          <div className="w-full lg:w-[60%]">
            {submitted ? (
              <div className="h-[400px] flex items-center">
                <p className="font-serif italic text-[1.5rem] text-secondary">
                  We'll be in touch.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-12">
                <div className="flex flex-col gap-2 relative group">
                  <label htmlFor="name" className="font-sans text-[0.8rem] uppercase tracking-[0.15em] text-secondary transition-colors group-focus-within:text-primary">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="bg-transparent border-b border-secondary/50 rounded-none py-2 font-serif text-[1.2rem] text-foreground focus:outline-none focus:border-primary transition-colors duration-500"
                  />
                </div>

                <div className="flex flex-col gap-2 relative group">
                  <label htmlFor="email" className="font-sans text-[0.8rem] uppercase tracking-[0.15em] text-secondary transition-colors group-focus-within:text-primary">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="bg-transparent border-b border-secondary/50 rounded-none py-2 font-serif text-[1.2rem] text-foreground focus:outline-none focus:border-primary transition-colors duration-500"
                  />
                </div>

                <div className="flex flex-col gap-2 relative group">
                  <label htmlFor="phone" className="font-sans text-[0.8rem] uppercase tracking-[0.15em] text-secondary transition-colors group-focus-within:text-primary">
                    Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="bg-transparent border-b border-secondary/50 rounded-none py-2 font-serif text-[1.2rem] text-foreground focus:outline-none focus:border-primary transition-colors duration-500"
                  />
                </div>

                <div className="flex flex-col gap-4">
                  <span className="font-sans text-[0.8rem] uppercase tracking-[0.15em] text-secondary">
                    Project Type
                  </span>
                  <div className="flex flex-wrap gap-6">
                    {[
                      { id: 'residential', label: 'Residential' },
                      { id: 'commercial', label: 'Commercial' },
                      { id: 'hospitality', label: 'Hospitality' }
                    ].map(type => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setProjectType(type.id as any)}
                        className={`font-sans text-[0.85rem] uppercase tracking-[0.15em] pb-1 border-b transition-colors duration-300 ${
                          projectType === type.id 
                            ? 'text-primary border-primary' 
                            : 'text-secondary border-transparent hover:text-foreground'
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2 relative group mt-4">
                  <label htmlFor="message" className="font-sans text-[0.8rem] uppercase tracking-[0.15em] text-secondary transition-colors group-focus-within:text-primary">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    className="bg-transparent border-b border-secondary/50 rounded-none py-2 font-serif text-[1.2rem] text-foreground focus:outline-none focus:border-primary transition-colors duration-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="self-start mt-4 font-sans text-[0.8rem] uppercase tracking-[0.2em] text-primary pb-1 border-b border-primary hover:border-foreground hover:text-foreground transition-colors duration-300"
                >
                  Submit Enquiry
                </button>
              </form>
            )}
          </div>

          {/* Details */}
          <div className="w-full lg:w-[40%] flex flex-col gap-12 mt-12 lg:mt-0">
            <div className="w-[60px] h-[1px] bg-primary hidden lg:block" />
            
            <div className="flex flex-col gap-2">
              <span className="font-sans text-[0.7rem] uppercase tracking-[0.15em] text-secondary">Email</span>
              <a href="mailto:studio@harshitagarwal.com" className="font-serif text-[1.1rem] text-foreground hover:text-primary transition-colors">
                studio@harshitagarwal.com
              </a>
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-sans text-[0.7rem] uppercase tracking-[0.15em] text-secondary">Phone</span>
              <a href="tel:+919690318641" className="font-serif text-[1.1rem] text-foreground hover:text-primary transition-colors">
                +91 96903 18641
              </a>
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-sans text-[0.7rem] uppercase tracking-[0.15em] text-secondary">Studio</span>
              <p className="font-serif text-[1.1rem] text-foreground leading-[1.5]">
                144, Civil Lines<br />
                Bareilly, Uttar Pradesh<br />
                India 243001
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-sans text-[0.7rem] uppercase tracking-[0.15em] text-secondary">Instagram</span>
              <a href="#" className="font-serif text-[1.1rem] text-foreground hover:text-primary transition-colors">
                @studio.harshitagarwal
              </a>
            </div>
          </div>
        </div>
      </main>
    </PageTransition>
  );
}
