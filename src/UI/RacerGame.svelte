<script>
    import {createEventDispatcher} from 'svelte';

    export let sentenceWordsCorrect;
    export let sentenceWordsRemaining;
    export let currentWord;
    export let wordsPerMinute;
    export let isFinished;

    let currentWordCache = currentWord;

    const dispatch = createEventDispatcher();
    let highlight, textInput, isWrong;
    $: currentWordRemaining = currentWord;

    $: currentWordProgress = "";
    $: if (currentWordCache !== currentWord) {
        textInput.value = "";
        isWrong = false;
        currentWordProgress = "";
        currentWordCache = currentWord;
    }

    $: if (!currentWord) {
        textInput.value = "You won!";
        textInput.disabled = true;
    }

    function receiveInput(event) {
        dispatch('message', {
            input: event.target.value,
            labelElement: highlight
        });

        let inputWord = event.target.value;

        if (currentWord[inputWord.length - 1] !== inputWord[inputWord.length - 1]) {
            isWrong = true;
            return;
        }

        isWrong = false;
        currentWordProgress = currentWord.slice(0, inputWord.length);
        currentWordRemaining = currentWord.slice(inputWord.length, currentWord.length);

    }
</script>

<div class="content">
    <label for="wordinput" class="column">
        <span class="correct">{sentenceWordsCorrect.join(" ")}</span>
        {#if isWrong}
            <span class="wrong highlight">
                {currentWord}
            </span>
        {:else if currentWord}
            <span class="highlight" bind:this={highlight}>
                    <span class="correct">{currentWordProgress}</span>{currentWordRemaining}
            </span>
        {/if}
        {sentenceWordsRemaining.join(" ")}
    </label>
    <input type="text" id="wordinput" class="column wordinput" on:input={receiveInput} bind:this={textInput}
           autocomplete="off" placeholder="Type Here!" autofocus/>
    {#if wordsPerMinute}
        <p>WPM: {wordsPerMinute.toFixed(2)}</p>
    {/if}
</div>

<style>
    .highlight {
        background-color: rgb(220, 220, 189);
        border-radius: 10px;
        padding: 5px;
    }

    .correct {
        color: black;
    }

    .wordinput {
        border: none;
        font-size: 2em;
        text-align: center;
    }

    .wordinput:focus {
        -moz-user-select: none;
        user-select: none;
        outline: none;
    }

    .wordinput:disabled {
        background-color: rgb(250, 250, 219);
    }

    label {
        font-weight: 700;
        margin: 0 5em;
        color: #666;
    }

    p {
        margin: 0 auto;
        text-align: center;
    }

    input {
        background-color: rgb(250, 250, 219);
        margin-top: 1rem;
        margin-bottom: 1rem;
    }

    .wrong {
        color: white;
        background-color: red;
    }
</style>
