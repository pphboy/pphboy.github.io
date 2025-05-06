---
title: 安装Vmware后无法启动WSL2
date: 2023-03-11 14:31:00
---

如果您已经删除了 VMware，但是 WSL2 仍然无法正常工作，可能是因为 VMware 安装期间对系统进行了一些更改，导致 WSL2 无法正常运行。您可以尝试按照以下步骤来修复 WSL2：

1. 打开 PowerShell（管理员权限），运行以下命令：

   
   dism.exe /online /cleanup-image /restorehealth
   

   这个命令会扫描系统文件并修复任何损坏的文件。

2. 运行以下命令以重新注册 WSL2：

   
   dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
   dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
   

   这个命令会重新注册 WSL2，并启用“虚拟机平台”可选组件。

3. 重新启动计算机。