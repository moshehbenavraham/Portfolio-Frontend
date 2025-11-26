#!/bin/bash

# Local deployment script for Portfolio-Frontend
# Builds the project and serves it locally for testing

set -e  # Exit on any error

PREVIEW_PORT=4173

echo "🔍 Running lint checks..."
npm run lint

echo ""
echo "🔍 Running TypeScript type checks..."
npx tsc --noEmit

echo ""
echo "🔨 Building project for production..."
npm run build

echo ""
echo "🧹 Clearing port $PREVIEW_PORT if in use..."
if lsof -ti:$PREVIEW_PORT > /dev/null 2>&1; then
    kill -9 $(lsof -ti:$PREVIEW_PORT) 2>/dev/null || true
    echo "   Port $PREVIEW_PORT cleared"
else
    echo "   Port $PREVIEW_PORT is available"
fi

echo ""
echo "🚀 Starting local preview server..."
echo "   Preview URL: http://localhost:$PREVIEW_PORT/Portfolio-Frontend/"
echo "   Press Ctrl+C to stop"
echo ""

npm run preview
