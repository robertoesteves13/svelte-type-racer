<script>
    import KeyboardInput from './KeyboardInput.svelte';
    let sentence = 'I am so pro at typing I can do this with ease!';
    let sentenceWords = sentence.split(' ');
    for (let i = 0; i < sentenceWords.length - 1; i++) {
        sentenceWords[i] = sentenceWords[i] + ' ';
    }

    console.log(sentenceWords);

    let lastWord = sentenceWords.slice(-1);
    $: currentWord = sentenceWords[0];


    function validateWord(event){
        if (event.target.value === currentWord){
            let first;
            [first, ...sentenceWords] = [...sentenceWords] ;
            sentence = sentenceWords.join(' ');
            event.target.value = '';
            if (!sentence) alert('You won!');
            console.log(sentenceWords);
        }
    }
</script>

<h1>
    {sentence}
</h1>
<input type="text" on:input={validateWord}>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		font-size: 3em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>