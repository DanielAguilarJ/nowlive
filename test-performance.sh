#!/bin/bash

# ============================================
# Performance Testing Scripts
# ============================================

echo "🚀 Performance Testing Suite for Hero.tsx Optimization"
echo "======================================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# ============================================
# 1. BUILD & START
# ============================================
build_and_start() {
    echo "📦 Building production bundle..."
    npm run build
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Build successful${NC}"
        echo ""
        echo "🚀 Starting production server..."
        npm start &
        SERVER_PID=$!
        
        # Wait for server to start
        echo "⏳ Waiting for server to start..."
        sleep 5
        
        echo -e "${GREEN}✅ Server running on http://localhost:3000${NC}"
        echo -e "   PID: $SERVER_PID"
    else
        echo -e "${RED}❌ Build failed${NC}"
        exit 1
    fi
}

# ============================================
# 2. LIGHTHOUSE AUDIT
# ============================================
lighthouse_audit() {
    echo ""
    echo "🔍 Running Lighthouse Audit..."
    echo "--------------------------------"
    
    # Check if lighthouse is installed
    if ! command -v lighthouse &> /dev/null; then
        echo -e "${YELLOW}⚠️  Lighthouse not found. Installing...${NC}"
        npm install -g lighthouse
    fi
    
    # Run lighthouse
    lighthouse http://localhost:3000 \
        --output html \
        --output-path ./lighthouse-report.html \
        --chrome-flags="--headless --no-sandbox" \
        --only-categories=performance \
        --preset=desktop
    
    echo -e "${GREEN}✅ Lighthouse report saved: ./lighthouse-report.html${NC}"
    echo "   Open it with: open ./lighthouse-report.html"
}

# ============================================
# 3. LIGHTHOUSE CI (Multiple Runs)
# ============================================
lighthouse_ci() {
    echo ""
    echo "🔄 Running Lighthouse CI (5 runs)..."
    echo "------------------------------------"
    
    if ! command -v lhci &> /dev/null; then
        echo -e "${YELLOW}⚠️  Lighthouse CI not found. Installing...${NC}"
        npm install -g @lhci/cli
    fi
    
    # Create lhci config
    cat > lighthouserc.json << EOF
{
  "ci": {
    "collect": {
      "url": ["http://localhost:3000"],
      "numberOfRuns": 5,
      "settings": {
        "preset": "desktop",
        "onlyCategories": ["performance"]
      }
    },
    "assert": {
      "preset": "lighthouse:recommended",
      "assertions": {
        "categories:performance": ["error", {"minScore": 0.9}],
        "first-contentful-paint": ["error", {"maxNumericValue": 2000}],
        "largest-contentful-paint": ["error", {"maxNumericValue": 2500}],
        "cumulative-layout-shift": ["error", {"maxNumericValue": 0.1}],
        "total-blocking-time": ["error", {"maxNumericValue": 300}]
      }
    },
    "upload": {
      "target": "temporary-public-storage"
    }
  }
}
EOF
    
    lhci autorun
    
    echo -e "${GREEN}✅ Lighthouse CI complete${NC}"
}

# ============================================
# 4. BUNDLE ANALYSIS
# ============================================
bundle_analysis() {
    echo ""
    echo "📊 Analyzing Bundle Size..."
    echo "---------------------------"
    
    # Install bundle analyzer if not present
    if ! grep -q "@next/bundle-analyzer" package.json; then
        echo -e "${YELLOW}⚠️  Installing @next/bundle-analyzer...${NC}"
        npm install --save-dev @next/bundle-analyzer
    fi
    
    # Create next.config.mjs with analyzer
    echo "Creating bundle analyzer config..."
    
    ANALYZE=true npm run build
    
    echo -e "${GREEN}✅ Bundle analysis complete${NC}"
    echo "   Open the generated HTML files in .next/analyze/"
}

# ============================================
# 5. NETWORK SIMULATION (3G/4G)
# ============================================
network_simulation() {
    echo ""
    echo "📶 Network Simulation Testing..."
    echo "--------------------------------"
    
    echo "Testing on 3G (Slow)..."
    lighthouse http://localhost:3000 \
        --throttling.requestLatencyMs=562.5 \
        --throttling.downloadThroughputKbps=1638.4 \
        --throttling.uploadThroughputKbps=675 \
        --output json \
        --output-path ./lighthouse-3g.json \
        --chrome-flags="--headless --no-sandbox" \
        --only-categories=performance \
        --quiet
    
    echo "Testing on 4G (Fast)..."
    lighthouse http://localhost:3000 \
        --throttling.requestLatencyMs=150 \
        --throttling.downloadThroughputKbps=1638.4 \
        --throttling.uploadThroughputKbps=675 \
        --output json \
        --output-path ./lighthouse-4g.json \
        --chrome-flags="--headless --no-sandbox" \
        --only-categories=performance \
        --quiet
    
    echo -e "${GREEN}✅ Network simulation complete${NC}"
    echo "   3G Results: ./lighthouse-3g.json"
    echo "   4G Results: ./lighthouse-4g.json"
}

