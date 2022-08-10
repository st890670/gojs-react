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

    // should set your license key here before creating the diagram: go.Diagram.licenseKey = "...";

    const diagram = $(
      go.Diagram,
      {
        'undoManager.isEnabled': true,
        'undoManager.maxHistoryLength': 0, // disable undo/redo functionality
        'clickCreatingTool.archetypeNodeData': {
          text: 'new node',
          color: 'lightblue',
        },
        model: new go.GraphLinksModel({
          linkKeyProperty: 'key', // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
        }),
      },
      { layout: $(go.TreeLayout) }
    );

    diagram.nodeTemplate = $(
      go.Node,
      'Auto', // the Shape will go around the TextBlock
      new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(
        go.Point.stringify
      ),
      $(
        go.Shape,
        {
          name: 'SHAPE',
          width: 200,
          height: 200,
          stroke: '#000000',
          strokeWidth: 1,
        },
        new go.Binding('fill', 'color'),
        new go.Binding('figure', 'shape')
      ),
      $(
        go.TextBlock,
        { margin: 8, editable: true },
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
