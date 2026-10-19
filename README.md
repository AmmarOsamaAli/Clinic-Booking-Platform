# Clinic Booking Platform

## Overview

A full-stack clinic appointment booking platform that connects patients with doctors across different medical specialties.

Patients can discover doctors, view available time slots, request and manage appointments, while doctors can manage their availability and appointment requests. Administrators can manage users, doctors, and specialties.

## Technologies Used

### Frontend
- React
- JavaScript
- React Router

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

## Key Features

- User authentication and role-based access
- Patient, doctor, and admin roles
- Doctor search and specialty filtering
- Doctor profiles and availability management
- Appointment booking and management
- Appointment confirmation and decline workflow
- Admin management of users, doctors, and specialties
- Server-side validation and authorization

## User Stories

### Patient

- As a patient, I can register, log in, and log out.
- As a patient, I can view and manage my profile.
- As a patient, I can browse available doctors.
- As a patient, I can search doctors by name.
- As a patient, I can filter doctors by specialty.
- As a patient, I can view a doctor's profile and available time slots.
- As a patient, I can request an appointment.
- As a patient, I can view the status of my appointments.
- As a patient, I can reschedule or cancel an appointment where allowed.

### Doctor

- As a doctor, I can view my profile.
- As a doctor, I can manage my availability slots.
- As a doctor, I can view appointment requests assigned to me.
- As a doctor, I can confirm or decline appointment requests.
- As a doctor, I can view my upcoming appointments.
- As a doctor, I can cancel appointments where appropriate.

### Admin

- As an admin, I can view and manage users.
- As an admin, I can block and unblock users.
- As an admin, I can manage doctors.
- As an admin, I can assign doctor roles and create doctor profiles.
- As an admin, I can manage medical specialties.

## Database Design

![alt text](image.png)

### Relationships

- A User may have one Doctor profile.
- A Specialty may have many Doctors.
- A Doctor may have many Availability Slots.
- A Doctor may have many Appointments.
- A Patient may have many Appointments.
- An Appointment references one Doctor, Patient, and Availability Slot.

## Routes

API routes will be documented here as they are designed and implemented.