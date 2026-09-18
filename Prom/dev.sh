#!/usr/bin/env bash
# Start both the Go backend and Next.js frontend for local development.
# Usage: ./dev.sh
# Stop:  Ctrl+C (kills both processes)

set -euo pipefail
cd "$(dirname "$0")"

# Load .env file if it exists
if [ -f .env ]; then
  set -a
  source .env
  set +a
fi

export SITE_PASSWORD="${SITE_PASSWORD:-hiharley}"

cleanup() {
  echo ""
  echo "Shutting down..."
  kill $SERVER_PID $WEB_PID 2>/dev/null || true
  wait $SERVER_PID $WEB_PID 2>/dev/null || true
  echo "Done."
}
trap cleanup EXIT INT TERM

# --- Go backend ---
echo "Starting Go backend on :8080..."
(cd server && go run .) &
SERVER_PID=$!

# Give the server a moment to start
sleep 1

# --- Next.js frontend ---
echo "Starting Next.js frontend on :3000..."
(cd web && pnpm dev) &
WEB_PID=$!

echo ""
echo "Open http://localhost:3000"
echo "Password: ${SITE_PASSWORD}"
echo "Press Ctrl+C to stop both."
echo ""

wait
