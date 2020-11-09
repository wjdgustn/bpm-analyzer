const express = require('express');
const multer = require('multer');
const AudioContext = require('web-audio-api').AudioContext;
const MusicTempo = require('music-tempo');
const path = require('path');

const app = express.Router();

const upload = multer({
    storage: multer.memoryStorage()
});

app.get('/', (req, res, next) => {
    return res.render('main');
});

app.post('/', upload.single('file'), async (req, res, next) => {
    const data = req.file.buffer;
    if(path.extname(req.file.originalname) == '.ogg') {
        req.flash('Error', 'unsupported');
        return res.redirect('/');
    }

    const context = new AudioContext();
    await context.decodeAudioData(data, buffer => {
        let audioData = [];
        if(buffer.numberOfChannels == 2) {
            const channel1Data = buffer.getChannelData(0);
            const channel2Data = buffer.getChannelData(1);
            const length = channel1Data.length;
            for(let i = 0; i < length; i++) {
                audioData[i] = (channel1Data[i] + channel2Data[i]) / 2;
            }
        }
        else {
            audioData = buffer.getChannelData(0);
        }
        const mt = new MusicTempo(audioData);

        req.flash('Info', `BPM : ${mt.tempo}`);
        return res.redirect('/');
    });
});

module.exports = app;