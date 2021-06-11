<script>
    let key = '';

    function keyboardlistener(event) {
        key = event.getkey();
    }
</script>

<h1 on:keypress={keyboardListener}>Key pressed: {key}</h1>