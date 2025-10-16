#!/bin/bash

# Civora - Automated Validation Script
# Tests that all pages load correctly and the site is functional

echo "🧪 Testing Civora..."
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
PORT=8080
BASE_URL="http://localhost:${PORT}"

# Check if we're testing built output or dev server
if [ "$1" == "--build" ]; then
    echo "📦 Building static site..."
    cd /home/runner/work/civora/civora
    npm run build:static || {
        echo -e "${RED}✗ Build failed${NC}"
        exit 1
    }
    echo -e "${GREEN}✓ Build completed${NC}"
    echo ""
    
    echo "🚀 Starting static server..."
    cd out
    python3 -m http.server ${PORT} > /dev/null 2>&1 &
    SERVER_PID=$!
else
    echo "🚀 Starting static server on public directory..."
    cd /home/runner/work/civora/civora/public
    python3 -m http.server ${PORT} > /dev/null 2>&1 &
    SERVER_PID=$!
fi

# Trap to ensure cleanup on script exit
trap "kill $SERVER_PID 2>/dev/null || true" EXIT

# Wait for server to start
echo "⏳ Waiting for server to start..."
sleep 2

# Function to test a resource
test_resource() {
    local path=$1
    local name=$2
    
    if curl -s -I --max-time 5 "${BASE_URL}${path}" | grep -q "200\|304"; then
        echo -e "${GREEN}✓${NC} ${name} loads"
        return 0
    else
        echo -e "${RED}✗${NC} ${name} failed to load"
        return 1
    fi
}

# Test counter
PASSED=0
FAILED=0

echo ""
echo "🔍 Testing static assets..."
echo ""

# Test static assets from public directory
if test_resource "/assets/style.css" "style.css"; then
    ((PASSED++))
else
    ((FAILED++))
fi

if test_resource "/assets/script.js" "script.js"; then
    ((PASSED++))
else
    ((FAILED++))
fi

if test_resource "/robots.txt" "robots.txt"; then
    ((PASSED++))
else
    ((FAILED++))
fi

if test_resource "/sitemap.xml" "sitemap.xml"; then
    ((PASSED++))
else
    ((FAILED++))
fi

# Summary
echo ""
echo "=================================="
echo "📊 Test Results"
echo "=================================="
echo -e "Passed: ${GREEN}${PASSED}${NC}"
echo -e "Failed: ${RED}${FAILED}${NC}"
echo "Total: $((PASSED + FAILED))"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}✅ All tests passed!${NC}"
    exit 0
else
    echo -e "${RED}❌ Some tests failed${NC}"
    exit 1
fi
