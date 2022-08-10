import DiagramWrapper from './DiagramWrapper';
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

const MOCK_LINK_DATA = [
  {
    key: -1,
    from: 0,
    to: 1,
  },
] as Array<go.ObjectData>;

function Chart() {
  function handleModelChange(changes: go.IncrementalData) {
    console.log(changes);
  }

  return (
    <DiagramWrapper
      nodeDataArray={MOCK_NODE_DATA}
      linkDataArray={MOCK_LINK_DATA}
      onModelChange={handleModelChange}
    />
  );
}

export default Chart;
