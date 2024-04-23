document.addEventListener('DOMContentLoaded',async()=>{
	const recordingIndicator =document.getElementById('recordingIndicator');
	const startButton = document.getElementById('startButton');
	const stopButton = document.getElementById('stopButton');
	const sendButton = document.getElementById('sendButton');
	const textField = document.getElementById('textField');
	let mediaRecorder;
	let recordedChunks = [];

	try {
		const stream = await navigator.mediaDevices.getUserMedia({audio:true});
		mediaRecorder = new MediaRecorder(stream);

		mediaRecorder.ondataavailable = event =>{
			if (event.data.size>0) recordedChunks.push(event.data);
		};

		mediaRecorder.onstop =async () =>{
			const audioBlob = new Blob(recordedChunks,{type:'audio/webm'});
			const formData = new FormData();
			formData.append('audio',audioBlob);

			try {
				const response = await fetch('/process-audio',{
					method:'POST',
					body: formData,
				});
				if (response.ok){
					console.log("Audio uploaded successfully");
					const returnedBlob = await response.blob();
					const returnURL = URL.createObjectURL(returnedBlob);
					new Audio(returnURL).play();
				} else {
					console.error('Server Error: ',response.statusText);
				}
			}catch (error){
				console.log('upload error : ',error);
			}
		};
	} catch(error){
		console.log("Failed to get media:",error);
	}
   
   sendButton.addEventListener('click', async () => {
		const text = textField.value;

		try {
			const response = await fetch('/response-text', {
				method: 'POST',
				body: text,
			});

			if (response.ok) {
				console.log('Text sent successfully');
				const returnedBlob = await response.blob();
				const returnURL = URL.createObjectURL(returnedBlob);
				new Audio(returnURL).play();
			} else {
				console.error('Server Error:', response.statusText);
			}
		} catch (error) {
			console.error('Send error:', error);
		}
	});
	startButton.addEventListener('click',()=>{
		startButton.style.display = 'none';
		stopButton.style.display = 'block';
		if (mediaRecorder.state == 'inactive'){
			mediaRecorder.start();
			recordingIndicator.style.display='block';
			recordedChunks = [];
		}
	});
	stopButton.addEventListener('click',()=>{
		startButton.style.display = 'block';
		stopButton.style.display = 'none';
		if (mediaRecorder.state == 'recording'){
			mediaRecorder.stop();
			recordingIndicator.style.display='none';
		}
	});
});