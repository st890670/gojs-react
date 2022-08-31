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

    const diagram = $(go.Diagram, {
      'undoManager.isEnabled': true,
      // 用於disable undo/redo功能
      'undoManager.maxHistoryLength': 0,
      allowMove: false,
      allowCopy: false,
      allowDelete: false,
      'clickCreatingTool.archetypeNodeData': {
        text: 'new node',
        color: 'lightblue',
      },
    });

    diagram.model = new go.GraphLinksModel({
      //在使用GraphLinksModel時，下方屬性必須設定
      linkKeyProperty: 'key',
    });

    diagram.layout = $(go.TreeLayout);

    const nodeTemplate = $(
      go.Node,
      'Auto',
      $(
        go.TextBlock,
        {
          margin: 10,
        },
        'Default Text'
      )
    );

    const overviewNode = $(
      go.Node,
      'Auto',
      $(go.Shape, 'roundedRectangle', {
        fill: null,
        stroke: '#000000',
        strokeWidth: 1,
      }),
      $(go.TextBlock, { margin: 8 }, 'haha')
    );

    // 使用go.Map()來建立不同template的模板
    const templateMap = new go.Map() as go.Map<string, go.Node>;
    // 給定一個key值，讓model資料可以藉由category屬性對應到各自的template
    // 預設的nodeTemplate讓key值留空即可
    templateMap.add('', nodeTemplate);
    templateMap.add('overview', overviewNode);
    diagram.nodeTemplateMap = templateMap;

    return diagram;
  }

  return (
    <ReactDiagram
      divClassName="chart"
      ref={ref}
      initDiagram={initDiagram}
      nodeDataArray={nodeDataArray}
      linkDataArray={linkDataArray}
      onModelChange={onModelChange}
    />
  );
}

export default DiagramWrapper;
