#!/usr/bin/env node
const fs = require('fs');

// Debugging flag. Set to true to enable debug logging.
const DEBUG = false;

function my_log(msgFn) {
  if (DEBUG) {
    console.log(msgFn());
  }
}

/**
 * Ajsone is an esoteric programming language designed for fun.
 * See http://quaxio.com/ajsone/ for more info.
 */
function Ajsone() {
  /**
   * Main entry point to the Ajsone interpreter.
   */
  this.eval = function(json) {
    // We "detect" infinite loops by using a depth counter.
    this.depth = 0;

    try {
      var r = this.eval_(json, [{}]);
      return {success: r, failure: ""};
    } catch (e) {
      return {success: "", failure: e};
    }
  }

  /**
   * Complex built-ins get their own handling functions.
   */
  this.handleIf = function(env) {
    var cond = this.getBinding(env, 'cond');
    var condthen = this.getBinding(env, 'then');
    var condelse = this.getBinding(env, 'else');
    var cond = this.eval_(cond, env);
    if (cond) {
      my_log(function(){return "going to eval the 'then' case"});
      return this.eval_(condthen, env);
    } else {
      my_log(function(){return "going to eval the 'else' case"});      
      return this.eval_(condelse, env);
    }
  }

  this.handleArrLen = function(env) {
    var arr = this.getBinding(env, 'arr');
    arr = this.eval_(arr, env);
    Ajsone.expectArray(arr);
    return arr.length;
  }

  this.handleArrPrepend = function(env) {
    var arr = this.getBinding(env, 'arr');
    var e = this.getBinding(env, 'e');

    arr = this.eval_(arr, env);
    Ajsone.expectArray(arr);

    e = this.eval_(e, env);
    var new_arr = arr.slice(0); // slice is better than splice(0) in modern JS
    new_arr.unshift(e);
    return new_arr;    
  }

  this.handleArrAppend = function(env) {
    var arr = this.getBinding(env, 'arr');
    var e = this.getBinding(env, 'e');

    arr = this.eval_(arr, env);
    Ajsone.expectArray(arr);

    e = this.eval_(e, env);
    var new_arr = arr.slice(0);
    new_arr.push(e);
    return new_arr;
  }

  this.handleArrAt = function(env) {
    var arr = this.getBinding(env, 'arr');
    var offset = this.getBinding(env, 'offset');

    arr = this.eval_(arr, env);
    Ajsone.expectArray(arr);

    offset = this.eval_(offset, env);
    Ajsone.expectNumeral(offset);

    Ajsone.guard(typeof(arr[offset]) != "undefined", "runtime error, out of bounds");
    return arr[offset];
  }

  this.handleStrLen = function(env) {
    var s = this.getBinding(env, 's');
    s = this.eval_(s, env);
    Ajsone.expectString(s);
    return s.length;
  }

  this.handleStrAt = function(env) {
    var s = this.getBinding(env, 's');
    var offset = this.getBinding(env, 'offset');

    s = this.eval_(s, env);
    Ajsone.expectString(s);

    offset = this.eval_(offset, env);
    Ajsone.expectNumeral(offset);

    Ajsone.guard(typeof(s[offset]) != "undefined", "runtime error, out of bounds");
    return s[offset];
  }

  this.handleStrAppend = function(env) {
    var s1 = this.getBinding(env, 's1');
    var s2 = this.getBinding(env, 's2');

    s1 = this.eval_(s1, env);
    Ajsone.expectString(s1);

    s2 = this.eval_(s2, env);
    Ajsone.expectString(s2);

    return s1+s2;
  }  

  this.buildOp = function(params_ty, op) {
    return function(env) {
      var params = {};
      for (var p in params_ty) {
        var val = this.getBinding(env, p);
        val = this.eval_(val, env);
        params_ty[p](val);
        params[p] = val;
      }
      return op(params);
    }.bind(this);
  }
  
  this.getBuiltins = function() {
    return {
      '+': this.buildOp({'in1': Ajsone.expectNumeral, 'in2': Ajsone.expectNumeral}, function(p){return p['in1']+p['in2']}),
      '-': this.buildOp({'in1': Ajsone.expectNumeral, 'in2': Ajsone.expectNumeral}, function(p){return p['in1']-p['in2']}),
      '*': this.buildOp({'in1': Ajsone.expectNumeral, 'in2': Ajsone.expectNumeral}, function(p){return p['in1']*p['in2']}),
      '/': this.buildOp({'in1': Ajsone.expectNumeral, 'in2': Ajsone.expectNumeral}, function(p){return p['in1']/p['in2']}),
      '<': this.buildOp({'in1': Ajsone.expectNumeral, 'in2': Ajsone.expectNumeral}, function(p){return p['in1']<p['in2']}),
      '<=': this.buildOp({'in1': Ajsone.expectNumeral, 'in2': Ajsone.expectNumeral}, function(p){return p['in1']<=p['in2']}),
      '>': this.buildOp({'in1': Ajsone.expectNumeral, 'in2': Ajsone.expectNumeral}, function(p){return p['in1']>p['in2']}),
      '>=': this.buildOp({'in1': Ajsone.expectNumeral, 'in2': Ajsone.expectNumeral}, function(p){return p['in1']>=p['in2']}),
      '==': this.buildOp({'in1': Ajsone.expectNumeral, 'in2': Ajsone.expectNumeral}, function(p){return p['in1']==p['in2']}),
      '!=': this.buildOp({'in1': Ajsone.expectNumeral, 'in2': Ajsone.expectNumeral}, function(p){return p['in1']!=p['in2']}),
      '&&': this.buildOp({'in1': Ajsone.expectBoolean, 'in2': Ajsone.expectBoolean}, function(p){return p['in1']&&p['in2']}),
      '||': this.buildOp({'in1': Ajsone.expectBoolean, 'in2': Ajsone.expectBoolean}, function(p){return p['in1']||p['in2']}),
      '&': this.buildOp({'in1': Ajsone.expectNumeral, 'in2': Ajsone.expectNumeral}, function(p){return p['in1']&p['in2']}),
      '|': this.buildOp({'in1': Ajsone.expectNumeral, 'in2': Ajsone.expectNumeral}, function(p){return p['in1']|p['in2']}),
      '~': this.buildOp({'in1': Ajsone.expectNumeral}, function(p){return ~p['in1']}),
      'if': this.handleIf.bind(this),
      'arr.len': this.handleArrLen.bind(this),
      'arr.append': this.handleArrAppend.bind(this),
      'arr.prepend': this.handleArrPrepend.bind(this),
      'arr.at': this.handleArrAt.bind(this),
      'str.len': this.handleStrLen.bind(this),
      'str.at': this.handleStrAt.bind(this),
      'str.append': this.handleStrAppend.bind(this)
    }
  }

  this.logEntry = function(body, msg, env) {
    my_log(function(){return "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<"});
    my_log(function(){return "entering: " + msg});
    my_log(function(){return "depth: " + this.depth + ", going to eval:" + JSON.stringify(body)}.bind(this));
    my_log(function(){return "and env: " + JSON.stringify(env)});
  }

  this.logExit = function(body, msg, r, env1, env2) {
    my_log(function(){return ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"});
    my_log(function(){return "exiting: " + msg});
    my_log(function(){return "depth: " + this.depth + ", evaled:" + JSON.stringify(body)}.bind(this));
    my_log(function(){return "and env1: " + JSON.stringify(env1)});
    my_log(function(){return "and env2: " + JSON.stringify(env2)});
    my_log(function(){return "returning: " + JSON.stringify(r)});
  }

  this.getBinding = function(env, k) {
    for (var i=env.length-1; i>=0; i--) {
      if (typeof(env[i][k]) != "undefined") {
        return env[i][k];
      }
    }
    Ajsone.guard(false, "failed to find '"+k+"' in env!");
  }

  this.setBinding = function(env, k, v) {
    for (var i=env.length-1; i>=0; i--) {
      if (typeof(env[i][k]) != "undefined") {
        env[i][k] = v;
        return;
      }
    }
    env[env.length-1][k] = v;
  }

  this.eval_ = function(json, env) {
    Ajsone.guard(typeof(json) != "undefined", "internal interpreter error, undefined json");

    this.depth++;
    if (this.depth == 100) {
      throw "inf loop?";
    }
    
    var current_scope = {};
    env.push(current_scope);    

    var r = this.eval__(json, env);

    env.pop();
    this.depth--;
    return r;
  }

  this.eval__ = function(json, env) {
    if (Ajsone.isPrimitive(json)) {
      return json;
    }

    if (typeof(json) == "string") {
      this.logEntry(json, "string starting with =", env);
      Ajsone.guard(Ajsone.isDeref(json), "internal interpreter error: json should have been considered a primitive");

      var jt = json.substr(1);

      var builtins = this.getBuiltins();
      if (typeof(builtins[jt]) != "undefined") {
        var r = builtins[jt](env);
        this.logExit(json, "builtin", r);
        return r;
      } else {
        var f = this.getBinding(env, jt);
        var r = this.eval_(f, env);
        this.logExit(json, "exiting function application", r);
        return r;
      }
    }

    if (typeof(json) == "object") {
      this.logEntry(json, "object", env);

      if (Ajsone.isEmptyObject(json)) {
        this.logExit(json, "empty object", null);
        return null;
      }

      var last_key = undefined;
      for (var k in json) {
        my_log(function(){return "handling :"+k});
        last_key = k;
        if (Ajsone.isDeref(k) == "=") {
          continue;
        }
        if (Ajsone.isPrimitive(json[k]) || (typeof(json[k]) == "string")) {
          my_log(function(){return "it's a non-function"});
          var v = this.eval_(json[k], env);
          my_log(function(){return "got: " + v});
          this.setBinding(env, k, v);
        } else {
          my_log(function(){return "it's a function"});
          this.setBinding(env, k, json[k]);
        }
      }
      Ajsone.guard(typeof(last_key) != "undefined", "we didn't set last_key");

      if (Ajsone.isDeref(last_key)) {
        my_log(function(){return "going to handle '"+last_key+"', with params"});
        var p_env = {};
        for (var k in json[last_key]) {
          my_log(function(){return "handling param:"+k});
          var v = json[last_key][k];
          if (last_key != "=if") {
            var v = this.eval_(v, env);
            my_log(function(){return "got: " + v});
          }              
          p_env[k] = v;
        }

        env.push(p_env);
        var r = this.eval_(last_key, env);
        env.pop();

        this.logExit(json, "returning from function", r);
        return r;
      }

      my_log(function(){return "going to handle '"+last_key+"', without params"});

      var b = this.getBinding(env, last_key);
      var r = this.eval_(b, env);

      this.logExit(json, "done with object", r);
      return r;
    }

    Ajsone.guard(false, 'unknown json type: '+typeof(json));
  }
}

Ajsone.isPrimitive = function(x) {
  if (Array.isArray(x)) {
    return true;
  }
  var t = typeof(x);
  if (t === "number") {
    return true;
  }
  if (t === "boolean") {
    return true;
  }
  if ((t === "string") && !Ajsone.isDeref(x)) {
    return true;
  }
  if (x === null) {
    return true;
  }
  return false;
}

Ajsone.isDeref = function(str) {
  return str[0] == "=";
}

Ajsone.isEmptyObject = function(json) {
  return JSON.stringify(json) == "{}";
}

Ajsone.guard = function(expr, msg) {
  if (!expr) {
    throw new Error(msg);
  }
}

Ajsone.expectNumeral = function(n) {
  Ajsone.guard(typeof(n) == "number", "runtime error, expecting number, got: " + JSON.stringify(n));
}

Ajsone.expectBoolean = function(b) {
  Ajsone.guard(typeof(b) == "boolean", "runtime error, expecting boolean, got: " + JSON.stringify(b));
}

Ajsone.expectArray = function(a) {
  Ajsone.guard(Array.isArray(a), "runtime error, expecting an array, got: " + JSON.stringify(a));
}

Ajsone.expectString = function(s) {
  Ajsone.guard(typeof(s) == "string", "runtime error, expecting a string, got: " + JSON.stringify(s));
}

// Terminal entry point for the Ajsone interpreter. This allows the interpreter to be run from the command line.
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.error("Usage: node ajsone.js <path_to_file.json>");
    process.exit(1);
  }

  const filePath = args[0];

  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const jsonProgram = JSON.parse(fileContent);
    
    const interpreter = new Ajsone();
    const result = interpreter.eval(jsonProgram);
    
    if (result.failure) {
      console.error("An error occurred in the interpreter:\n", result.failure);
      process.exit(1);
    } else {
      console.log("Result:");
      console.log(JSON.stringify(result.success, null, 2));
    }
  } catch (err) {
    console.error("An error occurred while reading or parsing the file:", err.message);
    process.exit(1);
  }
}