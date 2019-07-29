describe('Module 01 - Kanban Board Events', () => {

  const create_item = ast.findFunction('create_item');
  const validate_if = create_item.findIf();
  const drop = ast.findCall('forEach').findLiteral('drop');

  it('Create an `item`. @create-item', () => {
    const create_item_assignment = create_item.findVariable('item');
    const create_item_match = {
      'init.callee.object.name': 'document',
      'init.callee.property.name': 'createElement',
      'init.arguments.0.value': 'div'
    };
    assert(matchObj(create_item_assignment, create_item_match), 'Are you creating a variable called `item` and assigning it a call to the `createElement()` function');
  });

  it('Set item attributes. @set-attributes', () => {
    const add_class = create_item.findCall('add');
    const add_class_match = {
      'callee.object.object.name': 'item',
      'callee.object.property.name': 'classList',
      'callee.property.name': 'add',
      'arguments.0.value': 'item'
    };
    assert(matchObj(add_class, add_class_match), 'Are you adding a class of `item` to the `item`?');

    const item_id = create_item.findPropertyAssignment('item', 'id');
    const item_id_match = {
      'right.type': 'BinaryExpression',
      'right.left.value': 'item-',
      'right.operator': '+',
      'right.right.name': 'order'
    };
    assert(matchObj(item_id, item_id_match), "Are you giving the `item` the `id` of `'item-' + order`?");

    const item_draggable = create_item.findPropertyAssignment('item', 'draggable');
    const item_draggable_match = {
      'operator': '=',
      'right.value': true
    };
    assert(matchObj(item_draggable, item_draggable_match), 'Are you making the `item` draggable?');
    item_draggable
  });

  it('`dragstart` event listener. @dragstart-event-listener', () => {
    const drag_start = create_item.findLiteral('dragstart');
    const drag_start_match = {
      'callee.object.name': 'item',
      'callee.property.name': 'addEventListener',
    };
    assert(matchObj(drag_start, drag_start_match), 'Are you adding an event listener to `item` that listens for the `dragstart` event?');

    const drag_start_handler_arrow = { 
      'arguments.1.type': 'ArrowFunctionExpression',
      'arguments.1.params.0.name': 'event'
    };
    const drag_start_handler_function = { 
      'arguments.1.type': 'FunctionExpression',
      'arguments.1.params.0.name': 'event'
    };
    assert(matchObj(drag_start, drag_start_handler_arrow) || matchObj(drag_start, drag_start_handler_function), 'Do you have a `dragend` handler function?');

    const set_data = drag_start.findCall('setData');
    const set_data_match = {
      'callee.object.object.name': 'event',
      'callee.object.property.name': 'dataTransfer',
      'callee.property.name': 'setData',
      'arguments.0.value': 'text',
      'arguments.1.object.object.name': 'event',
      'arguments.1.object.property.name': 'target',
      'arguments.1.property.name': 'id'
    };
    assert(matchObj(set_data, set_data_match), 'In the `dragstart` event handler are you setting the `text` of the `dataTransfer` to `event.target.id`?');

  });

  it('`dragend` event listener. @dragend-event-listener', () => {
    const drag_end = create_item.findLiteral('dragend');
    const drag_end_match = {
      'callee.object.name': 'item',
      'callee.property.name': 'addEventListener',
    };
    assert(matchObj(drag_end, drag_end_match), 'Are you adding an event listener to `item` that listens for the `dragend` event?');

    const drag_end_handler_arrow = { 
      'arguments.1.type': 'ArrowFunctionExpression',
      'arguments.1.params.0.name': 'event'
    };
    const drag_end_handler_function = { 
      'arguments.1.type': 'FunctionExpression',
      'arguments.1.params.0.name': 'event'
    };
    assert(matchObj(drag_end, drag_end_handler_arrow) || matchObj(drag_end, drag_end_handler_function), 'Do you have a `dragend` handler function?');

    const clear_data = drag_end.findCall('clearData');
    const clear_data_match = {
      'callee.object.object.name': 'event',
      'callee.object.property.name': 'dataTransfer',
      'callee.property.name': 'clearData',
    };
    assert(matchObj(clear_data, clear_data_match), 'In the `dragend` event handler are you setting clear all `dataTransfer` data?');
  });

  it('Create `input` . @create-input', () => {
    const create_input_assignment = create_item.findVariable('input');
    const create_input_match = {
      'init.callee.object.name': 'document',
      'init.callee.property.name': 'createElement',
      'init.arguments.0.value': 'input'
    };
    assert(matchObj(create_input_assignment, create_input_match), 'Are you creating a variable called `input` and assigning it a call to the `createElement()` function');

    const append_child = create_item.findCall('appendChild');
    const append_child_match = {
      'callee.object.name': 'item',
      'callee.property.name': 'appendChild',
      'arguments.0.name': 'input'
    };
    assert(matchObj(append_child, append_child_match), 'Are you appending `input` to `item`?');
  });

  it('Create `save_btn`. @create-save-btn', () => {
    const save_btn = create_item.findVariable('save_btn');
    const save_btn_match = {
      'init.callee.object.name': 'document',
      'init.callee.property.name': 'createElement',
      'init.arguments.0.value': 'button'
    };
    assert(matchObj(save_btn, save_btn_match), 'Are you creating a variable called `save_btn` and assigning it a call to the `createElement()` function');

    const save_btn_html = create_item.findPropertyAssignment('save_btn', 'innerHTML');
    const save_btn_html_match = {
      'operator': '=',
      'right.value': 'Save'
    };
    assert(matchObj(save_btn_html, save_btn_html_match), "Are setting the HTML of the button to `Save`?");
  });

  it('`save_btn` event listener. @click-event-listener', () => {
    const save_btn_click = create_item.findLiteral('click');
    const save_btn_click_match = {
      'callee.object.name': 'save_btn',
      'callee.property.name': 'addEventListener',
    };
    assert(matchObj(save_btn_click, save_btn_click_match), 'Are you adding a `click` event listener to the `save_btn` button?');
    const save_btn_handler_arrow = { 'arguments.1.type': 'ArrowFunctionExpression' };
    const save_btn_handler_function = { 'arguments.1.type': 'FunctionExpression' };
    assert(matchObj(save_btn_click, save_btn_handler_arrow) || matchObj(save_btn_click, save_btn_handler_function), 'Do you have a `click` handler function?');
  });

  it('Valid input `if` statement. @valid-input-if', () => {
    const error_html = create_item.findPropertyAssignment('error', 'innerHTML');
    const error_html_match = {
      'operator': '=',
      'right.value': ''
    };
    assert(matchObj(error_html, error_html_match), "Are setting the HTML of `error` to an empty string?");

    assert((validate_if.test.operator === '!==' || validate_if.test.operator === '!=') &&
      ((validate_if.test.right.value === '' &&  (validate_if.test.left.object.name === 'input' &&  validate_if.test.left.property.name === 'value')) ||
      (validate_if.test.left.value === '' && (validate_if.test.right.object.name === 'input' && validate_if.test.right.property.name === 'value'))),
      'Do you have an `if` statement testing whether `input.value` is empty?');
  });

  it('`if` statement body. @valid-input-if-body', () => {
    assert(validate_if.consequent, "Are creating an `if` statement to check if `input.value` is empty?");
    const if_body = jscs(validate_if.consequent)

    const if_order = if_body.findAssignment('order');
    const if_order_match = {
      'operator': '+=',
      'left.name': 'order',
      'right.value': 1
    };
    assert(matchObj(if_order, if_order_match), "Are adding `1` to `order` and reassign it back to `order`?");

    const if_item_innerhtml = if_body.findPropertyAssignment('item', 'innerHTML');
    const if_item_innerhtml_match = {
      'operator': '=',
      'left.object.name': 'item',
      'left.property.name': 'innerHTML',
      'right.object.name': 'input',
      'right.property.name': 'value',
    };
    assert(matchObj(if_item_innerhtml, if_item_innerhtml_match), "Are setting the HTML of `error` to an empty string?");

    const if_adding = if_body.findAssignment('adding');
    const if_adding_match = {
      'operator': '=',
      'right.value': false
    };
    assert(matchObj(if_adding, if_adding_match), "Are setting the HTML of `error` to an empty string?");
  });

  it('Valid input `else` statement. @valid-input-else', () => {
    assert(validate_if.consequent, "Are creating an `else` statement?");
    const else_body = jscs(validate_if.alternate)
    const error_html = else_body.findPropertyAssignment('error', 'innerHTML');
    const error_html_match = {
      'operator': '=',
      'right.name': 'message',
    };
    assert(matchObj(error_html, error_html_match), "Are setting the HTML of `error` to an empty string?");
  });

  it('Append `save_btn` and return `item`. @append-save-btn-return', () => {
    const append_child = create_item.findCall('appendChild').nodes()[1];
     assert(append_child, 'Are you appending `save_btn` to `item`?');
    const append_child_match = {
      'callee.object.name': 'item',
      'callee.property.name': 'appendChild',
      'arguments.0.name': 'save_btn'
    };
    assert(match(append_child, append_child_match), 'Are you appending `save_btn` to `item`?');

    const return_item = create_item.findReturn();
    const return_item_match = {
      'type': 'ReturnStatement',
      'argument.name': 'item'
    };
    assert(matchObj(return_item, return_item_match), 'Are you appending `save_btn` to `item`?');
  });

  it('`drop` event listener. @drop-event-listener', () => {
    const drop_match = {
      'callee.object.name': 'element',
      'callee.property.name': 'addEventListener',
    };
    assert(matchObj(drop, drop_match), 'Are you adding an event listener to `element` that listens for the `drop` event?');

    const drop_handler_arrow = { 
      'arguments.1.type': 'ArrowFunctionExpression',
      'arguments.1.params.0.name': 'event'
    };
    const drop_handler_function = { 
      'arguments.1.type': 'FunctionExpression',
      'arguments.1.params.0.name': 'event'
    };
    assert(matchObj(drop, drop_handler_arrow) || matchObj(drop, drop_handler_function), 'Do you have a `drop` handler function?');

    const prevent_default = drop.findCall('preventDefault');
    const prevent_default_match = {
      'callee.object.name': 'event',
      'callee.property.name': 'preventDefault',
    };
    assert(matchObj(prevent_default, prevent_default_match), 'Are you calling `preventDefault` on `event` in the `drop` handler function?');
  });

  it('`drop` `dataTransfer` `id`. @drop-data-transfer-id', () => {
    assert(drop.length, 'Are you adding an event listener to `element` that listens for the `drop` event?');
    const id_get_data = drop.findVariable('id');
    const id_get_data_match = {
      'id.name': 'id',
      'init.callee.property.name': 'getData',
      'init.callee.object.object.name': 'event',
      'init.callee.object.property.name': 'dataTransfer',
      'init.arguments.0.value': 'text',
    };
    assert(matchObj(id_get_data, id_get_data_match), "Are you creating a constant called `id` and setting it to a call to `event.dataTransfer.getData()` and passing in `'text'`?");
  });

  it('`drop` append element. @drop-append-element', () => {
    assert(drop.length, 'Are you adding an event listener to `element` that listens for the `drop` event?');
    const drop_append_child = drop.findCall('appendChild');
    const drop_append_child_match = {
      'callee.object.object.name': 'event',
      'callee.object.property.name': 'target',
      'callee.property.name': 'appendChild',
      'arguments.0.callee.object.name': 'document',
      'arguments.0.callee.property.name': 'getElementById',
      'arguments.0.arguments.0.name': 'id'
    };
    assert(matchObj(drop_append_child, drop_append_child_match), 'Are you appending the element with the `id` of `id` (use: `document.getElementById`) to the `event.target`?');
  });

  it('`dragover` event listener. @drag-over-event-listener', () => {
    const drag_over = ast.findCall('forEach').findLiteral('dragover');
    const drag_over_match = {
      'callee.object.name': 'element',
      'callee.property.name': 'addEventListener',
    };
    assert(matchObj(drag_over, drag_over_match), 'Are you adding an event listener to `element` that listens for the `dragover` event?');

    const drag_over_handler_arrow = { 
      'arguments.1.type': 'ArrowFunctionExpression',
      'arguments.1.params.0.name': 'event'
    };
    const drag_over_handler_function = { 
      'arguments.1.type': 'FunctionExpression',
      'arguments.1.params.0.name': 'event'
    };
    assert(matchObj(drag_over, drag_over_handler_arrow) || matchObj(drag_over, drag_over_handler_function), 'Do you have a `dragover` handler function?');

    const prevent_default = drag_over.findCall('preventDefault');
    const prevent_default_match = {
      'callee.object.name': 'event',
      'callee.property.name': 'preventDefault',
    };
    assert(matchObj(prevent_default, prevent_default_match), 'Are you calling `preventDefault` on `event` in the `dragover` handler function?');
  });

});
