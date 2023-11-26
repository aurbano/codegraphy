import { Heading, Input, useBoolean } from '@chakra-ui/react';
import { useState } from 'react';

const MAX_DISPLAY_LENGTH = 30;

export interface EditableGraphPathProps {
  graphPath: string;
  onOpenGraph: (graphPath: string) => void;
}

function EditableGraphPath({ graphPath, onOpenGraph }: EditableGraphPathProps) {
  const [newGraphPath, setNewGraphPath] = useState(graphPath);
  const [isEditing, { toggle }] = useBoolean(false);

  const onStopEditing = () => {
    if (newGraphPath.replace(' ', '').length > 0) {
      onOpenGraph(newGraphPath);
    } else {
      setNewGraphPath(graphPath);
    }

    toggle();
  };

  if (isEditing) {
    return (
      <Input
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
        type="text"
        placeholder="Enter path to a graph..."
        value={newGraphPath}
        onChange={(e) => setNewGraphPath(e.target.value)}
        onBlur={onStopEditing}
      />
    );
  }

  const isTruncated = graphPath.length > MAX_DISPLAY_LENGTH;
  const displayGraphPath = isTruncated
    ? graphPath.slice(graphPath.length - MAX_DISPLAY_LENGTH)
    : graphPath;

  return (
    <Heading size="md" fontWeight="normal" onClick={toggle}>
      {isTruncated && '...'}
      {displayGraphPath}
    </Heading>
  );
}

export default EditableGraphPath;
