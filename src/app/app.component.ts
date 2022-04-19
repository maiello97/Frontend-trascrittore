//import { Component } from '@angular/core';
//import { HttpClient } from '@angular/common/http';





/*@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'transcriptor';

  constructor(private http: HttpClient){}


  url: String = "";
  audio = new Audio()
  stream: MediaStream = new MediaStream 

  recordedChunks:any[] = []*/

/*onChange(event: any){
  if(event.target.files.length > 0){
    const file = event.target.files[0]
    var title = event.target.files[0].name
    this.url = "../assets/"+title
  }
}

handleSuccess1 = function(stream : any){
  const player = <HTMLMediaElement>document.getElementById("player")
  if(window.URL){
    if(player){
      player.srcObject = stream
    }
  }else{
    player.src = stream
  }
}

startRec1(){
  navigator.mediaDevices.getUserMedia({audio: true, video:false}).then(this.handleSuccess)
}
*/



/*

//PARTE BUONA
 handleSuccess = function(stream : any){
    const downloadLink = <HTMLAnchorElement>document.getElementById('download');
    const stopButton = <HTMLButtonElement>document.getElementById('stop');

    const options = {mimeType: 'audio/webm'}
    const recordedChunks:any[] = []
    const mediaRecorder = new MediaRecorder(stream, options)

    mediaRecorder.addEventListener('dataavailable', function(e){
      if (e.data.size > 0) recordedChunks.push(e.data);
    })

    mediaRecorder.addEventListener('stop', function() {
      downloadLink.href = URL.createObjectURL(new Blob(recordedChunks, {type:"audio/wav"} ));
      downloadLink.download = 'acetest.wav';
    });

    stopButton.addEventListener('click', function() {
      mediaRecorder.stop();
    });

    mediaRecorder.start(); 
    
    
  }

  startRec(){
    navigator.mediaDevices.getUserMedia({audio: true, video:false}).then(this.handleSuccess)
  }



  async uploadFile(){
    const downloadLink = <HTMLAnchorElement>document.getElementById('download');


    if(downloadLink.href.length > 0){
      let blob = await fetch(downloadLink.href).then(r => r.blob());
      let blob1 = new Blob([blob], {type:"audio/wav"})   //TIPO WAV
      const url= URL.createObjectURL(blob1);        //controllo che da browser sia in formato wav
      let formData = new FormData();        //prendo il formdata e lo mando al backend
      formData.append("file", blob1, "acetest.wav");
      this.http.post("http://localhost:8000/uploadfile", formData)
        .subscribe((res) => {
        })
    }else{
      console.log("L'upload non può essere eseguito visto che l'audio non è stato ancora registrato")
    }

    

    

  }






}
*/


import { Component } from '@angular/core';
declare var $: any;
import * as RecordRTC from 'recordrtc';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'micRecorder';
  //Lets declare Record OBJ
  record:any;
  //Will use this flag for toggeling recording
  recording = false;
  //URL of Blob
  url:any;
  error:any;

  trascrizione:any = ""
  constructor(private domSanitizer: DomSanitizer, private http: HttpClient) { }
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
    navigator.mediaDevices.getUserMedia(mediaConstraints).then(this.successCallback.bind(this), this.errorCallback.bind(this));
  }
  /**
  * Will be called automatically.
  */
  successCallback(stream:any) {
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
  /**
  * Stop recording.
  */
  stopRecording() {
    this.recording = false;
    this.record.stop(this.processRecording.bind(this));
  }
  /**
  * processRecording Do what ever you want with blob
  * @param  {any} blob Blog
  */
  processRecording(blob:any) {
    this.url = URL.createObjectURL(blob);
    console.log("blob", blob);
    console.log("url", this.url);
    let formData = new FormData();        //prendo il formdata e lo mando al backend
      formData.append("file", blob, "acetest.wav");
      formData.append("url", this.url)
      this.http.post("http://localhost:8000/uploadfile", formData)
        .subscribe((res) => {
          this.trascrizione = res
        })
  }
  /**
  * Process Error.
  */
  errorCallback(error:any) {
    this.error = 'Can not play audio in your browser';
  }
  ngOnInit() { }
}