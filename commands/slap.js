const { MessageAttachment } = require('discord.js');
const nodeHtmlToImage = require('node-html-to-image');
const getUserFromMention = require("../helpers/index");

module.exports = {
    name: "slap",
    description: "Slap another person",
    async execute(msg, args) {
        // If no user mentioned
        if (args.length === 0) msg.channel.send("I can't slap ghosts!");
        else if (args.length > 0 && args.length < 2) {
            // Get mentioned user
            const user = msg.mentions.users.first();
            let userName;
            if (user) {
                userName = user.username;
            } else {
                userName = args[0];
            }
            // html template for img styling
            const _htmltemplate = `<!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                .img-wrap {
                    position: relative;
                }
        
                .img-wrap img {
                    width: 800px;
                    height: 425px;
                }
        
                .img-wrap .userName {
                    position: absolute;
                    top: 190px;
                    left: 40px;
                    color: teal;
                    background: #fff;
                    max-width: 245px;
                    width: 245px;
                    text-align: center;
                    word-break: break-all;
                }
            </style>
        </head>
        
        <body>
            <div class="img-wrap">
                <img src="https://i.redd.it/l2gifgdbgic21.jpg">
        
                <h1 class="userName">${userName}</h1>
            </div>
        </body>
        
        </html>`

            //convert html above to img to send to user
            const images = await nodeHtmlToImage({
                html: _htmltemplate,
                quality: 100,
                type: 'jpeg',
                puppeteerArgs: {
                    args: ['--no-sandbox'],
                },
                encoding: 'buffer',
            });
            msg.channel.send(`${user}`)
            msg.channel.send(new MessageAttachment(images, "slap-min.jpeg"));
        }
    }
}