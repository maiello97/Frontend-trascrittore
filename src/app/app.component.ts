import { NoopAnimationPlayer } from '@angular/animations';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';





@Component({
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

  recordedChunks:any[] = []
 
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
      downloadLink.href = URL.createObjectURL(new Blob(recordedChunks));
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
      console.log(blob)
      let blob1 = new Blob([blob], {type:"audio/wav"})   //TIPO WAV
      const url= URL.createObjectURL(blob1);        //controllo che da browser sia in formato wav
      console.log(url)
      window.open(url);
      let formData = new FormData();        //prendo il formdata e lo mando al backend
      formData.append("file", blob1, "prova.wav");
      this.http.post("http://localhost:8000/uploadfile", formData)
        .subscribe((res) => {
          console.log(res)
        })
    }else{
      console.log("L'upload non può essere eseguito visto che l'audio non è stato ancora registrato")
    }

    

    

  }






}
