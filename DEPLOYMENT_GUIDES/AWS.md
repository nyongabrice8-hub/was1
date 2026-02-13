# Deployment Guide for AWS

## Prerequisites
- AWS Account
- AWS CLI installed and configured

## Steps
1. **Create an EC2 instance**:
   - Go to the EC2 Dashboard
   - Launch a new instance using the Amazon Linux 2 AMI.

2. **Set up security groups**:
   - Allow SSH (port 22) and HTTP (port 80).

3. **Connect to your instance**:
   - Use SSH to connect: `ssh -i your-key.pem ec2-user@your-instance-public-dns`

4. **Install necessary packages**:
   ```bash
   sudo yum update -y
   sudo yum install git -y
   # More packages as needed
   ```

5. **Clone your repository**:
   ```bash
   git clone https://github.com/nyongabrice8-hub/was1.git
   ```

6. **Run your application** (this might vary based on what your app requires).

## Notes
- Make sure to terminate your instance when done to avoid charges.