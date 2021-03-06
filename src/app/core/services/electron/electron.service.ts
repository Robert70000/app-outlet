import { Injectable } from '@angular/core';
import { ipcRenderer, webFrame, remote, shell } from 'electron';
import * as childProcess from 'child_process';
import * as fs from 'fs';

@Injectable({
    providedIn: 'root'
})
export class ElectronService {

    ipcRenderer: typeof ipcRenderer;
    webFrame: typeof webFrame;
    remote: typeof remote;
    childProcess: typeof childProcess;
    fs: typeof fs;
    shell: typeof shell

    get isElectron() {
        return window && window.process && window.process.type;
    }

    constructor() {
        if (this.isElectron) {
            this.ipcRenderer = window.require('electron').ipcRenderer;
            this.webFrame = window.require('electron').webFrame;
            this.remote = window.require('electron').remote;
            this.shell = window.require('electron').shell
            this.childProcess = window.require('child_process');
            this.fs = window.require('fs');
        }
    }

    execCommand(command: string) {
        return new Promise((resolve, reject) => {
            childProcess.exec(command, (error, stdout, stderr) => {
                if (error || stderr) {
                    reject(error || stderr)
                } else {
                    resolve(stdout)
                }
            })
        })
    }
}
