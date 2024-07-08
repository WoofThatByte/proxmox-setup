<a name="readme-top"></a>

# Proxmox VE
  <p align="left">
    The following steps guide you through the post installation of Proxmox VE. By this time I installed <code>Proxmox 8.2</code>, <code>Kernel 6.8</code>
  </p>
   <p align="left">
    <code>Plex</code> for me is running in an LXC in Docker together with other services like Tdarr that needs iGPU. I could not pass the iGPU to a VM by this time. I could only do it for the LXC.
  </p>

## Hardware
  <p align="left">   
    * 32GB RAM * Intel® Core™ i5-1340P * 1TB M.2 SSD
  </p>

## Proxmox VE installation
  <p align="left">
    Can use <a href="https://www.youtube.com/watch?v=_u8qTN3cCnQ">this</a> link. </br>
    Internet connection when installing the Proxmox Ve is not necessary but it is helpful!
  </p>

  ### Post installation script
  <p align="left">
    Use the Proxmox VE Post Install script provided by <a href="https://tteck.github.io/Proxmox/">tteck</a>
  </p>
  
  ### Increase storage
  <p align="left">
    1. Delete <code>local-lvm</code> under the <code>Datacenter -> Storage</code> 
    </br>
    2. Open shell in Proxmox node:
        </br>
        * <code>lvremove /dev/pve/data</code>. say Y
        </br>
        * <code>lvresize -l +100%FREE /dev/pve/root</code>
        </br>
        * <code>resize2fs /dev/mapper/pve-root</code>
  </p>
  
## Create VM
 Can use <a href="https://youtu.be/_u8qTN3cCnQ?t=1091">this</a> link.

## Create LXC


