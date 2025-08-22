# Getting Started App

This repository contains a Node.js application with a PostgreSQL database, Redis cache, and monitoring using Prometheus & Grafana. The app is fully dockerized and has a CI/CD pipeline set up via GitHub Actions.

---

## Table of Contents

1. [Running the App](#running-the-app)  
2. [Environment Variables](#environment-variables)  
3. [CI/CD Pipeline](#cicd-pipeline)  
4. [Monitoring & Grafana](#monitoring--grafana)  
5. [Credentials & Ports](#credentials--ports)  

---

## Running the App

You can run the application and all services with Docker Compose:

```bash
git clone https://github.com/thedovlet/devops-test-app.git
cd getting-started-app
docker-compose up -d
