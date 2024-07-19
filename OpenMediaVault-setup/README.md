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
  Go to Storage -> Shared Folders. Create a new one named <code>plexpool</code>. Give it a name. Select a file system (<b>pool</b> folder created with mergerFS). Select relative path (Use browsable node to select parent <code>data</code>). Default permissions. Save!</br>
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
  4. Add SMB server to /etc/fstab:

    # SMB mergerfs media share
    //OMV_IP/plexpool /mnt/pool/data cifs vers=3.0,gid=1000,uid=1000,iocharset=utf8,credentials=/etc/smbcreds 0 0

  Where <b><i>OMV_IP</i></b> is the IP of OpenMediaVault where SMB server is running. <b><i>plexpool</i></b> is the shared folder. <b><i>/mnt/pool/data</i></b> is a directory created on VM/LXC where SMB folder will be pointed. And <b><i>credentials=/etc/smbcreds</i></b> is the file for the user credentials created above.
  
  5. Save and reboot!
</p>
