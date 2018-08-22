# Chrome Hyperdiscovery Testbed

This is a tiny app skeleton to debug issues with hyperdiscovery in a Chrome App.

To install:

1. `yarn install`, `yarn start`
2. Go to: chrome://extensions
3. Enable Developer Mode
4. Load Unpackaged Extension, browse to the place you checked out the code + "dist".
5. Navigate to chrome://apps, (double-?)click `chrome-hyperdiscovery`.

To test:

1. run `yarn discover` in two terminals. You should see them both connect to one another.
2. Right click the chrome window that appears and click Inspect. This will give you a debug session. The code in `main.jsx` should be (basically) the same code as in discover.js, but right now it isn't successfully discovering the other client.

 As of this writing, I'm seeing conflicts for binding to UDP port 5353 for mDNS broadcasting, and when I run another node CLI version of the same code I can see it sending mDNS packets and discover other copies of itself but the Chrome App version neither discovers others nor seems to send packets others can see.