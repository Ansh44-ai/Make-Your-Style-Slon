/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { INITIAL_SALON_CONTACT } from './data/salonData';
import { SalonContactInfo, SalonService } from './types/salon';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { Gallery } from './components/Gallery';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Reviews } from './components/Reviews';
import { BookingSection } from './components/BookingSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AppointmentsDeskModal } from './components/AppointmentsDeskModal';
import { TrackBookingModal } from './components/TrackBookingModal';

export default function App() {
  const [contact, setContact] = useState<SalonContactInfo>(INITIAL_SALON_CONTACT);
  const [selectedServicePreload, setSelectedServicePreload] = useState<string>('');
  const [activeModalService, setActiveModalService] = useState<SalonService | null>(null);
  const [isAppointmentsDeskOpen, setIsAppointmentsDeskOpen] = useState<boolean>(false);
  const [isTrackBookingOpen, setIsTrackBookingOpen] = useState<boolean>(false);

  const handleScrollToBooking = (serviceName?: string) => {
    if (serviceName) {
      setSelectedServicePreload(serviceName);
    }
    const el = document.getElementById('booking');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToServices = () => {
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleUpdateContact = (updates: Partial<SalonContactInfo>) => {
    setContact((prev) => ({ ...prev, ...updates }));
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F3EFE6] selection:bg-[#D4AF37]/30 selection:text-[#FFF7DE]">
      {/* Fixed Sticky Luxury Navigation */}
      <Navbar
        contact={contact}
        onBookClick={() => handleScrollToBooking()}
        onOpenAppointmentsDesk={() => setIsAppointmentsDeskOpen(true)}
        onOpenTrackBooking={() => setIsTrackBookingOpen(true)}
      />

      {/* Main Experience */}
      <main>
        {/* 1. Hero Section */}
        <Hero
          onBookClick={() => handleScrollToBooking()}
          onServicesClick={handleScrollToServices}
        />

        {/* 2. About Us Section */}
        <About
          onExploreServices={handleScrollToServices}
        />

        {/* 3. Our Services Section */}
        <Services
          onSelectServiceForBooking={(serviceName) => handleScrollToBooking(serviceName)}
          onOpenDetails={(service) => setActiveModalService(service)}
        />

        {/* 4. Our Gallery Section */}
        <Gallery />

        {/* 5. Why Choose Satved Hair Section */}
        <WhyChooseUs />

        {/* 6. Customer Reviews Section */}
        <Reviews />

        {/* 7. Interactive Appointment Booking Section */}
        <BookingSection
          contact={contact}
          onUpdateContact={handleUpdateContact}
          selectedServicePreload={selectedServicePreload}
          onOpenAppointmentsDesk={() => setIsAppointmentsDeskOpen(true)}
          onOpenTrackBooking={() => setIsTrackBookingOpen(true)}
        />

        {/* 8. Contact Us Section */}
        <ContactSection
          contact={contact}
        />
      </main>

      {/* 9. Luxury Footer */}
      <Footer
        contact={contact}
        onSelectService={(serviceName) => handleScrollToBooking(serviceName)}
        onOpenAppointmentsDesk={() => setIsAppointmentsDeskOpen(true)}
        onOpenTrackBooking={() => setIsTrackBookingOpen(true)}
      />

      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={activeModalService}
        onClose={() => setActiveModalService(null)}
        onBook={(serviceName) => handleScrollToBooking(serviceName)}
      />

      {/* Salon Reception Desk Modal (Supabase Live) */}
      <AppointmentsDeskModal
        isOpen={isAppointmentsDeskOpen}
        onClose={() => setIsAppointmentsDeskOpen(false)}
        onOpenBookingForm={() => {
          setIsAppointmentsDeskOpen(false);
          handleScrollToBooking();
        }}
      />

      {/* Customer Reservation Tracker Modal */}
      <TrackBookingModal
        isOpen={isTrackBookingOpen}
        onClose={() => setIsTrackBookingOpen(false)}
        onBookNew={() => {
          setIsTrackBookingOpen(false);
          handleScrollToBooking();
        }}
      />

      {/* Persistent Floating WhatsApp Quick-Chat Float */}
      <aside aria-label="WhatsApp quick chat" className="fixed bottom-6 right-6 z-30">
        <a
          href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
            `Hello ${contact.name}, I have an inquiry about your salon services and booking availability.`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2.5 px-4 py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-2xl hover:shadow-[#25D366]/40 transition-all duration-300 transform hover:scale-105"
          aria-label="Direct WhatsApp Concierge"
        >
          <MessageSquare className="w-5 h-5 fill-white text-[#25D366]" />
          <span className="hidden sm:inline text-xs font-semibold tracking-wider uppercase">
            WhatsApp Booking
          </span>
        </a>
      </aside>
    </div>
  );
}
