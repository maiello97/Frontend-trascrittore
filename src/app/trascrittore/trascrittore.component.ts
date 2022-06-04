import { Component, OnInit } from '@angular/core';
declare var $: any;
import * as RecordRTC from 'recordrtc';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trascrittore',
  templateUrl: './trascrittore.component.html',
  styleUrls: ['./trascrittore.component.css']
})
export class TrascrittoreComponent implements OnInit {

  check: boolean = false;

  title = 'micRecorder';
  //Lets declare Record OBJ
  record: any;
  //Will use this flag for toggeling recording
  recording = false;
  //URL of Blob
  url: any;
  error: any;

  interval:any;

  printCheck() {
    console.log(this.check)
  }

  trascrizione: any = ""
  constructor(private readonly router: Router, private domSanitizer: DomSanitizer, private http: HttpClient) { }
  sanitize(url: string) {
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }


  /**
  * Start recording.
  */
  initiateRecording() {
      this.recording = true;
      let mediaConstraints = {
        video: false,
        audio: true
      };
    if (!this.check) {
      navigator.mediaDevices.getUserMedia(mediaConstraints).then(this.successCallback.bind(this), this.errorCallback.bind(this));
    }else{
      navigator.mediaDevices.getUserMedia(mediaConstraints).then(this.successCallbackLive.bind(this), this.errorCallback.bind(this));
    }

  }


  /**
  * Will be called automatically.
  */
  successCallback(stream: any) {
    var options = {
      mimeType: "audio/wav",
      numberOfAudioChannels: 1,
      sampleRate: 48000,
    };
    //Start Actuall Recording
    var StereoAudioRecorder = RecordRTC.StereoAudioRecorder;
    this.record = new StereoAudioRecorder(stream, options);
    this.record.record();
  }

  successCallbackLive(stream:any){
    var options = {
      mimeType: "audio/wav",
      numberOfAudioChannels: 1,
      sampleRate: 48000,
    };
    var StereoAudioRecorder = RecordRTC.StereoAudioRecorder;
    this.record = new StereoAudioRecorder(stream, options);
    this.record.record();
    this.interval = setInterval(this.pausaInviaRitorna.bind(this), 2000)
  }

  clearTrascription(){
    this.trascrizione = ""
  }

  pausaInviaRitorna(){
    this.record.stop(this.processRecording.bind(this));
    this.record.record();
  }



  /**
  * Stop recording.
  */
  stopRecording() {
    if(!this.check){
      this.recording = false;
      this.record.stop(this.processRecording.bind(this));
    }else{
      this.recording = false;
      clearInterval(this.interval)
      this.record.stop();
    }

  }


  /**
  * processRecording Do what ever you want with blob
  * @param  {any} blob Blog
  */
  processRecording(blob: any) {
        this.url = URL.createObjectURL(blob);
        console.log("blob", blob);
        console.log("url", this.url);
        let formData = new FormData();        //prendo il formdata e lo mando al backend
        let title = new Date().toLocaleString()
        formData.append("file", blob, title + '.wav');
        formData.append("url", this.url)
        formData.append("data", title)
        if(this.check){
          formData.append("state", "true")
        }else{
          formData.append("state", "false")
        }
        this.http.post("http://localhost:8000/uploadfile", formData)
          .subscribe((res) => {
            if(!this.check){

              this.trascrizione = res
            }else{
              this.trascrizione = this.trascrizione + " " + res
            }
          })
  }


  /**
  * Process Error.
  */
  errorCallback(error: any) {
    this.error = 'Can not play audio in your browser';
  }

  gotoAddUser() {
    this.router.navigate(["adduser"])
  }

  logout() {
    this.router.navigate(["/"])
  }

  ngOnInit(): void {

  }

}
