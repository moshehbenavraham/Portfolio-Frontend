#!/bin/bash

# Local deployment script for Portfolio-Frontend
# Builds the project and serves it locally for testing

set -e  # Exit on any error

echo "🔨 Building project for production..."
npm run build

echo ""
echo "🚀 Starting local preview server..."
echo "   Preview URL: http://localhost:4173/Portfolio-Frontend/"
echo "   Press Ctrl+C to stop"
echo ""

npm run preview
