# Tdarr flow that gets Dolby Vision to LG OLED C3
<p align="left">
  LG WebOS supports only Dolby Vision profile 5 and 7 in .mp4 container. For .mkv container you will get only HDR and Dolby Atmos. 
</p>
<p align="left">
  I chosed not to transcode video files that has DoVi profile 7 because WebOS does not have support for it. Transcoding TruHD (with Dolby Atmos) to .mp4 container will lose DolbyAtmos feature. Transcoding EAC-3 (with Dolby Atmos) to .mp4 container will keep the Dolby Atmos feature.
</p>
<p align="left">
  How flow works:
  1. Remove unwanted images
  2. Reorder streams (vide-audo-subtitle)
  3. Remove commentary tracks
  4. Remove embedded subtitles (pgs, dvd)
  5. Extract subtitle to SRT file
  6. Check if video is HEVC (x265)
  7. If not HEVC (file AVC) then transcode. If HEVC no transcode is necessary.
  8. Check if file is MKV container.
  9. If file is not MKV it is not necessary to transcode. I consider that video file can be DoVi in .mp4 container.
  10. Check if video has DoVi
  11. Check DoVi profile.
  12. Check audio profile for DoVi profiles 5 and 8.
  13. Add EAC-3 from TrueHD because TrueHD does not play in .mp4 container. 
  14. Transcode video file to .MP4
  15. Replace original video file
</p>
