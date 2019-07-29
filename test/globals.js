const { assert } = require('chai');
const dot = require('dot-object');
const fs = require('fs');
const path = require('path');
const jscs = require('jscodeshift');

const source = fs.readFileSync(path.join(process.cwd(), 'js/kanban.js'), 'utf8');
const ast = jscs(source);

jscs.registerMethods({
  findFunction: function(name) {
    const element = this.find(jscs.Identifier, { name: name }).filter(path => {
      if(path.parent.value.type === 'VariableDeclarator') {
        if (path.parent.value.init.type === 'FunctionExpression' || 
            path.parent.value.init.type === 'ArrowFunctionExpression') {
          return true;
        }
        return false;
      } else if (path.parent.value.type === 'FunctionDeclaration') {
        return true;
      } else {
        return false;
      }
    });
    return (element.length) ? jscs(element.get().parent) : [];
  },
  findVariable: function(name) {
    return this.find(jscs.VariableDeclarator).filter(path => (path.value.id.name === name));
  },
  findPropertyAssignment: function(obj, property) {
    return this.find(jscs.AssignmentExpression).filter(path => {
      if (path.value.left.type === 'MemberExpression' &&
          path.value.left.object.name === obj &&
          path.value.left.property.name === property) {
        return true;
      } else {
        return false;
      }
    });
  },
  findAssignment: function(name) {
    return this.find(jscs.AssignmentExpression).filter(path => (path.value.left.type === 'Identifier' && path.value.left.name === name));
  },
  findCall: function(name) {
    return this.find(jscs.CallExpression).filter(path => {
      let callee_name = '';
      if (path.value.callee.type === 'Identifier') {
        callee_name = path.value.callee.name;
      } if (path.value.callee.type === 'MemberExpression') {
        callee_name = path.value.callee.property.name;
      }
      return (callee_name === name) ? true : false;
    }); 
  },
  findIf: function() {
    const element = this.find(jscs.IfStatement);
    return (element.length) ? element.get().value : [];
  },
  findReturn: function() {
    return this.find(jscs.ReturnStatement);
  },
  findLiteral: function(name) {
    const element = this.find(jscs.Literal).filter(path => (path.value.value === name));
    return (element.length) ? jscs(element.get().parent) : [];
  }
});

const matchObj = (obj, match_obj) => ((obj.length) ? jscs.match(obj.get().value, dot.object(match_obj)) : false);
const match = (obj, match_obj) => jscs.match(obj, dot.object(match_obj));

Object.assign(global, {
  assert,
  ast,
  dot,
  jscs,
  match,
  matchObj
});
