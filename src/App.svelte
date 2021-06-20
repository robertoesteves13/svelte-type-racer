<script>
    import RacerGame from './UI/RacerGame.svelte';

    export let sentence;
    let sentenceWordsRemaining = sentence.split(" ");
    let sentenceWordsCorrect = [];

    let currentWord, currentWordRemaining, currentWordProgress;
    let isFinished = false;
    [currentWord, ...sentenceWordsRemaining] = [...sentenceWordsRemaining];
    currentWordRemaining = currentWord;
    currentWordProgress = "";

    let horaInicial = Date.now();

    $: wordsPerMinute = (correctWordsCounter) / ((Date.now() - horaInicial) / 1000) * 60;

    let correctWordsCounter = 0;

    function validateWord(event) {
        let wordInput = event.detail.input;

        if (wordInput === currentWord + " ") {
            sentenceWordsCorrect = [...sentenceWordsCorrect, currentWord];
            [currentWord, ...sentenceWordsRemaining] = [...sentenceWordsRemaining];
            currentWordRemaining = currentWord;
            currentWordProgress = "";
            correctWordsCounter++;
        }

        if (sentenceWordsRemaining.length === 0 && wordInput === currentWord) {
            sentenceWordsCorrect = [...sentenceWordsCorrect, currentWord];
            [currentWord, ...sentenceWordsRemaining] = [...sentenceWordsRemaining];
            currentWordRemaining = currentWord;
            currentWordProgress = "";
            correctWordsCounter++;
            currentWord = "";
        }
    }
</script>

<RacerGame on:message={validateWord} {sentenceWordsCorrect} {sentenceWordsRemaining} {currentWord} {wordsPerMinute}
           {isFinished}/>