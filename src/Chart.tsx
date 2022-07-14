import { useRef } from 'react';
import { ReactDiagram } from 'gojs-react';
import go from 'gojs';

const MOCK_NODE_DATA = [
  {
    key: 0,
    text: 'One',
    color: 'orange',
  },
  {
    key: 1,
    text: 'Two',
    color: 'blue',
  },
] as Array<go.ObjectData>;

const MOCK_LINK_DATA = [] as Array<go.ObjectData>;

function Chart() {
  const ref = useRef(null);

  function initDiagram() {
    const $ = go.GraphObject.make;
    // set your license key here before creating the diagram: go.Diagram.licenseKey = "...";
    const diagram = $(go.Diagram, {
      'undoManager.isEnabled': true, // must be set to allow for model change listening
      // 'undoManager.maxHistoryLength': 0,  // uncomment disable undo/redo functionality
      'clickCreatingTool.archetypeNodeData': {
        text: 'new node',
        color: 'lightblue',
      },
      model: new go.GraphLinksModel({
        linkKeyProperty: 'key', // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
      }),
    });

    // define a simple Node template
    diagram.nodeTemplate = $(
      go.Node,
      'Auto', // the Shape will go around the TextBlock
      new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(
        go.Point.stringify
      ),
      $(
        go.Shape,
        'RoundedRectangle',
        { name: 'SHAPE', fill: 'white', strokeWidth: 0 },
        // Shape.fill is bound to Node.data.color
        new go.Binding('fill', 'color')
      ),
      $(
        go.TextBlock,
        { margin: 8, editable: true }, // some room around the text
        new go.Binding('text').makeTwoWay()
      )
    );

    return diagram;
  }

  function handleModelChange() {}

  return (
    <ReactDiagram
      ref={ref}
      initDiagram={initDiagram}
      divClassName="chart"
      nodeDataArray={MOCK_NODE_DATA}
      linkDataArray={MOCK_LINK_DATA}
      onModelChange={handleModelChange}
    />
  );
}

export default Chart;
