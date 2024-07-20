# OpenMediaVault setup
<p align="left">
  Install and complete setup:  <a href="https://youtu.be/z5CqnmuqyHk?t=234">video</a>
</p>
<p align="left">
  First of all the <code>HDDs must be passed</code> to OpenMediaVault. I added my HDD hub as a PCI Device into Hardware of OMV VM.
</p>

## Install missing plugins
<p align="left">
  From the Navigation menu select <code>System, Plugins</code> and in the search bar enter <code>omvextra</code>. Install <code>openmediavault-omvextrasorg</code>
</p>
<p align="left">
  ------OR-----
</p>
<p align="left">
   Install additional plugins: </br>
  1. OMV shell: <code>wget -O - https://github.com/OpenMediaVault-Plugin-Developers/packages/raw/master/install | bash</code> </br>
  2. Log in to UI. Go to System and enable omv-extras.
</p>

## Mount drive
<p align="left">
  Go to Storage -> File Systems and mount the drives. I added <code>EXT4</code> for Plex storage.
</p>

## mergerFS
<p align="left">
  Install <code>mergerFS</code> in System->Plugins. Create a <code>pool</code> of multiple HDDs in <code>Storage -> mergerfs</code>. </br>
  All HDDs must have the same structure. <code>data</code> as parent directory with the following subfolders: <code>downloads</code>, <code>movies</code>, <code>series</code>, <code>tdarr_cache</code>
  How to configure mergerFS: <a href="https://youtu.be/Y3yF1Rsu7ow?t=1118">video</a>
</p>

## ZFS
<p align="left">
  Proxmox kernel is more stable than omv kernel. Search for kernel in System->Plugins and install it. Then select Kernel and install proxmox kernel. Reboot MV!
</p>
<p align="left">
  Search for ZFS in System->Plugins and install it. Create a new pool. </br>

  <b>NOTE:</b> I use 2 HDDs. All my HDDs are external in a USB Hub. ZFS GUI will not let you create a new pool if you are using USB for your HDDs. I manually added a mirror pool. Open OMV console and create a pool with this command <code>zpool create tank mirror /dev/sdc /dev/sdd</code>. </br>
  More info on this <a href="https://docs.oracle.com/cd/E19253-01/819-5461/gaynr/index.html">link</a> </br></br>

  Now navigate to Storage -> zfs. Your pool now is being displayed in GUI.
</p>

### ZFS ACL (Access control list)
<p align="left">
  Out of the box, ZFS doesn't support Linux style ACL's. Applying the following will get you a very close approximation. (And the last, while optional, could save you some disk space with little to nothing in a performance hit.) </br>
  OMV shell:
  
    zfs set aclinherit=passthrough [poolname]
    zfs set acltype=posixacl [poolname]
    zfs set xattr=sa [poolname]
    zfs set compression=lz4 [poolname]
</p>

## Creating a SMB service to pass it to VM/LXC
<p align="left">
  Can also follow this <a href="https://youtu.be/oOvb5w5q-Uk?t=75">video</a>
</p>

### Create user
<p align="left">
 Users -> Users. Add new user. Give it a name. Password. Add group settings:

    _ssh, crontab, daemon, openmediavault-admin, openmediavault-config, openmediavault-engined, openmediavault-notify, openmediavault-webgui, root, sudo, users
</p>

### Enable SMB
<p align="left">
  Services -> SMB/CIFS -> Settings. <code>Enable</code> the service. Enable <code>Browseable</code>, <code>Inherit ACLs</code>, <code>Inherit permissions</code> under the <b>Home directories</b>. Under the <b>Advanced settings</b> select minimum protocol version to <code>SMB3</code>. Enable <code>Use sendfile</code> and <code>Asynchronous I/O</code>. Save!
</p>

### Create shared folder
<p align="left">
  Go to Storage -> Shared Folders. Create a new one named <code>plexpool</code>. Give it a name. Select a file system (<b>pool</b> folder created with mergerFS). Select relative path (Use browseable node to select parent <code>data</code>). Default permissions. Save!</br>
  Now select created folder and edit permissions. Select created user in the steps below. Give Read/Write access.
</p>

### Create SMB Shares
<p align="left">
  Services -> SMB/CIFS -> Shares. Create a new one with the default settings. Select created shared folder. Save!
</p>
<p align="left">
  Now the shared folder <code>plexpool</code> must appear as <code>Referenced</code>!
</p>

### Pass shared folder to VM/LXC
VM/LXC shell: </br>
<p align="left">
  1. Install cifs-utils: <code>apt install cifs-utils</code> </br>
  2. Run <code>nano /etc/smbcreds</code> to create a new file and add the user credentials created for the SMB Shared Folder (do not forget to Save!):

    username=SMB_USER_GOES_HERE
    password=SMB_PASS_GOES_HERE

  3. Set the permissions of the file: <code>chmod 600 /etc/smbcreds</code>
  4. Add SMB server to <code>nano /etc/fstab</code>:

    # SMB mergerfs media share
    //OMV_IP/plexpool /mnt/pool/data cifs vers=3.0,gid=1000,uid=1000,iocharset=utf8,credentials=/etc/smbcreds 0 0

  Where <b><i>OMV_IP</i></b> is the IP of OpenMediaVault where SMB server is running. <b><i>plexpool</i></b> is the shared folder. <b><i>/mnt/pool/data</i></b> is a directory created on VM/LXC where SMB folder will be pointed. And <b><i>credentials=/etc/smbcreds</i></b> is the file for the user credentials created above. </br>
  <code>gid=1000,uid=1000</code> is the user id. </br></br>
  
  NOTE: For nextcloud the gid and uid are different. </br></br>
  
  5. Save and reboot!
</p>

### Nextcloud
<p>
  Nextcloud data directory is running by user <code>www-data</code>. To get user id run <code>id www-data</code> in VM/LXC shell. This will be <code>gid=33,uid=33</code> </br>
  Passing smb to nextcloud will run into an "checkblock" message:

    Please change the permissions to 0770 so that the directory cannot be listed by other users

Because nextcloud is selfhosted uou can just disable this check by adding <code>'check_data_directory_permissions' => false,</code> to <code>config.php</code> in nextcloud directory.
  
</p>

