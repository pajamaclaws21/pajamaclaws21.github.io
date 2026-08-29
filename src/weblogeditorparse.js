function parseText(){
    let title = document.getElementById("title").value;
    let content = document.getElementById("content").value;
    document.getElementById("result").innerText = `<!DOCTYPE html>
<html>
    <head>
        <title>${title}</title>
	    <link rel="manifest" href="https://www.pajamaclaws.net/manifest.json">
        <link rel="icon" type="image/jpg" href="https://pajamaclaws.net/images/fax-error.ico">
        <meta charset="utf-8">
	    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <style>
            * {
                font-family: 'Times New Roman', Times, serif;
            }
        </style>
    </head>
    <body>
        <h1>${title}</h1><p>
        ${content}

        <br><br>
        <a href="/">take me home</a>
    </body>
</html>`;

}