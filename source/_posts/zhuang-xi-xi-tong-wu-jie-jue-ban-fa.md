---
title: ThinkPad E580 装Ubuntu系 系统无WIFI 解决办法
date: 2020-10-20 10:01:00
---

### 首先得下载 最新的驱动，我之前因为自己的下载的驱动不够新，导致我的驱动一直装不上去
### https://github.com/tomaspinho/rtl8821ce 这个是最新的驱动的下载 地址，建议从这里下载最新的 RTL 8821ce驱动


1. 然后解压包，
![](https://img2020.cnblogs.com/blog/2146100/202010/2146100-20201020095022971-418967446.png)

2. 修改Makefile文件
![](https://img2020.cnblogs.com/blog/2146100/202010/2146100-20201020095407151-1844956564.png)

3. 在当前的文件夹下面打开终端
相继输入 
```
sudo make
sudo make install
sudo modprobe -a 8821ce
```
![](https://img2020.cnblogs.com/blog/2146100/202010/2146100-20201020095836381-1884335961.png)

```
下面是终端完整的显示
pph@IBM:~/Downloads/rtl8821ce-master$ sudo make
请输入密码
[sudo] pph 的密码：
验证成功
make ARCH=x86_64 CROSS_COMPILE= -C /lib/modules/5.4.50-amd64-desktop/build M=/home/pph/Downloads/rtl8821ce-master  modules
make[1]: 进入目录“/usr/src/linux-headers-5.4.50-amd64-desktop”
  CC [M]  /home/pph/Downloads/rtl8821ce-master/core/rtw_cmd.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/core/rtw_security.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/core/rtw_debug.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/core/rtw_io.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/core/rtw_ioctl_query.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/core/rtw_ioctl_set.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/core/rtw_ieee80211.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/core/rtw_mlme.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/core/rtw_mlme_ext.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/core/rtw_mi.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/core/rtw_wlan_util.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/core/rtw_vht.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/core/rtw_pwrctrl.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/core/rtw_rf.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/core/rtw_chplan.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/core/rtw_recv.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/core/rtw_sta_mgt.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/core/rtw_ap.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/core/mesh/rtw_mesh.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/core/mesh/rtw_mesh_pathtbl.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/core/mesh/rtw_mesh_hwmp.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/core/rtw_xmit.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/core/rtw_p2p.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/core/rtw_rson.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/core/rtw_tdls.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/core/rtw_br_ext.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/core/rtw_iol.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/core/rtw_sreset.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/core/rtw_btcoex_wifionly.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/core/rtw_btcoex.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/core/rtw_beamforming.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/core/rtw_odm.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/core/rtw_rm.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/core/rtw_rm_fsm.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/core/efuse/rtw_efuse.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/os_dep/osdep_service.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/os_dep/linux/os_intfs.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/os_dep/linux/pci_intf.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/os_dep/linux/pci_ops_linux.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/os_dep/linux/ioctl_linux.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/os_dep/linux/xmit_linux.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/os_dep/linux/mlme_linux.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/os_dep/linux/recv_linux.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/os_dep/linux/ioctl_cfg80211.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/os_dep/linux/rtw_cfgvendor.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/os_dep/linux/wifi_regd.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/os_dep/linux/rtw_android.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/os_dep/linux/rtw_proc.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/os_dep/linux/rtw_rhashtable.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/os_dep/linux/ioctl_mp.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/hal/hal_intf.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/hal/hal_com.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/hal/hal_com_phycfg.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/hal/hal_phy.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/hal/hal_dm.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/hal/hal_dm_acs.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/hal/hal_btcoex_wifionly.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/hal/hal_btcoex.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/hal/hal_mp.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/hal/hal_mcc.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/hal/hal_hci/hal_pci.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/hal/led/hal_led.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/hal/led/hal_pci_led.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/hal/rtl8821c/rtl8821c_halinit.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/hal/rtl8821c/rtl8821c_mac.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/hal/rtl8821c/rtl8821c_cmd.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/hal/rtl8821c/rtl8821c_phy.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/hal/rtl8821c/rtl8821c_dm.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/hal/rtl8821c/rtl8821c_ops.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/hal/rtl8821c/hal8821c_fw.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/hal/rtl8821c/pci/rtl8821ce_halinit.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/hal/rtl8821c/pci/rtl8821ce_halmac.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/hal/rtl8821c/pci/rtl8821ce_io.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/hal/rtl8821c/pci/rtl8821ce_xmit.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/hal/rtl8821c/pci/rtl8821ce_recv.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/hal/rtl8821c/pci/rtl8821ce_led.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/hal/rtl8821c/pci/rtl8821ce_ops.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/hal/efuse/rtl8821c/HalEfuseMask8821C_PCIE.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/hal/hal_halmac.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master//hal/halmac/halmac_api.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master//hal/halmac/halmac_88xx/halmac_bb_rf_88xx.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master//hal/halmac/halmac_88xx/halmac_cfg_wmac_88xx.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master//hal/halmac/halmac_88xx/halmac_common_88xx.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master//hal/halmac/halmac_88xx/halmac_efuse_88xx.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master//hal/halmac/halmac_88xx/halmac_flash_88xx.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master//hal/halmac/halmac_88xx/halmac_fw_88xx.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master//hal/halmac/halmac_88xx/halmac_gpio_88xx.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master//hal/halmac/halmac_88xx/halmac_init_88xx.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master//hal/halmac/halmac_88xx/halmac_mimo_88xx.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master//hal/halmac/halmac_88xx/halmac_pcie_88xx.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master//hal/halmac/halmac_88xx/halmac_8821c/halmac_cfg_wmac_8821c.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master//hal/halmac/halmac_88xx/halmac_8821c/halmac_common_8821c.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master//hal/halmac/halmac_88xx/halmac_8821c/halmac_gpio_8821c.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master//hal/halmac/halmac_88xx/halmac_8821c/halmac_init_8821c.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master//hal/halmac/halmac_88xx/halmac_8821c/halmac_phy_8821c.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master//hal/halmac/halmac_88xx/halmac_8821c/halmac_pwr_seq_8821c.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master//hal/halmac/halmac_88xx/halmac_8821c/halmac_pcie_8821c.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/hal/phydm/phydm_debug.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/hal/phydm/phydm_antdiv.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/hal/phydm/phydm_soml.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/hal/phydm/phydm_smt_ant.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/hal/phydm/phydm_antdect.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/hal/phydm/phydm_interface.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/hal/phydm/phydm_phystatus.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/hal/phydm/phydm_hwconfig.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/hal/phydm/phydm.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/hal/phydm/phydm_dig.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/hal/phydm/phydm_pathdiv.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/hal/phydm/phydm_rainfo.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/hal/phydm/phydm_dynamictxpower.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/hal/phydm/phydm_adaptivity.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/hal/phydm/phydm_cfotracking.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/hal/phydm/phydm_noisemonitor.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/hal/phydm/phydm_beamforming.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/hal/phydm/phydm_dfs.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/hal/phydm/txbf/halcomtxbf.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/hal/phydm/txbf/haltxbfinterface.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/hal/phydm/txbf/phydm_hal_txbf_api.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/hal/phydm/phydm_adc_sampling.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/hal/phydm/phydm_ccx.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/hal/phydm/phydm_psd.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/hal/phydm/phydm_primary_cca.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/hal/phydm/phydm_cck_pd.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/hal/phydm/phydm_rssi_monitor.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/hal/phydm/phydm_auto_dbg.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/hal/phydm/phydm_math_lib.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/hal/phydm/phydm_api.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/hal/phydm/phydm_pow_train.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/hal/phydm/phydm_lna_sat.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/hal/phydm/phydm_pmac_tx_setting.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/hal/phydm/phydm_mp.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/hal/phydm/halrf/halrf.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/hal/phydm/halrf/halrf_debug.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/hal/phydm/halrf/halphyrf_ce.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/hal/phydm/halrf/halrf_powertracking_ce.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/hal/phydm/halrf/halrf_powertracking.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/hal/phydm/halrf/halrf_kfree.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/hal/phydm/rtl8821c/halhwimg8821c_bb.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/hal/phydm/rtl8821c/halhwimg8821c_mac.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/hal/phydm/rtl8821c/halhwimg8821c_rf.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/hal/phydm/rtl8821c/phydm_hal_api8821c.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/hal/phydm/rtl8821c/phydm_regconfig8821c.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/hal/phydm/halrf/rtl8821c/halrf_8821c.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/hal/phydm/halrf/rtl8821c/halrf_iqk_8821c.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/hal/btc/halbtc8821cwifionly.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/hal/btc/halbtc8821c1ant.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/hal/btc/halbtc8821c2ant.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/platform/platform_ops.o
  CC [M]  /home/pph/Downloads/rtl8821ce-master/core/rtw_mp.o
  LD [M]  /home/pph/Downloads/rtl8821ce-master/8821ce.o
  Building modules, stage 2.
  MODPOST 1 modules
  CC [M]  /home/pph/Downloads/rtl8821ce-master/8821ce.mod.o
  LD [M]  /home/pph/Downloads/rtl8821ce-master/8821ce.ko
make[1]: 离开目录“/usr/src/linux-headers-5.4.50-amd64-desktop”
pph@IBM:~/Downloads/rtl8821ce-master$ sudo make install
install -p -m 644 8821ce.ko  /lib/modules/5.4.50-amd64-desktop/kernel/drivers/net/wireless/
/sbin/depmod -a 5.4.50-amd64-desktop
pph@IBM:~/Downloads/rtl8821ce-master$ sudo modprobe -a 8821ce
```
