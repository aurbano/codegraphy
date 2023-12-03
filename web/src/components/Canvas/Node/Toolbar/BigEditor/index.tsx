import {
  Box,
  Code,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { BiFullscreen } from 'react-icons/bi';

import type { CodeCellModel } from '../../../../../api/schema';
import CodeEditor from '../../../../CodeEditor';

export interface BigEditorProps {
  cell: CodeCellModel;
}

const BigEditor = ({ cell }: BigEditorProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton aria-label="Full-Screen" icon={<BiFullscreen />} onClick={onOpen} />

      <Modal isOpen={isOpen} size="4xl" onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader pb={1}>
            <Code bg="none">{cell.file_name}</Code>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box minH="400px">
              <CodeEditor cell={cell} height={400} />
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BigEditor;
