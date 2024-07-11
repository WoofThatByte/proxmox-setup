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
#### Node Shell
<p align="left">
  1. run <code>nano /etc/default/grub</code> </br>
  2. Edit as follows: <code>GRUB_CMDLINE_LINUX_DEFAULT="quiet intel_iommu=on iommu=pt"</code>. Add together parameter <code>i915.enable_gvt=1</code> to enable GVT for all 5th generation (Broadwell) to 10th generation (Comet Lake) Intel Core to enable GVT. Some newer CPUs like i5-1340P use SR-IOV instead of GVT. At this moment I dont know how to enable SR-IOV on 13th cpu. </br>
  3. Save changes  </br>
  4. update grub: <code>update-grub</code> </br>
  5. run <code>nano /etc/modules</code> </br>
  6. Add modules:
    
      # Modules required for PCI passthrough
      vfio
      vfio_pci
      vfio_virqfd
      vfio_iommu_type1    
      # Modules required for Intel GVT. 
      kvmgt 
      vfio-mdev
      i915 
    
  7. Save changes
  8. Update modules: <code>update-initramfs -u -k all</code>
  9. Reboot
</p>

#### Check IOMMU is enabled
<p align="left">
  1. Open node's shell and run <code>dmesg | grep -e DMAR -e IOMMU</code> </br>

    [    0.034902] ACPI: DMAR 0x0000000042791000 000088 (v02 INTEL  EDK2     00000002      01000013)
    [    0.034960] ACPI: Reserving DMAR table memory at [mem 0x42791000-0x42791087]
    [    0.089314] DMAR: IOMMU enabled
    [    0.190011] DMAR: Host address width 39
    [    0.190013] DMAR: DRHD base: 0x000000fed90000 flags: 0x0
    [    0.190028] DMAR: dmar0: reg_base_addr fed90000 ver 4:0 cap 1c0000c40660462 ecap 29a00f0505e
    [    0.190032] DMAR: DRHD base: 0x000000fed91000 flags: 0x1
    [    0.190037] DMAR: dmar1: reg_base_addr fed91000 ver 5:0 cap d2008c40660462 ecap f050da
    [    0.190040] DMAR: RMRR base: 0x0000004c000000 end: 0x000000503fffff
    [    0.190045] DMAR-IR: IOAPIC id 2 under DRHD base  0xfed91000 IOMMU 1
    [    0.190047] DMAR-IR: HPET id 0 under DRHD base 0xfed91000
    [    0.190049] DMAR-IR: Queued invalidation will be enabled to support x2apic and Intr-remapping.
    [    0.195377] DMAR-IR: Enabled IRQ remapping in x2apic mode
    [    1.033749] pci 0000:00:02.0: DMAR: Skip IOMMU disabling for graphics
    [    1.305721] DMAR: No ATSR found
    [    1.305722] DMAR: No SATC found
    [    1.305724] DMAR: IOMMU feature fl1gp_support inconsistent
    [    1.305726] DMAR: IOMMU feature pgsel_inv inconsistent
    [    1.305728] DMAR: IOMMU feature nwfs inconsistent
    [    1.305730] DMAR: IOMMU feature dit inconsistent
    [    1.305731] DMAR: IOMMU feature sc_support inconsistent
    [    1.305732] DMAR: IOMMU feature dev_iotlb_support inconsistent
    [    1.305734] DMAR: dmar0: Using Queued invalidation
    [    1.305741] DMAR: dmar1: Using Queued invalidation
    [    1.306955] DMAR: Intel(R) Virtualization Technology for Directed I/O
</p>
