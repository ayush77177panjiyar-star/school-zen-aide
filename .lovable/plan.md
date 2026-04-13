

# DMP Holy Mission School – Student Help Desk Portal

## Overview
A modern, visually stunning school website with AI-powered student help desk, fee management system with simulated payments, and an admin panel — all backed by Lovable Cloud (Supabase).

---

## 1. Homepage (Modern UI)
- **Hero section** with glassmorphism overlay, school name, tagline ("Empowering students for a brighter tomorrow"), and CTA buttons
- **About School section** with the provided content, animated cards, and decorative elements
- **Celebration Gallery** — 4 sections (Diwali, Holi, Saraswati Puja, Independence Day) with placeholder images, gradient overlays, and hover effects
- **Smooth scroll navbar** with school logo/name, links to sections
- **Footer** with school contact details, address (Rosera, Samastipur, Bihar), and social links
- **Animations**: Scroll-triggered fade-ins, hover scale effects, smooth transitions throughout

## 2. Student Help Desk (AI Chat)
- WhatsApp-style chat UI with floating chat button
- Quick question buttons: "Admission Process", "Fee Structure", "Required Documents", "School Timings"
- AI-powered responses via Lovable AI (Edge Function) trained with school context (admission info, fees, schedules)
- Streaming responses for real-time feel
- Chat history within session

## 3. Fee Payment System
- **Student form**: Name, Class, Section, Father/Parent Name
- **Fee logic**: ₹500/month, auto-calculated pending dues
- **Simulated Razorpay payment**: "Pay Now" button → mock payment modal → success confirmation with amount deduction
- **Offline payment**: Receipt upload (file upload to Supabase Storage) with confirmation message about 24-hour verification
- **Payment history** view for students

## 4. Database & Backend (Lovable Cloud)
- **Tables**: students, payments, payment_receipts, fee_records
- **Auto-dues**: Monthly fee tracking (₹500/month)
- **Storage bucket** for uploaded payment receipts
- **RLS policies** for secure data access

## 5. Admin Panel
- **Admin authentication** (email/password login)
- **Dashboard**: View all students, pending payments, uploaded receipts
- **Receipt verification**: Approve/reject uploaded receipts
- **Auto-deduct fees** upon receipt approval
- **Role-based access** using user_roles table

## 6. Design System
- Soft gradients (blue → purple → orange)
- Glassmorphism cards with backdrop blur
- Clean typography, icons from Lucide
- Fully mobile responsive
- Toast notifications for all actions

