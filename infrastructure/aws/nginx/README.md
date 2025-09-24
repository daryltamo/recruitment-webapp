# Nginx Setup for Recruitment Web App

This directory contains the configuration and documentation for setting up Nginx as a reverse proxy for the Recruitment Web App.

## Overview

Nginx will serve as a reverse proxy to forward requests to the Express.js application running on a specified port. This setup enhances performance, provides load balancing, and improves security.

## Configuration

- **default.conf**: This file contains the Nginx server configuration. It defines the server block, including the listening port, server name, and the location block that proxies requests to the Express application.

## Steps to Set Up Nginx

1. **Install Nginx**: Ensure that Nginx is installed on your server. You can install it using the package manager for your operating system.

2. **Copy Configuration**: Place the `default.conf` file in the Nginx configuration directory, typically located at `/etc/nginx/conf.d/`.

3. **Modify Configuration**: Update the `default.conf` file to match your application's domain and port settings.

4. **Start Nginx**: After configuring, start or restart the Nginx service to apply the changes.

5. **Test Configuration**: Use the command `nginx -t` to test the Nginx configuration for syntax errors.

6. **Access the Application**: Once Nginx is running, you should be able to access your application through the configured domain or IP address.

## Additional Resources

- [Nginx Documentation](https://nginx.org/en/docs/)
- [Express.js Documentation](https://expressjs.com/)

This README provides a basic overview of setting up Nginx for the Recruitment Web App. For more detailed instructions, refer to the specific sections in the Nginx documentation.