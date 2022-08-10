import { useRef } from 'react';
import { ReactDiagram } from 'gojs-react';
import go from 'gojs';

interface Props {
  nodeDataArray: Array<go.ObjectData>;
  linkDataArray: Array<go.ObjectData>;
  modelData?: go.ObjectData;
  skipsDiagramUpdate?: boolean;
  onDiagramEvent?: (e: go.DiagramEvent) => void;
  onModelChange?: (e: go.IncrementalData) => void;
}

function DiagramWrapper({
  nodeDataArray = [],
  linkDataArray = [],
  onModelChange = () => undefined,
}: Props) {
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

  return (
    <ReactDiagram
      ref={ref}
      initDiagram={initDiagram}
      divClassName="chart"
      nodeDataArray={nodeDataArray}
      linkDataArray={linkDataArray}
      onModelChange={onModelChange}
    />
  );
}

export default DiagramWrapper;
