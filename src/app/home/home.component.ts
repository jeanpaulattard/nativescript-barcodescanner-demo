import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from 'nativescript-barcodescanner';

@Component({
    selector: 'ns-items',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
    count: number = 0;

    private scanner: BarcodeScanner;

    constructor() {
    }

    ngOnInit(): void {
        this.scanner = new BarcodeScanner();
    }

    scan() {
        this.scanQRCode();
    }

    private scanQRCode() {
        this.scanner.hasCameraPermission().then((hasPermission: boolean) => {
            if (!hasPermission) {
                this.scanner.requestCameraPermission().then(() => {
                    this.scanQRCode();
                });
            } else {
                this.scanner.scan({
                    beepOnScan: false,
                    fullScreen: false,
                    orientation: 'portrait',
                    showTorchButton: true,
                    resultDisplayDuration: 300
                }).then(() => {
                    setTimeout(() => {
                        this.count++;
                        this.scanQRCode();
                    });
                }, (message: string) => {
                    if (message !== 'Scan aborted') {
                        setTimeout(() => {
                            alert('aborted');
                        });
                    }
                });
            }
        });
    }
}
