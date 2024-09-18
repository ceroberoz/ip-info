# IP Info IOTA

## What is this project about?

IP Info IOTA is a web application that shows you detailed information about IP addresses and DNS settings. It's like a mirror for internet connections, reflecting back important details about how devices are connected to the web.

### Main Features:

1. **IP Information**: See details about an IP address, including:
   - The IP address itself
   - Country and city location
   - Region and zip code
   - Latitude and longitude
   - Internet Service Provider (ISP)
   - Organization
   - AS (Autonomous System) information

2. **DNS Information**: Learn about Domain Name System servers, including:
   - The IP address of DNS servers
   - Location of DNS servers
   - EDNS (Extension mechanisms for DNS) details

3. **Interactive Map**: Visualize the geographical location of the IP address on a map.

4. **Caching System**: Utilizes Vercel KV for efficient data caching to improve performance.

5. **Client IP Detection**: Now accurately detects and uses the client's IP address instead of the server's IP.

## Where does the information come from?

We primarily use the following sources:
- ip-api.com for IP and DNS information
- OpenStreetMap for map tiles

## How to use IP Info IOTA

1. Open the website
2. The application automatically detects your IP and displays information
3. View detailed IP and DNS information, along with a map showing the IP's location

## Why use IP Info IOTA?

- Learn more about your current internet connection
- Verify VPN functionality
- Check DNS settings
- Understand more about internet connectivity and routing
- Visualize geographical locations of IP addresses

## Technical Details

This project is built with:
- Next.js 13 (a React framework)
- React Leaflet for map integration
- Tailwind CSS for styling
- Vercel KV for caching data
- Lucide React for icons

Key components:
- `MapComponent`: Renders an interactive map using React Leaflet
- `IpInfoLanding`: Main component handling the UI and data fetching
- API route for fetching and caching IP and DNS information

Recent updates:
- Implemented dynamic routing to ensure proper client IP detection
- Enhanced caching mechanism to work with individual client IPs
- Improved error handling and fallback mechanisms

## Ethical Use and Privacy

This tool uses randomly generated strings for DNS lookups to ensure privacy. It now accurately uses the client's IP address for lookups. Always use this tool responsibly and in compliance with applicable laws and terms of service.

## Future Plans

- Implement error handling for map loading
- Add more detailed network information
- Create a history feature to track changes in connections
- Allow users to input custom IP addresses for lookup
- Enhance mobile responsiveness

Feedback and suggestions are always welcome!

## Acknowledgements

- Made possible by ip-api.com
- Uses OpenStreetMap for map data

## License

© 2024 IOTA. All rights reserved.
