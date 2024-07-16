# OpenMediaVault setup
<p align="left">
  Install and complete setup:  <a href="https://youtu.be/z5CqnmuqyHk?t=234">video</a>
</p>
<p align="left">
  How to create a SMB service to pass it to VM/LXC. First of all the <code>HDDs must be passed</code> to OpenMediaVault. I added my HDD hub as a PCI Device into Hardware of OMV VM.
</p>
<p align="left">
   Install additional plugins: </br>
  1. OMV shell: <code>wget -O - https://github.com/OpenMediaVault-Plugin-Developers/packages/raw/master/install | bash</code> </br>
  2. Log in to UI. Go to System and enable omv-extras.
</p>
<p align="left">
  Go to Storage -> File Systems and mount the drives.
</p>
<p align="left">
  Optional! Install <code>mergerFS</code> in System->Plugins. Create a pool of multiple HDDs in <code>Storage -> mergerfs</code>. </br>
  How to configure mergerFS: <a href="https://youtu.be/Y3yF1Rsu7ow?t=1118">video</a>
</p>
<p align="left">
  Go to Storage -> File Systems and mount the drives.
</p>
