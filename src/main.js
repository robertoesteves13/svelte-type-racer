import App from './App.svelte';

let sentences = [`Alfred Hitchcock once said, "Drama is life with the dull bits cut out." If he'd been alive during ancient times, he might have uttered these same words when facing a play from Euripides. Reflecting the interesting (and often) tragic parts of "life" on the stage was an important part of the ancient world, and helped to shape our modern culture.`,
		 `Sitting back and doing nothing, or worse, criticizing others, does not require courage. Speaking up and letting your unique voice be heard is an important step for anyone who wants to make anything better.`,
		 `What good's a reward if you ain't around to use it? Besides, attacking that battle station ain't my idea of courage. It's more like... suicide.`,
		 `If you're committed enough, you can make any story work. I once convinced a woman that I was Kevin Costner, and it worked because I believed it.`,
		 `When is the last time you cared about something except yourself, hot rod? You name me one time and I will take it all back. I didn't think so. These are good folk around here, who care about one another. I don't want 'em depending on someone they can't count on.`]

let randomNumber = Math.floor(Math.random() * sentences.length);
let sentence = sentences[randomNumber];

const app = new App({
	target: document.body,
	props: {
		sentence: sentence
	}
});

export default app;