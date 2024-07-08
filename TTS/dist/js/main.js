// init speechSynth
const synth = window.speechSynthesis

// Dom Elements

const textForm = document.querySelector('form')
const textInput = document.querySelector('#text-input')
const voiceSelect = document.querySelector('#voice-select')

// init voices array
let voices = [];

const getVoices = () =>{
    voices = synth.getVoices()
    console.log(voices)
}

getVoices