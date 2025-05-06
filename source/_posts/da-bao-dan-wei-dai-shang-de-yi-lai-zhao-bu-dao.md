---
title: Pyinstaller打包 openvino，但未带上 openvino的依赖，找不到CPU,GPU
date: 2024-04-25 18:34:00
---


命令:
```sh
pyinstaller --onefile --collect-submodules openvino --collect-binaries openvino --collect-data openvino server.py
```

server.spec (自动生成)
```
# -*- mode: python ; coding: utf-8 -*-
from PyInstaller.utils.hooks import collect_data_files
from PyInstaller.utils.hooks import collect_dynamic_libs
from PyInstaller.utils.hooks import collect_submodules

datas = []
binaries = []
hiddenimports = []
datas += collect_data_files('openvino')
binaries += collect_dynamic_libs('openvino')
hiddenimports += collect_submodules('openvino')


a = Analysis(
    ['server.py'],
    pathex=[],
    binaries=binaries,
    datas=datas,
    hiddenimports=hiddenimports,
    hookspath=[],
    hooksconfig={},
    runtime_hooks=[],
    excludes=[],
    noarchive=False,
    optimize=0,
)
pyz = PYZ(a.pure)

exe = EXE(
    pyz,
    a.scripts,
    a.binaries,
    a.datas,
    [],
    name='server',
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    upx_exclude=[],
    runtime_tmpdir=None,
    console=True,
    disable_windowed_traceback=False,
    argv_emulation=False,
    target_arch=None,
    codesign_identity=None,
    entitlements_file=None,
)

```