# OpenMediaVault setup
<p align="left">
  Install and complete setup:  <a href="https://youtu.be/z5CqnmuqyHk?t=234">video</a>
</p>
<p align="left">
  First of all the <code>HDDs must be passed</code> to OpenMediaVault. I added my HDD hub as a PCI Device into Hardware of OMV VM.
</p>

## Extra plugins
<p align="left">
   Install additional plugins: </br>
  1. OMV shell: <code>wget -O - https://github.com/OpenMediaVault-Plugin-Developers/packages/raw/master/install | bash</code> </br>
  2. Log in to UI. Go to System and enable omv-extras.
</p>

## Mount drive
<p align="left">
  Go to Storage -> File Systems and mount the drives.
</p>

## mergerFS
<p align="left">
  Install <code>mergerFS</code> in System->Plugins. Create a <code>pool</code> of multiple HDDs in <code>Storage -> mergerfs</code>. </br>
  All HDDs must have the same structure. <code>data</code> as parent directory with the following subflders: <code>downloads</code>, <code>movies</code>, <code>series</code>, <code>tdarr_cache</code>
  How to configure mergerFS: <a href="https://youtu.be/Y3yF1Rsu7ow?t=1118">video</a>
</p>

## Creating a SMB service to pass it to VM/LXC

### Create user
<p align="left">
 Users -> Users. Add new user. Give it a name. Password and email empty. Add group settings:

    _ssh, crontab, daemon, openmediavault-admin, openmediavault-config, openmediavault-engined, openmediavault-notify, openmediavault-webgui, root, sudo, users
</p>

### Enable SMB
<p align="left">
  Services -> SMB/CIFS -> Settings. <code>Enable</code> the service. Enable <code>Browseable</code>, <code>Inherit ACLs</code>, <code>Inherit permissions</code> under the <b>Home directories</b>. Under the <b>Advanced settings</b> select minimum protocol version to <code>SMB3</code>. Enable <code>Use sendfile</code> and <code>Asynchronous I/O</code>. Save!
</p>

### Create shared folder
<p align="left">
  Go to Storage -> Shared Folders. Create a new one. Give it a name. Select a file system (<b>pool</b> folder created with mergerFS). Select relative path (parent <code>data</code>). Select permissions and add the created user with read/write access. Save!</br>
</p>

### Create SMB Shares
<p align="left">
  Services -> SMB/CIFS -> Shares. Create a new one with the default settings. Select created shared folder. Save!
</p>
