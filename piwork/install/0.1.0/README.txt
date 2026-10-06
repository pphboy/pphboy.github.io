Piwork Docker setup, image set 0.1.0

These English setup files adapt deploy/docker/ in pphboy/piwork at
326837881f2a3561ae5911dab98a2248d758c2e0. Only comments and Compose
missing-variable messages are translated; runtime settings are unchanged.

release.env retains the existing local candidate release's published
Docker Hub image digests. Its release manifest records sourceCommit
cc5640fd6b7fce7f6669be7bbc31c72614137b57, sourceModified=true, and
sourceInputHash 01da2af4e912267ba9451b2c5230a4ffe1f43254e77c39b2207c4d1b41ab1514.
This is an early candidate image set, not a new stable binary release.
All five distinct image manifests were checked anonymously on 2026-10-06.

Platform: Linux amd64 Core; Linux or Windows Docker Desktop CLI clients.
Requires Docker Engine 28+ and Compose 2.24+. Images are pulled online.
Core and client configuration containing real credentials is not included.

Installation: https://pphboy.github.io/piwork/guide/installation.html
Source: https://github.com/pphboy/piwork
License: Apache-2.0, https://github.com/pphboy/piwork/blob/main/LICENSE