# ============================================
# 6. WEB VITALS MONITORING
# ============================================
web_vitals_monitor() {
    echo ""
    echo "📈 Monitoring Web Vitals (Real User Data)..."
    echo "--------------------------------------------"
    
    echo "Install the Web Vitals Chrome Extension:"
    echo "https://chrome.google.com/webstore/detail/web-vitals/ahfhijdlegdabablpippeagghigmibma"
    echo ""
    echo "Or add this to your layout.tsx:"
    echo ""
    echo "import { WebVitalsDisplay } from '@/components/WebVitalsDisplay';"
    echo ""
    echo "<WebVitalsDisplay devOnly={true} />"
    echo ""
    echo "Then open http://localhost:3000 and press Ctrl+Shift+P to see metrics"
}

# ============================================
# 7. COMPARE BEFORE/AFTER
# ============================================
compare_versions() {
    echo ""
    echo "⚖️  Comparing Original vs Optimized..."
    echo "--------------------------------------"
    
    # You'll need to manually switch branches or files
    echo "Instructions:"
    echo "1. Run this script on ORIGINAL version"
    echo "2. Save the lighthouse-report.html as lighthouse-original.html"
    echo "3. Switch to OPTIMIZED version"
    echo "4. Run this script again"
    echo "5. Save the lighthouse-report.html as lighthouse-optimized.html"
    echo "6. Compare both reports side by side"
    echo ""
    echo "Or use this command to compare JSON results:"
    echo "  node -e 'console.log(require(\"./lighthouse-original.json\").audits)'"
}

# ============================================
# 8. CLEANUP
# ============================================
cleanup() {
    echo ""
    echo "🧹 Cleaning up..."
    
    # Kill server if running
    if [ ! -z "$SERVER_PID" ]; then
        kill $SERVER_PID 2>/dev/null
        echo -e "${GREEN}✅ Server stopped${NC}"
    fi
    
    # Remove temp files (optional)
    # rm -f lighthouse-*.json lighthouse-*.html lighthouserc.json
}

# ============================================
# MAIN MENU
# ============================================
show_menu() {
    echo ""
    echo "Select an option:"
    echo "1) Build & Start Server"
    echo "2) Run Lighthouse Audit (Single)"
    echo "3) Run Lighthouse CI (5 runs)"
    echo "4) Bundle Size Analysis"
    echo "5) Network Simulation (3G/4G)"
    echo "6) Web Vitals Monitoring Info"
    echo "7) Compare Before/After"
    echo "8) Run ALL tests"
    echo "9) Cleanup & Exit"
    echo ""
    read -p "Enter choice [1-9]: " choice
    
    case $choice in
        1) build_and_start ;;
        2) lighthouse_audit ;;
        3) lighthouse_ci ;;
        4) bundle_analysis ;;
        5) network_simulation ;;
        6) web_vitals_monitor ;;
        7) compare_versions ;;
        8) 
            build_and_start
            lighthouse_audit
            lighthouse_ci
            network_simulation
            bundle_analysis
            ;;
        9) 
            cleanup
            exit 0
            ;;
        *)
            echo -e "${RED}Invalid option${NC}"
            show_menu
            ;;
    esac
}

# ============================================
# RUN
# ============================================

# Trap Ctrl+C
trap cleanup EXIT

# Check if server is already running
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null ; then
    echo -e "${YELLOW}⚠️  Server already running on port 3000${NC}"
    read -p "Kill it and start fresh? [y/N]: " kill_server
    if [[ $kill_server == "y" || $kill_server == "Y" ]]; then
        lsof -ti:3000 | xargs kill -9
        echo -e "${GREEN}✅ Server killed${NC}"
    fi
fi

# Show menu
show_menu

# Keep script running if server was started
if [ ! -z "$SERVER_PID" ]; then
    echo ""
    echo "Press Ctrl+C to stop server and exit..."
    wait $SERVER_PID
fi
