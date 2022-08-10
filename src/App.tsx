import DiagramWrapper from './DiagramWrapper';
import go from 'gojs';
import { NodeType, SourceData, NodeData } from './type';
import { useMemo, useCallback } from 'react';

const MOCK_DATA: Array<SourceData> = [
  {
    id: 0,
    text: 'overview',
    type: NodeType.Overview,
  },
  {
    id: 1,
    text: 'question',
    type: NodeType.Question,
  },
  {
    id: 2,
    text: 'anwser',
    type: NodeType.Answer,
  },
];

const MOCK_LINK_DATA = [
  {
    from: 0,
    to: 1,
  },
  {
    from: 1,
    to: 2,
  },
] as Array<go.ObjectData>;

function Chart() {
  function handleModelChange(changes: go.IncrementalData) {
    console.log(changes);
  }

  const calculateNodeColorByType = useCallback((type: NodeType) => {
    switch (type) {
      case NodeType.Overview:
        return 'green';
      case NodeType.Question:
        return 'gray';
      case NodeType.Answer:
        return 'pink';
      default:
        return 'white';
    }
  }, []);

  const convertSourceDataToNodeData = useCallback(
    (sourceData: Array<SourceData>) => {
      return sourceData.map((rowData) => {
        return {
          key: rowData.id,
          text: rowData.text,
          color: calculateNodeColorByType(rowData.type),
        } as NodeData;
      });
    },
    [calculateNodeColorByType]
  );

  const renderNodeData = useMemo(
    () => convertSourceDataToNodeData(MOCK_DATA),
    [convertSourceDataToNodeData]
  );

  return (
    <DiagramWrapper
      nodeDataArray={renderNodeData}
      linkDataArray={MOCK_LINK_DATA}
      onModelChange={handleModelChange}
    />
  );
}

export default Chart;
