'use client';

import React from 'react';
import { StoreProvider } from '../../context/StoreContext';
import AdminDashboard from '../../components/AdminDashboard';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function AdminPage() {
  return (
    <StoreProvider>
      <div className="min-h-screen flex flex-col justify-between bg-[#040810]">
        <Header />
        <main className="flex-1">
          <AdminDashboard />
        </main>
        <Footer />
      </div>
    </StoreProvider>
  );
}
