# ProductFeedbackTool

## Product Feedback Tool

This project is built with Laravel 10.10 and Vue 3, using PHP 8.1. It includes features such as user authentication, feedback submission, and a commenting system.

## Prerequisites

Ensure you have the following installed on your system:

- PHP 8.1
- Composer
- Node.js and npm
- MySQL

## Getting Started

Follow these steps to set up the project on your local machine.
### Create a database and configure .env on the backend folder

### On Backend Folder run the following commands:

composer install
php artisan migrate --seed
php artisan serve

### On Frontend folder run the following command:

npm install
npm run dev

## Features
### User Authentication
This project includes a user authentication system. Users can register, log in, and log out. I use sanctum for auth

### Feedback Submission
Authenticated users can submit feedback. Each feedback item includes a title, category, and description.

### Commenting System
Users can comment on feedback items. Comments include the user's name and content, and support basic formatting options such as bold, italic, and code blocks.

## Test User:
email: muzamil@feedback.com
password: password

