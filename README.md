<a name="readme-top"></a>

# Proxmox VE
  <p align="left">
    The following steps guide you through the post installation of Proxmox VE. By this time I installed <code>Proxmox 8.2</code>, <code>Kernel 6.8</code>
  </p>
   <p align="left">
    <code>Plex</code> for me is running in an Ubuntu LXC in Docker together with other services like Tdarr that needs iGPU. I could not pass the iGPU to a linux VM by this time. I could only do it for the LXC.
  </p>

## Hardware
  <p align="left">   
    * 32GB RAM * Intel® Core™ i5-1340P * 1TB M.2 SSD
  </p>

## Proxmox VE installation
  <p align="left">
    Can use <a href="https://www.youtube.com/watch?v=_u8qTN3cCnQ">this</a> link. </br>
    Internet connection when installing the Proxmox Ve is necessary!
  </p>

  ### Post installation script
  <p align="left">
    Use the Proxmox VE Post Install script provided by <a href="https://tteck.github.io/Proxmox/">tteck</a>
  </p>

  <p align="left">
    If bash command not working: </br>
    Shell:</br>
    1. <code>nano /etc/resolv.conf</code></br>
    2. change namesever with router DNS
  </p>
  
  ### Increase storage - post install
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
  
## Create Ubuntu VM
<p align="left">
     Can use <a href="https://youtu.be/_u8qTN3cCnQ?t=1091">this</a> link.
</p>


## Create Ubuntu LXC
<p align="left">
    Use <a href="https://tteck.github.io/Proxmox/">tteck</a> Operating System script.
</p>

## Passthrough Intel iGPU
<p align="left">
    Enable <code>Intel Virtualization Technology</code> and <code>VT-d</code> in BIOS
</p>
<p align="left">
    Host will lose access to iGPU when passing to VM!
</p>

### Enabling PCI passthrough
<p align="left">
    Node shell: </br>
    1. run <code>nano /etc/default/grub</code> </br>
    2. Edit as follows: <code>GRUB_CMDLINE_LINUX_DEFAULT="quiet intel_iommu=on iommu=pt"</code>. Add together parameter <code>i915.enable_gvt=1</code> for all 5th generation (Broadwell) to 10th generation (Comet Lake) Intel Core to enable GVT. At this moment I dont know how to enable SR-IOV on 13th cpu. </br>
    3. update grub: <code>update-grub</code> </br>
    4. run <code>nano /etc/modules</code> </br>
    5. 

    kvmgt #not necessary for 13th cpu
    vfio
    vfio_pci
    vfio_virqfd
    vfio_iommu_type1
    vfio-mdev #not necessary for 13th cpu
    i915 #not necessary for 13th cpu
    
</p>
