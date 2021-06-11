<script>
    import KeyboardInput from "./KeyboardInput.svelte";
    export let sentence;
    let sentenceWords = sentence.split(" ");
    let sentenceWordsCorrect = [];

    for (let i = 0; i < sentenceWords.length - 1; i++) {
        sentenceWords[i] = sentenceWords[i] + " ";
    }

    $: currentWord = sentenceWords[0];


    function validateWord(event) {
        if (event.target.value === currentWord) {
            let first;
            [first, ...sentenceWords] = [...sentenceWords];
            sentenceWordsCorrect = [...sentenceWordsCorrect, first];
            event.target.value = "";

            if (sentenceWords.length == 0) {
                event.target.disabled = true;
                event.target.value = "You won!";
            }
        }
    }
</script>

<div class="container">
    <div class="content">
        <label for="wordinput" class="column">
            <span class="green">{sentenceWordsCorrect.join(" ")}</span>
            {sentenceWords.join(" ")}
        </label>
        <input type="text" id="wordinput" class="column wordinput" on:input={validateWord} autocomplete="off" autofocus/>
    </div>
</div>

<style>
    .green {
        color: green;
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
        background-color: white;
    }

    label {
        margin: 0 5em;
    }

</style>