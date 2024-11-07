# Team Member Management Backend

This is the backend for the Team Member Management app, built with Django and Django REST framework. It provides an API for managing team members, including endpoints to list, add, update, and delete team members.

---

## Getting Started

Follow the steps below to set up and run the backend locally.

### Prerequisites

Ensure you have the following installed:

- Python (version 3.8 or higher)
- pip

### Installation

1. **Clone the Repository**
```
   git clone https://github.com/tuckerritti/instawork-take-home
   cd backend
```
2. **Set Up a Virtual Environment**
```
   python3 -m venv venv  
   source venv/bin/activate  (on Windows, use `venv\Scripts\activate`)
```
3. **Install Dependencies**
`pip install -r requirements.txt`

### Setting Up the Database

To create the database and tables, run:

`python manage.py migrate`

### Running the Development Server

To start the server locally:

`python manage.py runserver`

The API will be accessible at http://localhost:8000/api.

### API Documentation

This backend provides the following endpoints:

- GET /api/members/ - List all team members
- POST /api/members/ - Add a new team member
- GET /api/members/{id}/ - Retrieve a team member by ID
- PUT /api/members/{id}/ - Update a team member by ID
- DELETE /api/members/{id}/ - Delete a team member by ID

---

For more information, check out:

- [Django Documentation](https://docs.djangoproject.com/en/stable/)
- [Django REST Framework Documentation](https://www.django-rest-framework.org/)
