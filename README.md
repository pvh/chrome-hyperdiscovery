# Chrome Hyperdiscovery Testbed

This is a tiny app skeleton to debug issues with hyperdiscovery in a Chrome App.

To install:

1. `yarn install`, `yarn start`
2. (Hack out any problems that prevent yarn start by removing bittorrent-dht and replacing utp-native with utp.)
3. Go to: chrome://extensions
4. Enable Developer Mode
5. Load Unpackaged Extension, browse to the place you checked out the code + "dist".
6. Navigate to chrome://apps, (double-?)click `chrome-hyperdiscovery`.

To test:

1. run `yarn discover` in two terminals. You should see them both connect to one another.
2. Right click the chrome window that appears and click Inspect.

Trivial code is found in `main.jsx`.

This will give you a debug session. As of this writing, I'm seeing conflicts for binding to UDP port 5353 for mDNS broadcasting, and when I run another node CLI version of the same code I can see it sending mDNS packets and discover other copies of itself but the Chrome App version neither discovers others nor seems to send packets others can see.