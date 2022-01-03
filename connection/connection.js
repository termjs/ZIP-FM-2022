const {
	AudioPlayer,
	AudioPlayerStatus,
	AudioResource,
	createAudioPlayer,
	entersState,
	VoiceConnection,
	VoiceConnectionDisconnectReason,
	VoiceConnectionStatus,
} = require('@discordjs/voice');

class RadioSubscription {
    constructor(voiceConnection = VoiceConnection) {
		this.voiceConnection = voiceConnection;
        this.audioPlayer = createAudioPlayer();
        
        voiceConnection.subscribe(this.audioPlayer);
    }
}

module.exports = RadioSubscription

      