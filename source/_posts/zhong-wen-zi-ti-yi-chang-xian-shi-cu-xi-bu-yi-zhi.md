---
title: Konsole 中文字体异常显示 ，粗细不一致
date: 2024-11-19 12:52:00
---


写入 `~/.config/fontconfig/fonts.conf` ，确定你安装了其中的字体
```
<?xml version='1.0'?>
<!DOCTYPE fontconfig SYSTEM 'fonts.dtd'>
<fontconfig>
 <!-- 默认字体设置 -->
 <match target="pattern">
  <test qual="any" name="family">
   <string>sans-serif</string>
  </test>
  <edit mode="prepend" name="family" binding="strong">
   <string>Noto Sans CJK SC</string>
   <string>WenQuanYi Micro Hei</string>
   <string>Source Han Sans CN</string>
   <string>Microsoft YaHei</string>
   <string>SimSun</string>
  </edit>
 </match>
 <!-- 衬线字体设置 -->
 <match target="pattern">
  <test qual="any" name="family">
   <string>serif</string>
  </test>
  <edit mode="prepend" name="family" binding="strong">
   <string>Noto Serif CJK SC</string>
   <string>Source Han Serif CN</string>
   <string>SimSun</string>
   <string>AR PL UMing CN</string>
  </edit>
 </match>
 <!-- 等宽字体设置 -->
 <match target="pattern">
  <test qual="any" name="family">
   <string>monospace</string>
  </test>
  <edit mode="prepend" name="family" binding="strong">
   <string>Noto Sans Mono CJK SC</string>
   <string>WenQuanYi Micro Hei Mono</string>
   <string>Source Han Mono SC</string>
   <string>SimSun</string>
  </edit>
 </match>
 <!-- 中文字体微调 -->
 <match target="font">
  <test compare="contains" name="lang">
   <string>zh</string>
  </test>
  <edit mode="assign" name="antialias">
   <bool>true</bool>
  </edit>
  <edit mode="assign" name="hinting">
   <bool>true</bool>
  </edit>
  <edit mode="assign" name="hintstyle">
   <const>hintslight</const>
  </edit>
  <edit mode="assign" name="autohint">
   <bool>false</bool>
  </edit>
 </match>
</fontconfig>

```

执行
```
fc-cache -fv
```