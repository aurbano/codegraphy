import {
  Button,
  Input,
  MenuItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useBoolean,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FaFile } from 'react-icons/fa';

import InlineIcon from '../../../../components/InlineIcon';
import getKeyboardCommand from '../../../../util/getKeyboardCommand';

interface OpenGraphProps {
  onOpenGraph: (graphPath: string) => void;
}

function OpenGraph({ onOpenGraph }: OpenGraphProps) {
  const [isOpen, { on, off }] = useBoolean(false);
  const [graphPath, setGraphPath] = useState<string>();

  return (
    <>
      <MenuItem icon={<FaFile />} command={getKeyboardCommand(['meta', 'O'])} onClick={on}>
        Open
      </MenuItem>

      <Modal isOpen={isOpen} onClose={off}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <InlineIcon icon={<FaFile />} mr={2} />
            Open Graph
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input type="file" onChange={(e) => setGraphPath(e.target.value)} />
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={off}>
              Cancel
            </Button>

            <Button
              colorScheme="primary"
              isDisabled={!graphPath}
              onClick={() => graphPath && onOpenGraph(graphPath)}
            >
              Open
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default OpenGraph;
