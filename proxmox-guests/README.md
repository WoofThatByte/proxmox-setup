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
</p>
