<script>
    import KeyboardInput from "./KeyboardInput.svelte";
    export let sentence;
    let sentenceWordsRemaining = sentence.split(" ");
    let sentenceWordsCorrect = [];

    let currentWord, currentWordRemaining, currentWordProgress;
    let highlight;
    [currentWord, ...sentenceWordsRemaining] = [...sentenceWordsRemaining];
    currentWordRemaining = currentWord;
    currentWordProgress = "";

    let horaInicial = Date.now();

    $: wordsPerMinute = (correctWordsCounter) / ((Date.now() - horaInicial) / 1000) * 60;

    let correctWordsCounter = 0;

    function validateWord(event) {


        if (event.target.value === currentWord + " ") {
            sentenceWordsCorrect = [...sentenceWordsCorrect, currentWord];
            [currentWord, ...sentenceWordsRemaining] = [...sentenceWordsRemaining];
            currentWordRemaining = currentWord;
            currentWordProgress = "";
            event.target.value = "";
            correctWordsCounter++;
        }

        const regex = new RegExp(event.target.value);

        
        if (regex.test(currentWord) && event.target.value !== "") {
            currentWordProgress = currentWord.slice(0, event.target.value.length);
            currentWordRemaining = currentWord.slice(event.target.value.length, currentWord.length);
            highlight.style.background = "rgb(220, 220, 189)";
            highlight.style.color = "#666";
        } else if (event.target.value !== "") {
            highlight.style.background = "red";
            highlight.style.color = "white";
        } else {
            currentWordProgress = "";
            currentWordRemaining = currentWord;
            highlight.style.background = "rgb(220, 220, 189)";
            highlight.style.color = "#666";
        }

        if (sentenceWordsRemaining.length == 0 && event.target.value === currentWord) {
            correctWordsCounter++;
            highlight.style.background = "rgb(250, 250, 219)";
            highlight.style.padding = "0";
            event.target.disabled = true;
            event.target.value = "You won!";
        }

    }
</script>

<div class="container">
    <div class="content">
        <label for="wordinput" class="column">
            <span class="correct">{sentenceWordsCorrect.join(" ")}</span>
            <span class="highlight" bind:this={highlight}>
                <span class="correct">{currentWordProgress}</span>{currentWordRemaining}
            </span>
            {sentenceWordsRemaining.join(" ")}
        </label>
        <input type="text" id="wordinput" class="column wordinput" on:input={validateWord} autocomplete="off" placeholder="Type Here!" autofocus/>
        {#if wordsPerMinute}
            <p>WPM: {wordsPerMinute.toFixed(2)}</p>
        {/if}
    </div>
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