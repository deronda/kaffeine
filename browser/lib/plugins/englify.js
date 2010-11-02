require.module('./plugins/englify', function(module, exports, require) {
// start module: plugins/englify

var Token = require("../token");

exports.englify = function(stream) {
  var words = ["is", "isnt", "or", "and", "not" ]
  var mapping = { "is": "===", "isnt": "!==", "or": "||", "and": "&&", "not": "!" }, op, token
  stream.each(function() {
    if(this.word && words.indexOf(this.text) >= 0) {
      var op = mapping[this.text]
      token = new Token.operator(op)
      this.replaceWith(token)
      if(token.text == "!" && token.next.whitespace)
        token.next.remove()
      token.eat(function() { return this.whitespace})
      return token // skip to this token in the stream
    }
  })
}

// end module: plugins/englify
});
