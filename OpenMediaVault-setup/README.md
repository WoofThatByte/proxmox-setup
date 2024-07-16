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
<p align="left">
  Go to Storage -> Shared Folders. Create a new one. Give it a name. Select a file system (<b>pool</b> folder created with mergerFS). Select relative path (relative path for me is <code>data</code>). </br>
  <code>data</code> is a parent directory that has the following subflders: <code>downloads</code>, <code>movies</code>, <code>series</code>, <code>tdarr_cache</code>. </br>
</p>

