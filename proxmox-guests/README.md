# List of guests running in Proxmox
<p align="left">
  1. <strong>NginxProxyManager</strong> - reverse proxy </br>
  2. <strong>Wireguard</strong> - VPN</br>
  3. <strong>HomeAssistant</strong> - smart home app</br>
  4. <strong>OpenMediaVault</strong> - hdd manager</br>
  5. <strong>UbuntuMediaServer</strong> - docker lxc
</p>

## NginxProxyManager - LXC
  <p align="left">
    Installed using <a href="https://tteck.github.io/Proxmox/#nginx-proxy-manager-lxc">tteck</a> script.
  </p>
  <p align="left">
    Add cloudflare SSL certificate (see <a href="https://youtu.be/pwK1LnbTitI?t=168">link</a>). Forward  Cloudflare_DNS to <code>Host_IP:8088</code>. Enable <code>Block Common Exploits</code> and <code>Websockets support</code>. Next modify SSL tab: enable <code>Force SSL</code> and <code>HTTP/2 support</code>.
  </p>
  <p align="left">
    For Nextcloud app go to Advanced tab and add the following:

    location /.well-known/carddav {
    return 301 $scheme://$host/remote.php/dav;
    }
    
    location /.well-known/caldav {
        return 301 $scheme://$host/remote.php/dav;
    }
  </p>

## Wireguard - LXC
  <p align="left">
    Installed using <a href="https://tteck.github.io/Proxmox/#wireguard-lxc">tteck</a> script.
  </p>
  <p align="left">
    Run <code>nano /etc/pivpn/wireguard/setupVars.conf</code> in wireguard's shell. Change <code>pivpnHOST</code> with router DNS or router static ip. Example

    pivpnHOST:provider.go.net
  </p>
  <p align="left">
    1. Add client: <code>pivpn add</code> </br>
    2. Check client QR code:  <code>pivpn -qr</code>
  </p>

## HomeAssistant - VM
  <p align="left">
    Installed using <a href="https://tteck.github.io/Proxmox/#home-assistant-os-vm">tteck</a> script.
  </p>

## OpenMediaVault - VM
  <p align="left">
    Installed using ISO image. Please refer to this <a href="https://github.com/WoofThatByte/proxmox-setup/tree/main/OpenMediaVault-setup">link</a> for more details.
  </p>

## UbuntuMediaServer -LXC
  <p align="left">
  Installed using <a href="https://tteck.github.io/Proxmox/#ubuntu-lxc">tteck</a> script. Only Ubuntu OS. Docker and Portainer have been manually installed. Please refer to this <a href="https://github.com/WoofThatByte/proxmox-setup/tree/main/Plex-docker">link</a> for more details.
  </p>

# ROUTER setup
<p align="left">
  Add IP reservation to DHCP Server for OpenMediaVault
</p>
<p align="left">
  Forward port: </br>
  1. <code>Nginx</code>: </br>
  Service name: Nginx-proxy-manager, Device IP Address: nginx_ip, external port: 80, internal port: 80. </br>
  Service name: Nginx-proxy-manager2, Device IP Address: nginx_ip, external port: 443, internal port: 443 </br>
  2. <code>Wireguard</code>: </br>
  Service name: wireguard, Device IP Address: wireguard_ip, external port: 51820, internal port: 51820 </br>
  3. <code>Plex</code>: </br>
  Service name: plex, Device IP Address: NginxProxyManager_ip, external port: 32400, internal port: 32400 </br>
</p>
