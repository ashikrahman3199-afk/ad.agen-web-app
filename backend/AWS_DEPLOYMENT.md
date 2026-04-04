# AWS Backend Deployment Guide

This application back-end uses Bun and Hono to serve a high-performance TRPC API. To live-host this on AWS, we will use a Docker container.

## Option 1: AWS App Runner (Recommended, Auto-scaling)
AWS App Runner provides a fast, simple way to deploy containerized web applications.

1. **Push your code to GitHub**, if you haven't already.
2. Go to the **AWS App Runner** console.
3. Click **Create an App Runner service**.
4. Choose **Source code repository** and connect your GitHub account.
5. Select this repository and the `main` branch.
6. Build settings: 
   - Runtime: Choose **Docker** or Provide the path to the Dockerfile `backend/Dockerfile`.
7. **Environment variables**: Add the following critical variables:
   - `AWS_REGION`
   - `AWS_ACCESS_KEY_ID` (with permissions for DynamoDB and SNS)
   - `AWS_SECRET_ACCESS_KEY`
   - `JWT_SECRET` (generate a long random string for securing login tokens)
8. **Port**: 3000
9. Click **Create & Deploy**. App Runner will automatically provide you with a live HTTPS URL.
10. Update your frontend's `getBaseUrl` in `lib/trpc.ts` or set the environment variable `EXPO_PUBLIC_RORK_API_BASE_URL` to the new App Runner URL.

## Option 2: AWS EC2 (Cheaper, Manual)

If you prefer to run it manually on a cheap EC2 instance (e.g., t3.micro):

1. **Launch an EC2 Instance** (Ubuntu 24.04 LTS recommended). 
2. Ensure the Security Group allows inbound traffic on port `80` (HTTP), `443` (HTTPS), and `22` (SSH).
3. Connect to the instance via SSH.
4. **Install Docker**:
   ```bash
   sudo apt update
   sudo apt install -y docker.io
   sudo systemctl start docker
   sudo systemctl enable docker
   ```
5. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd <your-repo-folder>
   ```
6. **Build the Docker Image**:
   ```bash
   sudo docker build -t rork-backend -f backend/Dockerfile .
   ```
7. **Run the Server**:
   ```bash
   sudo docker run -d -p 80:3000 \
     -e AWS_REGION="your_region" \
     -e AWS_ACCESS_KEY_ID="your_key" \
     -e AWS_SECRET_ACCESS_KEY="your_secret" \
     -e JWT_SECRET="your_strong_secret" \
     --name rork-api rork-backend
   ```
8. The backend will be available at `http://<ec2-public-ip>`. For production, you should set up an Nginx reverse proxy with Let's Encrypt for HTTPS.
