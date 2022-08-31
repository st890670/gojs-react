import DiagramWrapper from './DiagramWrapper';
import go from 'gojs';
import { MOCK_DATA, MOCK_LINK_DATA } from './mock';

function Chart() {
  function handleModelChange(changes: go.IncrementalData) {
    console.log(changes);
  }

  return (
    <DiagramWrapper
      nodeDataArray={MOCK_DATA}
      linkDataArray={MOCK_LINK_DATA}
      onModelChange={handleModelChange}
    />
  );
}

export default Chart;
