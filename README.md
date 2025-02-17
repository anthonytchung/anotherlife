# AnotherLife

AnotherLife is a Next.js web application that combines a retro Windows 7 desktop aesthetic with modern web technologies. The app lets users sign in with Firebase Authentication (including anonymous sign-in), upload images, and view them in a draggable window interface. It also integrates with an image manipulation API (using either Python/Pillow or JavaScript/Sharp) to apply digital film effects to uploaded images.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Firebase Setup](#firebase-setup)
  - [(Optional) Python API Setup](#optional-python-api-setup)
- [Usage](#usage)
- [Directory Structure](#directory-structure)
- [Future Improvements](#future-improvements)
- [License](#license)

## Features

- **User Authentication:**  
  Sign in, register, anonymous sign-in, and password reset using Firebase Authentication.
- **Image Upload & Display:**  
  Users can upload images, which are stored in Firebase Storage and indexed in Firestore.  
  The images can be viewed in a dedicated "My Pictures" tab with client-side caching.
- **Windows 7 UI:**  
  The app uses TailwindCSS and [7.css](https://github.com/hatsoft/7.css) for a nostalgic Windows 7 look, including a taskbar and draggable windows.
- **Image Manipulation API:**  
  Integrate with a Python (Pillow) or Node.js (Sharp) service to apply digital film effects to images (future enhancement).

## Tech Stack

- **Next.js** – React framework for server‑side rendering and routing.
- **Firebase** – Authentication, Firestore, and Storage for backend services.
- **TailwindCSS** – Utility-first CSS framework.
- **7.css** – CSS library to emulate the Windows 7 UI.
- **(Optional) Python/Flask with Pillow** – For image manipulation (or consider using Sharp in Node.js).

## Getting Started

### Prerequisites

- **Node.js** (v16 or later recommended)
- **npm** or **yarn**
- A **Firebase Project** with Authentication, Firestore, and Storage enabled.
- (Optional) Python 3 and `pip` if using the Python image manipulation service.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/anotherlife.git
   cd anotherlife
