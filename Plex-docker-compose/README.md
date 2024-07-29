# Plex server running with Proxmox and Docker
<p aling="left">
For me Plex is running in Docker in Ubuntu LXC. It is not recommended to have docker installed in a LXC because when Proxmox updates it can crash your LXC. But for me LXC is fine and nothing bad happened so far. Passing the iGPU to LXC was easy. Use this <a href="https://github.com/WoofThatByte/proxmox-setup/tree/main#passthrough-intel-igpu">link</a> for iGPU passthrough. </br>
I run <strong>Tdarr</strong> together with <strong>Plex</strong> on the same docker. 
</p>

### Before starting
<p>
   Shared Folder in OpenMediaVault must be created first. And passed to VM/LXC. Please refer to this <a href="https://github.com/WoofThatByte/proxmox-setup/tree/main/OpenMediaVault-setup">link</a>.
</p>
<p>
   HDD mount point must have the following directory: </br>
  <code>data</code> as parent directory with the following subfolders: <code>downloads</code>, <code>movies</code>, <code>series</code>, <code>tdarr_cache</code>  
</p>

## Create Ubuntu 24.04 LXC/VM
<p align="left">
    Refer to this <a href="https://github.com/WoofThatByte/proxmox-setup">link</a>
</p>

### Install Docker
<p align="left">
    LXC/VM shell:</br></br>
    <a href="https://docs.vultr.com/how-to-install-docker-on-ubuntu-24-04">how to remove/install</a>    
   1. Install docker: 
    
    apt install apt-transport-https ca-certificates curl software-properties-common -y
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    apt update
    apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
    
   2. Enable docker service: <code>systemctl enable docker</code>. This will start docker automatically on VM/LXC start</br>
   3. Check docker is running: <code>systemctl status docker</code></br>
   4. If not running: <code>systemctl start docker</code>. Will start the docker</br>
   5. Finally check docker: <code>docker run hello-world</code></br>
</p>

### Uninstall/Remove Docker (completely)
<p>
   1. <code>dpkg -l | grep -i docker</code> </br>   
   2. <code>apt-get purge -y docker-engine docker docker.io docker-ce docker-ce-cli docker-compose-plugin</code> </br>   
   3. <code>apt-get autoremove -y --purge docker-engine docker docker.io docker-ce docker-compose-plugin</code> </br>   
   4. Delete all images, containers, and volumes run the following commands:

      rm -rf /var/lib/docker /etc/docker
      rm /etc/apparmor.d/docker
      groupdel docker
      rm -rf /var/run/docker.sock
      rm -rf /var/lib/containerd
      rm -r ~/.docker
      rm -rf /usr/local/bin/docker-compose
</p>

### Install Portainer
<p align="left">
LXC/VM shell:</br></br>
1. First, create the volume that Portainer Server will use to store its database: <code>docker volume create portainer_data</code></br>
2. Download and install the Portainer Server container: <code>docker run -d -p 8000:8000 -p 9000:9000 --name portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce:latest</code>

    By default, Portainer generates and uses a self-signed SSL certificate to secure port 9443. Alternatively you can provide your own SSL certificate during installation or via the Portainer UI after installation is complete.
    If you require HTTP port 9000 open for legacy reasons, add the following to your docker run command:
    -p 9000:9000

3. Portainer Server has now been installed. You can check to see whether the Portainer Server container has started by running <code>docker ps</code>
4. Log in to Web UI: <code>http://[VM_IP]:9000</code>.
</p>

### Create Docker networks
<p align="left">
    <code>docker network create -d bridge [network_name] </code>
</p>
<p align="left">
    Networks:</br>
        media-management-services</br>
        media-services</br>
        network-services</br>
        utility-services </br>
        data-services
</p>

<table>
  <tr>
    <th>media-management-services</th>
    <th>media-services</th>
    <th>network-services</th>
    <th>utility-services</th>
    <th>data-services</th>
  </tr>
  <tr>
    <td>
        sonarr</br>
        radarr</br>
        prowlarr</br>
        wizarr</br>
        deluge</br>
        bazarr</br>
        tautulli</br>
        overseerr
    </td>
    <td>plex</td>
    <td>flaresolverr</td>
    <td>
        dockerproxy</br>
        filebrowser</br>
        pairdrop</br>
        scrutiny</br>
        speedtest-tracker</br>
        tdarr</br>
        tdarr-node</br>        
    </td>
    <td>
         nextcloud-app</br>
         postgres-nextcloud</br>
         redis-nextcloud</br>
    </td>
  </tr>
</table>

## Nextcloud
### www-data user
<p align="left">
   <code>Data</code> folder (<code>:/var/www/html/data</code>) must be accessed <code>www-data</code> only. Change permissions to data folder as follows:
     
      sudo chown -R  www-data:www-data [nextcloud_data_directory]
</p>

### SMB share
<p align="left">
   See <a href="https://github.com/WoofThatByte/proxmox-setup/tree/main/OpenMediaVault-setup#pass-shared-folder-to-vmlxc">link</a>
</p>

### Cron job
<p align="left">
   Nextcloud requires <code>cron</code> to run a job. </br> </br>
   As root user: </br>
   1. Enable cron: <code>systemctl enable cron</code> </br>
   2. Run cron job: <code> docker exec --user www-data nextcloud-app php /var/www/html/cron.php </code>. Where <code>nextcloud-app</code> is the nextcloud directory located in docker-volumes.
   3. Add this cron job to crontab so it can automatically run every 10 minutes: <code>crontab -e</code>

      */10 * * * * docker exec --user www-data nextcloud-app php /var/www/html/cron.php
</p>

### Update missing indicies
<p align="left">
   
      sudo docker exec --user www-data [container-name] php occ db:add-missing-indices

### Enter maintenance  mode

      sudo docker exec --user www-data [container-name] php /var/www/html/occ maintenance:mode --on
      sudo docker exec --user www-data nextcloud-app php /var/www/html/occ maintenance:repair
      sudo docker exec --user www-data nextcloud-app php /var/www/html/occ db:add-missing-columns
      sudo docker exec --user www-data nextcloud-app php /var/www/html/occ maintenance:update:htaccess
      sudo docker exec --user www-data nextcloud-app php /var/www/html/occ maintenance:mode --off
</p>

## ROUTER setup

1. Reserve IP for the VM/LXC.

