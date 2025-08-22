# Getting Started App

This repository contains a Node.js application with a PostgreSQL database, Redis cache, and monitoring using Prometheus & Grafana. The app is fully dockerized and has a CI/CD pipeline set up via GitHub Actions.

---

## Running the App

Before all rename .env.example to .env and change login and pass for redis and other service for yourself dosss
You can run the application and all services with Docker Compose:

```bash
git clone https://github.com/thedovlet/devops-test-app.git
cd getting-started-app
docker-compose up -d
