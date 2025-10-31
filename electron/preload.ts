import { contextBridge } from "electron";

contextBridge.exposeInMainWorld("omega", {
    versions: '0.2.0'
});