#!/bin/bash

# Navigate to the application directory
cd '$(dirname '$0')/..'

# Install dependencies
npm install

# Start the application
npm start