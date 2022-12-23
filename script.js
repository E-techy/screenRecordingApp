var currentRecording=document.querySelector(".currentRecording");
var recordedVideo=document.querySelector(".recordedVideo")
var startRecording=document.querySelector("#startRecording")
var stopRecording=document.querySelector("#stopRecording")
var downloadLink=document.querySelector("#downloadLink");
var data=[];
stopRecording.addEventListener("mouseenter",function(){
    this.style.backgroundColor="blue"
})
stopRecording.addEventListener("mouseout",function(){
    this.style.backgroundColor="rgb(28, 138, 201)"
})
startRecording.addEventListener("mouseenter",function(){
    this.style.backgroundColor="blue"
})
startRecording.addEventListener("mouseout",function(){
    this.style.backgroundColor="rgb(28, 138, 201)"
})


function startRecorder() {
    var recording=navigator.mediaDevices.getDisplayMedia({
        video:{
            mediaSource:'screen'
        },
        audio:true,
    })
    .then(async(recordingData)=>{
        let audio=await navigator.mediaDevices.getUserMedia(
            {video:false,
            audio:true
            })

        currentRecording.srcObject=recordingData;

        let combine= new MediaStream(
            [...recordingData.getTracks(),...audio.getTracks()]
        )

        let recorder= new MediaRecorder(combine);

        startRecording.addEventListener('click',(e)=>{
            data=[];
            recorder.start();
            alert("recording started")
            console.log("Recording started");
           
        })

        stopRecording.addEventListener('click',()=>{
            recorder.stop()
            alert("Recording Stopped")
            console.log("Recording stopped");
        })

        recorder.ondataavailable=(recorder)=>{
            data.push(recorder.data)
        }
        recorder.onstop=()=>{
            let blob=new Blob(data,{type:'video/webm'})

            console.log(data);
            var url=URL.createObjectURL(blob);
            recordedVideo.src=url;
            console.log(url);
            
            var date=new Date();
            downloadLink.href=url;
            downloadLink.download=`${date.getTime()}.webm`
            downloadLink.innerText=` Download ${date.getTime()}.webm`

        }

        
    })
}
startRecorder();
startRecording.addEventListener('dblclick',()=>{
    startRecorder();
})
