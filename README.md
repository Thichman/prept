# Prept.AI

Welcome to **Prept.AI**, an application designed to help users research individuals and gather data to prepare for interactions. This document provides an overview of the application's features and structure.

## Table of Contents

1. [Features](#features)
2. [Overall Structure](#overall-structure)
3. [Frontend](#frontend)
4. [Backend](#backend)
5. [Authentication and Authorization](#authentication-and-authorization)
6. [Data Handling](#data-handling)
7. [Styling](#styling)

## Features

- **User Registration and Authentication**: Users can register, log in, and manage their accounts.
- **User Profile Management**: Users can update their profile information including name, email, phone number, and password.
- **Subscription Management**: Users can view their current subscription plan and manage billing information.
- **LinkedIn Data Scraping**: Users can input LinkedIn profile links to scrape and retrieve relevant data.
- **Chat Interface**: An interactive chat interface for users to communicate with the AI system.
- **Dashboard**: An admin dashboard to manage user accounts and view relevant analytics.
- **Settings**: A user settings page for personalizing user preferences.

## Overall Structure

The application is structured into frontend and backend components, utilizing modern web technologies to ensure a seamless and efficient user experience.

### Frontend

- **React**: The core library for building user interfaces.
- **Next.js**: A React framework for server-side rendering and static site generation.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Geist UI**: A design system for building consistent and aesthetically pleasing components.

#### Main Components

- **AuthButton**: Handles user authentication actions (login/logout).
- **UserProfile**: Displays and allows editing of user profile information.
- **UserMenu**: A dropdown menu with user-specific options, displayed when a user is logged in.
- **ChatInterface**: The main interface for user-AI interaction.
- **Admin Dashboard**: Provides admin functionalities to manage users and view application analytics.
- **Card**: A reusable component for displaying user information with an edit option.

### Backend

- **Node.js**: The runtime environment for executing JavaScript server-side.
- **Supabase**: A backend-as-a-service providing authentication, database, and storage functionalities.
- **Axios**: A promise-based HTTP client for making API requests.
- **RapidAPI**: Used for integrating third-party APIs like the LinkedIn data scraper.

#### Key Functions

- **getUser**: Fetches user data from the Supabase database.
- **updatePassword**: Updates the user's password in the Supabase authentication system.
- **LinkedIn Data Scraper**: Interacts with the LinkedIn data scraping API to fetch profile data based on user input.

### Authentication and Authorization

- **Supabase Auth**: Manages user authentication and authorization. Users can register, log in, and reset passwords.
- **Protected Routes**: Certain routes and components are protected and require user authentication to access.

### Data Handling

- **Supabase Database**: Stores user information and metadata.
- **LinkedIn API**: Fetches data from LinkedIn profiles based on user input.
- **Server-side Fetching**: Utilizes server-side functions to fetch and manipulate data securely.

### Styling

- **Tailwind CSS**: Provides utility classes for styling components.
- **Custom CSS**: Additional styles are included in `globals.css` for overall layout and design consistency.
- **Geist UI**: Ensures a cohesive design language across the application with pre-built components.

---

Prept.AI is built with a focus on providing a robust and user-friendly platform for researching and preparing for professional interactions. With its powerful features and modern technology stack, it aims to deliver a seamless experience for all users.