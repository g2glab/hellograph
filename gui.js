


// nodeFolder.open();
// edgeFolder.open();
// timeLineFolder.open();

function updateForTime() {
  updateTimeLineNodes();
  if(timeLineEnabled) {
    fixedMap = [];
    graph.nodes.forEach((node) => {
      let x, y, fixed, width;
      ({x, y, fixed, width} =  calcNodePosition(node));
      if(fixed) {
        moveNodeWithAnimation(node.id, x, y);
        if(width) {
          fixedMap.push({id: node.id, fixed: {x: true, y: false}, shape: "box", widthConstraint: {minimum: width, maximum: width}, fixedByTime: true });
        } else {
          fixedMap.push({id: node.id, fixed: {x: true, y: false}, shape: "square", fixedByTime: true});
        }
      }
    });
    nodeDataSet.update(fixedMap);
  } else {
    nodeDataSet.update(graph.nodes.map((node) => {
      const expanded = expandedNodes.includes(node.id);
      const visNode = nodeDataSet.get(node.id);
      return {
        id:node.id,
        fixed: expanded,
        shape: (expanded || visNode.degree === 1) ? 'text' : "dot",
      }
    }));
  }
}

function onTimeLinePropertyController() {
  displayedTimeProps = timeLineFolder.__controllers.map((con) =>
    con.__checkbox.checked ? con.property : null).filter((prop) => prop && prop != 'enabled');
  timeLineEnabled = displayedTimeProps.length > 0;
  updateForTime();
}
          