# CustomOverlay in gousumemory, tosu
**This is made to be used in mania, and it may not work on other modes.**

※ gosumemory is no longer updated. (official discord announce) so, change program to **tosu**(made by KotRikD). This is very similar to gosumemory.

How to use tosu : https://github.com/KotRikD/tosu

Made by **2ky ([@s2skky](https://twitter.com/s2skky))**.

Special thanks to **riunosk** for polishing up 'README.md'.


## How to setting?
https://youtu.be/XAGthkn75c0 (gosumemory)

## Current released theme

### simple-overlay
<details><summary>Details</summary>
  
  #### normal mode : 
  
>  - Customizable Colors and Contents.
>  - OBS Size : FHD->520x240,  QHD -> 700x330
>  
>  ![ezgif com-gif-maker](https://user-images.githubusercontent.com/62880311/136022486-44d7bde7-0683-42fe-a5db-ef5804919994.gif)
>
>  
  #### simple mode : 
  
>  - Non-customizable
>  - OBS Size : FHD->280x280,  QHD -> 375x375
>
>![ezgif com-gif-maker (1)](https://user-images.githubusercontent.com/62880311/136022501-cccd83a6-82f3-4bb8-91e1-459e28327c70.gif)
>
</details>
  
### simple-leaderboard
<details><summary>Details</summary>
  
  #### Screenshot:
  
> - OBS size : FHD->280x1080,  QHD->360x1440
> 
> ![ezgif com-gif-maker (2)](https://user-images.githubusercontent.com/62880311/136027869-3c7f2a62-c73f-446e-963f-0e7034ae5ae8.gif)

  #### Features : 
> - It predicts your score in real-time and shows your real-time ranking.
> - When the beatmap does not have global leaderboards, local scores will be shown automatically.
> - To use this overlay you should be osu! APIv1 key and osu! UID.
> - API Links : https://old.ppy.sh/p/api or http://osu.ppy.sh/p/api 
  
  #### Unsupported :
> - ScoreV2 mod and unsubmitted/deleted maps.
> - Some maps may not work for unknown reasons.
  
  #### Special Thanks :
> - **B-Force (inteliser)** : for helping me to make "simple_leaderboard"
</details>

### simple-hitcount
<details><summary>Details</summary>
  
  #### Screenshot : 
> - OBS Size : 220x290
>
>  ![Animation](https://user-images.githubusercontent.com/62880311/171421519-adb2f980-c034-44a4-9918-c2236aaf980e.gif)
>
</details>

### now-playing
<details><summary>Details</summary>
  
  #### Screenshot : 
> - OBS Size : 540x200
>
> ![capture](https://user-images.githubusercontent.com/62880311/171421414-e76b96d4-1012-4996-b53b-06c4a8f0d1d5.png)
>
</details>

### simple-hiterror (normal & colorful)
<details><summary>Details</summary>
  
  #### Screenshot : 
>
>  ![Animation2](https://user-images.githubusercontent.com/62880311/171418407-3376073b-492a-4a69-99df-40cb530ea156.gif)
>
>  ![GIF 2022-10-15 오후 7-06-36](https://user-images.githubusercontent.com/62880311/195980722-96270dfd-6c3c-42f0-bc8f-13899acf1463.gif)
>
>  - It's not perfect color matching because of LN press&release issue.
  #### Reference
>  - Calculating Tick : [TryZCustomOverlay](https://github.com/FukutoTojido/TryZCustomOverlay) (made by FukutoTojido)
</details>

### NPS-Chart
<details><summary>Details</summary>
  
  #### Screenshot : 
> - OBS Size : 400x360
>
>  ![Animation](https://user-images.githubusercontent.com/62880311/171416076-b92766ee-d9d8-4262-9fd7-d8168054a8bd.gif)
>
  #### Caution :
>  - ScoreV2 mode is recognized as a note when pressing and releasing LN.
</details>

### Normal Hitcount
<details><summary>Details</summary>
  
  #### Screenshot : 
> - OBS Size : 230x400
>
>  ![image](https://user-images.githubusercontent.com/62880311/182515903-793ff7e5-a838-4548-8a27-b976c753dbb9.png)
>
</details>

### mania ingame (hiterror + hitcount)
<details><summary>Details</summary>
  
  #### Screenshot : 
> - init ingame size : 380x500 (you must adjust size)
>
>  ![image](https://user-images.githubusercontent.com/62880311/182748095-1fd6eb81-6ce2-48de-a771-15dd6499cf54.png)
>
</details>

### now playing disk version
<details><summary>Details</summary>
  
  #### Screenshot : 
> - OBS size : 430x550
> - must using KotRikD / tosu program (no adapt gosumemory)
> - ${\textsf{\color{magenta}There are 2 custom options. Check config.js file.}}$ 
>
>  ![GIF 2024-08-13 오전 12-25-59](https://github.com/user-attachments/assets/6098a99e-94c5-4b78-bc10-2054f83d174a)
>
</details>

### mania hitcount bar type
<details><summary>Details</summary>
  
  #### Screenshot : 
> - OBS size : 910x150
> - must using KotRikD / tosu program (no adapt gosumemory)
> - ${\textsf{\color{magenta}There are 2 custom options. Check config.js file.}}$ 
>
>  ![GIF 2024-08-13 오전 12-28-02](https://github.com/user-attachments/assets/55b8ccbf-2583-466f-b4d3-b310b59f137e)
>
</details>

## ChangeLog:

> #### **2024-08-14*
> - Fixed output bugs for concurrent notes in all hiterror overlay.
> - Modify vanishing effect smoother in hiterror tick.

> #### **2024-08-13*
> - Released 2 new overlays (mania hitcount bar type, now playing disk version)

> #### **2021-10-05*
> - Released simple-overlay and simple-leaderboard. 
> - Hotfix for simple-overlay.

> #### **2021-10-17*
> - Changed folder name.

> #### **2021-10-18*
> - Added option to remove background behind leaderboard in simple-leaderboard.

> #### **2022-06-01*
> - Inital commit.
> - Add 3 existing themes overlay.
> - Add 1 new theme overlay(NPS Chart).

> #### **2022-08-03*
> - Add new theme overlay(Normal Hitcount).

> #### **2022-08-04*
> - Add ingame overlay.

> #### **2022-10-15*
> - Add simple_hiterror colorful.
