#!/bin/bash
# Verification script for v55 API fix on Vercel deployment
# Usage: ./verify-vercel-api.sh https://civoraaa.vercel.app

# Color codes for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if URL is provided
if [ -z "$1" ]; then
  echo "Usage: $0 <vercel-url>"
  echo "Example: $0 https://civoraaa.vercel.app"
  exit 1
fi

BASE_URL="$1"
API_ENDPOINT="${BASE_URL}/api/ai-assistant"

echo "========================================="
echo "Vercel API Verification (v55)"
echo "========================================="
echo "Base URL: $BASE_URL"
echo "API Endpoint: $API_ENDPOINT"
echo ""

# Test 1: Health Check (GET)
echo "Test 1: Health Check (GET)"
echo "-----------------------------------"
RESPONSE=$(curl -s -w "\n%{http_code}" "$API_ENDPOINT")
HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | head -n-1)

if [ "$HTTP_CODE" = "200" ]; then
  echo -e "${GREEN}✓ PASS${NC} - HTTP $HTTP_CODE"
  echo "Response: $BODY"
  
  # Check version
  if echo "$BODY" | grep -q '"version":"v55"'; then
    echo -e "${GREEN}✓ PASS${NC} - Version is v55"
  else
    echo -e "${YELLOW}⚠ WARNING${NC} - Version is not v55"
  fi
  
  # Check envConfigured
  if echo "$BODY" | grep -q '"envConfigured":true'; then
    echo -e "${GREEN}✓ PASS${NC} - Environment configured"
  else
    echo -e "${RED}✗ FAIL${NC} - Environment not configured"
  fi
else
  echo -e "${RED}✗ FAIL${NC} - HTTP $HTTP_CODE"
  echo "Response: $BODY"
fi
echo ""

# Test 2: Simple POST (greeting)
echo "Test 2: Simple POST Request"
echo "-----------------------------------"
sleep 2  # Wait to avoid rate limiting
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$API_ENDPOINT" \
  -H "Content-Type: application/json" \
  -d '{"input":"hello"}')
HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | head -n-1)

if [ "$HTTP_CODE" = "200" ]; then
  echo -e "${GREEN}✓ PASS${NC} - HTTP $HTTP_CODE"
  echo "Response: $BODY"
  
  # Check for reply
  if echo "$BODY" | grep -q '"reply"'; then
    echo -e "${GREEN}✓ PASS${NC} - Response contains reply"
  else
    echo -e "${RED}✗ FAIL${NC} - Response missing reply"
  fi
  
  # Check for no errors
  if echo "$BODY" | grep -q '"error":null'; then
    echo -e "${GREEN}✓ PASS${NC} - No errors"
  else
    echo -e "${YELLOW}⚠ WARNING${NC} - Response contains error"
  fi
else
  echo -e "${RED}✗ FAIL${NC} - HTTP $HTTP_CODE"
  echo "Response: $BODY"
fi
echo ""

# Test 3: Check for 308 redirects
echo "Test 3: Check for 308 Redirects"
echo "-----------------------------------"
sleep 2  # Wait to avoid rate limiting
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$API_ENDPOINT" \
  -H "Content-Type: application/json" \
  -d '{"input":"test"}')

if [ "$HTTP_CODE" = "200" ]; then
  echo -e "${GREEN}✓ PASS${NC} - HTTP $HTTP_CODE (no redirect)"
elif [ "$HTTP_CODE" = "308" ] || [ "$HTTP_CODE" = "301" ] || [ "$HTTP_CODE" = "302" ]; then
  echo -e "${RED}✗ FAIL${NC} - HTTP $HTTP_CODE (redirect detected)"
  echo "This indicates the trailing slash issue is not fixed!"
else
  echo -e "${YELLOW}⚠ WARNING${NC} - HTTP $HTTP_CODE (unexpected status)"
fi
echo ""

# Test 4: Date query
echo "Test 4: Date Query"
echo "-----------------------------------"
sleep 2  # Wait to avoid rate limiting
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$API_ENDPOINT" \
  -H "Content-Type: application/json" \
  -d '{"input":"what is the date"}')
HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | head -n-1)

if [ "$HTTP_CODE" = "200" ]; then
  echo -e "${GREEN}✓ PASS${NC} - HTTP $HTTP_CODE"
  echo "Response: $BODY"
else
  echo -e "${RED}✗ FAIL${NC} - HTTP $HTTP_CODE"
  echo "Response: $BODY"
fi
echo ""

# Test 5: Invalid request (empty input)
echo "Test 5: Invalid Request (Empty Input)"
echo "-----------------------------------"
sleep 2  # Wait to avoid rate limiting
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$API_ENDPOINT" \
  -H "Content-Type: application/json" \
  -d '{"input":""}')
HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | head -n-1)

if [ "$HTTP_CODE" = "400" ]; then
  echo -e "${GREEN}✓ PASS${NC} - HTTP $HTTP_CODE (validation working)"
  echo "Response: $BODY"
else
  echo -e "${YELLOW}⚠ WARNING${NC} - HTTP $HTTP_CODE (expected 400)"
  echo "Response: $BODY"
fi
echo ""

# Test 6: Rate limiting (two quick requests)
echo "Test 6: Rate Limiting"
echo "-----------------------------------"
sleep 2  # Wait before starting rate limit test
# First request
curl -s -o /dev/null -X POST "$API_ENDPOINT" \
  -H "Content-Type: application/json" \
  -d '{"input":"test1"}'

# Immediate second request
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$API_ENDPOINT" \
  -H "Content-Type: application/json" \
  -d '{"input":"test2"}')
HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | head -n-1)

if [ "$HTTP_CODE" = "429" ]; then
  echo -e "${GREEN}✓ PASS${NC} - HTTP $HTTP_CODE (rate limiting working)"
  echo "Response: $BODY"
else
  echo -e "${YELLOW}⚠ WARNING${NC} - HTTP $HTTP_CODE (expected 429 for rapid requests)"
  echo "Response: $BODY"
fi
echo ""

# Summary
echo "========================================="
echo "Verification Complete"
echo "========================================="
echo ""
echo "If all tests passed, the v55 fix is working correctly on Vercel."
echo "If any tests failed, check:"
echo "  1. Environment variables are set in Vercel dashboard"
echo "  2. Latest code is deployed"
echo "  3. Check Vercel function logs for errors"
echo ""
echo "For more details, see: V55-502-FIX-SUMMARY.md"
