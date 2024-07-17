// init speechSynth
const synth = window.speechSynthesis

// Dom Elements

const textForm = document.querySelector('form')
const textInput = document.querySelector('#text-input')
const voiceSelect = document.querySelector('#voice-select')

// init voices array
let voices = [];

const getVoices = () => {
    voices = synth.getVoices()
    console.log(voices)

    // loop through voices and create an option for each one
    voiceSelect.innerHTML = ''; // Clear the select element before adding options

    voices.forEach(voice => {
        // create option element
        const option = document.createElement('option')
        // fill option with voice end language
        option.textContent = `${voice.name} (${voice.lang})`
        // set need option attributes
        option.setAttribute('data-lang', voice.lang)
        option.setAttribute('data-name', voice.name)
        voiceSelect.appendChild(option)
    })
}

getVoices()
if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = getVoices
}

// speak

const speak = () => {
    // check if speaking
    if (synth.speaking) {
        console.error('Already speaking...')
        return
    }
    if (textInput.value !== '') {
        // get speak text
        const speakText = new SpeechSynthesisUtterance(textInput.value)

        // speak end
        speakText.onend = e => {
            console.log('Done speaking...')
        }
        // speak error
        speakText.onerror = e => {
            console.error('Something went wrong')
        }
        // selected voice
        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name')

        // loop through voices
        voices.forEach(voice => {
            if (voice.name === selectedVoice) {
                speakText.voice = voice
            }
        })

        // speak the text
        synth.speak(speakText)
    }
}

// event listeners

// text form submit 
textForm.addEventListener('submit', e => {
    e.preventDefault()
    speak()
    textInput.blur()
})

voiceSelect.addEventListener('change', e => speak())
