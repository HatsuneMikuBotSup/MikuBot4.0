module.exports = {
    name: "spam",
    description: "this will spam a user input",
    execute(message, args){
        var out = "";
        if (args.slice(4) != null) {
            for (var i = 0; out.length < 1000; i++){
                out += args.slice(4) + " ";
            }
            message.channel.send(out);
        } else {
        message.channel.send("Enter what u want to spam. Example: !spam OwO");
        }
    }
}
