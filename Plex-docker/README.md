
# Plex server running with Proxmox and Docker
<p aling="left">
For me Plex is running in Docker in Ubuntu LXC. It is not recommended to have docker installed in a LXC because when Proxmox updates it can crash your LXC. But for me LXC is fine and nothing bad happened so far. Passing the iGPU to LXC was easy. Use this <a href="https://github.com/WoofThatByte/proxmox-setup">link</a> for iGPU passthrough. </br>
I run <strong>Tdarr</strong> together with <strong>Plex</strong> on the same docker. 
</p>

## Create Ubuntu LXC/VM
<p align="left">
    Refer to this <a href="https://github.com/WoofThatByte/proxmox-setup">link</a>
</p>

### Install Docker
<p align="left">
    LXC/VM shell:</br>
    1. Install docker: <code> apt install docker.io</code>. Type <b>Y</b>. Enter to continue</br>
    2. Enable docker service: <code>systemctl enable docker</code>. This will start docker automatically on VM/LXC start</br>
    3. Check docker is running: <code>systemctl status docker</code></br>
    4. If not running: <code>systemctl start docker</code>. Will start the docker</br>
    5. Finally check docker: <code>docker run hello-world</code></br>
</p>

### Install Portainer
<p align="left">
LXC/VM shell:</br>
1. First, create the volume that Portainer Server will use to store its database: <code>docker volume create portainer_data</code></br>
2. Download and install the Portainer Server container: <code>docker run -d -p 8000:8000 -p 9000:9000 --name portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce:latest</code>

    By default, Portainer generates and uses a self-signed SSL certificate to secure port 9443. Alternatively you can provide your own SSL certificate during installation or via the Portainer UI after installation is complete.
    If you require HTTP port 9000 open for legacy reasons, add the following to your docker run command:
    -p 9000:9000

3. Portainer Server has now been installed. You can check to see whether the Portainer Server container has started by running <code>docker ps</code>
4. Log in to Web UI: <code>http://[IP]:9000</code>.
</p>

### Create Docker networks
<p align="left">
    <code>docker network create -d bridge media-management-services</code></br>
    <code>docker network create -d bridge media-services</code></br>
    <code>docker network create -d bridge network-services</code></br>
    <code>docker network create -d bridge utility-services</code>
</p>
