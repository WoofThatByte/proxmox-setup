# Environment Variables

TIMEZONE=Europe/Bucharest </br>
VOLUMES_PATH=/docker-volumes</br>
CF_EMAIL=CLOUDFLARE_EMAIL</br>
CF_DNS_API_TOKEN=CLOUDFLARE_API_TOKEN</br>
DOMAIN_URL=example.net</br>
TRAEFIK_SUBDOMAIN=traefik-dashboard</br>
BASIC_AUTH=USER:PASSWORD</br>

How to add Traefik user+password and the required folders: <a href="https://technotim.live/posts/traefik-3-docker-certificates/">TUTORIAL</a>

## Traefik log 
Traefik log files increase in size if not maintined. To do so: 
1. Install logrotate (if not already installed): </br>
<code>sudo apt update
sudo apt install logrotate</code>
2. Create a Logrotate Config File for Traefik: <code>sudo nano /etc/logrotate.d/traefik</code>
3. Add the following content: </br>
<code>"/docker-volumes/network-services/traefik/logs/*.log" {
    size 5M
    daily
    rotate 14
    missingok
    notifempty
    compress
    copytruncate
    sharedscripts
    postrotate
        docker kill --signal="USR1" traefik > /dev/null 2>&1 || true
    endscript
}
</code>

Where <b>/docker-volumes/network-services/traefik/logs/</b> is your location to log path and <b>traefik</b> is container name.

4. Verify Logrotate Works:
   - You can test the configuration with: <code>sudo logrotate -d /etc/logrotate.d/traefik</code>
   - For a forced rotation (for testing): <code>sudo logrotate -f /etc/logrotate.d/traefik</code>
