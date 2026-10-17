(() => {
  'use strict';
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const ASSET_BASE = 'https://bhanu13yadav1-ai.github.io/Brand-website-1/';
  // Embedded SVGs keep new wellness items visible even if a mobile GitHub upload
  // omitted the /assets folder. External legacy campaign images still use the
  // existing public GitHub Pages asset base.
  const EMBEDDED_ASSETS = {
    "assets/silicone-dildo.svg": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MDAgNjIwIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImJnIiB4Mj0iMSIgeTI9IjEiPjxzdG9wIHN0b3AtY29sb3I9IiNmOGYwZWMiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNlN2Q0ZDEiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0idG95Ij48c3RvcCBzdG9wLWNvbG9yPSIjOWY1MjY4Ii8+PHN0b3Agb2Zmc2V0PSIuNSIgc3RvcC1jb2xvcj0iI2QzOGNhMSIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzg1NDE1NyIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSI1MDAiIGhlaWdodD0iNjIwIiByeD0iMjYiIGZpbGw9InVybCgjYmcpIi8+PGVsbGlwc2UgY3g9IjI1MCIgY3k9IjQ0MCIgcng9IjExMCIgcnk9IjIyIiBmaWxsPSIjYzJhYWE4IiBvcGFjaXR5PSIuNCIvPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI1MCAyODcpIj48cmVjdCB4PSItNjciIHk9IjExMiIgd2lkdGg9IjEzNCIgaGVpZ2h0PSIzNiIgcng9IjE1IiBmaWxsPSIjNzUzYTRlIi8+PHBhdGggZD0iTS01NSAxMTUgQy00OCA1NSAtNDkgLTE1IC00MiAtOTcgQy0zOSAtMTM2IC0yMCAtMTYzIDAgLTE2NSBDMjAgLTE2MyAzOSAtMTM2IDQyIC05NyBDNDkgLTE1IDQ4IDU1IDU1IDExNVoiIGZpbGw9InVybCgjdG95KSIgc3Ryb2tlPSIjN2M0MjU3IiBzdHJva2Utd2lkdGg9IjMiLz48ZWxsaXBzZSBjeD0iMCIgY3k9Ii0xNTYiIHJ4PSIyMCIgcnk9IjEzIiBmaWxsPSIjZWRiNGMzIiBvcGFjaXR5PSIuOCIvPjxwYXRoIGQ9Ik0tMjUgLTg2IFEtMzAgLTEyIC0yNSA1MiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZjFiZGNkIiBzdHJva2Utd2lkdGg9IjgiIG9wYWNpdHk9Ii4zNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9nPjx0ZXh0IHg9IjI1MCIgeT0iNTAwIiBmb250LWZhbWlseT0iQXJpYWwsc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyMCIgbGV0dGVyLXNwYWNpbmc9IjUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM0OTM2M2UiPlNJTElDT05FIEVTU0VOVElBTDwvdGV4dD48dGV4dCB4PSIyNTAiIHk9IjUyOCIgZm9udC1mYW1pbHk9IkFyaWFsLHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTEiIGxldHRlci1zcGFjaW5nPSIzIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNzc1ODYxIj5DT05DRVBUIFBSRVZJRVc8L3RleHQ+PC9zdmc+Cg==",
    "assets/flared-base-plug.svg": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MDAgNjIwIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImJnIiB4Mj0iMSIgeTI9IjEiPjxzdG9wIHN0b3AtY29sb3I9IiNmOGYwZWMiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNlN2Q0ZDEiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0idG95Ij48c3RvcCBzdG9wLWNvbG9yPSIjNDAzNDNjIi8+PHN0b3Agb2Zmc2V0PSIuNSIgc3RvcC1jb2xvcj0iIzc5NjQ3NCIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzMzMjYyZSIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSI1MDAiIGhlaWdodD0iNjIwIiByeD0iMjYiIGZpbGw9InVybCgjYmcpIi8+PGVsbGlwc2UgY3g9IjI1MCIgY3k9IjQ0NSIgcng9IjExOCIgcnk9IjIwIiBmaWxsPSIjYzJhYWE4IiBvcGFjaXR5PSIuNCIvPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI1MCAzMDUpIj48cGF0aCBkPSJNMCAtMTYwIEMtMTMgLTE1MyAtMjAgLTEyOCAtMjUgLTk0IEMtMzIgLTUwIC01NyAtNCAtNDUgNDIgUTAgNzcgNDUgNDIgQzU3IC00IDMyIC01MCAyNSAtOTQgQzIwIC0xMjggMTMgLTE1MyAwIC0xNjBaIiBmaWxsPSJ1cmwoI3RveSkiIHN0cm9rZT0iIzQxMzMzZSIgc3Ryb2tlLXdpZHRoPSI0Ii8+PHBhdGggZD0iTS00MyAyOCBRLTYwIDUyIC04MiA2NyBMLTkwIDkxIFEwIDExOSA5MCA5MSBMODIgNjcgUTYwIDUyIDQzIDI4WiIgZmlsbD0iI2FkOGE5YiIgc3Ryb2tlPSIjNWY0OTU5IiBzdHJva2Utd2lkdGg9IjQiLz48cGF0aCBkPSJNLTUgLTExNiBRLTggLTY1IC0xMyAtMjciIHN0cm9rZT0iI2RkYzFkMCIgc3Ryb2tlLXdpZHRoPSI3IiBvcGFjaXR5PSIuNDUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgZmlsbD0ibm9uZSIvPjwvZz48dGV4dCB4PSIyNTAiIHk9IjUwMCIgZm9udC1mYW1pbHk9IkFyaWFsLHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGxldHRlci1zcGFjaW5nPSI0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNDkzNjNlIj5GTEFSRUQtQkFTRSBQTFVHPC90ZXh0Pjx0ZXh0IHg9IjI1MCIgeT0iNTI4IiBmb250LWZhbWlseT0iQXJpYWwsc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMSIgbGV0dGVyLXNwYWNpbmc9IjMiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM3NzU4NjEiPkNPTkNFUFQgUFJFVklFVzwvdGV4dD48L3N2Zz4K",
    "assets/bullet-massager.svg": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MDAgNjIwIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImJnIiB4Mj0iMSIgeTI9IjEiPjxzdG9wIHN0b3AtY29sb3I9IiNmOGYwZWMiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNlN2Q0ZDEiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0idG95Ij48c3RvcCBzdG9wLWNvbG9yPSIjYjQ2ZTg4Ii8+PHN0b3Agb2Zmc2V0PSIuNSIgc3RvcC1jb2xvcj0iI2UwYWFiZSIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzkyNTA2YSIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSI1MDAiIGhlaWdodD0iNjIwIiByeD0iMjYiIGZpbGw9InVybCgjYmcpIi8+PGVsbGlwc2UgY3g9IjI1MCIgY3k9IjQzMCIgcng9IjkwIiByeT0iMTkiIGZpbGw9IiNjMmFhYTgiIG9wYWNpdHk9Ii40Ii8+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjUwIDI4NSkgcm90YXRlKC0yMikiPjxyZWN0IHg9Ii00NyIgeT0iLTk1IiB3aWR0aD0iOTQiIGhlaWdodD0iMjMwIiByeD0iNDQiIGZpbGw9InVybCgjdG95KSIgc3Ryb2tlPSIjOTY1OTcwIiBzdHJva2Utd2lkdGg9IjQiLz48ZWxsaXBzZSBjeD0iMCIgY3k9Ii05MCIgcng9IjQwIiByeT0iNDIiIGZpbGw9IiNkOTllYjEiIHN0cm9rZT0iIzk2NTk3MCIgc3Ryb2tlLXdpZHRoPSI0Ii8+PHBhdGggZD0iTS0xOCAtNTIgUS0yNSAyMCAtMjAgODYiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2Y1ZDRkZiIgc3Ryb2tlLXdpZHRoPSI3IiBzdHJva2UtbGluZWNhcD0icm91bmQiIG9wYWNpdHk9Ii40NSIvPjxjaXJjbGUgY3g9IjAiIGN5PSIxMDAiIHI9IjgiIGZpbGw9IiNmNmQ4ZTIiLz48L2c+PHRleHQgeD0iMjUwIiB5PSI1MDAiIGZvbnQtZmFtaWx5PSJBcmlhbCxzYW5zLXNlcmlmIiBmb250LXNpemU9IjIxIiBsZXR0ZXItc3BhY2luZz0iNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzQ5MzYzZSI+TUlOSSBQVUxTRTwvdGV4dD48dGV4dCB4PSIyNTAiIHk9IjUyOCIgZm9udC1mYW1pbHk9IkFyaWFsLHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTEiIGxldHRlci1zcGFjaW5nPSIzIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNzc1ODYxIj5DT05DRVBUIFBSRVZJRVc8L3RleHQ+PC9zdmc+Cg==",
    "assets/lube-care.svg": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MDAgNjIwIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImJnIiB4Mj0iMSIgeTI9IjEiPjxzdG9wIHN0b3AtY29sb3I9IiNmOGYwZWMiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNlN2Q0ZDEiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0iYm90dGxlIj48c3RvcCBzdG9wLWNvbG9yPSIjZjdlNmU0Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZGNhNmI1Ii8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjUwMCIgaGVpZ2h0PSI2MjAiIHJ4PSIyNiIgZmlsbD0idXJsKCNiZykiLz48ZWxsaXBzZSBjeD0iMjUwIiBjeT0iNDQyIiByeD0iMTA1IiByeT0iMTgiIGZpbGw9IiNjMmFhYTgiIG9wYWNpdHk9Ii40Ii8+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjUwIDI5MCkiPjxyZWN0IHg9Ii02MiIgeT0iLTExMiIgd2lkdGg9IjEyNCIgaGVpZ2h0PSIyMjYiIHJ4PSIyOCIgZmlsbD0idXJsKCNib3R0bGUpIiBzdHJva2U9IiNiYjg5OTkiIHN0cm9rZS13aWR0aD0iNCIvPjxyZWN0IHg9Ii0zNSIgeT0iLTE1NSIgd2lkdGg9IjcwIiBoZWlnaHQ9IjQ5IiByeD0iOCIgZmlsbD0iIzc3NDM1NCIvPjxyZWN0IHg9Ii0yMyIgeT0iLTE3NCIgd2lkdGg9IjQ2IiBoZWlnaHQ9IjIzIiByeD0iNSIgZmlsbD0iIzM3MjcyZSIvPjxyZWN0IHg9Ii00NiIgeT0iLTI4IiB3aWR0aD0iOTIiIGhlaWdodD0iNjgiIHJ4PSI4IiBmaWxsPSIjZmZmN2Y0IiBvcGFjaXR5PSIuODUiLz48dGV4dCB4PSIwIiB5PSIwIiBmb250LWZhbWlseT0iQXJpYWwsc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgbGV0dGVyLXNwYWNpbmc9IjIiIGZpbGw9IiM3MDQyNTUiPkNBUkU8L3RleHQ+PHBhdGggZD0iTS0yMCAxNiBRMCAtNiAyMCAxNiBRMCAzOSAtMjAgMTZaIiBmaWxsPSIjYzI3ZTk1Ii8+PC9nPjx0ZXh0IHg9IjI1MCIgeT0iNTAwIiBmb250LWZhbWlseT0iQXJpYWwsc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyMCIgbGV0dGVyLXNwYWNpbmc9IjQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM0OTM2M2UiPkNBUkUgRVNTRU5USUFMPC90ZXh0Pjx0ZXh0IHg9IjI1MCIgeT0iNTI4IiBmb250LWZhbWlseT0iQXJpYWwsc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMSIgbGV0dGVyLXNwYWNpbmc9IjMiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM3NzU4NjEiPkNPTkNFUFQgUFJFVklFVzwvdGV4dD48L3N2Zz4K",
    "assets/toy-cleaner.svg": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MDAgNjIwIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImJnIiB4Mj0iMSIgeTI9IjEiPjxzdG9wIHN0b3AtY29sb3I9IiNmOGYwZWMiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNlN2Q0ZDEiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNTAwIiBoZWlnaHQ9IjYyMCIgcng9IjI2IiBmaWxsPSJ1cmwoI2JnKSIvPjxlbGxpcHNlIGN4PSIyNTAiIGN5PSI0NDEiIHJ4PSI5NCIgcnk9IjE4IiBmaWxsPSIjYzJhYWE4IiBvcGFjaXR5PSIuNCIvPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI1MCAyOTApIj48cmVjdCB4PSItNTgiIHk9Ii0xMTAiIHdpZHRoPSIxMTYiIGhlaWdodD0iMjIwIiByeD0iMjAiIGZpbGw9IiNkNmRmZTAiIHN0cm9rZT0iIzcxODI4NiIgc3Ryb2tlLXdpZHRoPSI0Ii8+PHJlY3QgeD0iLTMwIiB5PSItMTU4IiB3aWR0aD0iNjAiIGhlaWdodD0iNTIiIHJ4PSI4IiBmaWxsPSIjODE5Njk5Ii8+PHJlY3QgeD0iLTE3IiB5PSItMTgwIiB3aWR0aD0iMzQiIGhlaWdodD0iMjQiIHJ4PSI1IiBmaWxsPSIjMzU0NjRhIi8+PHJlY3QgeD0iLTQ0IiB5PSItMjgiIHdpZHRoPSI4OCIgaGVpZ2h0PSI3MCIgcng9IjgiIGZpbGw9IiNmYWZmZmIiLz48dGV4dCB4PSIwIiB5PSIwIiBmb250LWZhbWlseT0iQXJpYWwsc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMSIgbGV0dGVyLXNwYWNpbmc9IjIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM0YTVkNjAiPkNMRUFOPC90ZXh0PjxwYXRoIGQ9Ik0wIDE0IEMtMjUgMzYgLTE3IDUwIDAgNTUgQzE3IDUwIDI1IDM2IDAgMTRaIiBmaWxsPSIjOWFiMGIzIi8+PC9nPjx0ZXh0IHg9IjI1MCIgeT0iNTAwIiBmb250LWZhbWlseT0iQXJpYWwsc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyMCIgbGV0dGVyLXNwYWNpbmc9IjQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM0OTM2M2UiPlRPWSBDTEVBTkVSPC90ZXh0Pjx0ZXh0IHg9IjI1MCIgeT0iNTI4IiBmb250LWZhbWlseT0iQXJpYWwsc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMSIgbGV0dGVyLXNwYWNpbmc9IjMiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM3NzU4NjEiPkNPTkNFUFQgUFJFVklFVzwvdGV4dD48L3N2Zz4K",
    "assets/storage-pouch.svg": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MDAgNjIwIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImJnIiB4Mj0iMSIgeTI9IjEiPjxzdG9wIHN0b3AtY29sb3I9IiNmOGYwZWMiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNlN2Q0ZDEiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0iZmFicmljIj48c3RvcCBzdG9wLWNvbG9yPSIjYTg3NThhIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjNjg0MzU0Ii8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjUwMCIgaGVpZ2h0PSI2MjAiIHJ4PSIyNiIgZmlsbD0idXJsKCNiZykiLz48ZWxsaXBzZSBjeD0iMjUwIiBjeT0iNDQ1IiByeD0iMTI5IiByeT0iMjAiIGZpbGw9IiNjMmFhYTgiIG9wYWNpdHk9Ii40Ii8+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjUwIDI5MikiPjxwYXRoIGQ9Ik0tMTE1IC0xMDAgUTAgLTEzMiAxMTUgLTEwMCBMMTAzIDExNiBRMCAxNDUgLTEwMyAxMTZaIiBmaWxsPSJ1cmwoI2ZhYnJpYykiIHN0cm9rZT0iIzZjNDg1YSIgc3Ryb2tlLXdpZHRoPSI0Ii8+PHBhdGggZD0iTS0xMTIgLTkzIFEwIC03MCAxMTIgLTkzIiBzdHJva2U9IiNlYmNjZDciIHN0cm9rZS13aWR0aD0iNSIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0tODEgLTYwIFEwIC0zNSA4MSAtNjAiIHN0cm9rZT0iI2Q2YTViOCIgc3Ryb2tlLXdpZHRoPSIzIiBmaWxsPSJub25lIi8+PHRleHQgeD0iMCIgeT0iMTgiIGZvbnQtZmFtaWx5PSJBcmlhbCxzYW5zLXNlcmlmIiBmb250LXNpemU9IjE3IiBsZXR0ZXItc3BhY2luZz0iNCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI2ZmZjVmNiI+QjwvdGV4dD48cGF0aCBkPSJNLTkwIDExOCBRMCAxMzkgOTAgMTE4IiBzdHJva2U9IiNkOGFmYmQiIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0ibm9uZSIvPjwvZz48dGV4dCB4PSIyNTAiIHk9IjUwMCIgZm9udC1mYW1pbHk9IkFyaWFsLHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjAiIGxldHRlci1zcGFjaW5nPSI0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNDkzNjNlIj5TVE9SQUdFIFBPVUNIPC90ZXh0Pjx0ZXh0IHg9IjI1MCIgeT0iNTI4IiBmb250LWZhbWlseT0iQXJpYWwsc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMSIgbGV0dGVyLXNwYWNpbmc9IjMiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM3NzU4NjEiPkNPTkNFUFQgUFJFVklFVzwvdGV4dD48L3N2Zz4K",
    "assets/placeholder-lingerie.svg": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MDAgNjIwIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwIiB5MT0iMCIgeDI9IjEiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjZjhlZWU5Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZTRjZmM5Ii8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjUwMCIgaGVpZ2h0PSI2MjAiIHJ4PSIyOCIgZmlsbD0idXJsKCNnKSIvPjxjaXJjbGUgY3g9IjI1MCIgY3k9IjI1NSIgcj0iMTI1IiBmaWxsPSIjZmZmOGY0IiBvcGFjaXR5PSIuNzUiLz48cGF0aCBkPSJNMTU1IDIxMCBDMTYwIDE2NSAyMDAgMTYwIDIzMCAyMDIgTDI1MCAyNDUgTDI3MCAyMDIgQzMwMCAxNjAgMzQwIDE2NSAzNDUgMjEwIEwzNzUgMzI1IFEyNTAgMzc0IDEyNSAzMjVaIiBmaWxsPSIjMzEyNjJjIiBzdHJva2U9IiM4ZTVkNmQiIHN0cm9rZS13aWR0aD0iNSIvPjxwYXRoIGQ9Ik0xNDUgMjk1IFEyNTAgMzQyIDM1NSAyOTUiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2Q5YWNiOCIgc3Ryb2tlLXdpZHRoPSI2Ii8+PHBhdGggZD0iTTI1MCAyNDggTDI1MCAzMzciIHN0cm9rZT0iI2MzOGRhMCIgc3Ryb2tlLXdpZHRoPSI0Ii8+PHRleHQgeD0iMjUwIiB5PSI0OTAiIGZvbnQtZmFtaWx5PSJBcmlhbCxzYW5zLXNlcmlmIiBmb250LXNpemU9IjIzIiBsZXR0ZXItc3BhY2luZz0iNyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzQ5MzYzZSI+QkxBQ0tFRDwvdGV4dD48dGV4dCB4PSIyNTAiIHk9IjUyMiIgZm9udC1mYW1pbHk9IkFyaWFsLHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTIiIGxldHRlci1zcGFjaW5nPSI0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNzc1ODYxIj5DT05DRVBUIFBSRVZJRVc8L3RleHQ+PC9zdmc+Cg=="
  };
  const image = file => {
    if (typeof file !== 'string') return EMBEDDED_ASSETS['assets/placeholder-lingerie.svg'];
    if (file.startsWith('data:')) return file;
    if (file.startsWith('assets/')) return EMBEDDED_ASSETS[file] || file;
    return ASSET_BASE + file;
  };
  const products = [
    {id:'signature', name:'Black Comfort Set', category:'lingerie', label:'BLACKED CAMPAIGN', image:'ref-09-blacked-comfort-set.png', desc:'Comfort-led black matching-set campaign direction.', note:'Campaign visual; exact garment SKU and stock are not confirmed.', concept:false, material:'Product composition and care instructions must be confirmed.', fit:true},
    {id:'move', name:'Move Together', category:'lingerie', label:'BLACKED CAMPAIGN', image:'ref-01-blacked-move-together.png', desc:'A movement-inspired look built around easy, everyday confidence.', note:'Campaign visual, not a verified catalogue SKU.', concept:false, material:'Materials and garment specifications to be confirmed.', fit:true},
    {id:'yoga', name:'Yoga Together', category:'lingerie', label:'BLACKED CAMPAIGN', image:'ref-02-blacked-yoga-together.png', desc:'A warm studio campaign visual with a movement-inspired mood.', note:'Campaign visual only; not a separate verified product SKU.', concept:false, material:'Materials and garment specifications to be confirmed.', fit:true},
    {id:'redlace', name:'Red Lace Bodysuit', category:'lingerie', label:'DESIGN REFERENCE', image:'ref-03-red-lace-bodysuit-reference.png', desc:'Red lace and strappy construction inspiration from your supplied reference.', note:'Reference only. Verify image-use rights and actual product details before selling.', concept:true, material:'Not a confirmed BLACKED product. Material and construction not verified.', fit:true},
    {id:'stretch', name:'Movement & Stretch', category:'lingerie', label:'SHOOT REFERENCE', image:'ref-04-movement-stretch-reference.png', desc:'A movement-focused shoot reference for a comfort-led brand direction.', note:'Reference image only. Product identity and usage rights must be confirmed.', concept:true, material:'Not a verified product listing.', fit:true},
    {id:'blacklace', name:'Black Lace Cut-Out Set', category:'lingerie', label:'DESIGN REFERENCE', image:'ref-05-black-lace-cutout-reference.png', desc:'Black lace pattern, cut-out and matching-set style direction.', note:'Reference image includes other-brand text; do not list as BLACKED stock without rights and a verified product.', concept:true, material:'Material and garment construction not verified.', fit:true},
    {id:'velvet', name:'Velvet Lace Set', category:'lingerie', label:'DESIGN REFERENCE', image:'ref-06-velvet-lace-reference.png', desc:'Pink velvet with black-lace detailing as a supplied style reference.', note:'Reference only. Confirm product identity, design rights and specifications.', concept:true, material:'Material and garment construction not verified.', fit:true},
    {id:'rose', name:'Rose Strap Mannequin Set', category:'lingerie', label:'PRODUCT DETAIL REFERENCE', image:'ref-07-rose-strap-mannequin-reference.jpg', desc:'Red straps with rose and pearl-inspired decorative details.', note:'Original screenshot reference only; verify rights and the complete garment before listing.', concept:true, material:'Material and full garment details not confirmed.', fit:true},
    {id:'butterfly', name:'Pink Butterfly Lace Detail', category:'lingerie', label:'DETAIL REFERENCE', image:'ref-08-pink-butterfly-detail-reference.jpg', desc:'Pink butterfly-inspired lace detailing reference.', note:'Detail reference only. This image does not verify a complete product or SKU.', concept:true, material:'Material and full garment details not confirmed.', fit:true},
    {id:'together', name:'Better Together', category:'lingerie', label:'BLACKED CAMPAIGN', image:'ref-10-blacked-better-together.png', desc:'A warm premium lifestyle campaign direction for a black matching set.', note:'Campaign visual, not a separate verified product SKU.', concept:false, material:'Materials and garment specifications to be confirmed.', fit:true},
    {id:'sculpt', name:'Midnight Sculpt', category:'lingerie', label:'BLACKED DESIGN CONCEPT', image:'design-11-midnight-sculpt-product.jpg', fallback:'assets/placeholder-lingerie.svg', desc:'Charcoal tones with contrasting black lace details.', note:'Concept preview only. Production status and stock are not confirmed.', concept:true, material:'Concept material direction only; final composition is not set.', fit:true},
    {id:'midnight', name:'Midnight Lace', category:'lingerie', label:'BLACKED DESIGN CONCEPT', image:'design-12-midnight-lace-product.jpg', fallback:'assets/placeholder-lingerie.svg', desc:'An elegant black lace and adjustable-strap concept.', note:'Concept preview only. Not confirmed for sale.', concept:true, material:'Concept material direction only; final composition is not set.', fit:true},
    {id:'scarlet', name:'Scarlet Satin', category:'lingerie', label:'BLACKED DESIGN CONCEPT', image:'design-13-scarlet-satin-product.jpg', fallback:'assets/placeholder-lingerie.svg', desc:'A deep berry satin-and-lace matching-set concept.', note:'Concept preview only. Final construction and stock are not confirmed.', concept:true, material:'Concept material direction only; final composition is not set.', fit:true},
    {id:'ivory', name:'Ivory Bloom', category:'lingerie', label:'BLACKED DESIGN CONCEPT', image:'design-14-ivory-bloom-product.jpg', fallback:'assets/placeholder-lingerie.svg', desc:'Ivory tones with delicate floral-inspired detailing.', note:'Concept preview only. Not confirmed for sale.', concept:true, material:'Concept material direction only; final composition is not set.', fit:true},
    {id:'syrn-demi', name:'Forever Yours Demi Bra', category:'inspiration', label:'EXTERNAL SYRN INSPIRATION', image:'syrn-forever-yours.svg', desc:'A separate-brand style reference for a smooth-cup demi silhouette.', note:'SYRN is a separate brand. This is inspiration only, not BLACKED inventory.', concept:true, material:'Not a BLACKED product. See the original brand for verified specifications.', fit:false, externalUrl:'https://syrn.com/products/forever-yours-lightly-lined-smooth-demi-bra-bab'},
    {id:'syrn-balconette', name:'Forget Me Not Balconette', category:'inspiration', label:'EXTERNAL SYRN INSPIRATION', image:'syrn-forget-me-not.svg', desc:'A separate-brand style reference for an unlined balconette shape.', note:'SYRN is a separate brand. This is inspiration only, not BLACKED inventory.', concept:true, material:'Not a BLACKED product. See the original brand for verified specifications.', fit:false, externalUrl:'https://syrn.com/products/forget-me-not-unlined-balconette-bra-dwm'},
    {id:'syrn-bodysuit', name:'Fantasy Lace Halter Bodysuit', category:'inspiration', label:'EXTERNAL SYRN INSPIRATION', image:'syrn-fantasy-bodysuit.svg', desc:'A separate-brand style reference for a floral-lace halter direction.', note:'SYRN is a separate brand. This is inspiration only, not BLACKED inventory.', concept:true, material:'Not a BLACKED product. See the original brand for verified specifications.', fit:false, externalUrl:'https://syrn.com/products/the-fantasy-lace-halter-bodysuit-afd'},
    {id:'dildo', name:'Silicone Dildo', category:'toys', label:'PERSONAL WELLNESS CONCEPT', image:'assets/silicone-dildo.svg', desc:'A simple personal-wellness product concept in a smooth, easy-to-clean form.', note:'Illustration only. Verify the actual supplier, intended use, dimensions and material specification before offering it for sale.', concept:true, material:'Only list as body-safe silicone if supplier documentation verifies the material.', fit:false},
    {id:'plug', name:'Flared-Base Butt Plug', category:'toys', label:'PERSONAL WELLNESS CONCEPT', image:'assets/flared-base-plug.svg', desc:'A compact design direction featuring a visible flared base.', note:'Illustration only. The final product must have a secure, appropriately designed flared base and clear size information.', concept:true, material:'Material and dimensions are not yet verified. Follow maker instructions.', fit:false},
    {id:'pulse', name:'Mini Pulse Massager', category:'toys', label:'PERSONAL WELLNESS CONCEPT', image:'assets/bullet-massager.svg', desc:'A small personal massager concept with a discreet silhouette.', note:'Illustration only. Check supplier safety, battery, charging and waterproof claims before selling.', concept:true, material:'Actual material, charging and water-resistance specifications are not confirmed.', fit:false},
    {id:'lube', name:'Water-Based Lubricant', category:'care', label:'CARE ESSENTIAL CONCEPT', image:'assets/lube-care.svg', desc:'A concept entry for a water-based personal lubricant.', note:'Concept entry only. Confirm the formula, ingredients, expiry date, compatibility and regulatory labelling with a reputable supplier.', concept:true, material:'Formula, ingredients and compatibility are not yet verified.', fit:false},
    {id:'cleaner', name:'Intimate Toy Cleaner', category:'care', label:'CARE ESSENTIAL CONCEPT', image:'assets/toy-cleaner.svg', desc:'A care accessory concept for product-specific cleaning routines.', note:'Concept entry only. Cleaning instructions must match each toy material and manufacturer guidance.', concept:true, material:'Ingredients and material compatibility need supplier confirmation.', fit:false},
    {id:'pouch', name:'Discreet Storage Pouch', category:'care', label:'ACCESSORY CONCEPT', image:'assets/storage-pouch.svg', desc:'A soft pouch concept for clean, private storage between uses.', note:'Concept entry only. Actual fabric, dimensions and availability are not confirmed.', concept:true, material:'Fabric and care instructions to be confirmed.', fit:false}
  ];
  const productById = new Map(products.map(p => [p.id, p]));
  const moneyOrStatus = () => 'Price to be confirmed';
  let activeFilter = 'all';
  let searchText = '';
  let onlySaved = false;
  const saved = new Set(readArray('blacked-v10-saved').filter(id => productById.has(id)));
  const cart = new Map(Object.entries(readObject('blacked-v10-cart')).filter(([id, q]) => productById.has(id) && Number(q) > 0).map(([id,q]) => [id, Math.min(99, Math.floor(Number(q)))]));
  const compared = new Set();
  let selectedProduct = 'sculpt';
  let activeDialogProduct = null;
  let previewMode = 'reference';
  let userPhoto = null;
  let userPhotoUrl = null;
  let guideScale = 1;
  let guidePosition = {x:.5, y:.52};
  let dragging = false;
  let dragStart = null;
  let referenceImage = null;
  let referenceImageKey = '';
  let toastTimer;

  function readArray(key) { try { const v = JSON.parse(localStorage.getItem(key) || '[]'); return Array.isArray(v) ? v : []; } catch (_) { return []; } }
  function readObject(key) { try { const v = JSON.parse(localStorage.getItem(key) || '{}'); return v && typeof v === 'object' && !Array.isArray(v) ? v : {}; } catch (_) { return {}; } }
  function persist(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); return true; } catch (_) { toast('This browser blocked saving. The feature will work until you close this page.'); return false; } }
  function toast(message) { const el = $('#toast'); if (!el) return; el.textContent = message; el.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove('show'), 2800); }
  function categoryName(p) { return p.category === 'lingerie' ? 'Intimates' : p.category === 'toys' ? 'Personal wellness' : p.category === 'inspiration' ? 'External inspiration' : 'Care & accessories'; }
  function fallbackImage(p) { return image(p.fallback || (p.category === 'lingerie' ? 'assets/placeholder-lingerie.svg' : p.category === 'toys' ? 'assets/bullet-massager.svg' : 'assets/lube-care.svg')); }
  function imgMarkup(p, extra = '') { const imageClass = (p.category === 'toys' || p.category === 'care') ? 'wellness-product-image' : 'catalog-product-image'; return `<img class="${imageClass}" ${extra} src="${image(p.image)}" alt="${escapeHTML(p.name)}" width="500" height="620" decoding="async" loading="lazy" onerror="this.onerror=null;this.src='${fallbackImage(p)}'">`; }
  function escapeHTML(value) { return String(value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch])); }

  // Age gate. This is a respectful front-end confirmation, not identity verification.
  const ageGate = $('#ageGate');
  const underage = $('#underageScreen');
  try { if (localStorage.getItem('blacked-adult-confirmed') === 'yes') ageGate.hidden = true; } catch (_) {}
  $('#ageConfirm').addEventListener('click', () => { try { localStorage.setItem('blacked-adult-confirmed','yes'); } catch (_) {} ageGate.hidden = true; toast('Welcome to BLACKED.'); });
  $('#ageDecline').addEventListener('click', () => { ageGate.hidden = true; underage.hidden = false; });
  $('#returnAge').addEventListener('click', () => { underage.hidden = true; ageGate.hidden = false; });

  // Responsive navigation.
  const menuToggle = $('#menuToggle');
  const mainNav = $('#mainNav');
  menuToggle.addEventListener('click', () => { const open = menuToggle.getAttribute('aria-expanded') !== 'true'; menuToggle.setAttribute('aria-expanded', String(open)); menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation'); mainNav.classList.toggle('open', open); });
  $$('a', mainNav).forEach(a => a.addEventListener('click', () => { menuToggle.setAttribute('aria-expanded','false'); menuToggle.setAttribute('aria-label','Open navigation'); mainNav.classList.remove('open'); }));

  function productCard(p) {
    const isSaved = saved.has(p.id), isCompared = compared.has(p.id);
    const status = p.category === 'inspiration' ? 'REFERENCE' : p.concept ? 'CONCEPT' : 'CAMPAIGN';
    return `<article class="product-card" data-product-card="${p.id}">
      <button class="product-image" type="button" data-open-product="${p.id}" aria-label="View ${escapeHTML(p.name)} details">${imgMarkup(p)}<span class="product-status">${status}</span></button>
      <div class="product-body"><p class="product-category">${escapeHTML(p.label)}</p><h3>${escapeHTML(p.name)}</h3><p class="product-desc">${escapeHTML(p.desc)}</p><p class="product-price">${moneyOrStatus()}</p>
      <div class="product-actions"><button class="btn btn-dark" type="button" data-add-cart="${p.id}">Add to demo bag</button><button class="save-btn ${isSaved?'saved':''}" type="button" data-save="${p.id}" aria-label="${isSaved?'Unsave':'Save'} ${escapeHTML(p.name)}" aria-pressed="${isSaved}">${isSaved?'♥':'♡'}</button></div>
      <button class="compare-btn ${isCompared?'selected':''}" type="button" data-compare="${p.id}" aria-pressed="${isCompared}" style="width:100%;margin-top:7px;font-size:10px">${isCompared?'✓ Added to compare':'+ Compare'}</button></div></article>`;
  }
  function renderProducts() {
    const matched = products.filter(p => {
      const filterMatch = activeFilter === 'all' || (activeFilter === 'concept' ? p.concept : p.category === activeFilter);
      const query = searchText.trim().toLowerCase();
      const searchMatch = !query || [p.name,p.desc,p.label,p.category].join(' ').toLowerCase().includes(query);
      const savedMatch = !onlySaved || saved.has(p.id);
      return filterMatch && searchMatch && savedMatch;
    });
    $('#productGrid').innerHTML = matched.map(productCard).join('');
    $('#emptyState').hidden = matched.length > 0;
    $('#allCount').textContent = products.length;
    $('#wishlistCount').textContent = saved.size;
    $('#filterRow').querySelectorAll('[data-filter]').forEach(button => {
      const active = !onlySaved && button.dataset.filter === activeFilter;
      button.classList.toggle('active', active); button.setAttribute('aria-pressed', String(active));
    });
    $('#wishlistJump').classList.toggle('saved-view', onlySaved);
    updateCompare(); updateCartUI();
  }
  $('#filterRow').addEventListener('click', e => { const btn = e.target.closest('[data-filter]'); if (!btn) return; activeFilter = btn.dataset.filter; onlySaved = false; renderProducts(); });
  $('#productSearch').addEventListener('input', e => { searchText = e.target.value; $('#clearSearch').hidden = !searchText; renderProducts(); });
  $('#clearSearch').addEventListener('click', () => { $('#productSearch').value = ''; searchText = ''; $('#clearSearch').hidden = true; renderProducts(); $('#productSearch').focus(); });
  $('#wishlistJump').addEventListener('click', () => { onlySaved = !onlySaved; activeFilter = 'all'; searchText = ''; $('#productSearch').value = ''; $('#clearSearch').hidden = true; renderProducts(); $('#collection').scrollIntoView({behavior:'smooth'}); toast(onlySaved ? 'Showing your saved items.' : 'Showing the full collection.'); });
  $('#wellnessShop').addEventListener('click', () => { activeFilter='toys'; onlySaved=false; renderProducts(); });

  function toggleSave(id) { if (!productById.has(id)) return; if (saved.has(id)) { saved.delete(id); toast('Removed from saved styles.'); } else { saved.add(id); toast('Saved on this device.'); } persist('blacked-v10-saved',[...saved]); renderProducts(); if (activeDialogProduct === id) syncDialogSave(); }
  function addToCart(id) { if (!productById.has(id)) return; cart.set(id, Math.min(99,(cart.get(id)||0)+1)); persist('blacked-v10-cart',Object.fromEntries(cart)); renderProducts(); toast(`${productById.get(id).name} added to your demo bag.`); openCart(); }
  function toggleCompare(id) { if (compared.has(id)) compared.delete(id); else { if (compared.size >= 3) { toast('Compare up to three items at a time.'); return; } compared.add(id); } renderProducts(); }
  $('#productGrid').addEventListener('click', e => {
    const add = e.target.closest('[data-add-cart]'); if (add) return addToCart(add.dataset.addCart);
    const save = e.target.closest('[data-save]'); if (save) return toggleSave(save.dataset.save);
    const compare = e.target.closest('[data-compare]'); if (compare) return toggleCompare(compare.dataset.compare);
    const detail = e.target.closest('[data-open-product]'); if (detail) openProductDialog(detail.dataset.openProduct);
  });

  function updateCompare() {
    const section = $('#compareSection'); const grid = $('#compareGrid');
    section.hidden = compared.size === 0;
    if (!compared.size) { grid.innerHTML=''; return; }
    grid.innerHTML = [...compared].map(id => { const p=productById.get(id); if (!p) return ''; return `<article class="compare-item">${imgMarkup(p)}<h4>${escapeHTML(p.name)}</h4><p>${escapeHTML(categoryName(p))} · ${p.concept?'Concept / availability unconfirmed':'Campaign reference'}</p><p>${moneyOrStatus()}</p><button class="btn btn-ghost btn-small" data-compare-remove="${id}">Remove</button></article>`; }).join('');
  }
  $('#compareGrid').addEventListener('click', e => { const b=e.target.closest('[data-compare-remove]'); if (b) { compared.delete(b.dataset.compareRemove); renderProducts(); } });
  $('#clearCompare').addEventListener('click', () => { compared.clear(); renderProducts(); });

  // Product details dialog.
  const productDialog = $('#productDialog');
  function openProductDialog(id) { const p=productById.get(id); if(!p) return; activeDialogProduct=id; const ext=$('#dialogExternal'); ext.hidden=!p.externalUrl; if(p.externalUrl){ext.href=p.externalUrl;} else {ext.removeAttribute('href');} $('#dialogImage').src=image(p.image); $('#dialogImage').alt=p.name; $('#dialogImage').onerror=()=>{ $('#dialogImage').onerror=null; $('#dialogImage').src=fallbackImage(p); }; $('#dialogCategory').textContent=p.label; $('#dialogTitle').textContent=p.name; $('#dialogDescription').textContent=p.desc+' '+p.note; $('#dialogPrice').textContent=moneyOrStatus(); $('#dialogMaterial').textContent=p.material; syncDialogSave(); if (typeof productDialog.showModal==='function') productDialog.showModal(); else productDialog.setAttribute('open',''); document.body.classList.add('modal-open'); }
  function syncDialogSave() { const b=$('#dialogSave'); const yes=saved.has(activeDialogProduct); b.textContent=yes?'♥ Saved on this device':'♡ Save style'; b.setAttribute('aria-pressed',String(yes)); }
  $('#closeProduct').addEventListener('click', closeProductDialog);
  productDialog.addEventListener('click', e => { if(e.target===productDialog) closeProductDialog(); });
  productDialog.addEventListener('close', () => document.body.classList.remove('modal-open'));
  function closeProductDialog() { if(typeof productDialog.close==='function' && productDialog.open) productDialog.close(); else productDialog.removeAttribute('open'); document.body.classList.remove('modal-open'); }
  $('#dialogAdd').addEventListener('click', () => { const id=activeDialogProduct; closeProductDialog(); if(id) addToCart(id); });
  $('#dialogSave').addEventListener('click', () => { if(activeDialogProduct) toggleSave(activeDialogProduct); });

  // Local demo cart. No live order, stock or payment API is configured.
  function openCart() { $('#cartDrawer').hidden=false; $('#drawerBackdrop').hidden=false; document.body.classList.add('modal-open'); renderCart(); }
  function closeCart() { $('#cartDrawer').hidden=true; $('#drawerBackdrop').hidden=true; document.body.classList.remove('modal-open'); }
  $('#openCart').addEventListener('click',openCart); $('#closeCart').addEventListener('click',closeCart); $('#drawerBackdrop').addEventListener('click',closeCart);
  function updateCartUI() { const total=[...cart.values()].reduce((a,b)=>a+b,0); $('#cartCount').textContent=total; $('#drawerCount').textContent=total; }
  function renderCart() {
    const items=$('#cartItems'); const entries=[...cart.entries()].filter(([id,q])=>productById.has(id)&&q>0);
    if(!entries.length) { items.innerHTML='<div class="cart-empty"><div style="font-size:32px;color:#b46a85">♡</div><p>Your bag is empty.</p><p>Save a style or add a concept to explore the demo bag.</p></div>'; updateCartUI(); return; }
    items.innerHTML=entries.map(([id,q])=>{const p=productById.get(id); return `<article class="cart-item">${imgMarkup(p)}<div><h3>${escapeHTML(p.name)}</h3><p>${moneyOrStatus()}</p><div class="qty-controls"><button data-qty="-1" data-id="${id}" aria-label="Decrease quantity">−</button><span>${q}</span><button data-qty="1" data-id="${id}" aria-label="Increase quantity">+</button></div></div><button class="remove-item" data-remove-cart="${id}">Remove</button></article>`;}).join(''); updateCartUI();
  }
  $('#cartItems').addEventListener('click',e=>{const qty=e.target.closest('[data-qty]');if(qty){const id=qty.dataset.id,next=(cart.get(id)||0)+Number(qty.dataset.qty);if(next<=0)cart.delete(id);else cart.set(id,Math.min(99,next));persist('blacked-v10-cart',Object.fromEntries(cart));renderCart();renderProducts();return;}const remove=e.target.closest('[data-remove-cart]');if(remove){cart.delete(remove.dataset.removeCart);persist('blacked-v10-cart',Object.fromEntries(cart));renderCart();renderProducts();}});
  $('#clearCart').addEventListener('click',()=>{cart.clear();persist('blacked-v10-cart',{});renderCart();renderProducts();toast('Demo bag cleared.');});
  $('#checkoutDemo').addEventListener('click',()=>toast('Online ordering is not connected. Add verified prices, inventory, business details and a secure checkout before accepting orders.'));

  // Style finder: deterministic suggestions only (no AI or fit/medical claims).
  $('#styleQuiz').addEventListener('submit', e => {
    e.preventDefault();
    const category = $('#quizCategory').value;
    const mood = $('#quizMood').value;
    let pool = products.filter(p => category === 'lace' ? ['redlace','blacklace','velvet','butterfly','midnight','scarlet','syrn-balconette','syrn-bodysuit'].includes(p.id) : p.category === category);
    if (category === 'lingerie' && mood === 'comfort') pool = pool.filter(p => ['signature','move','yoga','stretch','together'].includes(p.id));
    if (category === 'lingerie' && mood === 'lace') pool = pool.filter(p => ['redlace','blacklace','velvet','butterfly','midnight','scarlet','ivory'].includes(p.id));
    if (category === 'lingerie' && mood === 'bold') pool = pool.filter(p => ['redlace','blacklace','rose','scarlet','midnight'].includes(p.id));
    if (category === 'lingerie' && mood === 'simple') pool = pool.filter(p => ['signature','ivory','move','together'].includes(p.id));
    if (category === 'lace' && mood === 'simple') pool = pool.filter(p => ['velvet','ivory','butterfly','midnight'].includes(p.id));
    if (category === 'toys' && mood === 'simple') pool = pool.filter(p => ['pulse','lube'].includes(p.id));
    if (!pool.length) pool = products.filter(p => p.category === category);
    const picks = pool.slice(0,3);
    $('#quizResults').innerHTML = picks.length ? `<div class=\"quiz-results-grid\">${picks.map(p=>`<article class=\"quiz-result\">${imgMarkup(p)}<div><strong>${escapeHTML(p.name)}</strong><small>${escapeHTML(p.label)} · ${moneyOrStatus()}</small><button type=\"button\" class=\"btn btn-dark btn-small\" data-quiz-open=\"${p.id}\">View details</button></div></article>`).join('')}</div>` : '<p class=\"helper\">No suggestions for that combination yet. Try another preference.</p>';
    toast('Your style edit is ready.');
  });
  $('#quizResults').addEventListener('click', e => { const b=e.target.closest('[data-quiz-open]'); if(b) openProductDialog(b.dataset.quizOpen); });

  // Measurement estimator uses a sample chart; it is not a bra band/cup calculator.
  const sampleRanges = [
    {size:'XS', bust:[71,76], waist:[56,61], hips:[76,81]}, {size:'S', bust:[76,81], waist:[61,66], hips:[81,86]},
    {size:'M', bust:[81,86], waist:[66,71], hips:[86,91]}, {size:'L', bust:[86,91], waist:[71,76], hips:[91,97]},
    {size:'XL', bust:[91,97], waist:[76,81], hips:[97,102]}, {size:'XXL', bust:[97,102], waist:[81,86], hips:[102,107]}
  ];
  const sampleSize = (value,key) => { if(value < sampleRanges[0][key][0]) return 'Below XS'; if(value > sampleRanges[sampleRanges.length-1][key][1]) return 'Above XXL'; const found=sampleRanges.find((r,i)=>value>=r[key][0]&&(value<r[key][1]||(i===sampleRanges.length-1&&value<=r[key][1]))); return found?.size || 'Check chart'; };
  $('#sizeForm').addEventListener('submit', e => { e.preventDefault(); const vals={bust:Number($('#measureBust').value),waist:Number($('#measureWaist').value),hips:Number($('#measureHips').value)}; if(Object.values(vals).some(v=>!Number.isFinite(v)||v<=0)){ $('#sizeResult').textContent='Please enter all three measurements as positive centimetre values.'; return; } const bustSize=sampleSize(vals.bust,'bust'),waistSize=sampleSize(vals.waist,'waist'),hipSize=sampleSize(vals.hips,'hips'); $('#sizeResult').textContent=`Sample estimate only — top / bust: ${bustSize}; waist: ${waistSize}; hips / bottom: ${hipSize}. This is not verified BLACKED sizing or bra cup-size guidance.`; });

  // Fit Studio: actual product reference view or generic manual overlay on a local photo.
  const canvas=$('#tryCanvas');const ctx=canvas.getContext('2d');
  const canvasW=canvas.width,canvasH=canvas.height;
  function getSelected(){return productById.get(selectedProduct)||productById.get('sculpt');}
  function loadReference(p) {
    const primary = image(p.image);
    const backup = fallbackImage(p);
    const candidates = [...new Set([primary, backup].filter(Boolean))];
    if(referenceImageKey===primary && referenceImage && referenceImage.complete) { drawCanvas(); return; }
    referenceImageKey = primary; referenceImage = null;
    let attempt = 0;
    const loadNext = () => {
      const src = candidates[attempt];
      if (!src) { referenceImage = null; drawCanvas(); return; }
      const im = new Image();
      if (src.startsWith(ASSET_BASE)) im.crossOrigin = 'anonymous';
      im.onload = () => { if (referenceImageKey === primary) { referenceImage = im; drawCanvas(); } };
      im.onerror = () => { attempt += 1; if (attempt < candidates.length) loadNext(); else if (referenceImageKey === primary) { referenceImage = null; drawCanvas(); } };
      im.src = src;
    };
    loadNext();
  }
  function drawCanvas() {
    ctx.clearRect(0,0,canvasW,canvasH);ctx.fillStyle='#ede0dc';ctx.fillRect(0,0,canvasW,canvasH);
    if(previewMode==='manual'&&userPhoto) {
      const ratio=Math.min(canvasW/userPhoto.naturalWidth,canvasH/userPhoto.naturalHeight);const w=userPhoto.naturalWidth*ratio,h=userPhoto.naturalHeight*ratio;ctx.drawImage(userPhoto,(canvasW-w)/2,(canvasH-h)/2,w,h);
      const sc=guideScale;const cx=guidePosition.x*canvasW,cy=guidePosition.y*canvasH;ctx.save();ctx.translate(cx,cy);ctx.scale(sc,sc);ctx.fillStyle='rgba(38,27,34,.83)';ctx.strokeStyle='rgba(255,235,241,.88)';ctx.lineWidth=3;
      // Illustrative top layer — generic shape only, never represented as a cut-out from the selected product.
      ctx.beginPath();ctx.moveTo(-100,-30);ctx.bezierCurveTo(-118,-100,-55,-128,-28,-77);ctx.lineTo(0,-24);ctx.lineTo(28,-77);ctx.bezierCurveTo(55,-128,118,-100,100,-30);ctx.lineTo(75,34);ctx.quadraticCurveTo(0,60,-75,34);ctx.closePath();ctx.fill();ctx.stroke();
      ctx.beginPath();ctx.moveTo(-72,-60);ctx.quadraticCurveTo(-58,-150,-30,-123);ctx.moveTo(72,-60);ctx.quadraticCurveTo(58,-150,30,-123);ctx.stroke();
      ctx.fillStyle='rgba(38,27,34,.82)';ctx.beginPath();ctx.moveTo(-88,105);ctx.quadraticCurveTo(-45,125,0,112);ctx.quadraticCurveTo(45,125,88,105);ctx.lineTo(60,165);ctx.lineTo(28,207);ctx.quadraticCurveTo(0,190,-28,207);ctx.lineTo(-60,165);ctx.closePath();ctx.fill();ctx.stroke();ctx.restore();
      ctx.fillStyle='rgba(255,250,247,.88)';ctx.fillRect(0,canvasH-48,canvasW,48);ctx.fillStyle='#4e3742';ctx.font='600 12px Arial';ctx.textAlign='center';ctx.fillText('MANUAL GUIDE · NOT A FIT SIMULATION',canvasW/2,canvasH-19);return;
    }
    const p=getSelected(); if(!referenceImage || !referenceImage.naturalWidth){ctx.fillStyle='#4e3742';ctx.textAlign='center';ctx.font='600 22px Arial';ctx.fillText('BLACKED',canvasW/2,canvasH/2-8);ctx.font='13px Arial';ctx.fillText(p.name,canvasW/2,canvasH/2+20);}else{const r=Math.min((canvasW-28)/referenceImage.naturalWidth,(canvasH-94)/referenceImage.naturalHeight);const w=referenceImage.naturalWidth*r,h=referenceImage.naturalHeight*r;ctx.drawImage(referenceImage,(canvasW-w)/2,(canvasH-60-h)/2,w,h);}
    ctx.fillStyle='rgba(34,24,29,.88)';ctx.fillRect(0,canvasH-60,canvasW,60);ctx.fillStyle='#fff6f4';ctx.textAlign='center';ctx.font='700 18px Arial';ctx.fillText(p.name.length>34?p.name.slice(0,31)+'…':p.name,canvasW/2,canvasH-35);ctx.font='10px Arial';ctx.fillStyle='#e2cbd3';ctx.fillText(p.concept?'CONCEPT PREVIEW · STOCK NOT CONFIRMED':'CAMPAIGN REFERENCE',canvasW/2,canvasH-16);
  }
  const studioSelect = $('#studioProduct');
  const studioProducts = products.filter(p => p.fit);
  studioSelect.innerHTML = studioProducts.map(p => `<option value=\"${p.id}\">${escapeHTML(p.name)}</option>`).join('');
  studioSelect.value = studioProducts.some(p => p.id === selectedProduct) ? selectedProduct : studioProducts[0]?.id || 'signature';
  selectedProduct = studioSelect.value;
  $('#studioTitle').textContent = getSelected().name;
  $('#studioProduct').addEventListener('change',e=>{selectedProduct=e.target.value;const p=getSelected();$('#studioTitle').textContent=p.name;referenceImage=null;referenceImageKey='';loadReference(p);$('#studioStatus').textContent=`${p.name} selected. This reference view is not an automatic fitting simulation.`;});
  function syncGuideControls() {
    const active = Boolean(userPhoto) && previewMode === 'manual';
    $('#guideScale').disabled = !active;
    ['moveGuideUp','moveGuideDown','moveGuideLeft','moveGuideRight','resetGuidePosition'].forEach(id => { const el = $('#'+id); if (el) el.disabled = !active; });
    const help = $('#modeHelp');
    if (help) help.textContent = !userPhoto
      ? 'Step 1: upload your own photo below. Then the manual guide can be opened. This is not AI fitting.'
      : modeIsManualMessage(previewMode);
  }
  function modeIsManualMessage(mode) { return mode === 'manual'
    ? 'Manual guide active: adjust the generic illustration. It is not the selected garment and does not predict fit. Your photo stays in this browser.'
    : 'Your photo is ready. Tap “My photo + guide” when you want to open the generic manual guide. No image is sent to a server in this prototype.'; }
  function setPreviewMode(mode){if(mode==='manual'&&!userPhoto){toast('Upload your own photo first.');return;}previewMode=mode;$('#referenceMode').classList.toggle('active',mode==='reference');$('#manualMode').classList.toggle('active',mode==='manual');$('#referenceMode').setAttribute('aria-pressed',String(mode==='reference'));$('#manualMode').setAttribute('aria-pressed',String(mode==='manual'));$('#manualMode').disabled=!userPhoto;$('#canvasTag').textContent=mode==='reference'?'SELECTED REFERENCE':'YOUR PHOTO · MANUAL GUIDE';syncGuideControls();drawCanvas();}
  $('#referenceMode').addEventListener('click',()=>setPreviewMode('reference'));$('#manualMode').addEventListener('click',()=>setPreviewMode('manual'));
  $('#photoUpload').addEventListener('change',e=>{const file=e.target.files&&e.target.files[0];if(!file)return;const allowed=['image/jpeg','image/png','image/webp'];if(!allowed.includes(file.type)){toast('Choose a JPG, PNG or WEBP image.');e.target.value='';return;}if(file.size>12*1024*1024){toast('Image is over 12 MB. Choose a smaller file.');e.target.value='';return;}const url=URL.createObjectURL(file);const im=new Image();im.onload=()=>{if(userPhotoUrl)URL.revokeObjectURL(userPhotoUrl);userPhoto=im;userPhotoUrl=url;$('#manualMode').disabled=false;setPreviewMode('reference');$('#studioStatus').textContent='Photo ready in this browser. Tap “My photo + guide” to open the manual overlay when you are ready. No photo was sent to a server.';e.target.value='';};im.onerror=()=>{URL.revokeObjectURL(url);e.target.value='';toast('Could not open that image. Try another file.');};im.src=url;});
  $('#clearPhoto').addEventListener('click',()=>{if(userPhotoUrl)URL.revokeObjectURL(userPhotoUrl);userPhoto=null;userPhotoUrl=null;$('#photoUpload').value='';$('#manualMode').disabled=true;setPreviewMode('reference');$('#studioStatus').textContent='Personal photo cleared from the preview.';syncGuideControls();});
  $('#guideScale').addEventListener('input',e=>{guideScale=Number(e.target.value)/100;$('#guideScaleOut').value=`${e.target.value}%`;if(previewMode==='manual')drawCanvas();});
  function canvasCoords(e){const r=canvas.getBoundingClientRect();return{x:(e.clientX-r.left)*canvasW/r.width,y:(e.clientY-r.top)*canvasH/r.height};}
  canvas.addEventListener('pointerdown',e=>{if(previewMode!=='manual'||!userPhoto)return;dragging=true;const p=canvasCoords(e);dragStart={pointer:p,base:{...guidePosition}};canvas.setPointerCapture?.(e.pointerId);e.preventDefault();});
  canvas.addEventListener('pointermove',e=>{if(!dragging||!dragStart)return;const p=canvasCoords(e);guidePosition.x=Math.max(.18,Math.min(.82,dragStart.base.x+(p.x-dragStart.pointer.x)/canvasW));guidePosition.y=Math.max(.23,Math.min(.77,dragStart.base.y+(p.y-dragStart.pointer.y)/canvasH));drawCanvas();});
  const stopDrag=()=>{dragging=false;dragStart=null;};canvas.addEventListener('pointerup',stopDrag);canvas.addEventListener('pointercancel',stopDrag);
  function nudgeGuide(dx,dy){if(previewMode!=='manual'||!userPhoto){toast('Upload a photo and activate My photo + guide first.');return;}guidePosition.x=Math.max(.18,Math.min(.82,guidePosition.x+dx));guidePosition.y=Math.max(.23,Math.min(.77,guidePosition.y+dy));drawCanvas();}
  $('#moveGuideUp').addEventListener('click',()=>nudgeGuide(0,-.025));$('#moveGuideDown').addEventListener('click',()=>nudgeGuide(0,.025));$('#moveGuideLeft').addEventListener('click',()=>nudgeGuide(-.025,0));$('#moveGuideRight').addEventListener('click',()=>nudgeGuide(.025,0));
  $('#resetGuidePosition').addEventListener('click',()=>{guidePosition={x:.5,y:.52};$('#guideScale').value='100';$('#guideScaleOut').value='100%';guideScale=1;drawCanvas();});
  $('#downloadPreview').addEventListener('click',()=>{try{drawCanvas();canvas.toBlob(blob=>{if(!blob){toast('Could not export the preview. Try reloading the product image.');return;}const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='blacked-fit-studio-preview.png';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1500);toast('Preview saved to your device.');},'image/png');}catch(_){toast('Image export failed. When testing locally, use the GitHub Pages website so image-origin restrictions do not block the export.');}});

  // Quick share helper for current saved list, used as a useful zero-backend feature.
  $('#wishlistJump').title='Show or hide saved styles';
  const shareLabel=document.createElement('button');shareLabel.type='button';shareLabel.className='btn btn-ghost btn-small';shareLabel.textContent='Share saved list';shareLabel.style.marginTop='12px';shareLabel.addEventListener('click',async()=>{const list=[...saved].map(id=>productById.get(id)?.name).filter(Boolean);if(!list.length){toast('Save a few styles first.');return;}const text='My BLACKED style shortlist: '+list.join(', ')+'. Product prices and availability are not confirmed.';try{if(navigator.share)await navigator.share({title:'My BLACKED shortlist',text});else if(navigator.clipboard){await navigator.clipboard.writeText(text);toast('Shortlist copied to clipboard.');}else toast(text);}catch(_){}});
  const savedPanel=document.createElement('div');savedPanel.className='saved-share';savedPanel.appendChild(shareLabel);$('#collection').appendChild(savedPanel);

  $('#year').textContent=String(new Date().getFullYear());
  syncGuideControls();
  renderProducts();renderCart();loadReference(getSelected());drawCanvas();
})();
